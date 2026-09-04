+++
title = "Animated Badges"
description = "Silly automation of a 15-minute task."
+++
In the process of 'beautifying' this site, I was left wanting for an animated badge that represents both this site and the mainsite.

They absolutely deserve to be animated, so I picked the first thing that came to mind: a snake game!
But two frames into animating it, I realized that automating would be a lot better.
So I made a brief Python script to play an untimed game of snake, and render each board state as a numbered PNG. This was then easy to import as layers into GIMP and overlay onto the badge design I initially wanted.

<details>
<summary>View Code</summary>

{% set script = load_data(path="/etc/snake2png.py") %}
```python
{{ script }}
```
</details>

In retrospect this is the type of thing perfectly suited for vibecoding, but it was too enjoyable a bikeshed to *not* build by hand.
The results speak for themselves:

<center>

![micro badge](/micro/badges/80x15/micro.gif)
![mainsite badge](/micro/badges/80x15/main.gif)

</center>
