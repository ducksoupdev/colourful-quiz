import { createStoreManager } from '../lib/mosaicjs/mosaic.esm.js'
import { people } from './people.js'
import { question } from './question.js'

const stores = createStoreManager()
stores.addStore('app.people', people)
stores.addStore('app.question', question)

export { stores }
