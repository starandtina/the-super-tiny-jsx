const { compiler, tag } = require('../index')

it('compiler', () => {
  expect(
    compiler(`
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
      `),
  ).toMatchSnapshot()
})

it('tag', () => {
  const ttttest = 'ttttest'
  const arr = ['xx', 'oo']

  expect(
    tag`
      html {
        /* comments */
        body {
          h1 {
            "Hello World! - ${ttttest}"
          }
          p {
            "${arr}"
          }
        }
      }
    `,
  ).toMatchSnapshot()
})
