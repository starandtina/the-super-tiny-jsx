# the-super-tiny-jsx

I always wonders how the **jsx** works, and how to transform the **jsx**  syntax into normal HTML string? Here is the super tiny demo for how to do it with compiler.

> Build your own and reinvent the wheel is the best practive to learn the essential parts under the hood.

## API

### `tag`

We could defined our tiny `jsx` syntax below:

```
tag`
  html {
    /* multi line comment */
    body {
      h1 class="h1" style="color: red" {
        123456789 // single line comment
        "Hello World!" 
      }
      button disabled type="submit" {
        "Submit"
      }
    }
  }
`
```
then, it could be transformed into HTML raw string with `tag` function.

```
<!DOCTYPE html>
<html>
  <!-- multi line comment  -->
  <body>
    <h1 class="h1" style="color: red">
      Hello World!
      <!-- single line comment  -->
    </h1>
    <button disabled="true" type="submit">
      Submit
    </button>
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

The output HTML looks like:

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

- ~~Support `attributes`~~
- ~~Support single line comment~~
- Handle the self-closing tag
