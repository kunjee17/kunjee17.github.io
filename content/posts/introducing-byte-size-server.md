---
title: "Introducing Byte Size Server"
date: 2024-12-31
categories: 
    - Technical
tags:
    - OSS
    - Rust
    - Wasm
    - Architecture

---

# Intro to Byte Size Architecture

You can learn about byte size architecture from the [Byte Size Sessions](https://bytesizearchitecturesessions.com/). 

### TLDR

Byte Size Architecture is a pattern that starts from a small concept and grows organically. It focuses on people, encouraging them to stay concise and focused. This approach contrasts with designing large, complex systems that are difficult to maintain and transfer to other team members, especially during team transitions.

It's a knowledge sharing system developed by [Andrea Magnorsky](https://twitter.com/silverspoon).

## Thinking 

This knowledge sharing approach got me thinking: Why can't we apply this to web development? Web development involves numerous components. Developers need to understand many elements to build a web application: choosing frameworks, databases, authentication, authorization, caching, queuing, monitoring, logging, and more. Then comes the architecture decision - whether to use Event Driven or traditional monolithic architecture, CQRS or traditional CRUD. 

We also have numerous programming languages to choose from: C#, F#, VB.NET, Python, JavaScript, TypeScript, and more.

If that's not enough, we need to understand hosting and cloud providers. While we have choices, each comes with its own set of challenges.

# Edge Computing

I've been following technology trends, and I encountered edge computing a while back. Initially, it didn't excite me much. However, when I started working with [Rust](https://www.rust-lang.org/) and [WebAssembly](https://webassembly.org/), I discovered a new perspective. When most people think of WebAssembly, they think of WASM in browsers. But there's also [WASI](https://wasi.dev/) and WASM on servers.

# Let's Look at the Other Side

Several platforms offer WASM/WASI hosting on edge servers:
- [Wasmer Edge](https://wasmer.io/products/edge)
- [Fermyon](https://www.fermyon.com/)
- [Cloudflare Workers](https://workers.cloudflare.com/) (not purely WASM)
- [Golem Cloud](https://www.golem.cloud/)

Edge computing isn't limited to WASM/WASI. Platforms like [Netlify](https://www.netlify.com/), [Vercel](https://vercel.com/), and [Cloudflare](https://www.cloudflare.com/) provide edge computing via JavaScript/TypeScript. The benefits of WASM/WASI deserve their own blog post.

For those concerned about programming language choices, WASM/WASI supports [many languages](https://github.com/appcypher/awesome-wasm-langs).

# Byte Size Server

When you choose edge computing with WASM/WASI, it simplifies many decisions:

- No server platform selection needed
- No complex hosting configurations (no Docker required)
- Limited to WASM/WASI-compatible libraries (which is actually beneficial)
- Built-in scalability
- Pay-per-use pricing model
- Enhanced security through WASM/WASI sandboxing

These constraints help you focus on building what's necessary, starting with the smallest possible component and growing incrementally.

# Conclusion

A minimalistic approach is increasingly valuable in today's development landscape. It enables faster development without getting bogged down in architectural complexities. The WASM/WASI sandbox is sufficient for most use cases, with the only limitation being heavy computational tasks requiring multi-threading. 
