const tokenizer = require('../tokenizer')
const parser = require('../parser')
const generator = require('../generator')

it('parser', () => {
  expect(
    generator(
      parser(
        tokenizer(`
          html {
            /* multi line comment */
            body {
              h1 class="h1" style="color: red" {
                "Hello World!"  // single line comment
              }
              button disabled type="submit" {
                "Submit"
              }
            }
          }
      `),
      ),
    ),
  ).toMatchSnapshot()
})
