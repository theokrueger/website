+++
title = "On Bikeshedding"
description = "Perfection is the worst product you've ever used."
date = 2026-07-12
extra.subsubtitle = '<i>a post about posting</i>'
extra.flavor_id = ""
extra.footer_name = "bikeshedding"
extra.extern.slideshow = true
+++
# * The voices 
We live in a human world, which entails continuous compromise in and adoption of seemingly strange systems built for the common denominator.
The world of computation, being largely designed by and for humans throughout most of its history, follows closely in this pattern of incomprehensible compromise.
As it grew:  VLIW disappeared, everything turned into webapp, and functional languages remained cults.

The worse choice is systematically the default choice in so many aspects of hardware, programming, and general computer use, that to a specific kind of person there is this loud, omnipresent, nagging voice telling you that "you can do it better yourself".
And the best part of it? You can. That's why its a dangerous thought.
The tools are available, open, and free to do anything from write an editor to an operating system, entirely by yourself (and potentially better than any other offering).
But let the rest of this article serve as a warning, especially when designing tools: you are sure to learn exactly why the other offerings are the way they are.

# * Where can I park my bike?
I've designed this site from scratch five times in five years, without writing a single post.
Let's do an autopsy.

{{ image_carousel(images=[
  ["posts/bikeshedding/img/site-1.png", "2021, written in pure HTML5"],
  ["posts/bikeshedding/img/site-2.png", "2022, compiled by blogc"],
  ["posts/bikeshedding/img/site-3.png", "2023, compiled by blogc"],
  ["posts/bikeshedding/img/site-4.png", "2024, designed using SSGen"],
  ["posts/bikeshedding/img/site-5.png", "2026 (current), built with Zola"]
  ], 
  caption="Revisions of this site 2021-2026",
  width=1280, height=720, op="scale", format="jpg") }}

I wouldn't dare call any of these *good*, but they certainly encompass the author's taste.
The ethos of this strange design direction is underpinned by some key motivations:
1. The site should be accessible for all users.
2. JavaScript should be optional without an asterisk.
3. It should be frictionless to create content for this site.
4. Wildly overcomplicated one-off content should be possible with relative ease.
5. The site should be stupid fast and look good.

Reading those requirements, I really just wanted a [motherfuckingwebsite](https://motherfuckingwebsite.com/) -- but stylesheets make the content more than the actual content, and I wouldn't be content without one.

## ** 2021: HTML
Where do I even begin with this one? It's truly awful.

Originally meant to hold links to some game mods I was working on at the time, I elected to use pure HTML5 as a simple entrypoint into web design. It was my first (actual) website, after all.
Just looking at it, theres no way that its not accessible, flexible, and fast.

But if I told you that modals were created and loaded/unloaded with CSS on checkbox forms, any illusion of maintainability vanishes. And as such, this revision was left untouched for months without a single post written.

**Failures: Inaccessible, Unmaintainable, Ugly**

## ** 2022-2023: blogc
At this point I'd learned that I actually enjoyed the flexibility of straight HTML5, but some sort of templating engine is probably a must in order to wrangle the poor maintainability of multi-page sites.

Instead of a widely-used and highly-supported site engine like Jekyll or Hugo, I scrolled all the way down on Jamstack until I fould [blogc](https://blogc.rgm.io/). Aptly described as "a blog compiler", it promised a close connection to straight HTML5 with powerful templating and useful modules.

So a new site was born, looking strikingly similar despite being made from scratch, I again fell into despair at mountains of trouble working around blogc's strict philosophy. And I did the CSS thing again where dropdowns in the navbar as CSS animations (and thus poorly accessible).


```
TITLE: post title
-------------------------
# heading
paragraph text

[link](https://theokrueger.dev/)
```
*A sample blogc post*

Funnily enough, the ergonomics of using blogc (the program) are akin to that of `gcc`, and you end up using `make` to generate your sites. Documentation lives as a manpage and the source is incredibly hackable.

**Failures: Inflexible, Ugly**

## * 2024: SSGen
So I convinced myself that "I could do it better", and I wrote my own site generator.
It would be easier to use, faster to run, more flexible, and powered by YAML.
So I wrote SSGen, which ended up being a great learning experience and little more.

It turns out that YAML is a horrible choice for writing websites.

```yaml
- !DEF [DATE_CREATED, '2024-10-06']
- !DEF [DATE_MODIFIED, '']
---
!DEF
  - POST_CONTENT
  - post:
      - div:
          - _class: some-style
          - h1: Heading
          - p: |
              Text goes here
```
*Sample of a .page file's YAML*

I didn't think this going into it, as YAML is well-liked for being easy to write and not requiring a ton of escape codes everywhere, yet two glaring flaws turn YAML into a nightmare:

1. No duplicate keys in mappings
2. No metadata for keys.

This meant that metadata for a key had to be like any other sub-node, just prefixed with an underscore a la `_class` or `_href`, and any time you needed more than one `<p>` in a span you had to nest it in an array. This killed ergonomics so hard that I didn't even want to do the (relatively) easy port to any other markup language.

*A bonus issue was that maps are not ordered per YAML spec, but the `serde_yaml` library just so happened to leave them ordered and it was a non-issue in implementation.*

Generation was at least ridiculously quick. Thank Rust's easy multithreading and great parsing libraries.

**Failures: Unmaintainable, Ugly**

## * 2026

**Success: Just Ugly**
# * Journey into the Sun.

# * Perfection is the worst product you've ever used.

# * It was still worth the price of admission

arsarss
