/*
  html {
    body {
      h1 {
        "Hello World!"
      }
    }
  }

  \\\\\
   \\\
    \
    <html>
      <body>
        <h1>
          Hello World
        </h1>
      </body>
    </html>
*/
const {
  ELEMENT,
  STRING,
  NUMBER,
  COMMENT_ML,
  COMMENT_SL,
  LEFT_CURLY_BRACKET,
  RIGHT_CURLY_BRACKET,
  EQUAL_SIGN,
} = require('./TOKEN_TYPE')

const punctuation = {
  '{': LEFT_CURLY_BRACKET,
  '}': RIGHT_CURLY_BRACKET,
  '=': EQUAL_SIGN,
}

const WHITESPACE = /\s/
const NUMBERS = /[0-9]/
const IDENTIFIER = /[0-9a-z]/i

function tokenizer(input) {
  let current = 0
  let tokens = []

  while (current < input.length) {
    let char = input[current]

    // Skip white spaces /\s/
    // 空白字符可以是：
    // 空格符 (space character)
    // 制表符 (tab character)
    // 回车符 (carriage return character)
    // 换行符 (new line character)
    // 垂直换行符 (vertical tab character)
    // 换页符 (form feed character)
    if (WHITESPACE.test(char)) {
      current++
      continue
    }

    // NUMBER
    if (NUMBERS.test(char)) {
      let value = ''

      while (NUMBERS.test(char)) {
        value += char
        char = input[++current]
      }

      tokens.push({ type: NUMBER, value })

      continue
    }

    // STRING
    if (char === '"') {
      let value = ''

      char = input[++current]

      while (char !== '"') {
        value += char
        char = input[++current]
      }

      char = input[++current]

      tokens.push({ type: STRING, value })

      continue
    }

    // IDENTIFIER
    if (IDENTIFIER.test(char)) {
      let value = ''

      while (IDENTIFIER.test(char)) {
        value += char
        char = input[++current]
      }

      tokens.push({ type: ELEMENT, value })

      continue
    }

    // Parse a multiline comment
    if (char === '/' && input[current + 1] === '*') {
      const start = current
      // Read the string until we meet `*/`.
      // Since we already know first 2 characters (`/*`), start reading
      // from `current + 2`:
      for (current = current + 2; current < input.length; current++) {
        if (input[current] === '*' && input[current + 1] === '/') {
          ++current
          ++current
          break
        }
      }

      tokens.push({
        type: COMMENT_ML,
        value: input.substring(start + 2, current - 2).trim(),
      })

      continue
    }

    // Parse a single line comment
    if (char === '/' && input[current + 1] === '/') {
      const start = current

      // Read the string until we meet line break.
      // Since we already know first 2 characters (`//`), start reading
      // from `current + 2`:
      for (current += 2; current < input.length; current++) {
        if (input[current] === '\n' || input[current] === '\r') {
          break
        }
      }

      tokens.push({
        type: COMMENT_SL,
        value: input.substring(start + 2, current).trim(),
      })

      continue
    }

    if (char in punctuation) {
      tokens.push({ type: punctuation[char], value: char })

      ++current
      continue
    }

    throw new TypeError(`Unknown char: ${char}`)
  }

  return tokens
}

module.exports = tokenizer
