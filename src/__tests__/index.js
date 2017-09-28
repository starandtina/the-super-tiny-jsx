const compiler = require('../index')

it('compiler', () => {
  expect(
    compiler(`
      html {
        /* comments */
        body {
          h1 {
            "Hello World!"
          }
        }
      }
      `),
  ).toMatchSnapshot()
})
