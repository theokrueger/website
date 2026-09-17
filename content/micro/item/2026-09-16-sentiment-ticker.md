+++
title = "Sentiment Ticker"
description = "Questionable utility, but it's cool!"
+++
If you look at the [homepage](@/micro/_index.md), you may notice the new stock ticker feature
on this site: a 'stock' ticker that shows sentiment for the last couple of articles as a line graph.

It uses a nice font called [Datatype](https://fonts.google.com/specimen/Datatype) that has the ability
to render some simple charts like that using special syntax like so:

<p style="font-family:datatype;">
<code>{b:20,25,52,36}</code> becomes {b:20,25,52,36},
<code>{l:20,25,52,36}</code> becomes {l:20,25,52,36},
and <code>{p:32}</code> becomes {p:32}.
</p>

I used a Python script to read my files and extract the sentiment form them using vaderSentiment,
which was chosen solely because it is fast. Determinism and speed are far more important than accuracy in this case.

<details>
<summary>Click to view code</summary>
{% set script = load_data(path="/content/micro/update_sentiment.py") %}
```python
{{ script }}
```
</details>

The cool part is how it is completely pointless! But it brings me joy to look at the shinies, so maybe it has a point?
