---
id: pagerank-mapreduce
title: Pagerank MapReduce
author: Thomas Barras
tags: [MapReduce]
---

## Ranking websites with computing clusters

[Source](https://github.com/exced/pagerank-mapreduce)

Pagerank is an algorithm used by Google to rank websites in their search engine.

We can distribute the computation of this algorithm using map reduce in many clusters.

<!--truncate-->

Here is the architecture of this project:

Iterate until pagerank stabilization:

1. Generate a link graph with MongoDB
2. Map the pagerank values of each link
3. Reduce these pagerank

### Define graph model

```javascript
const pageSchema = new Schema({
  _id: String,
  value: {
    url: String,
    pg: Number,
    links: [String],
  },
});
```

### Graph Example

![Graph example](/img/2016-12-20-pagerank-mapreduce/PR-example1.png)

### Define example

```javascript
const pages = [
  {
    _id: 'A',
    value: {
      url: 'A',
      pg: 1,
      links: ['B', 'C'],
    },
  },
  {
    _id: 'B',
    value: {
      url: 'B',
      pg: 1,
      links: ['C'],
    },
  },
  {
    _id: 'C',
    value: {
      url: 'C',
      pg: 1,
      links: ['A'],
    },
  },
  {
    _id: 'D',
    value: {
      url: 'D',
      pg: 1,
      links: ['C'],
    },
  },
];

pages.forEach(function savePages(elt, index, array) {
  Page(elt).save(function(err, newPage) {
    if (err) throw err;
  });
});
```

### MapReduce

```javascript
const o = {};
o.map = function() {
  for (let i = 0, len = this.value.links.length; i < len; i++) {
    emit(this.value.links[i], this.value.pg / len);
  }
  emit(this.value.url, 0);
  emit(this.value.url, this.value.links);
};

o.reduce = function(k, vals) {
  const links = [];
  let pagerank = 0.0;
  for (var i = 0, len = vals.length; i < len; i++) {
    if (vals[i] instanceof Array) {
      links = vals[i];
    } else {
      pagerank += vals[i];
    }
  }
  pagerank = 1 - getDampingFactor() + getDampingFactor() * pagerank;
  return { url: k, pg: pagerank, links: links };
};

o.scope = {
  getDampingFactor: new mongoose.mongo.Code(getDampingFactor.toString()),
};

o.out = { replace: 'pages' };
```

There are 2 non-obvious things here :

```javascript
emit(this.value.url, 0);
```

```javascript
o.scope = {
  getDampingFactor: new mongoose.mongo.Code(getDampingFactor.toString()),
};
```

1. Mongo has chosen to not reduce the unique key, that is why we reduce key that have no interest. It's just here to make the (key, value) be reduced.
2. To access js scope inside Mongo MapReduce, we need to send functions as string.

### Result

![Graph result](/img/2016-12-20-pagerank-mapreduce/PR-result1.png)
