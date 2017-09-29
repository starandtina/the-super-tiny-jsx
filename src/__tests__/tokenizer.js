const tokenizer = require('../tokenizer')

it('tokenizer', () => {
  expect(
    tokenizer(`
      html {
        body {
          h1 {
            123456789
            "Hello World!"
          }
        }
      }
      `),
  ).toMatchSnapshot()
})
