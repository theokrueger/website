+++
title = "Tesla K80 for Local Inference"
description = "The less interesting part."
date = 1970-01-01
extra.flavor_id = ""
extra.show_toc = true
extra.footer_name = "gk210"
template = "posts/post.html"
extra.extern.slideshow = false
+++
# \* Info
This is the companion piece of *["Private AI for U$70"](@/posts/gk210/index.md)*.

The main reason the Tesla K80 is cheap is because it is obsolete.
Not necessarily in performance, as it is quite good in that regard (with tempered expectations), but is sorely lacking in modern support.
This post contains the dry information not quite suited for the main post.

# \* Components
The Tesla K80, being designed for server use at fixed fan speeds, has neither fans nor hookups for them.
Additionally, the power connector on the card expects an EPS-12V (8 pin) connection, whereas the VGA/PCIe cables typically available on consumer power supplies are [basically pinned oppositely](https://www.igorslab.de/en/what-can-ampere-full-version-nvidia-quadro-a6000-with-48-gb-as-8k-and-5k-card-in-gaming-tests-decade-pure-and-victory-against-geforce-rtx-3090/).

*The PCIe power cable may fit, but you will **[fry your GPU](https://www.reddit.com/r/homelab/comments/uqfq69/psa_nvidia_tesla_cards_do_not_use_the_same_power/)** if you do not use an appropriate adapter*.

## \*\* Bill of Materials
{% <table heading={true} zebra={true}> %}
| Item                          | Est. Cost |
| NVIDIA Tesla K80              | {{ <currency n={60} code="USD" /> }} |
| 12V DC blower fan             | {{ <currency n={10} code="USD" /> }} |
| EPS-12V to PCIe power adapter | {{ <currency n="0-10" code="USD" /> }} |
| Access to a 3D printer        | {{ <currency n={0} code="USD" /> }} |
| (Optional) PWM Fan Controller | {{ <currency n={10} code="USD" /> }} |
| Total                         | {{ <currency n="70-90" code="USD" /> }} |
{% </table> %}

Many listings include the power adapter, and the PWM fan controller is optional so long as you don't mind some additional noise.

## \*\* Assembly
You need to 3D-print the [fan mount bracket](TODOTODOTODO), or have it printed for you.
It should be printed in a heat-resistant filament like ABS or PETG.
PLA will warp over time due to the heat; PETG is resistant enough to heat that it should be no issue

Everything should fit into place if printed on a reasonable printer.
In case your needs are different, the design files are available.
FreeCAD was used, so it is similarly free to actually perform the modifications you may need.


# \* Drivers
Depending on your distro, drivers range from annoying to impossible to install.
Read your distribution's guide to installing NVIDIA drivers `470.256.02-r2`.
The proprietary drivers are your only choice unfortunately, which limits compatibility to Linux 6.6 at maximum.

In my case, the proprietary drivers require
- Linux `<=6.6`
- NVIDIA Drivers `470.256.02-r2`
- CUDA Toolkit `11.8.0-r4`

Which on Gentoo, requires some modification to allow installation.

{{ <file_head type="FILE" name="package.accept_keywords" /> }}
```bash
# Latest CUDA for GK210
=dev-util/nvidia-cuda-toolkit-11.8.0-r4 ~amd64

# HIP support
sci-libs/hip* ~amd64
sci-libs/miopen ~amd64
dev-util/hip* ~amd64
dev-util/Tensile ~amd64
dev-libs/half ~amd64
dev-libs/hipother ~amd64
llvm-core/* ~amd64
llvm-runtimes/* ~amd64
```

{{ <file_head type="FILE" name="package.unmask" /> }}
```bash
# Nvidia 470 for GK210
~x11-drivers/nvidia-drivers-470.256.02
```

{{ <file_head type="FILE" name="package.use" /> }}
```bash
# NVIDIA 470 drivers
*/* VIDEO_CARDS: nvidia
*/* nvidia vdpau nvenc
x11-drivers/nvidia-drivers -kernel-open persistenced

# If you have an AMD GPU in the system as well:
dev-util/hip -video_cards_amdgpu
```

Install your Linux 6.6 of choice, select the kernel in `eselect`, run `emerge =x11-drivers/nvidia-drivers-470.256.02-r2 =dev-util/nvidia-cuda-toolkit-11.8.0-r4` and then rebuild world.

## \*\* Caveats
As if there weren't already enough sticking points, one huge caveat for anyone who has more than one NVIDIA GPU in their system is that multiple driver slots are not really a possibility.
So if one card (say, an RTX 4070) is still supported on the latest `610.xxx` drivers (and only supported on `>=472`), you are SOL if you want the K80 in the same host system.

The workaround to this would be running a [PCIe passthrough](https://wiki.gentoo.org/wiki/GPU_passthrough_with_virt-manager,_QEMU,_and_KVM) of the K80 to a virtual machine.
This entails some performance overhead as well as reduced resource availability to the K80 (in the form of less available system memory), but could be your only option.

When Linux 6.6 becomes EOL, a VM will be your *only* (relatively sane) option.

# \* Software
It's not hard to install [llama.cpp](https://github.com/ggml-org/llama.cpp) once you have the dependencies satisfied.
Just follow their [build instructions](https://github.com/ggml-org/llama.cpp/blob/master/docs/build.md#cuda) for CUDA.

You should download and build `nccl` it according to the instructions at the [nccl repository](https://github.com/NVIDIA/nccl). I used version [2.24.3-1](https://github.com/NVIDIA/nccl/releases/tag/v2.24.3-1), as the latest will not compile with this old of a CUDA toolkit.

Specifically for the K80, you will want the following commands:

{{ <file_head type="BASH" name="compile nccl and llama.cpp" /> }}
```bash
# build nccl
cd [nccl_directory]
make src.build CUDA_HOME=/opt/cuda/ NVCC_GENCODE="-gencode=arch=compute_37,code=sm_37" -j$(nproc)
make pkg.txz.build
NCDIR=[nccl_build_dir]

# build llama.cpp
cd [llama.cpp_directory]
cmake -B build -DGGML_CUDA=ON -DCMAKE_CUDA_ARCHITECTURES=37 -DGGML_CUDA_NCCL=ON -DNCCL_INCLUDE_DIR=$NCDIR/include/ -DNCCL_LIBRARY=$NCDIR/lib/libnccl.so
cmake --build build --config Release -j$(nproc)
```

Although, you may run into the two following issues:

## \*\* Unsupported GCC Version
If you see some error during compilation about GCC like so:

{{ <file_head type="LOG" name="nvcc build log" /> }}
```
132 | #error -- unsupported GNU version! gcc versions later than 11 are not
supported! The nvcc flag '-allow-unsupported-compiler' can be used to override
this version check; however, using an unsupported host compiler may cause
compilation failure or incorrect run time execution. Use at your own risk.
```

Then you will need to install GCC 11, then `export NVCC_PREPEND_FLAGS="-ccbin /usr/bin/gcc-11"` before invoking `cmake`.

For `nccl`, you just need to set `CXX` in `makefiles/common.mk`.

## \*\* New glibc Compatibility
Exactly as per [llama.cpp documentation](https://github.com/ggml-org/llama.cpp/blob/master/docs/build.md#fixing-compatibility-issues-with-old-cuda-and-new-glibc), you may run into build issues from `math.h`.
This is trivially solvable by adding `noexcept (true)` to the ending of 6 function prototypes.
It is a permanent fix as well, so you won't have do this every time you compile something with `nvcc`.

Here's a (bad but robust) script for it:

{{ <file_head type="BASH-ROOT" name="New glibc fix for old CUDA"/> }}
```bash
# Set $f to your target CUDA's math_functions.h file
f="/opt/cuda/targets/x86_64-linux/include/crt/math_functions.h"
cp "$f" "$f.bak" &&
  sed -E -i 's/^(extern __DEVICE_FUNCTIONS_DECL__ __device_builtin__ )(double|float)( *)(cospi|sinpi|rsqrt)([a-z]*\([a-z ]*\));/\1\2\3\4\5 noexcept (true);/g' "$f"

# Verify that it looks fine
diff "$f.bak" "$f"
```

# \*  Appendix
At this point, you're off to the races with your K80.
Below are some random snippets that don't quit fit in the [main post](@/posts/gk210/index.md).

## \*\* llama.cpp Args
Here is a full list of arguments that I used.
Note that you may need to increase lockable memory with `ulimit -l` as root.

{{ <file_head type="BASH" name="llama.sh"/> }}
```bash
#!/usr/bin/env bash
BIN="/home/me/code/llama.cpp/cuda/build/bin/llama"

exec \
  "$BIN" serve \
  --cache-prompt \
  --models-max 1 \
  --split-mode tensor \
  --mlock \
  --no-mmap \
  --threads $(nproc) \
  --flash-attn on \
  --direct-io \
  --parallel 1 \
  --offline \
  $@
```
I didn't read the docs too hard, I mostly just picked options that seemed like they would cache everything really hard for my single-user & single-session setup.

## \*\* Overclocking
Memory bandwidth is the biggest bottleneck, so our efforts are focused on that mostly.

### \*\*\* Supported tweaks
By default, the only thing you can change is ECC and the power limit, which tops at 175W per-die.
Run `nvidia-smi -e 0` as root to disable ECC until you turn it back on.
Power limit is not persistent, but installing `dev-python/nvidia-ml-py` lets you easily change powerlimit via a script.

{{ <file_head type="PYTHON" name="overclock.py"/> }}
```python
#!/usr/bin/env python
# get UUIDs with:
# nvidia-smi -q | grep "\(Product Name\|UUID\)"
from pynvml import *

power_limits = {
    "GPU-d18e19a0-5e83-4052-fa1e-43ed462725fd": 175000,
    "GPU-ff564a6d-376d-8f6d-2a9a-e956486d03d3": 175000
}

nvmlInit()
for uuid in power_limits.keys():
    try:
        h = nvmlDeviceGetHandleByUUID(uuid)
        pl = power_limits[uuid]
        nvmlDeviceSetPowerManagementLimit(h, pl)
    except Exception as e:
        print(f"some failure with {uuid}: {e}")

nvmlShutdown()
```

### \*\*\* VBIOS Flashing
In order to change the clocks of the card, you have to flash the BIOS (scary).
What's worse is that it requires Windows (terrible).

This gets a little dangerous here; I accept zero liability for your card!

I simply followed [this guide](https://linustechtips.com/topic/1058561-simple-tutorial-ish-for-kepler-and-probably-maxwell-ii-bios-tweaker/) on modifying and flashing the VBIOS of Kepler cards.
I truly do not know if way overtuning the clocks is recoverable, so I went with conservative values.

After a reboot back into a sane operating system, you can verify that your settings actually applied by running `nvidia-smi -q -d CLOCK`.

{{ <file_head type="LOG" name="nvidia-smi -q -d CLOCK"/> }}
```
==============NVSMI LOG==============

Timestamp                                 : Wed Aug 26 15:47:19 2026
Driver Version                            : 470.256.02
CUDA Version                              : 11.4

Attached GPUs                             : 2
GPU 00000000:06:00.0
    Max Clocks
        Graphics                          : 875 MHz
        Memory                            : 3200 MHz

GPU 00000000:07:00.0
    Max Clocks
        Graphics                          : 875 MHz
        Memory                            : 3200 MHz
```
