import { createComponent, html, nothing, getStore } from '../lib/mosaicjs/mosaic.esm.js'
import { router } from '../router.js'

import '../components/colour-cards.js'

createComponent('colour-quiz-question-page', {
  router,
  store: getStore('app.question'),
  methods: {
    navigateTo (location) {
      this.router.push(location)
    }
  },
  mounted () {
    this.store.dispatch('loadQuestions')
  },
  render () {
    return html`<div class="main">
        <div class="inner fluid">
            <div class="card">
              ${this.store.getters.getQuestion ? html`<colour-cards></colour-cards>` : nothing}
            </div>
        </div>
    </div>`
  }
})
