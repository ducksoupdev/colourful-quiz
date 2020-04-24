import './events.js'
import { stores } from './store/stores.js'
import './app.js'
import { router } from './router.js'

const scoreWorker = new window.Worker('score-worker.js')

scoreWorker.onmessage = e => {
  const store = stores.getStore('app.question')
  store.dispatch('updateCurrentQuestion', e.data)
}

scoreWorker.postMessage('init')

router.start()
