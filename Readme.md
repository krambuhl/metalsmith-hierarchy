# metalsmith-hierarchy

Metalsmith plugin that adds hierarchy information to file metadata.  Uses file metadata `parent` property to crawl until a file with no parent is found, the list is output to the `hierarchy` property with the root node first and the current node last.

#### Advice / Rant

It's a bit laborous to add parent properties to a large amount of pages (something like blog posts), a plugin like [metalsmith-filemetadata](https://github.com/dpobel/metalsmith-filemetadata), for batch editing metadata is prefered over weird plugin only logic inside of this plguin. 

When using this plugin, beware that the `hierarchy` property is inherently cyclical so be careful while using plugins that serializes file metadata like [metalsmith-writemetadata](https://github.com/Waxolunist/metalsmith-writemetadata).  

## Installation

    $ npm install metalsmith-hierarchy --save-dev

## Javascript Usage

Pass to `Metalsmith#use.

```js
var hierarchy = require('metalsmith-hierarchy');

metalsmith.use(hierarchy());
```

### Example

__archive.html__

```
---
slug: archive
---
```

__post.html__

```
---
slug: post
parent: archive.html
---
```

#### Output

__post-output.html__

```
---
slug: post
parent: archive.html
hierarchy: [
  { archive.html metadata },
  { post.html metadata },
]
---
```

## Options

There currently no options, any suggestions or pull-requests will be considered.

## License

MIT 2015