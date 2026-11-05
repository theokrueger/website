+++
title = "VR is about to get really good"
description = "Through the power of iteration"
date = 1970-01-01

[extra]
flavor_id = ""
footer_name = "vrvel"
tagline = "VR has been rising from the grave under all of our noses."
extern.slideshow = false
+++
# \* State of the Union
VR has famously struggled for a very long time in the consumer market, being largely viewed as a novelty instead of a real platform.
And for good reason! Despite being a huge follower of VR since the Vive and Cardboard days,
I can only name around four things I'd want to do in VR: all of which are videogames.

Think about what *you* can do with a VR headset, today.
- Watch movies
- Have virtual monitors
- Play videogames

With XR devices like the Facebook glasses, that list also has the "spy on people" bullet added.
Four things is not a lot, so those activities *must* be substantial enough to warrant purchasing an expensive headset, right?
Let's examine:

**Movies** suck on VR.
Screen resolution is fine on paper but incredibly noticeable in reality.
You're either sitting there in a virtual environment with a giant screen, or pretending there's a giant screen in the real world right in front of you.
Either way, it's worse than a TV of comparable cost[^vision_movies], and completely loses out on the social aspect of content consumption.
If you really need the portability of a headset, purpose-built 2D devices (a la XReal) just give a far better experience on all marks, at a lower cost to boot.

**Virtual monitors** are virtually useless.
Anyone who thinks they want 9+ screens open at once is either a security guard, losing day-trader, or simply doesn't actually know what they want.
Suffering much the same as movies do in terms of fidelity, you could also just save a few hundred (or thousand!) dollars with better desktop hygiene;
virtual desktop, autotiling, workspaces, stage manager: there are countless paradigms of window management that address the root problem rather than the arguable band-aid of more monitors[^window_manager].
99% of people can get 100% of the functionality of virtual monitors just by pressing `Mod+Tab`, completely avoiding the extreme aliasing required by reprojection.

{{ <images.captioned path="./img/vision-pro.png" alt="vision pro users" caption="Average Vision Pro User" compress={false} disp_width="100%" /> }}

**Videogames** are the only saving grace of VR, and the only fundamentally sound leisure activity in it.
Novel experiences capitalizing on the unique control scheme are where VR is at its best,
instead of weird mixed experiences or compromises on existing (superior) methods of media ingestion.

The issue is that maybe three games exist that are actually fun.
These vary by player; mine would be Half-Life: Alyx, Beat Saber, and H3VR.
Others may say VRChat or Skyrim VR or even vehicle simulators are their system-sellers.
But it's a tough pill to swallow for enthusiasts (much less real people) to dive into spending so much on a setup capable of running the actually good games,
just to play for a few hours and never pick up the headset again.

[^vision_movies]: I say this never having tried a Vision Pro,
but paying {{<currency n={3500} code="USD" />}} to look like a dork sucks more than just buying a really nice TV or improving your workspace hygiene.
Nobody needs to try it to know that truth.

[^window_manager]: A large 4K monitor with quarter-screen tiling is cheaper and easier than four 1080p monitors for displaying all the information you could hope to process,
more ergonomic than having to crane your head to look at your virtual displays,
and more portable in reality than a separate battery-powered limited-compute device.
Play fullscreen games or do screensharing? Get a second monitor, and leave it at two.
There is no reason in the year of our lord 2026 to need more than two monitors for the overwhelming majority of people.


# \* What Changed?
I hold out hope for VR gaming as a mainstream-viable platform.
Not because of new hardware, nor because of a singular game, but simply due to the sheer power of iteration.
Through years of trial and error, they have figured out the unified (enough) VR APIs,
development environments, and game engine integrations to make creating a good VR game easier than it has ever been,
just as code became cheaper than ever.


## \*\* OpenXR
...Is the VR/AR/XR standard.
It does the heaviest lifting with regards to providing users with well-defined APIs to achieve... whatever your VR game needs!

