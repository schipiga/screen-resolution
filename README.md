For Linux you should have `imagemagick` installed.

Simple example:

```js
var resolution = require("screen-resolution");
resolution.get().then(result => console.log(result));
```

By default it caches result. In order to clear:

```js
resolution.clear();
```

Or disable cache:

```js
resolution.get(false);
```
