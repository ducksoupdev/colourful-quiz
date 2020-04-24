import { get } from '../util/http.js'
import { config } from '../config.js'
import { events } from '../events.js'

export const question = {
  persist: 'colourful-questions',
  initialState: {
    questions: [],
    currentQuestion: {
      questionNumber: 1,
      showResults: false
    },
    answers: {}
  },
  actions: {
    loadQuestions (context) {
      if (context.state.questions.length === 0 || context.state.questions.length !== 20) {
        get(`${config.LOCAL_URL}/questions.json`)
          .then(({ results }) => {
            context.commit('setQuestions', results)
          })
      }
    },
    answerQuestion (context, payload) {
      const answers = { ...context.state.answers }
      answers[payload.questionNumber.toString()] = payload.answers
      context.commit('setAnswers', answers)
    },
    updateCurrentQuestion (context, payload) {
      if (context.state.currentQuestion.questionNumber !== payload.questionNumber) {
        events.publish('clearCards', payload.questionNumber)
      }
      context.commit('setCurrentQuestion', payload)
    }
  },
  mutations: {
    setQuestions (state, payload) {
      state.questions = payload
      return state
    },
    setCurrentQuestion (state, payload) {
      state.currentQuestion = payload
      return state
    },
    setAnswers (state, payload) {
      state.answers = payload
      return state
    }
  },
  getters: {
    getQuestion (state) {
      if (state.questions.length === 0) {
        return null
      }
      return state.questions.find(x => x.questionNumber === state.currentQuestion.questionNumber)
    },
    hasAnsweredQuestion (state) {
      // eslint-disable-next-line no-prototype-builtins
      return questionNumber => state.answers.hasOwnProperty(questionNumber.toString())
    },
    getCurrentQuestionAnswer (state) {
      return state.answers[state.currentQuestion.questionNumber.toString()]
    }
  }
}
