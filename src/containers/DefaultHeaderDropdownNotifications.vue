<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <i class="icon-bell"></i>
    </template>
    <template slot="dropdown">
      <b-dropdown-header
        tag="div"
        class="text-center">
        <strong>Оповещания</strong>
      </b-dropdown-header>
      <b-dropdown-item>
        Нет новых оповещаний
      </b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'

export default {
  name: 'DefaultHeaderDropdownNotifications',
  components: {
    AppHeaderDropdown
  }
}
</script>

