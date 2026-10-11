+++
title = "Rust Regex Builder"
description = "WASM is pretty cool."
+++
I was looking for an excuse to check out the current state of full-stack Rust on the web,
so I made a simple [regex builder](https://rrx.theokrueger.dev/) to help with the slightly strange `regex` crate syntax.
It allows selecting from a few different versions of the actual `regex` crate for testing,
although I'm not too certain if there are any real differences to be noted between them.

What's cool about it is how simple it was to create: everything but the HTML `<head>` is in plain Rust,
with a ton of heavy lifting done by [Leptos](https://www.leptos.dev/) at compile time.
I was able to seamlessly integrate real Rust crates right into the project with zero hassle,
distributed as a clientside WASM bundle.

Beyond novelty however, there are concerns about the real viability of this library (many of which are directly results of WASM itself being strangely permissive).
Ergonimically, Leptos is fine enough for small-scales or uncomplicated UI, but it really can be held back
by needing to fit within Rust's macro syntax.
That's not to mention the mediocre dev environment it's tooling can provide: obtuse-ish compiler errors and a (necessary) separate formatter on top of `rustfmt`.

I think that `wasm-bindgen` is a much more appealing approach for real applications,
and I really don't see Rust as a good CSR language regardless of library choice.
SSR likewise, although bindings are easier in that domain (so your real app can be Rust-based no problem!).

[https://rrx.theokrueger.dev/](https://rrx.theokrueger.dev/)
