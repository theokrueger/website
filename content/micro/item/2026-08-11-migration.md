+++
title = "Great Migration"
description = "Breaking changes in my minor semver???"
+++
Zola `0.23` is out, so I had to migrate my site to it.
They have breaking changes versus `0.22`, why is it not version 1.something?
Oh, well its not at `1.0` so its clearly prebeta alpha whatever garbage and
they aren't just allowed to make breaking changes, they NEED to because its 1) fun and 2) easy.

At least I saw this coming, but man is it annoying. They didn't even have the v1 docs available for the
templating engine (Tera) for most of this site's life!

Things I did
- Combined shortcodes and macros into a single system less intuitive and flexible than before
- Questioned why the `concat` filter was removed yet still listed on their docs site
- Used comments as whitespace to prevent CommonMark from inappropriately touching my components
- Bashed my head against a wall
- Removed references to the global state in my components. Because fuck you, who needs a global state easily accessible from shared resources? Oh, its you... Too bad! We don't support that. :(
