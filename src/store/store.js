const $ = require('jquery')
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRG1pdHJ5IEZlZGluIiwidGFza3MiOlsibmV3X3Rhc2siLCJzZWNvbmRfdGFzayJdLCJpYXQiOjE1MzI0MzMzNTEsImV4cCI6MTUzMzAzODE1MSwiYXVkIjoic3RhZ2luZy5kYXNoYS5haSIsImlzcyI6ImRhc2hhLmFpIn0._yt4WdPCeyCNulgWSONUluapXAOgJNyA5sJcJEsP_S0'

const newClient = {
  "id": "56d80400-5cf1-4dfa-a4c6-6c5981d2390",
  "name": "Павел",
  "task": "new_task",
  "data": {
    "status": "None",
    "name": "Павел",
    "phone": "7xxxxxxxxx",
    "timezone": "4"
  },
  "group": "new_group",
  "createdTime": "2018-07-13T07:51:43.4265102",
  "results": [
    {
      "id": "bc531a42-76ba-43cb-8f9b-470d2ad7bfdb",
      "log": {
        "transcription": [
          {
            "time": "2018-07-13T08:17:11.348Z",
            "incoming": true,
            "msg": {
              "msgId": "SpeechChannelMessage",
              "type": "Voice"
            }
          },
          {
            "time": "2018-07-13T08:17:11.349Z",
            "incoming": false,
            "msg": {
              "msgId": "RawTextChannelMessage",
              "text": "Здравствуйте"
            }
          },
          {
            "time": "2018-07-13T08:17:12.978Z",
            "incoming": true,
            "msg": {
              "msgId": "RecognizedSpeechMessage",
              "sentiment": [
                {
                  "class": "statement",
                  "sentiment": "neutral"
                }
              ],
              "input_info": [],
              "nps": [],
              "originalText": "номер не отвечает"
            }
          },
          {
            "time": "2018-07-13T08:17:12.979Z",
            "incoming": true,
            "msg": {
              "msgId": "SpeechChannelMessage",
              "type": "Pause"
            }
          },
          {
            "time": "2018-07-13T08:17:13.167Z",
            "incoming": true,
            "msg": {
              "msgId": "SpeechChannelMessage",
              "type": "Voice"
            }
          },
          {
            "time": "2018-07-13T08:17:13.168Z",
            "incoming": false,
            "msg": {
              "msgId": "RawTextChannelMessage",
              "text": "Меня зовут Владислав, Специалист по оценке лояльности клиентов Модульбанка. У вас найдется пара минут оценить работу банка?"
            }
          },
          {
            "time": "2018-07-13T08:17:15.340Z",
            "incoming": true,
            "msg": {
              "msgId": "RecognizedSpeechMessage",
              "sentiment": [
                {
                  "class": "statement",
                  "sentiment": "neutral"
                }
              ],
              "input_info": [
                {
                  "class": "statement",
                  "type": "answering_machine"
                }
              ],
              "nps": [],
              "originalText": "Оставьте сообщение на авто"
            }
          },
          {
            "time": "2018-07-13T08:17:15.340Z",
            "incoming": false,
            "msg": {
              "msgId": "CloseSessionChannelMessage"
            }
          },
          {
            "time": "2018-07-13T08:17:15.341Z",
            "incoming": true,
            "msg": {
              "msgId": "SpeechChannelMessage",
              "type": "Pause"
            }
          },
          {
            "time": "2018-07-13T08:17:15.531Z",
            "incoming": true,
            "msg": {
              "msgId": "SpeechChannelMessage",
              "type": "Voice"
            }
          },
          {
            "time": "2018-07-13T08:17:16.733Z",
            "incoming": true,
            "msg": {
              "msgId": "SpeechChannelMessage",
              "type": "Pause"
            }
          },
          {
            "time": "2018-07-13T08:17:20.283Z",
            "incoming": true,
            "msg": {
              "msgId": "ClosedSessionChannelMessage",
              "hangupMsgId": "GracefulHangupAudioStreamChannelMessage",
              "callId": "b774afe6-718c-42e8-a774-b27f832f2183"
            }
          }
        ],
        "readableLog": [
          "AI: Здравствуйте",
          "Пользователь: номер не отвечает",
          "AI: Меня зовут Владислав, Специалист по оценке лояльности клиентов Модульбанка. У вас найдется пара минут оценить работу банка?",
          "Пользователь: Оставьте сообщение на авто",
          "AI положил трубку"
        ]
      },
      "taskStatus": "Completed",
      "completedTime": "2018-07-13T10:14:28.7854838",
      "serviceStatus": "AnsweringMachine",
      "callBackDetails": null,
      "result": {
        "serviceStatus": "AnsweringMachine",
        "status": "None"
      },
      "records": [
        "b774afe6-718c-42e8-a774-b27f832f2183"
      ]
    }
  ]
}

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
    state.conversations.push(newClient)
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
