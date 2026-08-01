+++
title = "Private AI for U$70"
description = "24GiB of VRAM. Unreasonably cheap."
date = 1970-01-01
extra.flavor_id = ""
extra.footer_name = "gk210"
extra.extern.slideshow = true
draft = true
+++

# \* An Impulsive Purchase
It's no wonder that AI labs are
[frothing](https://ads.openai.com/)
[at](https://blog.google/products/ads-commerce/google-marketing-live-search-ads/)
[the](https://x.com/XBusiness/status/1893047658958463094)
[mouth](https://www.anthropic.com/legal/privacy)[^anthropic is evil]
over advertising.
After all, users are willingly providing some of the juiciest data imaginable directly into tools perfectly suited for spitting out the most actionable and relevant advertisements possible.
And in the increasingly competitive and unprofitable field of training frontier models, only marketshare can hope to be prioritized over maximum value extraction.

[^anthropic is evil]: Anthropic's PR charades are tiring. API aside, of course they sell your data to third parties. Of course they use your chats as training data. They just haven't put third-party ads in their first-party product (yet).

As a privacy-forward individual, I find it all a hard pill to swallow.
Paying extra for API-only, unretained\* tokens is mostly a game of trust (a la ["log-free" VPNs](https://www.theregister.com/security/2017/10/08/vpn-logs-helped-unmask-alleged-net-stalker-say-feds/1116897)).
If even offered in the first place, ZDR endpoints suffer from being API-only in that they are unaffordable compared to say, a subscription to the less private *ClaudeGPT Pro Plus Ultra Unlimited Turbo 64 (Rainbow Edition)++*.

And with my measly 12GiB 6700XT[^sorry], the local landscape is bleak.
Nine-billion parameters is enough for some tasks, but context is the real killer.
Pruned MCP still eats tokens like no other, compaction still sucks, and SotA harnesses like to pretend that a million context tokens is reasonable.

[^sorry]: It's rather powerful actually, and remains a great value in today's high demand for new hardware. I don't even use 4GB of VRAM in any games I play, though AI slop is a different beast where VRAM is king.

So without a second thought, an eBay search for "24GB VRAM GPU" sorted by price landed what was going to either be a killer deal or a killer mistake: the NVIDIA Tesla K80.

{{ image(path="/img/placeholder.png", caption="My Tesla K80 with 24GiB of VRAM", alt="An NVIDIA Tesla K80 Graphics Card. It is rectangular, with a metal bracket at one end for securing to a computer case and a power connector at the other end. The circuit board is entirely covered with a large black heatsink, which in turn is covered by a black, green, and translucent shroud to direct airflow. There is a noticeable lack of video out ports and fans on the card.") }}

As sleek as it is, this 2014 Kepler card is deemed obsolete with a price to match.
Sellers are practically begging to rid themselves of these once >{{ currency(n=2500, code="USD") }} cards.
Can a now {{ currency(n=60, code="USD") }} card make sense for any workload?
What could possibly be so unuseful about these cards that 97% of their value slipped away?

# \* Servers Need Not Apply
Being a server-first card, its understated design hides an inconvenient reality: Tesla cards have no video out, no fans, and most importantly no fan controllers.
Cooling is supposed to come from airflow in the server chassis, blower style, and always at max RPM.

What's more is the strangely keyed power connector. Rather than taking the VGA connectors of any old ATX PSU, it accepts only six-pin CPU power cables. Some retrofitting is required in order to install in a standard PC:

{{ image_carousel(images=[
  ["img/placeholder.png", "An 8-pin CPU power cable to 2x 8-pin VGA power cable adapter", "TODO: alt text"],
  ["img/placeholder.png", "My 12V PWM blower fan", "TODO: alt text"],
  ["img/placeholder.png", "A temperature-sensing PWM fan controller", "TODO: alt text"],
  ]) }}

Many K80 cards will come with that power cable included, but my folly was to purchase a listing lacking that luxury.
A smarter man could cop one such listing alongside a cheap {{ currency(n=10, code="USD") }} 12V DC-only blower fan, and call it a day for an easy sum of {{ currency(n=70, code="USD") }} (post-tax).
I added a {{ currency(n=10, code="USD") }} PWM temperature controller and upgraded my fan choice accordingly, since I happen to prefer a lower noise profile.

Installation ended up being pretty straightforward too: I oneshotted a 3D-printable bracket design[^bracket] to affix the fan/controller combo, printed it in PETG for some heat tolerance, and slapped it all together.

[^bracket]: Available [here](TODO)! TODO TODO TODO

{{ image_carousel(images=[
  ["img/placeholder.png", "Installing the temperature probe in the card", "TODO: alt text"],
  ["img/placeholder.png", "3D-printable bracket design", "TODO: alt text"],
  ["img/placeholder.png", "Tapped Power Connector", "TODO: alt text"],
  ]) }}

I tapped into power and ground for the PWM fan controller from the power cable adapter as a clean hack to keep everything together nicely, giving me a likely reliable assurance the fan won't give up.

One note on the PWM fan control is that the probe is not only wildly inaccurate in general, but also cannot possibly be placed to effectively measure any temperatures. This means that it could read {{ temperature(n=60, unit="C") }} while the card is boiling itself alive in its hotspot, which is a recipe for disaster.

Setting extremely aggressive fan curves is about all that can be done (within reason) about this, as well as affixing the probe over the hottest section of the heatsink.
This hurt the noise profile significantly, but while idle was still able to remain relatively quiet.

{{ image(path="/img/placeholder.png", caption="Final card assembly", alt="") }}

## \*\* 470.256.02-r2 Woes
Probably the biggest reason these cards are so cheap became immediately apparent to me upon installation: legacy/unsupported hardware is a total pain in the ass!
The proprietary NVIDIA driver dropped support for these cards in version `471.*`, the open-source driver was never released targeting Kepler, and the CUDA capabilities are far behind what you'd think.
Not to mention, security goes out the window around Dec. 2027 when Linux kernel 6.6 hits EOL, which the latest kernel I could get working with the archaic NVIDIA drivers.

I was saved (as is often the case) by running a mostly AMD system; downgrading NVIDIA drivers is barely an issue when I'm not running them in the first place.
Split driver versions are not really possible, so if you were thinking about getting a K80 and throwing it in a system with an RTX card, think again.

Running *not* directly on the host-machine (in a VFIO/OVMF VM) wouldn't be too hard or introduce too much overhead, all while working around these issues.
Too bad I'm lazy :D

See the [companion piece](@/posts/gk210/setup.md) if you wish for a more technical overview of everything required to get this card working.

# \* Splitting the Bill
From a time where 6GiB of VRAM seemed excessive, you might wonder how the GK210 addressed 24GiB of memory; the trick is that it doesn't!
The Tesla K80 is two GK210 dies in a trenchcoat.
12GiB each, with no special interconnects like SLI.

This complicates workflows significantly, as anything we need performant will have to be compatible with multi-GPU setups, all while a sizable portion of memory must be allocated to duplicated, shared resources.

Luckily, [llama.cpp](https://github.com/ggml-org/llama.cpp) has comprehensive support for splitting the workload across multiple cards.

## \*\* Scaling up?

# \* Performing... Fine?
results here

# \* PRIME TIME!
Here's a fun bonus: gaming on a Tesla is easy!
On paper, you basically have two GK110 equivalents (that's the die in the GTX 780), with the sad asterisk of no intra-die communication between the two (unlike a Titan Z that has SLI).

Linux makes it easy to offload rendering onto one GPU and pipe it to a display/surface on another card.
This mechanism is identical to hybrid-graphics in laptops or Thunderbolt eGPUs.

# \* You Should(n't) Buy One
conclusion here

----
### \*\*\* footnotes
