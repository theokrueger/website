+++
title = "On Bikeshedding"
description = "Perfection is the worst product you've ever used."
date = 2026-07-14
extra.flavor_id = ""
extra.footer_name = "bikeshedding"
extra.extern.slideshow = true
+++
# * The voices 
We live in a human world, which entails continuous compromise in and adoption of seemingly strange systems built for the common denominator.
The world of computation, being largely designed by and for humans throughout most of its history, follows closely in this pattern of incomprehensible compromise.
As it grew:  VLIW disappeared, everything turned into webapp, and functional languages remained cults.

The worse choice is systematically the default choice in so many aspects of hardware, programming, and general computer use, that to a specific kind of person there is this omnipresent, nagging voice whispering "you can do it better yourself".

And the best part of it? You can. That's why its a dangerous thought.
The tools are available, open, and free to do anything from write an editor to an operating system, entirely by yourself, exactly to your tastes.
But let the rest of this article serve as a warning: you are certain to learn exactly why the other offerings are the way they are.

# * A lesson in triviality
I've redesigned this site five times in five years, switching between various tools and going so far as to write entire tool ecosystems, without writing a single post.
How could I have failed to achieve the sole purpose of a blog-style website (to have blog posts) for this long?
Bikeshedding. Yak-shaving. Let's do an autopsy.

{{ image_carousel(images=[
  ["posts/bikeshedding/img/site-1.png", "2021, written in pure HTML5"],
  ["posts/bikeshedding/img/site-2.png", "2022, compiled by blogc"],
  ["posts/bikeshedding/img/site-3.png", "2023, compiled by blogc"],
  ["posts/bikeshedding/img/site-4.png", "2024, designed using SSGen"],
  ["posts/bikeshedding/img/site-5.png", "2026 (current), built with Zola"]
  ], 
  caption="Revisions of this site 2021-2026",
  width=1280, height=720, op="scale", format="jpg") }}
  
Each site pictured is a significant enough rewrite to be considered an independent revision.
The design language may be relatively consistent, but more was thrown out than kept between each revision.

I wouldn't dare call any of these *good*, but they certainly encompass the author's taste.
The ethos of this strange design direction is underpinned by some key motivations:
1. The site should be accessible for all users.
2. JavaScript should be optional without an asterisk.
3. It should be frictionless to create content for the site.
4. The site should be stupid fast and look good[^subjective].
5. Wildly overcomplicated one-off content should be possible with relative ease.

