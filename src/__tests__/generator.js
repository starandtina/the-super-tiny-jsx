const tokenizer = require('../tokenizer')
const parser = require('../parser')
const generator = require('../generator')

it('parser', () => {
  expect(
    generator(
      parser(
        tokenizer(`
          html {
            body {
              h1 {
                "Hello World!"
              }
            }
          }
      `),
      ),
    ),
  ).toMatchSnapshot()
})
