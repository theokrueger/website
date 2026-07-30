+++
title = "Tesla K80 for Local Inference"
description = "A technical guide."
date = 1970-01-01
extra.flavor_id = ""
extra.show_toc = true
extra.footer_name = "gk210"
extra.extern.slideshow = false
draft = true
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
{% table(heading=true, zebra=true) %}
| Item                          | Est. Cost |
| NVIDIA Tesla K80              | {{ currency(n=60, code="USD") }} |
| 12V DC blower fan             | {{ currency(n=10, code="USD") }} |
| EPS-12V to PCIe power adapter | {{ currency(n="0-10", code="USD") }} |
| Access to a 3D printer        | {{ currency(n=0, code="USD") }} |
| (Optional) PWM Fan Controller | {{ currency(n=10, code="USD") }} |
| Total                         | {{ currency(n="70-90", code="USD") }} |
{% end %}

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

# \* Software