Reading those requirements, I really just wanted a [motherfuckingwebsite](https://motherfuckingwebsite.com/) -- but stylesheets make the post more than the actual content, and I wouldn't be content without one.

[^subjective]: Very subjectively.

## \*\* 2021: HTML
Where do I even begin with this one? It's truly awful.

Originally meant to hold links to some game mods I was working on at the time, I elected to use pure HTML5 as a simple entrypoint into web design. It was my first (actual) website, after all.
Just looking at it, theres no way that its not accessible, flexible, and fast.

But if I told you that modals were created and loaded/unloaded with CSS on checkbox forms, any illusion of maintainability vanishes, buried another 6 feet under by complete lack of templating.
And as such, this revision was left untouched for months without a single post written.

**Failures: Inaccessible, Unmaintainable, Ugly**

## \*\* 2022-2023: blogc
At this point I'd learned that I actually enjoyed the flexibility of straight HTML5, but some sort of templating engine is probably a must in order to wrangle the poor maintainability of multi-page sites.

Instead of a widely-used and highly-supported site engine like Jekyll or Hugo, I scrolled all the way down on Jamstack until I fould [blogc](https://blogc.rgm.io/).
Aptly described as "a blog compiler", it promised a close connection to straight HTML5 with powerful templating and useful modules.

So a new site was born, looking strikingly similar to the first revision[^poortaste], I quickly fell into despair again working around blogc's strict philosophy.

[^poortaste]: Due to poor taste.

```
TITLE: post title
-------------------------
# heading
paragraph text

another paragraph

[link text](https://theokrueger.dev/)
```
*A sample blogc post*

Blogc envisions a very straightforward sitemap, and a consistent design language.
You get an index, some posts, and an archive of those posts.
Using per-post templates, conditional template formatting, macros, and the like are beyond it's reaches of maintainability.
It's really a Unix-like tool in that sense, which appeals to me in a fundamental way.
But using it felt more like `make` when I need a `cmake`.

Funnily enough, the ergonomics of using `blogc` (the program) are akin to that of `gcc`, and you do end up using `make` to generate your sites.
Documentation lives as a manpage and the source is incredibly hackable.

But the beautiful philosophy of blogc was unable to save it both from my need to let posts and templates define each-others contexts, and my desire to manage my site as a series of blocks and templates and content rather than just one of each.
I moved on after trying to shoehorn my large scope into the small vision of blogc, without a single post written.

**Failures: Inflexible, Ugly**

## \*\* 2024: SSGen
I convinced myself that "I could do it better", and I wrote my own site generator.
It would be easier to use, faster to run, more flexible, and powered by YAML.
So I wrote SSGen, which ended up being a great learning experience and little more.

Yet in some way, it was beautiful.
SSGen pages and blocks are turing complete, and at their best felt incredible in terms of power to circularly define context between templates and their content.
At their worst, you're left fighting HTML shoehorned into a simpler markup language in an environment devoid of debugging and tracing tools.

At some point in complexity however, your design is more of an ASPL[^aspl] over an engine, and has the ergonomics of a cinder block.
It turns out that YAML is a horrible choice for writing websites.

[^aspl]: Application Specific Programming Language. I ended up starting on one of these in 2025, but its a footnote for a reason.

```yaml
- !DEF [TITLE, 'theokrueger.dev']
---
!DEF
  - POST_CONTENT
  - post:
      div:
        - h1: heading
        - p: paragraph text
        - p: another paragraph
        - a:
            - _href: 'https://theokrueger.dev'
            - link text
```
*Sample of a .page file's YAML. Yeah, its bad.*

I didn't think this going into it, as YAML is well-liked for being easy to write and not requiring a ton of escape codes everywhere, yet two[^bonus_ssgen_issue] glaring flaws turn YAML into a nightmare:

1. No duplicate keys in mappings
2. No metadata for keys.

This meant that metadata for a key had to be like any other sub-node, just prefixed with an underscore a la `_class` or `_href`.
Similarly, any time you needed more than one `<p>` in a span you had to nest it in an array.
It was so obtuse to use that it killed any motivation to get the site finished.

[^bonus_ssgen_issue]: A bonus issue was that maps are not ordered per YAML spec, but the `serde_yaml` library just so happened to leave them ordered and it was a non-issue in implementation.

Using my own 'perfect' tool defeated me. And not a single post was written.

**Failures: Unmaintainable, Ugly**

## \*\* 2026: Zola
The lesson was learned. It was time to start fresh one last time before it gets excessive.
Done shaving yaks, I decided that the best place to park my bike is in tooling good enough to do the job.
I browsed through each SSG on Jamstack, making careful note of how it appears to meet my five criteria.

The arduous search landed me on Zola, which while not without flaws is about as good as it is ever going to get for this.
It's fast, its flexible, and offers powerful enough tooling to work around its shortcomings in macros.

```md
+++
title = "theokrueger.dev"
+++
# heading
paragraph text

another paragraph

[link text](https://theokrueger.dev)
```

The maintainability is high

Remarkably, Zola's featureset is basically the same as blogc's, with only two additions that I use:
- Flexible macros in templates, with parameters definable in posts.
- Batteries-included syntax highlighting in codeblocks.

With that hindsight, I could (and should) have just forked blogc to add those missing features and written this post a few years early.
Yet I'm sure that trying and failing to build my own tooling is the sole reason I'm able to settle for something less than perfect.
Which ironically is what makes Zola perfect.

**Success: Just Ugly, Stopped Caring**

# * Perfection is the worst product you've ever used.
Tools are designed the way they are for a reason.
The truth is that there is no perfect intersection of simplicity and power, they are mutually exclusive diagonals on the compass of scalability and flexibility.
No amount of triviality dedicated to finding out *which SSG should I use?* will protect you from this property, and it isn't worth your time unless you enjoy it.

The cycle of using tools -> wishing they were better -> making your own (that's worse) -> reverting back to the original (or similar) tooling is a lesson that only has to be learned once.
Don't let that stop you from trying, I for one will probably never stop random sidequests and excessive planning of ultimately trivial things. 
But sometimes, please listen to the expert in you that intrinsically knows the answer.
Perfection is the worst product you've ever used, not because its good but because it works.

### \*\*\* footnotes
