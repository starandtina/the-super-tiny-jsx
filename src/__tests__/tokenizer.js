const tokenizer = require('../tokenizer')

it('tokenizer', () => {
  expect(
    tokenizer(`
      html {
        /* multi line comment */
        body {
          h1 class="h1" style="color: red" {
            123456789 // single line comment
            "Hello World!"
          }
        }
      }
      `),
  ).toMatchSnapshot()
})

it('throws on unknown char', () => {
  expect(() => {
    tokenizer('\\u')
  }).toThrow()
})
