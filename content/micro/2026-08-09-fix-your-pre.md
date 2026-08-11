+++
title = "Please, fix your website's <pre>!"
description = "Most of us use phones."
+++
If you have a personal blog with any preformatted text blocks (i.e. code), please make their overflow scrollable!

I've been reading YC religiously lately, and you'd think the programmers would know how to do it.
They don't.

Here's a snippet for you to throw on your site:

```css
pre {
  overflow-x: auto;
}

pre > code {
  overflow-x: auto;
}
```

While you're at it, just test your site on mobile at all.
Its surprising how easy responsive design is these days.
