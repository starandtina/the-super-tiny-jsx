const {
  DOCUMENT,
  STRING,
  ELEMENT,
  LEFT_CURLY_BRACKET,
  RIGHT_CURLY_BRACKET,
} = require('./TOKEN_TYPE')

function parser(tokens = []) {
  let current = 0
  let ast = { type: DOCUMENT, props: { children: [] } }

  function walk() {
    const { type, value } = tokens[current]

    if (type === ELEMENT) {
      const node = {
        type: ELEMENT,
        props: {
          value,
          children: [],
        },
      }
      // Skip the `element` token
      let token = tokens[++current]
      // Skip the `{` token
      token = tokens[++current]

      while (token.type !== RIGHT_CURLY_BRACKET) {
        node.props.children.push(walk())

        token = tokens[current]
      }

      // Finally we will increment `current` one last time to skip the `RIGHT_CURLY_BRACKET`
      current++

      return node
    }

    current++

    return {
      type,
      props: {
        value,
      },
    }
  }

  while (current < tokens.length) {
    ast.props.children.push(walk())
  }

  return ast
}

module.exports = parser
