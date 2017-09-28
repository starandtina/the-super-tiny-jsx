const {
  DOCUMENT,
  STRING,
  COMMENT_ML,
  ELEMENT,
  LEFT_CURLY_BRACKET,
  RIGHT_CURLY_BRACKET,
} = require('./TOKEN_TYPE')

function generator(node) {
  // console.log(JSON.stringify(node, null, ' '))
  const { type, props: { value, children } } = node

  switch (type) {
    case DOCUMENT:
      return children.map(generator).join('\n')

    case STRING:
      return value

    case COMMENT_ML:
      return `<!-- ${value}  -->`

    case ELEMENT:
      const fragementStart = `<${value}>`
      const fragementEnd = `</${value}>`

      const body = children.reduce((r, child) => {
        const generatorStr = generator(child)
          .split('\n')
          .map(l => '  ' + l)
          .join('\n')

        return `${r}${generatorStr}\n`
      }, '\n')

      return `${fragementStart}${body}${fragementEnd}`

    default:
      throw new TypeError(type)
  }
}

module.exports = generator
