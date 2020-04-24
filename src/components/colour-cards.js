import { createComponent, getStore, html, styleMap } from '../lib/mosaicjs/mosaic.esm.js'
import { events } from '../events.js'

createComponent('colour-cards', {
  events,
  store: getStore('app.question'),
  state () {
    return {
      colors: [
        { c: 'green', t: 'white', s: false },
        { c: 'purple', t: 'white', s: false },
        { c: 'blue', t: 'white', s: false },
        { c: 'white', t: 'black', s: false },
        { c: 'pink', t: 'black', s: false },
        { c: 'red', t: 'white', s: false },
        { c: 'brown', t: 'white', s: false },
        { c: 'yellow', t: 'black', s: false },
        { c: 'orange', t: 'white', s: false },
        { c: 'gray', t: 'white', s: false },
        { c: 'black', t: 'white', s: false }
      ]
    }
  },
  methods: {
    selectColour (c) {
      const colors = [...this.state.colors]
      const idx = colors.findIndex(x => x.c === c)
      colors[idx].s = !colors[idx].s
      this.state.colors = colors
    },
    submit () {
      const answers = this.state.colors.filter(x => x.s).map(x => x.c)
      this.store.dispatch('answerQuestion', {
        questionNumber: this.store.state.currentQuestion.questionNumber,
        answers
      })
    },
    clearCards (qn) {
      const answer = qn ? this.store.state.answers[qn.toString()] : this.store.getters.getCurrentQuestionAnswer
      const colors = [...this.state.colors].map(x => {
        const hasAnswered = answer && answer.indexOf(x.c) > -1
        return {
          ...x,
          s: hasAnswered
        }
      })
      this.state.colors = colors
    },
    getStyles (i) {
      return {
        backgroundColor: i.c,
        color: i.t
      }
    }
  },
  get: {
    colors () {
      if (this.store.state.currentQuestion.showResults) {
        const colors = []
        const question = this.store.getters.getQuestion
        for (let i = 0; i < question.correctAnswer.length; i++) {
          const col = question.correctAnswer[i]
          const q = this.state.colors.find(x => x.c === col)
          if (q) colors.push(q)
        }
        return colors
      } else {
        return this.state.colors
      }
    }
  },
  mounted () {
    this.events.subscribe('clearCards', this.methods.clearCards)
    this.methods.clearCards()
  },
  render () {
    if (this.store.state.currentQuestion.showResults) {
      return html`
      <h2>The answer to question ${this.store.state.currentQuestion.questionNumber} is</h2>
      <div class="colour-card">
        ${this.get.colors.map(i => html`
          <button type="button" class="colour-card__card h3 colour-card__card--selected-${i.t}" style="${styleMap(this.methods.getStyles(i))}">
            <span>${i.c}</span>
          </button>
        `)}
      </div>
      `
    } else {
      return html`
      <h2>Question ${this.store.state.currentQuestion.questionNumber}</h2>
      <div class="colour-card">
        ${this.get.colors.map(i => html`
          <button type="button" @click=${() => this.methods.selectColour(i.c)} class="colour-card__card h3${i.s ? ` colour-card__card--selected-${i.t}` : ''}" style="${styleMap(this.methods.getStyles(i))}">
            <span>${i.c}</span>
          </button>
        `)}
      </div>
      <div style="margin-top: 30px; text-align: center">
        <button type="button" class="btn${this.store.getters.hasAnsweredQuestion(this.store.state.currentQuestion.questionNumber) ? ' btn--selected' : ''}" @click=${this.methods.submit}>Submit answer</button>
      </div>
      `
    }
  }
})
