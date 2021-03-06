const {
  DOCUMENT,
  STRING,
  NUMBER,
  COMMENT_ML,
  COMMENT_SL,
  ELEMENT,
  LEFT_CURLY_BRACKET,
  RIGHT_CURLY_BRACKET,
} = require('./TOKEN_TYPE')

function generator(node) {
  const { type, props: { value, children, ...rest } } = node

  switch (type) {
    case DOCUMENT:
      return `<!DOCTYPE html>\n${children.map(generator).join('\n')}`

    case COMMENT_ML:
    case COMMENT_SL:
      return `<!-- ${value}  -->`

    case ELEMENT:
      const attrs = Object.keys(rest)
        .reduce((acc, attrKey) => `${acc}${attrKey}="${rest[attrKey]}" `, '')
        .trim()
      const fragementStart = attrs ? `<${value} ${attrs}>` : `<${value}>`
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
      return value
  }
}

module.exports = generator
