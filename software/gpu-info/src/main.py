#!/usr/bin/env python3
"""
GPU detection and info reporting for Platforma GPU Test block.

Detects GPU availability using multiple methods (PyTorch, nvidia-smi subprocess)
and outputs a JSON report + human-readable stdout summary.

Runs on any platform — gracefully reports "no GPU" when CUDA is unavailable.
"""

import json
import os
import subprocess
import sys
import time


def detect_torch_cuda():
    """Detect GPU via PyTorch CUDA."""
    info = {
        "available": False,
        "device_count": 0,
        "devices": [],
        "cuda_version": None,
        "cudnn_version": None,
    }

    try:
        import torch

        info["available"] = torch.cuda.is_available()
        if info["available"]:
            info["device_count"] = torch.cuda.device_count()
            info["cuda_version"] = torch.version.cuda
            try:
                info["cudnn_version"] = str(torch.backends.cudnn.version())
            except Exception:
                pass

            for i in range(info["device_count"]):
                props = torch.cuda.get_device_properties(i)
                device = {
                    "index": i,
                    "name": props.name,
                    "total_memory_mb": props.total_mem // (1024 * 1024),
                    "major": props.major,
                    "minor": props.minor,
                    "multi_processor_count": props.multi_processor_count,
                }
                try:
                    free, total = torch.cuda.mem_get_info(i)
                    device["free_memory_mb"] = free // (1024 * 1024)
                except Exception:
                    pass
                info["devices"].append(device)
    except ImportError:
        info["error"] = "PyTorch not installed"
    except Exception as e:
        info["error"] = str(e)

    return info


def detect_nvidia_smi():
    """Detect GPU via nvidia-smi subprocess."""
    query_cmd = [
        "nvidia-smi",
        "--query-gpu=index,name,memory.total,memory.free,memory.used,temperature.gpu,driver_version",
        "--format=csv,noheader,nounits",
    ]

    info = {
        "available": False,
        "driver_version": None,
        "devices": [],
        "command": " ".join(query_cmd),
    }

    try:
        result = subprocess.run(
            query_cmd,
            capture_output=True,
            text=True,
            timeout=10,
        )

        info["returncode"] = result.returncode
        info["stdout"] = result.stdout.strip()
        info["stderr"] = result.stderr.strip()

        if result.returncode == 0:
            info["available"] = True
            for line in result.stdout.strip().split("\n"):
                parts = [p.strip() for p in line.split(",")]
                if len(parts) >= 7:
                    device = {
                        "index": int(parts[0]),
                        "name": parts[1],
                        "memory_total_mb": int(parts[2]),
                        "memory_free_mb": int(parts[3]),
                        "memory_used_mb": int(parts[4]),
                        "temperature_c": int(parts[5]) if parts[5] != "N/A" else None,
                        "driver_version": parts[6],
                    }
                    info["devices"].append(device)
                    info["driver_version"] = parts[6]
        else:
            info["error"] = result.stderr.strip() or f"nvidia-smi returned exit code {result.returncode}"
    except FileNotFoundError:
        info["error"] = "nvidia-smi not found in PATH"
        info["returncode"] = None
    except subprocess.TimeoutExpired:
        info["error"] = "nvidia-smi timed out after 10s"
        info["returncode"] = None
    except Exception as e:
        info["error"] = str(e)
        info["returncode"] = None

    return info


GPU_ENV_KEYS = [
    "CUDA_VISIBLE_DEVICES",
    "NVIDIA_VISIBLE_DEVICES",
    "NVIDIA_DRIVER_CAPABILITIES",
    "NVIDIA_REQUIRE_CUDA",
    "PLATFORMA_GPU_COUNT",
    "GPU_DEVICE_ORDINAL",
    "CUDA_DEVICE_ORDER",
    "CUDA_HOME",
    "CUDA_PATH",
    "LD_LIBRARY_PATH",
    "PATH",
]


def detect_env_vars():
    """Collect GPU-related environment variables. Reports all searched keys."""
    env = {}
    for key in GPU_ENV_KEYS:
        val = os.environ.get(key)
        env[key] = val  # None if not set
    return env


def run_benchmark(torch_cuda_available, nvidia_smi_available):
    """Run a simple matrix multiply benchmark on GPU vs CPU."""
    results = {"ran": False}

    if not torch_cuda_available:
        if nvidia_smi_available:
            results["skipped"] = "GPU detected by nvidia-smi but PyTorch CUDA is not available (missing CUDA toolkit or driver mismatch)"
        else:
            results["skipped"] = "no GPU available"
        return results

    try:
        import torch

        size = 2000
        a_cpu = torch.randn(size, size)
        b_cpu = torch.randn(size, size)

        # CPU benchmark
        start = time.perf_counter()
        for _ in range(3):
            torch.mm(a_cpu, b_cpu)
        cpu_time = (time.perf_counter() - start) / 3

        # GPU benchmark
        a_gpu = a_cpu.cuda()
        b_gpu = b_cpu.cuda()
        torch.cuda.synchronize()

        start = time.perf_counter()
        for _ in range(3):
            torch.mm(a_gpu, b_gpu)
            torch.cuda.synchronize()
        gpu_time = (time.perf_counter() - start) / 3

        results["ran"] = True
        results["matrix_size"] = size
        results["cpu_time_ms"] = round(cpu_time * 1000, 2)
        results["gpu_time_ms"] = round(gpu_time * 1000, 2)
        results["speedup"] = round(cpu_time / gpu_time, 1) if gpu_time > 0 else None

    except Exception as e:
        results["error"] = str(e)

    return results


