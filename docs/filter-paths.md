# Filter paths options

`<observable instance>.observe(...)` allows `options` parameter, second one, optional.

Some of the options are filtering ones, allowing to specify the changes of interest from within the observable graph. Here is a detailed description of those options.

## __`pathsFrom`__

Value expected to be a non-empty string representing a path, any changes of which and deeper will be delivered to the observer.
> This option MAY NOT be used together with `path` option.

![paths from](./filter-graphs/filter-paths-from.svg)

Given, that the graph above is our `Observable o` and we have subscribed for the changes via:
```
o.observe(callback, { pathsFrom: 'address' });
```

Following mutations __will__ be delivered to the `callback`:
```
o.address.street.apt = 5;
o.address.city = 'DreamCity';
o.address = {};
```

Following mutations __will not__ be delivered to the `callback`:
```
o.lastName = 'Joker';
```

## __`pathsOf`__

Value expected to be a string, which MAY be empty, representing a path. Changes to direct properties of which will be notified.

![paths of](./filter-graphs/filter-paths-of.svg)

Given, that the graph above is our `Observable o` and we have subscribed for the changes via:
```
o.observe(callback, { pathsOf: 'address' });
```

Following mutations __will__ be delivered to the `callback`:
```
o.address.street = {};
o.address.city = 'DreamCity';
```

Following mutations __will not__ be delivered to the `callback`:
```
o.lastName = 'Joker';
o.address = {};
o.address.street.apt = 5;
```

## __`path`__

Value expected to be a non-empty string, representing a specific path to observe. Only a changes of this exact path will be notified.

![paths](./filter-graphs/filter-paths.svg)

Given, that the graph above is our `Observable o` and we have subscribed for the changes via:
```
o.observe(callback, { path: 'address.street' });
```

Following mutations __will__ be delivered to the `callback`:
```
o.address.street = {};
```

Following mutations __will not__ be delivered to the `callback`:
```
o.lastName = 'Joker';
o.address.street.apt = 5;
```