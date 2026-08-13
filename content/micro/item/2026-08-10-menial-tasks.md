+++
title = "Menial Tasks"
description = "The little things on this site are barely rewarding."
+++
Been working on this site pretty thoroughly recently,
and the little things can be incredibly annoying!!!!!!

Take the badge section: the logic is fine but the CSS rules were really annoying to troubleshoot,
especially getting it working with `<noscript>` tags.
It turns out that `<noscript>` can get converted to `<span>` in common JS-blocking extensions.
Had to make some annoying modifications for the CSS to apply in those cases!

And don't get me started on getting the site to look good on mobile! I didn't even try.
Flex boxes are great for avoiding clipping, but terrible for particular alignments.
Lord knows how long I tinkered with CSS rules to keep things simple.
