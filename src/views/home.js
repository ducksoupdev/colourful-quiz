import { createComponent, html } from '../lib/mosaicjs/mosaic.esm.js'
import { router } from '../router.js'

import '../components/people.js'

createComponent('colour-quiz-home-page', {
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
                <h2>Welcome to the colourful quiz!</h2>
                <h3 style="color: green">Who are you?</h3>
                <people-chooser></people-chooser>
            </div>
        </div>
    </div>`
  }
})
