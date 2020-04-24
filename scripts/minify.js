const glob = require('glob-all')
const terser = require('terser')
const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const minifyHTMLLiterals = require('minify-html-literals').minifyHTMLLiterals

const files = glob.sync(['./src/**/*.js', '!./src/lib/**/*.js'])

files.forEach(f => {
  const contents = fs.readFileSync(f, { encoding: 'utf8' })
  const text = contents.toString()
  const mResult = minifyHTMLLiterals(text, { fileName: f })
  const result = terser.minify(mResult ? mResult.code : text)
  const o = f.replace(/src\//, 'dist/')
  const d = path.dirname(o)
  mkdirp.sync(d)
  fs.writeFileSync(o, result.code, { encoding: 'utf8' })
})
