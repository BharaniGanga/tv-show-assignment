<template>
  <div>
    <div v-if="searchList.length">
      <div>
        <br />
        <div class="row">
          <div
            class="tvShowList col-md-3 col-sm-3 col xs-3"
            v-for="shows in searchList"
            :key="shows.id"
          >
            <div class="movies">
              <img
                class="show-image"
                :src="shows.show.image.medium"
                width="200"
                height="200"
                :alt="shows.show.name"
                v-if="shows.show.image"
                @click="goToDetails(shows.show.id)"
              />
              <div v-else style="margin-left: 60px">
                <img
                  class="card"
                  width="200"
                  height="200"
                  alt="Image"
                  @click="goToDetails(shows.show.id)"
                />
              </div>
            </div>
            <p class="showName">{{ shows.show.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h1 class="no-shows"><strong>No results found</strong></h1>
    </div>
  </div>
</template>

<script>
import { searchShows } from "@/Service/api";

export default {
  name: "Search",
  data() {
    return {
      searchList: [],
      searchListIsNotEmpty: true,
    };
  },
  mounted() {
    this.searchTvShow();
  },
  props: ["shows"],
  methods: {
    searchTvShow() {
      if (this.shows === undefined) {
        this.$router.push({ name: "HomePage" });
      } else {
        searchShows(this.shows)
          .then((response) => {
            this.searchList = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    goToDetails(id) {
      this.$router.push({
        name: "DetailsPage",
        params: {
          shows: id,
        },
      });
    },
  },
};
</script>

<style scoped>
.showName {
  color: rgb(243, 243, 245);
}
.no-shows {
  color: yellow;
}
</style>
