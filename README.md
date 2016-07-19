# babel-plugin-transform-object-entries

A babel transform for `Object.entries`. Felt silly using the polyfill or runtime in node 6 when this was the only feature we wanted.

Code largely plagiarized from the official [`babel-plugin-transform-runtime`](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-runtime).

Just like the real life runtime, will output code that uses module `import` so be sure to have the commonjs transform.
