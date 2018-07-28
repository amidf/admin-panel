<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <img
        src="img/avatars/1.jpg"
        class="img-avatar"
        alt="admin@bootstrapmaster.com" />
    </template>
    <template slot="dropdown">
      <b-dropdown-header
        tag="div"
        class="text-center">
        <strong>Настройки</strong>
      </b-dropdown-header>
      <b-dropdown-item><i class="fa fa-user" /> Профиль</b-dropdown-item>
      <b-dropdown-item><i class="fa fa-wrench" /> Настройки</b-dropdown-item>
      <b-dropdown-divider />
      <b-dropdown-item><i class="fa fa-lock" /> Выйти</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  }
}
</script>
