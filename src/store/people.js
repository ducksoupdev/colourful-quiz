import { get } from '../util/http.js'
import { config } from '../config.js'
import { router } from '../router.js'

export const people = {
  persist: 'colourful-people',
  initialState: {
    people: [],
    whoami: null
  },
  actions: {
    loadPeople (context) {
      if (context.state.people.length === 0) {
        get(`${config.API_URL}/people`)
          .then(({ results }) => {
            context.commit('setPeople', results)
          })
      }
    },
    personSelected (context, payload) {
      context.commit('setWhoami', payload)
      router.push('/question')
    }
  },
  mutations: {
    setPeople (state, payload) {
      state.people = payload
      return state
    },
    setWhoami (state, payload) {
      state.whoami = payload
      return state
    }
  },
  getters: {
    whois (state) {
      if (state.whoami) {
        return `I am ${state.whoami.name}`
      }
      return null
    },
    color (state) {
      if (state.whoami) {
        return state.whoami.sex === 'M' ? '#fdc20e' : '#12b5ba'
      }
      return 'white'
    }
  }
}
