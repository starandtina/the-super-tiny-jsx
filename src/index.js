const tokenizer = require('./tokenizer')
const parser = require('./parser')
const generator = require('./generator')

const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x)
/**
 * FINALLY! We'll create our `compiler` function. Here we will link together
 * every part of the pipeline.
 *
 *   1. input  => tokenizer   => tokens
 *   2. tokens => parser      => ast
 *   --3. ast    => transformer => newAst--
 *   4. newAst => generator   => output
 */

function compiler(input) {
  return compose(generator, parser, tokenizer)(input)
}

function tag(input, ...substitutions) {
  // Use raw template strings: we don’t want backslashes (\n etc.) to be interpreted
  const raw = input.raw
  let result = ''

  substitutions.forEach((substitution, i) => {
    // Retrieve the template string preceding the current substitution
    let str = raw[i]

    // If `substitution` is an Array (and not a string), then turn it into a string
    if (Array.isArray(substitution)) {
      substitution = substitution.join('')
    }

    result += str + substitution
  })

  // Take care of last template string
  // As the number of template strings is always one plus the number of substitutions
  // In other words: every substitution is always surrounded by two template strings
  result += raw[raw.length - 1]

  return compiler(result)
}

module.exports = {
  compiler,
  tag,
}
