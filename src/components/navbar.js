import { createComponent, html, nothing, getStore } from '../lib/mosaicjs/mosaic.esm.js'
import { router } from '../router.js'

createComponent('colour-quiz-navbar', {
  router,
  store: getStore('app.people'),
  methods: {
    navigateTo (location) {
      this.router.push(location)
    }
  },
  render () {
    return html`<div>
        <div class="navbar">
          <div>
            <img src="/assets/img/color_wheel.svg" alt="Colourful quiz" height="42" width="42">
            <span>Colourful quiz</span>
          </div>
          <div>
            ${this.store.getters.whois ? html`<span style="color: ${this.store.getters.color}">${this.store.getters.whois}</span>` : nothing}
          </div>
        </div>
        <!--<ul class="inline">
          <li>
            <mosaic-router-link href="/">H</mosaic-router-link>
          </li>
          <li>
            <mosaic-router-link href="/question">Q</mosaic-router-link>
          </li>
          <li>
            <mosaic-router-link href="/scores">S</mosaic-router-link>
          </li>
        </ul>-->
    </div>`
  }
})
