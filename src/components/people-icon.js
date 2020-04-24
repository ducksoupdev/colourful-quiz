import { createComponent, html } from '../lib/mosaicjs/mosaic.esm.js'

createComponent('people-icon', {
  props: {
    sex: {
      type: String,
      default: 'M'
    },
    name: {
      type: String
    }
  },
  get: {
    icon () {
      return this.props.sex === 'M' ? 'male.svg' : 'female.svg'
    },
    color () {
      return this.props.sex === 'M' ? '#fdc20e' : '#12b5ba'
    }
  },
  render () {
    return html`
      <img src="/assets/img/${this.get.icon}" alt="${this.props.name}" width="80" height="80">
      <span style="color: ${this.get.color}">${this.props.name}</span>
    `
  }
})