def format_report(report):
    """Format the report as human-readable text."""
    lines = []
    lines.append("=" * 60)
    lines.append("GPU Detection Report")
    lines.append("=" * 60)
    lines.append("")

    # PyTorch CUDA
    torch_info = report["torch_cuda"]
    lines.append("PyTorch CUDA")
    lines.append("-" * 40)
    lines.append(f"  CUDA available:      {torch_info['available']}")
    if torch_info.get("error"):
        lines.append(f"  Error:               {torch_info['error']}")
    if torch_info["available"]:
        lines.append(f"  Device count:        {torch_info['device_count']}")
        lines.append(f"  CUDA version:        {torch_info['cuda_version']}")
        lines.append(f"  cuDNN version:       {torch_info.get('cudnn_version', 'N/A')}")
        for dev in torch_info["devices"]:
            lines.append(f"  GPU {dev['index']}: {dev['name']}")
            lines.append(f"    VRAM:              {dev['total_memory_mb']} MB")
            if "free_memory_mb" in dev:
                lines.append(f"    Free VRAM:         {dev['free_memory_mb']} MB")
            lines.append(f"    Compute:           {dev['major']}.{dev['minor']}")
            lines.append(f"    SMs:               {dev['multi_processor_count']}")
    lines.append("")

    # nvidia-smi
    smi_info = report["nvidia_smi"]
    lines.append("nvidia-smi")
    lines.append("-" * 40)
    lines.append(f"  Command:             {smi_info.get('command', 'N/A')}")
    lines.append(f"  Available:           {smi_info['available']}")
    lines.append(f"  Exit code:           {smi_info.get('returncode', 'N/A')}")
    if smi_info.get("error"):
        lines.append(f"  Error:               {smi_info['error']}")
    if smi_info.get("stdout"):
        lines.append(f"  Stdout:              {smi_info['stdout'][:500]}")
    if smi_info.get("stderr"):
        lines.append(f"  Stderr:              {smi_info['stderr'][:500]}")
    if smi_info["available"]:
        lines.append(f"  Driver version:      {smi_info['driver_version']}")
        for dev in smi_info["devices"]:
            lines.append(f"  GPU {dev['index']}: {dev['name']}")
            lines.append(f"    VRAM total:        {dev['memory_total_mb']} MB")
            lines.append(f"    VRAM free:         {dev['memory_free_mb']} MB")
            lines.append(f"    VRAM used:         {dev['memory_used_mb']} MB")
            if dev["temperature_c"] is not None:
                lines.append(f"    Temperature:       {dev['temperature_c']}°C")
    lines.append("")

    # Environment variables
    env = report["environment"]
    lines.append("Environment Variables (searched)")
    lines.append("-" * 40)
    for k, v in env.items():
        if v is not None:
            lines.append(f"  {k} = {v}")
        else:
            lines.append(f"  {k} = (not set)")
    lines.append("")

    # Benchmark
    bench = report["benchmark"]
    lines.append("Benchmark (matrix multiply {0}x{0})".format(bench.get("matrix_size", "N/A")))
    lines.append("-" * 40)
    if bench.get("ran"):
        lines.append(f"  CPU time:            {bench['cpu_time_ms']} ms")
        lines.append(f"  GPU time:            {bench['gpu_time_ms']} ms")
        lines.append(f"  Speedup:             {bench['speedup']}x")
    elif bench.get("skipped"):
        lines.append(f"  Skipped:             {bench['skipped']}")
    elif bench.get("error"):
        lines.append(f"  Error:               {bench['error']}")
    lines.append("")

    # Summary
    gpu_available = torch_info["available"] or smi_info["available"]
    lines.append("=" * 60)
    lines.append(f"SUMMARY: GPU {'AVAILABLE' if gpu_available else 'NOT AVAILABLE'}")
    lines.append("=" * 60)

    return "\n".join(lines)


def main():
    report = {}

    report["torch_cuda"] = detect_torch_cuda()
    report["nvidia_smi"] = detect_nvidia_smi()
    report["environment"] = detect_env_vars()

    report["benchmark"] = run_benchmark(
        report["torch_cuda"]["available"],
        report["nvidia_smi"]["available"],
    )

    report["gpu_available"] = (
        report["torch_cuda"]["available"] or report["nvidia_smi"]["available"]
    )

    # Write JSON output
    with open("gpu-info.json", "w") as f:
        json.dump(report, f, indent=2)

    # Print human-readable report to stdout
    print(format_report(report))


if __name__ == "__main__":
    main()
