+++
title = "Private AI for U$70"
description = "Wasting Electricity on Electronic Waste"
date = 2026-08-26

[extra]
flavor_id = ""
footer_name = "gk210"
extern.slideshow = true
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

[^anthropic is evil]: Anthropic's PR charades are tiring. API aside, of course they profit off of your personal information. Of course they use your chats as training data. They just haven't put third-party ads in their first-party product (yet).

As a privacy-forward individual, I find it all a hard pill to swallow.
Paying extra for API-only, unretained\* tokens is mostly a game of trust (a la ["log-free" VPNs](https://www.theregister.com/security/2017/10/08/vpn-logs-helped-unmask-alleged-net-stalker-say-feds/1116897)).
If even offered in the first place, ZDR endpoints suffer from being API-only in that they are unaffordable compared to say, a subscription to the less private *ClaudeGPT Pro Plus Ultra Unlimited Turbo 64 (Rainbow Edition)++*.

And with my measly 12GiB 6700XT[^sorry], the local landscape is bleak.
Nine-billion parameters is enough for some tasks, but context is the real killer; especially considering just how much work the harness needs to do for smaller models with less intrinsic "knowledge".
Pruned MCP still eats tokens like no other, compaction still sucks, and SotA harnesses like to pretend that a million context tokens is reasonable.

[^sorry]: It's rather powerful actually, and remains a great value in today's high demand for new hardware. I don't even use 4GB of VRAM in any games I play, though AI slop is a different beast where VRAM is king.

So without a second thought, an eBay search for "24GB VRAM GPU" sorted by price landed what was going to either be a killer deal or a killer mistake: the NVIDIA Tesla K80.

{{ <images.captioned path="/posts/gk210/img/card.jpeg" caption="My Tesla K80 with 24GiB of VRAM" alt="An NVIDIA Tesla K80 Graphics Card. It is rectangular, with a metal bracket at one end for securing to a computer case and a power connector at the other end. The circuit board is entirely covered with a large black heatsink, which in turn is covered by a black, green, and translucent shroud to direct airflow. There is a noticeable lack of video out ports and fans on the card." compress={false} /> }}

As sleek as it is, this 2014 Kepler card is deemed obsolete with a price to match.
Sellers are practically begging to rid themselves of these once >{{ <currency n={2500} code="USD" /> }} cards.
Can a now {{ <currency n={60} code="USD" /> }} card make sense for any workload?
What could possibly be so unuseful about these cards that 97% of their value slipped away?

# \* Servers Need Not Apply
Being a server-first card, its understated design hides an inconvenient reality: Tesla cards have no video out, no fans, and most importantly no fan controllers.
Cooling is supposed to come from airflow in the server chassis, blower style, and always at max RPM.

What's more is the strangely keyed power connector. Rather than taking the VGA connectors of any old ATX PSU, it accepts only six-pin CPU power cables. Some retrofitting is required in order to install in a standard PC.

{{ <images.slideshow images={[
  ["/posts/gk210/img/controller.jpeg", "Temperature-sensing PWM fan controller", "A temperature-sensing PWM Fan Speed controller on a purple PCB with a 3-digit 7-segment display."],
  ["/posts/gk210/img/fan.jpeg", "12V PWM blower fan", "A large 12V PWM blower fan with a 4-pin cable."],
  ["/posts/gk210/img/cable.jpeg", "8-pin CPU power cable to<br/>2x 8-pin VGA power cable adapter", "A special CPU Power cable to 2x VGA power cable. The polarities are reversed between the two."],
  ]} compress={false} /> }}

Many K80 cards will come with that power cable included, but my folly was to purchase a listing lacking that luxury.
A smarter man could cop one such listing alongside a cheap {{ <currency n={10} code="USD" /> }} 12V DC-only blower fan, and call it a day for an easy sum of {{ <currency n={70} code="USD" /> }} (post-tax).
	I added a {{ <currency n={10} code="USD" /> }} PWM temperature controller and upgraded my fan choice accordingly, since I happen to prefer a lower noise profile.

Installation ended up being pretty straightforward too: I oneshotted a 3D-printable bracket design[^bracket] to affix the fan/controller combo, printed it in PETG for some heat tolerance, and slapped it all together with some fresh thermal paste.

[^bracket]: Available [here](https://www.printables.com/model/1816354-nvidia-tesla-k80-fan-bracket). Don't use it though, its not very good.

{{ <images.slideshow images={[
  ["/posts/gk210/img/bare-card.jpeg", "Not pictured: the perfect amount of thermal paste", "A Tesla K80 with its heatsinks and shrouds removed. The two bare dies are visibly clean from thermal paste."],
  ["/posts/gk210/img/bracket.jpeg", "3D-printed fan bracket design", "A blower-style fan bracket mount for the Tesla K80, 3D printed in Pink PETG."],
  ["/posts/gk210/img/power.jpeg", "Tapped Power Connector", "An image showing the +12V and GND wires of the PWM fan controller affixed to unpopulated power pins on the K80"],
  ["/posts/gk210/img/assembled.jpeg", "Final card assembly", "An image depicting the fully assembled card with fan and bracket and controller."],
  ]} compress={false} /> }}

I tapped into power and ground for the PWM fan controller from the card itself as a clean hack to keep everything together nicely, giving me a reliable assurance the fan won't lose power.

One note on the PWM fan control is that the probe is not only wildly inaccurate in general, but also cannot possibly be placed to effectively measure any temperatures. This means that it could read {{ <temperature n={60} unit="C" /> }} while the card is boiling itself alive in its hotspot, which is a recipe for disaster.

Setting extremely aggressive fan curves is about all that can be done (within reason) about this, as well as affixing the probe over the hottest section of the heatsink.
This hurt the noise profile significantly, but while idle was still able to remain relatively quiet.

{{ <images.captioned path="/posts/gk210/img/installed.jpeg" caption="Oversized Card Installation" alt="An image depicting the comically long GPU fan sticking out of a modified Fracal Terra case." compress={false} /> }}

It didn't fit in my case, but that's nothing unfixable with a pair of flush cutters.
If you're doing this at home, use a test bench or extension cable.

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
From a time where 6GiB of VRAM seemed excessive, you might wonder how the GK210 addressed 24GiB of memory; it doesn't!
The Tesla K80 is two GK210 dies in a trenchcoat.
12GiB each, with no special interconnects like SLI.

This complicates workflows significantly, as anything we need performant will have to be compatible with multi-GPU setups, all while a sizable portion of memory must be allocated to duplicated, shared resources.

Luckily, [llama.cpp](https://github.com/ggml-org/llama.cpp) has comprehensive support for splitting the workload across multiple cards.

All my settings can be found [here](@/posts/gk210/setup.md#llama-cpp-args), but the highlights are as follows:

{% <table heading={true} zebra={true}> %}
| Setting             | Rationale                                  |
| --parallel 1        | Single-user & single-session               |
| --split-mode tensor | Better model & KV splitting method         |
| --split-mode layer  | For models that don't support tensor split |
| --flash-attn on     | Marginal speedup                           |
{% </table> %}

With these settings, I was able to load the following models entirely in VRAM with no offloading onto host:

{% <table heading={true} zebra={true}> %}
| Model        | Split Mode | Context Size | TPS (Preprocess) | TPS (Generation) | VRAM Use |
| Qwen3.5-0.8B | tensor     | 256K         | ~1200            | ~50              | 22%      |
| Gemma3-4B    | tensor     | 128K         | ~400             | ~26              | 33%      |
| Gemma4-12B   | layer      | 256K         | ~130             | ~6               | 65%      |
| GPT-oss-20B  | tensor     | 128K         | ~130             | ~27              | 81%      |
| Quen3.8-27B  | layer      | 55K          | ~35              | ~3.3             | 88%      |
{% </table> %}

This is quite bad! If anything, its impressive that I expected anything less from this card.

# \* Scraping the Barrel
The stats don't lie, but my heart yearns to play a little more with these cards.
We aren't quite done yet, and can squeeze more out of the K80 still.

Lets overclock!

Its a little dry, so the steps are separate over [here](@/posts/gk210/setup.md#overclocking). TL;DR
- ECC -> Off
- Power limit -> 175W
- Memory clock -> 3200MHz
- Base+boost GPU clock -> +13MHz

... and the results are marginally better!

{% <table heading={true} zebra={true}> %}
| Model        | TPS (Preprocess) | TPS (Generation) |
| Qwen3.5-0.8B | ~1300            | ~54              |
| Gemma3-4B    | ~430             | ~28              |
| Gemma4-12B   | ~140             | ~6.5             |
| GPT-oss-20B  | ~140             | ~30              |
| Quen3.8-27B  | ~38              | ~3.6             |
{% </table> %}

Still, in the grand scheme of things, absolutely abysmal.

# \* PRIME TIME!
Here's a fun bonus: gaming on a Tesla is easy!
On paper, you basically have two GK110 equivalents (that's the die in the GTX 780), with the sad asterisk of no intra-die communication between the two (unlike a Titan Z that has SLI).

Linux makes it easy to offload rendering onto one GPU and pipe it to a display/surface on another card.
This mechanism is identical to hybrid-graphics in laptops or Thunderbolt eGPUs, with some modification to actually select the K80.

{{ <file_head type="BASH" name="k80-run.sh" /> }}
```bash
#!/usr/bin/env bash
PCIE_ID="$(lspci -nn | grep 'Tesla K80' | head -n 1 | awk '{print substr($10,2,9)}')"
exec env \
  __NV_PRIME_RENDER_OFFLOAD=1 \
  __GLX_VENDOR_LIBRARY_NAME=nvidia \
  __VK_LAYER_NV_optimus=NVIDIA_only \
  MESA_VK_DEVICE_SELECT=$PCIE_ID \
  PROTON_USE_WINED3D=1 \
  SDL_VULKAN=0 \
  "$@"
```

Test it out with `k80-run.sh glxgears -info | grep GL_RENDERER`, and you'll see it running on your K80!
Steam integration is then as easy as settings your launch options to `k80-run.sh %command%`,
so long as the game uses OpenGL or Vulkan<=1.2.

Disabling Vulkan hurts performance, but I'm far too lazy to bother downgrading DXVK to `1.x`.

Most games were run at 1024x768, and all on low.
Because that's how I play everything.

{% <table heading={true} zebra={true}> %}
| Game            | FPS       |
| Payday 2        | 133       |
| DJMAX RESPECT V | 180       |
| Team Fortress 2 | 110       |
| Sun Haven       | 240 (cap) |
{% </table> %}

Testing was limited because it wasn't that interesting in reality.
If a GTX 780 can run it, so can the K80.
Although, for whatever reason, many Linux native games didn't work. I was too lazy to investigate why.

# \* You Shouldn't Buy One
TL;DR -- The juice isn't worth the squeeze, and these cards are e-waste for a reason.

Let's do some quick math to prove it: as of writing it's not unreasonable to expect to pay about {{ <currency n={2} code="USD" /> }} a ZDR, medium-sized model.
Medium-sized, as in "completely dwarfs anything you can run locally".
Let's see how much it costs us to run a local, decent performing (relative terms) model, using values overly generous to the K80:

{% <table heading={false} zebra={true}> %}
| Model        | Gemma4-12B                             |
| Avg. Wattage | 200W                                   |
| Cost/kWh     | {{ <currency n={0.25} code="USD" /> }} |
| Cost/Hr      | {{ <currency n={0.05} code="USD" /> }} |
| Tok/Hr       | 25000                                  |
| Hr/Mtok      | 40                                     |
| Cost/Mtok    | {{ <currency n={2} code="USD" /> }}  |
{% </table> %}

(For reference, current ZDR API costs for Gemma4-31B are <{{ <currency n={0.45} code="USD" /> }}).

If, like me and don't trust ZDR, then this is probably the cheapest way to ensure your data stays truly private.
Yet it's hard to imagine any workload that would benefit from this slow generation. You may still be better off *not* spending a dime and running light models on or your existing GPU.

To put it bluntly: it's literally multiple times faster to run these models on my CPU at the same wattage.
A reasonably modern gaming GPU (i.e. 6700xt) can blow this out of the water, including running *larger* models with less VRAM with MoE streaming, solely because of memory bandwidth.

Don't buy a Tesla K80.
Though if you do, you might as well buy eight just for fun.

----
### \*\*\* footnotes
