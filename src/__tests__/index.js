const { compiler, tag } = require('../index')

it('compiler', () => {
  expect(
    compiler(`
      html {
        /* comments */
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
