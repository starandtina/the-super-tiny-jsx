# the-super-tiny-jsx

> Build your own and reinvent the wheel is the best practive to learn the essential parts under the hood.

## 

## API

### `tag`

We could defined our tiny `jsx` syntax below:

```
tag`
  html {
    /* comments */
    body {
      h1 {
        "Hello World! - ${ttttest}"
      }
    }
  }
`
```
then, it could be transformed into HTML raw string with `tag` function.

```
<!DOCTYPE html>
<html>
  <!-- comments  -->
  <body>
    <h1>
      Hello World! - ttttest
    </h1>
  </body>
</html>
```

### `compiler`

If you don't want to use tagged template literals, just use `compiler` instead:

```
compiler(`
  html {
    /* comments */
    body {
      h1 {
        "Hello World!"
      }
    }
  }
`)
```

The output HTML:

```
<!DOCTYPE html>
<html>
  <!-- comments  -->
  <body>
    <h1>
      Hello World!
    </h1>
  </body>
</html>
```

## Test

You would felt helpless knowing even smallest change could break things. So I have to write unit tests. Unit tests saved me countless hours of testing and debugging. Upon writing unit tests, I immediately noticed and fixed bugs in the compiler or in logic operations. No matter how complex the compiler code became, I could continue to refactor it and improve the code with confidence.

I always enforce **100%** code coverage with small to medium libraries. That's easy to do and I suggest anyone writing a small to medium sized library strive for that.

```
yarn test
```

## Todos

- Support `attributes`
- Support single line comment
- Handle the self-closing tag
