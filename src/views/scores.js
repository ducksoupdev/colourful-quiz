import { createComponent, html } from '../lib/mosaicjs/mosaic.esm.js'
import { router } from '../router.js'

createComponent('colour-quiz-scores-page', {
  router,
  methods: {
    navigateTo (location) {
      this.router.push(location)
    }
  },
  render () {
    return html`<div class="main">
        <div class="inner fluid">
            <div class="card">
                <h2>Scores</h2>
            </div>
        </div>
    </div>`
  }
})
