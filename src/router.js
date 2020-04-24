import { createRouter, html } from './lib/mosaicjs/mosaic.esm.js'
import { stores } from './store/stores.js'

export const router = createRouter([
  {
    path: '',
    action () {
      const peopleStore = stores.getStore('app.people')
      if (peopleStore.getters.whois) {
        return { redirect: '/question' }
      }
      return import('./views/home.js').then(() => html`<colour-quiz-home-page></colour-quiz-home-page>`)
    }
  },
  { path: '/question', action: () => import('./views/question.js').then(() => html`<colour-quiz-question-page></colour-quiz-question-page>`) },
  { path: '/scores', action: () => import('./views/scores.js').then(() => html`<colour-quiz-scores-page></colour-quiz-scores-page>`) }
], { mode: 'hash', autoStart: false })
