<template>
  <div v-if="isLoad" class="animated fadeIn">
    <b-row>
      <b-col>
        <b-card>
          <b-card-body>
              <div class="table-filter">
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
            <nav>
              <b-pagination
                v-if="!isEmpty"
                v-model="currentPage"
                :total-rows="clients.length"
                :per-page="perPage"
                prev-text="Назад"
                next-text="Вперёд">
              </b-pagination>
            </nav>
            <b-table
              v-if="!isEmpty"
              responsive
              show-empty
              empty-text="Нет записей"
              empty-filtered-text="По вашему запросу ничего не найдено"
              hover
              bordered
              :items="clients"
              :fields="fields"
              :current-page="currentPage"
              :per-page="perPage"
              :filter="filter">
              <template slot="index" slot-scope="data">
                <span class="index">{{ data.item.index }}</span>
              </template>
              <template slot="name" slot-scope="data">
                <b-link @click.stop="onClick(data.item)" class="name">{{ data.item.name }}</b-link>
              </template>
              <template slot="data.phone" slot-scope="data">
                <span class="phone">{{ `+${data.item.data.phone[0]} (${data.item.data.phone.substring(1, 4)}) ${data.item.data.phone.substring(5, 7)}-${data.item.data.phone.substring(8, 10)}` }}</span>
              </template>
              <template slot="group" slot-scope="data">
                <span class="group">{{ data.item.group }}</span>
              </template>
              <template slot="task" slot-scope="data">
                <span class="task">{{ data.item.task }}</span>
              </template>
              <template slot="createdTime" slot-scope="data">
                <span class="time">{{ `${data.item.createdTime.split('T')[0]} / ${data.item.createdTime.split('T')[1].substring(0, 8)}` }}</span>
              </template>
              <template slot="id" slot-scope="data">
                <span class="id">{{ data.item.id }}</span>
              </template>
            </b-table>
            <nav>
              <b-pagination v-if="!isEmpty" v-model="currentPage" :total-rows="clients.length" :per-page="perPage" prev-text="Назад" next-text="Вперёд"></b-pagination>
            </nav>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
const $ = require('jquery')

export default {
  name: 'Conversations',
  created () {
    this.$store.dispatch('init')
    this.filterFields = this.$store.state.filterConfig ? this.$store.state.filterConfig : this.$store.state.filterFields
  },
  data () {
    return {
      filterFields: [],
      currentPage: 1,
      perPage: 10,
      perPageOptions: [
        5, 10, 15, 20, 30, 40
      ],
      filter: null,
    }
  },
  computed: {
    fields () {
      return this.filterFields.filter(field => field.isOn)
    },
    isEmpty () {
      return this.fields.length === 0
    },
    clients () {
      return this.$store.state.conversations
    },
    isLoad () {
      return this.$store.state.conversations !== null
    }
  },
  methods: {
    onClick (item) {
      this.$store.commit('setCurrentConversation', item)
      this.$store.commit('setFilterConfig', this.filterFields)
      this.$router.push({ path: `/conversations/${item.id}` })
    },
    onRefresh () {
      this.$store.dispatch('init')
    }
  }
}
</script>

