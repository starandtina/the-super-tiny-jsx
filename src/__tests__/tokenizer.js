const tokenizer = require('../tokenizer')

it('tokenizer', () => {
  expect(
    tokenizer(`
      html {
        body {
          h1 {
            "Hello World!"
          }
        }
      }
      `),
  ).toMatchSnapshot()
})
