const $ = require('jquery')
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRG1pdHJ5IEZlZGluIiwidGFza3MiOlsibmV3X3Rhc2siLCJzZWNvbmRfdGFzayJdLCJpYXQiOjE1MzI0MzMzNTEsImV4cCI6MTUzMzAzODE1MSwiYXVkIjoic3RhZ2luZy5kYXNoYS5haSIsImlzcyI6ImRhc2hhLmFpIn0._yt4WdPCeyCNulgWSONUluapXAOgJNyA5sJcJEsP_S0'

const state = {
  conversations: [],
  currentConversation: null,
  filterFields: [
    { key: 'index', label: 'Индекс', sortable: true, isOn: true },
    { key: 'name', label: 'ФИО', sortable: true, isOn: true },
    { key: 'data.phone', label: 'Телефон', sortable: false, isOn: true },
    { key: 'group', label: 'Группа', sortable: true, isOn: true },
    { key: 'task', label: 'Модель', sortable: true, isOn: true },
    { key: 'createdTime', label: 'Дата', sortable: true, isOn: true },
    { key: 'id', label: 'ID', isOn: false }
  ]
}

const mutations = {
  setConversations (state, data) {
    state.conversations = data
    state.conversations.forEach((conversation) => {
      conversation.index = state.conversations.indexOf(conversation) + 1
    })
  },
  setCurrentConversation (state, data) {
    state.currentConversation = data
  },
  setCurrentConversationFromRoute (state, id) {
    state.currentConversation = state.conversations.find(conversation => conversation.id === id)
  },
  deleteCurrentConversation (state) {
    state.currentConversation = null
  },
  setFilterConfig (state, config) {
    state.filterConfig = config
  }
}

const getters = {
  otherConversations: (state) => {
    if (state.currentConversation) {
      return state.conversations.filter(conversation => conversation.name === state.currentConversation.name &&
        conversation.data.phone === state.currentConversation.data.phone &&
        conversation.id !== state.currentConversation.id)
    }
  }
}

const actions = {
  init ({ commit }, payload) {
    $.ajax({
      url: 'https://manager.staging.dasha.ai/api/v1/conversations',
      dataType: 'json',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      success (body) {
        commit('setConversations', body)
        if (payload !== undefined) {
          commit('setCurrentConversationFromRoute', payload.id)
        }
      },
      error (error) {
        console.log(error)
      }
    })
  },
  deleteConversation ({ commit, dispatch }, payload) {
    $.ajax({
      url: `https://manager.staging.dasha.ai/api/v1/conversations/${payload.conversation.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      success (body) {
        commit('deleteCurrentConversation')
        dispatch('init')
      },
      error (error) {
        console.log(error)
      }
    })
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
