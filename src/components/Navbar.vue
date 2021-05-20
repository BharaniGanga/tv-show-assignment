<template>
  <div>
    <b-navbar toggleable="sm" type="dark" variant="info">
      <b-navbar-brand class="text-white navbar ml-1">
        <router-link class="nav-link" :to="{ name: 'HomePage' }">
          <b-icon icon="display" class="navbar-icon"></b-icon>
          TVSHOWS
        </router-link>
      </b-navbar-brand>
      <div class="ml-auto float-right">
        <div class="search">
          <div class="input-group col-md-3">
            <input
              type="text"
              class="form-control"
              size="sm"
              placeholder="Search"
              v-model="inputValue"
            />
            <button
              class="btn btn-secondary"
              type="button"
              :disabled="!inputValue"
              @click="goToSearch()"
            >
              <b>Search</b>
            </button>
          </div>
        </div>
      </div>
    </b-navbar>
  </div>
</template>
<script>
export default {
  name: "Navbar",
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    goToSearch() {
      this.$router.push({
        name: "Search",
        params: {
          shows: this.inputValue,
        },
      });
    },
  },
};
</script>
<style scoped>
.search{
     height: 86px;
    padding-right: 1px;
    position: absolute;
    right: 15px;
    width: 50%;
    margin-top: -20px;
}
</style>