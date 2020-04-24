import { createComponent, html, getStore } from '../lib/mosaicjs/mosaic.esm.js'
import { router } from '../router.js'

import './people-icon.js'

createComponent('people-chooser', {
  store: getStore('app.people'),
  router,
  mounted () {
    this.store.dispatch('loadPeople')
  },
  methods: {
    setWhoami (p) {
      this.store.dispatch('personSelected', p)
    }
  },
  render () {
    return html`
<div style="display: flex; justify-content: center; margin-top: 30px">
  ${this.store.state.people.map(p => html`
  <div>
    <button class="btn__people btn--reset" @click=${() => this.methods.setWhoami(p)} type="button">
      <people-icon sex=${p.sex} name=${p.name}></people-icon>
    </button>
  </div>
`)}
</div>
`
  }
})