For instance, if your game needs hands, you can use the [XR Hand Tracking Extension](https://registry.khronos.org/OpenXR/specs/1.1/html/xrspec.html#XR_EXT_hand_tracking) (provided by your OXR runtime), fit a rig to the joints, and you're off to the races immediately.

{{ <images.captioned path="./img/hands.png" compress={true} alt="physics-based hand joints positioned via OXR apis" caption="OXR Hands are Easy" /> }}

Or if you need
[floor height](https://registry.khronos.org/OpenXR/specs/1.1/html/xrspec.html#XR_REFERENCE_SPACE_TYPE_LOCAL_FLOOR),
[uniform controller interaction](https://registry.khronos.org/OpenXR/specs/1.1/html/xrspec.html#semantic-paths-interaction-profiles),
[room parameters](https://registry.khronos.org/OpenXR/specs/1.1/html/xrspec.html#XR_FB_scene),
[camera passthrough](https://registry.khronos.org/OpenXR/specs/1.1/html/xrspec.html#XrCompositionLayerPassthroughFB),
[eye tracking](https://registry.khronos.org/OpenXR/specs/1.1/html/xrspec.html#XR_FB_eye_tracking_social),
or nearly anything: OpenXR is your friend.

Every important parameter about the headset and controllers is handled by the runtime and retrievable by your application.
All real platforms support this, easing porting of your app.
Linux, Windows, Android, whatever.

It didn't used to be this way!
OpenXR kinda sucked for a while actually, and only through countless revisions and extensions over
a long period of trial and error and shifting markets, on top of actual runtimes adopting it,
has OXR gotten to where it is today.

I remember the horrors of Linux VR pre-Monado :(


## \*\* Engines
Real game engine support only gets better by the day.
The big names like Unity and Unreal, of course, have had solid support for a long time now,
but the most exciting aspect to me is the advancement in open-source.

Godot has a well-maintained [OpenXR plugin](https://godotvr.github.io/godot-xr-tools/docs/home/) that jump-starts any VR project, which
alongside its excellent community, asset store, documentation, and tutorial libraries makes it a strong contender for small developers.
I used it for a bit, but it quickly became clear why visual programming is not my first choice...

Something more up my alley is [Bevy](https://bevy.org/), a Rust-based ECS renderer.
Code-driven game development is great for someone like me just LARPing as a gamedev,
who wants to port their software knowledge with little friction into the beast that is gamedev.
Its `Query<T>` system is something I would never have architected from first principles myself,
and the fact that it reduces so much of the computation at compile-time by effectively "only paying for what you use" is beautiful.

{{ <images.captioned path="./img/balls.png" compress={true} alt="Dropping a few hundred balls to test box3d physics" caption="Look at that Frametime Graph!" /> }}

Paired with an [OpenXR plugin](https://github.com/awtterpip/bevy_oxr) crate,
Bevy becomes a super straightforward 3D renderer that is far more flexible than I would have thought Rust syntax permits.
Add to that the recently-released [box3d](https://github.com/erincatto/box3d) physics engine,
plus the [seedling](https://crates.io/crates/bevy_seedling) audio plugin,
and you have yourself a full-featured VR game engine you develop in entirely via text files.

Not to mention the speed: those rendering, physics, and audio engines are all SOTA and extremely quick on modern hardware.
Sure, I've only played in simple scenes so far, but I'm wholly impressed by the strong performance characteristics.
Even the dev builds (using a codegen backend that *really* hurts runtime performance) are playable :)


## \*\* Rapid Prototyping
Games tend to follow the pattern of relatively compartmentalized systems interacting across an engine-defined boundary.
Systems are messy and usually poorly maintained, many of which need access to global state to correctly interact with every other system.

Think locomotion: if the player wants to move around there are usually dozens of
interactions with other complex engine systems.
You have audio (footstep sounds),
physics (held objects, bumped objects, scene boundaries/walls/floors),
input (movement vector),
and your game-specific systems like items, objectives, scoring, networking, level logic, bots, mod hooks, you get the point.
Many of those systems themselves need direct access to other systems within the engine,
and you end up designing an extremely strong web of concurrent systems responding to events and ticks.

Imagine you want to experiment with some new system, like a Left 4 Dead-style director that dynamically spawns enemies and resources according to how you play the game (as both adversary and ally).
This is risky, since it becomes a massive time investment to gut your previous static approach,
scrape information from every other game system to gauge what the player's gameplay state is,
and balance it well enough to understand if it is worth pursuing further.
This is hell! But it's almost a given in gamedev.

Want to know what emerging technology is extremely talented at semi-autonomously interacting with extremely complicated systems,
eager to carelessly add its own interconnected nodes into that web at your command?
AI slop!!!!! Yay!!!!

But for real though.
These stupid machines are going to take my career right out of my hands,
but holy hell can they implement the annoying garbage that I don't want to.
Prototype code quality doesn't matter one bit as you are always one `git checkout` away from starting your own clean implementation,
which you inevitably implement *better* after the prototype teaches you what functionality sticks.

This allows riskier approaches to be tested without costing months of time,
directly resulting in more games that are more interesting.


# \* Elephant in the Room
Ergonomic development experiences are absolutely crucial to getting VR to where it needs to be.
But I have been consistently ignoring the cost of entry aspect as an inconvenient truth.

The Steam Frame just came out for a painful {{<currency n={1059} code="USD" />}},
comfortably placing Facebook as the affordable hardware platform. Even if the Quest 3 is still an overpriced {{<currency n={599} code="USD" />}}.
Not to mention the Windows Mixed Reality project which was gutted so long ago, people didn't even realise it was completely removed from Windows 11,
making an entire class of PCVR headsets obsolete.

There is only one catch: that a lack of cheap, good hardware prevents fostering a large install-base.
People are smart with their money, choosing not to buy expensive hardware.
Devs are smart with their time, choosing not to develop for a nonexistent install-base.
Manufacturers are smart with their margins, choosing not to develop hardware for nonexistent software.

But devs are changing. Software is coming.
Manufacturers will make hardware targeting that software and players will buy that hardware.
This is unlike the times in the past where businesses forcibly tried to remove an edge in this interdependent triangle.
Facebook pushed their Quest line to force adoption, while buying studios to force software.
In that order, leaving software an IOU.
Apple shipped a {{<currency n={3500} code="USD" />}} headset with absolutely nothing,
completely ignoring games in favour of what amounts to a worse iPad with creepy anti-social social features.

Developers can now build at a cost so low they do it out of passion, just to see what happens.
Project initialization happens in hours instead of days,
prototypes are buildable and explorable in days instead of months,
and actually finished games come out in months instead of years.
Advancements in technologies have fundamentally weakened the material the triangle is constructed from.
In the grand scheme of how long VR has struggled, swaths of strong titles are going to come out very soon.
Then the hardware will follow. Then the players. Bet on it :)

----

### \*\*\* footnotes
