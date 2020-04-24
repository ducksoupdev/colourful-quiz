import { html, createComponent } from './lib/mosaicjs/mosaic.esm.js'
import { router } from './router.js'

import './components/navbar.js'

createComponent('colour-quiz-routed-app', {
  router,
  render () {
    return html`<div class="page">
  <colour-quiz-navbar></colour-quiz-navbar>
  <div class="content">
    <mosaic-router-outlet></mosaic-router-outlet>
  </div>
</div>`
  }
})
