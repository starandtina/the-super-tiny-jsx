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

module.exports = compiler
