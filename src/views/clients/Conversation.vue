<template>
  <div v-if="isLoad" class="animated fadeIn">
    <b-row>
      <b-col>
        <b-card :sub-title="conversation ? conversation.name : ''" sub-title-tag="h1">
          <b-card-body>
            <h2>Подробная информация о разговоре</h2>
            <b-table bordered striped :items="information" :fields="fields">
            </b-table>
            <b-button variant="danger" class="btn-delete" v-b-modal.deleteConversation>Стереть информацию о разговоре</b-button>
            <b-modal
              id="deleteConversation"
              ok-title="Да"
              ok-variant="danger"
              cancel-title="Нет"
              @ok="deleteConversation(conversation)"
              centered
              title="Внимание">
              <p>Вы действительно хотите удалить данные об этом разговоре?</p>
            </b-modal>
            <div role="tab-list" v-if="conversation.results.length !== 0" class="logger">
              <b-card no-body class="mb-1" v-for="(call, index) in conversation.results" :key="index">
                <b-card-header header-tag="header" role="tab">
                  <b-btn block href=# v-b-toggle="`call${index}`" variant="primary">Звонок {{ index + 1 }} (Завершён {{ `${call.completedTime.split('T')[0]} / ${call.completedTime.split('T')[1].substring(0, 8)}` }})</b-btn>
                </b-card-header>
                <b-collapse :id="`call${index}`" :accordion="`call${index}`" role="tabpanel">
                  <b-card-body>
                    <b-list-group v-if="call.log !== null">
                      <b-list-group-item v-for="(log, index) in call.log.readableLog" :key="index">
                        <span v-if="log.split(':')[0] === 'AI'" class="ai">
                          <strong class="danger">{{ log.split(':')[0] }}:</strong>{{ log.substring(3, log.length) }}
                        </span>
                        <span v-else-if="log.split(':')[0] === 'Пользователь'" class="client">
                          <strong class="primary">{{ log.split(':')[0] }}:</strong>{{ log.substring(13, log.length) }}
                        </span>
                        <span v-else class="plain">
                          {{ log }}
                        </span>
                      </b-list-group-item>
                    </b-list-group>
                    <b-button v-b-modal="`report${index}`" variant="success">Посмотреть детальный отчёт о звонке</b-button>
                    <b-modal
                    :id="`report${index}`"
                    ok-only
                    ok-variant="primary"
                    ok-title="Закрыть"
                    centered
                    size="lg"
                    title="Отчёт">
                      <h3>Базовая информация</h3>
                      <b-table
                      responsive 
                      bordered 
                      striped 
                      :fields="fieldsCall"
                      :items="getCallFields(call)"
                      show-empty
                      empty-text="Нет записей"
                      empty-filtered-text="По вашему запросу ничего не найдено">
                      </b-table>
                      <h3>Логи</h3>
                      <p v-if="call.log === null">Пусто</p>
                      <b-table
                      v-if="call.log !== null"
                      responsive 
                      bordered 
                      striped
                      :fields="fieldsLog"
                      :items="call.log.transcription"
                      show-empty
                      empty-text="Нет записей"
                      empty-filtered-text="По вашему запросу ничего не найдено">
                        <template slot="time" slot-scope="data">
                          <span class="time">{{ `${data.item.time.split('T')[0]} / ${data.item.time.split('T')[1].substring(0, 8)}` }}</span>
                        </template>
                        <template slot="incoming" slot-scope="data">
                          <span class="incoming">{{ data.item.incoming ? 'Да' : 'Нет' }}</span>
                        </template>
                      </b-table>
                    </b-modal>
                  </b-card-body>
                </b-collapse>
              </b-card>
            </div>
            <h2 v-if="history.length !== 0">Возможно вы искали</h2>
            <div class="table-filter" v-if="history.length !== 0">
              <b-col md="6" class="column" lg="5">
                <b-form-group horizontal label="Поиск" class="mb-0">
                  <b-input-group>
                    <b-form-input v-model="filter" placeholder="Введите для поиска" />
                    <b-input-group-append>
                      <b-btn :disabled="!filter" @click="filter = ''">Очистить</b-btn>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
                <b-form-group horizontal label="Кол-во записей" class="mb=0">
                  <b-input-group>
                    <b-form-select :options="perPageOptions" v-model="perPage">
                    </b-form-select>
                  </b-input-group>
                </b-form-group>
                <button class="btn btn-primary" @click="onRefresh">
                  Обновить
                  <i class="fa fa-refresh"></i>
                </button>
              </b-col>
              <b-col class="column">
                <div class="fields">
                  <div class="filter" v-for="(filterField, index) in filterFields" :key="index">
                    <span class="label">{{ filterField.label }}</span>
                    <label class="switch switch-pill switch-primary">
                      <input v-model="filterField.isOn" type="checkbox" class="switch-input" checked>
                      <span class="switch-slider"></span>
                    </label>
                  </div>
                </div>
              </b-col>
            </div>
            <nav v-if="history.length !== 0">
              <b-pagination
                v-if="!isEmpty"
                v-model="currentPage"
                :total-rows="history.length"
                :per-page="perPage"
                prev-text="Назад"
                next-text="Вперёд">
              </b-pagination>
            </nav>
            <b-table
              :filter="filter" 
              :per-page="perPage"
              :current-page="currentPage"
              v-if="history.length !== 0"
              responsive 
              bordered 
              striped 
              :items="history"
              show-empty
              empty-text="Нет записей"
              empty-filtered-text="По вашему запросу ничего не найдено"
              :fields="historyFields">
              <template slot="index" slot-scope="data">
                <span class="index">{{ data.item.index }}</span>
              </template>
              <template slot="name" slot-scope="data">
                <b-link @click.stop="onClick(data.item)">{{ data.item.name }}</b-link>
              </template>
              <template slot="data.phone" slot-scope="data">
                <span class="phone">{{ `+${data.item.data.phone[0]} (${data.item.data.phone.substring(1, 4)}) ${data.item.data.phone.substring(5, 7)}-${data.item.data.phone.substring(8, 10)}` }}</span>
              </template>
              <template slot="task" slot-scope="data">
                <span class="task">{{ data.item.task }}</span>
              </template>
              <template slot="group" slot-scope="data">
                <span class="group">{{ data.item.group }}</span>
              </template>
              <template slot="createdTime" slot-scope="data">
                <span class="time">{{ `${data.item.createdTime.split('T')[0]} / ${data.item.createdTime.split('T')[1].substring(0, 8)}` }}</span>
              </template>
              <template slot="id" slot-scope="data">
                <span class="id">{{ data.item.id }}</span>
              </template>
            </b-table>
            <nav v-if="history.length !== 0">
              <b-pagination
                v-if="!isEmpty"
                v-model="currentPage"
                :total-rows="history.length"
                :per-page="perPage"
                prev-text="Назад"
                next-text="Вперёд">
              </b-pagination>
            </nav>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'Conversation',
  created () {
    this.$store.dispatch('init', {
      id: this.$route.params.id
    })

    this.filterFields = this.$store.state.filterConfig ? this.$store.state.filterConfig : this.$store.state.filterFields
  },
  data () {
    return {
      filterFields: null,
      fields: [
        { key: 'title', label: 'Параметр' },
        { key: 'content', label: 'Значение' }
      ],
      fieldsLog: [
        { key: 'time', label: 'Время и дата' },
        { key: 'incoming', label: 'Входящий' },
        { key: 'msg.msgId', label: 'ID Сообщения' },
        { key: 'msg.type', label: 'Тип сообщения' }
      ],
      fieldsCall: [
        { key: 'title', label: 'Параметр' },
        { key: 'content', label: 'Значение' }
      ],
      currentPage: 1, 
      perPage: 10,
      perPageOptions: [ 5, 10, 15, 20, 30, 40 ],
      filter: null,
      filterLog: null
    }
  },
  computed: {
    historyFields () {
      return this.filterFields.filter(field => field.isOn)
    },
    conversation () {
      return this.$store.state.currentConversation
    },
    history () {
      return this.$store.getters.otherConversations
    },
    isEmpty () {
      return this.fields.length === 0
    },
    information () {
      if (this.conversation !== null) {
        return [
          { title: 'ФИО', content: this.conversation.data.name },
          { title: 'Телефон', content: `+${this.conversation.data.phone[0]} (${this.conversation.data.phone.substring(1, 4)}) ${this.conversation.data.phone.substring(5, 7)}-${this.conversation.data.phone.substring(8, 10)}` },
          { title: 'Статус', content: this.conversation.data.status },
          { title: 'Временная зона', content: this.conversation.data.timezone },
          { title: 'Дата', content: this.conversation.createdTime.split('T')[0] },
          { title: 'Время', content: this.conversation.createdTime.split('T')[1].substring(0, 8) },
          { title: 'Группа', content: this.conversation.group },
          { title: 'Модель', content: this.conversation.task },
          { title: 'ID', content: this.conversation.id },
          { title: 'Кол-во звонков', content: this.conversation.results.length }
        ]
      }
    },
    isLoad () {
      return this.$store.state.currentConversation !== null
    }
  },
  methods: {
    onClick (item) {
      this.$store.commit('setCurrentConversation', item)
      this.$router.push({ path: `/conversations/${item.id}` })
    },
    onRefresh () {
      this.$store.dispatch('init')
    },
    deleteConversation (conversation) {
      this.$store.dispatch('deleteConversation', {
        conversation: conversation
      })
      this.$router.push({ path: '/conversations' })
    },
    getCallFields (call) {
      return [
        { title: 'ID', content: call.id },
        { title: 'Состояние модели', content: call.taskStatus },
        { title: 'Время завершения', content: `${call.completedTime.split('T')[0]} / ${call.completedTime.split('T')[1].substring(0, 8)}` },
        { title: 'Состояние сервиса', content: call.serviceStatus },
        { title: 'Статус', content: call.result.status },
        { title: 'Записи', content: call.records.join(' / ') }
      ]
    }
  }
}
</script>

