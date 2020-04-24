require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const path = require('path')

const prod = process.env.NODE_ENV === 'production'
const dir = prod ? 'dist' : 'src'

const app = express()

if (!prod) {
  // create a browser-sync instance
  const bs = require('browser-sync').create()
  bs.init({ logSnippet: false, notify: false, injectChanges: false })

  // watch whole dir
  bs.watch(dir).on('change', bs.reload)

  app.use(require('connect-browser-sync')(bs))
}

app.use(compression())
app.use(express.static(path.join(__dirname, `../${dir}`)))
app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, `../${dir}/index.html`))
})

const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`server running on port ${server.address().port}`)
})
