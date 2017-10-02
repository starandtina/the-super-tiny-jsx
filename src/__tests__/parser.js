const tokenizer = require('../tokenizer')
const parser = require('../parser')

it('parser: without arguments', () => {
  expect(parser()).toMatchSnapshot()
})

it('parser', () => {
  expect(
    parser(
      tokenizer(`
        html {
          /* multi line comment */
          body {
            h1 class="h1" style="color: red" {
              "Hello World!" // single line comment
            }
            button disabled type="submit" {
              "Submit"
            }
          }
        }
      `),
    ),
  ).toMatchSnapshot()
})
