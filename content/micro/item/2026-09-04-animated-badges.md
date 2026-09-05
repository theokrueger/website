+++
title = "Animated Badges"
description = "Silly automation of a 15-minute task."
+++
In the process of 'beautifying' this site, I was left wanting for an animated badge that represents both this site and the mainsite.

They absolutely deserve to be animated, so I picked the first thing that came to mind: a snake game!
But two frames into animating it, I realized that automating would be a lot better.
So I made a brief Python script to play an untimed game of snake, and render each board state as a numbered PNG. This was then easy to import as layers into GIMP and overlay onto the badge design I initially wanted.

<details>
<summary>View Snake Code</summary>

{% set script1 = load_data(path="/etc/img/gen/snake2png.py") %}
```python
{{ script1 }}
```
</details>

<details>
<summary>View Fireworks Code</summary>

{% set script2 = load_data(path="/etc/img/gen/fireworks2png.py") %}
```python
{{ script2 }}
```
</details>

In retrospect this is the type of thing perfectly suited for vibecoding, but it was too enjoyable a bikeshed to *not* build by hand.
The results speak for themselves:

<span style="display: flex; align-items: center; justify-content: center; gap: 8px;">
<img src="/micro/badges/80x15/micro.gif"/>
<img src="/micro/badges/88x31/microworks.gif"/>
<img src="/micro/badges/80x15/main.gif"/>
</span>
