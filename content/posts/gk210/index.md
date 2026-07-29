+++
title = "Private AI for 70$USD"
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
If even offered in the first place, ZDR endpoints suffer the same fate as API-only usage in that they are unaffordable compared to say, a subscription to the less private *ClaudeGPT Pro Plus Ultra Unlimited Turbo 64 (Rainbow Edition)++*.

And with my measly 12GiB 6700XT[^sorry], the local landscape is bleak. Nine-billion parameters is enough for some tasks, but context is the real killer. Pruned MCP still eats tokens like no other, and SotA harnesses like to pretend that a million context tokens is reasonable. I wan

[^sorry]: It's rather powerful actually, and remains a great value in today's high demand for new hardware. I don't even use 4GB of VRAM in any games I play, though AI slop is a different beast where VRAM is king.

So without a second thought, an eBay search for "24GB VRAM GPU" sorted by price landed what was going to either be a killer deal or a killer mistake: the NVIDIA Tesla K80.

{{ image(path="/img/placeholder.png", caption="My Tesla K80 with 24GiB of VRAM", alt="An NVIDIA Tesla K80 Graphics Card. It is rectangular, with a metal bracket at one end for securing to a computer case and a power connector at the other end. The circuit board is entirely covered with a large black heatsink, which in turn is covered by a black, green, and translucent shroud to direct airflow. There is a noticeable lack of video out ports and fans on the card.") }}

As sleek as it is, this 2014 Kepler card is deemed obsolete with a price to match.
Sellers are practically begging to rid themselves of these once >2500$USD cards.
Can a now 60$USD card make sense for any workload?
What could be so unuseful about these cards that 97% of their value slipped away?

# \* Servers Need Not Apply
Being a server-first card, its understated design hides an inconvenient reality: Tesla cards have no video out, no fans, and most importantly no fan controllers.
Cooling is supposed to come from airflow in the server chassis, blower style, and always at max RPM.

What's more is the strangely keyed power connector. Rather than taking the VGA connectors of any old ATX PSU, it accepts only six-pin CPU power cables.

# \* 470.256.02-r2 Woes
See the [companion piece](@/posts/gk210/setup.md) if you wish for a more technical angle on setup and usage of legacy NVIDIA cards.

# \* Splitting the Bill
setup here

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
