const tokenizer = require('../tokenizer')
const parser = require('../parser')

it('parser', () => {
  expect(
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
  ).toMatchSnapshot()
})
