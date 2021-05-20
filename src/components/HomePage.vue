<template>
  <div>
    <!--<p class="heading">Popular Shows</p>-->

    <div class="container">
      <div class="outer-div">
        <!-- <div class="row">
          <div
            class="tvShowList col-md-3"
            v-for="shows in filteredShows"
            :key="shows.id"
          >
            <div class="movies">
              <img
                class="images"
                :src="shows.image.medium"
                width="200"
                height="200"
                :alt="shows.image.original"
                @click="goToDetails(shows.id)"
              />
              <div>
                <span>
                  <b-icon icon="star-fill" class="star-icon"></b-icon>
                </span>
                <span class="ml-1 text-white" v-if="shows.rating">
                  {{ shows.rating.average }}
                </span>
              </div>

              <p class="showName">{{ shows.name }}</p>
            </div>
          </div>
        </div> -->
        <div class="row">
          <div
            class="tvShowLists row"
            v-for="shows in categorisedShows"
            :key="shows.id"
          >
            <p class="heading">{{ shows.name }}</p>
            <div class="col-md-3" v-for="show in shows.shows" :key="show.id">
              <img
                id="images"
                :src="show.image.medium"
                width="200"
                height="200"
                :alt="show.image.original"
                @click="goToDetails(show.id)"
              />
              <div>
                <span>
                  <b-icon icon="star-fill" class="star-icon"></b-icon>
                </span>
                <span class="ml-1 text-white" v-if="show.rating">
                  {{ show.rating.average }}
                </span>
              </div>
              <p class="showName">{{ show.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllShows } from "@/Service/api";

export default {
  name: "HomePage",
  data() {
    return {     
      showsList: [],
      categorisedShows: [],
      categories: [
        "Action",
        "Crime",
        "Science-Fiction",
        "Horror",
        "Thriller",
        "War",
        "Western",
      ],
    };
  },

  mounted() {
    this.getAllTvShows();
  },

  methods: {
    getAllTvShows() {
      getAllShows().then((response) => {
          this.showsList = response.data;
          for (var j = 0; j < this.categories.length; j++) {
            let shw = [];
            this.showsList.forEach((i) => {
              if (i.genres.includes(this.categories[j])) {
                if (i.rating.average >= 8.5) {
                  shw.push(i);
                }
                shw.sort(function (a, b) {
                  return b.rating.average - a.rating.average;
                });
              }
            });
            const computedShows = {
              name: this.categories[j],
              shows: shw,
            };

            this.categorisedShows.push(computedShows);
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
img {
  cursor: pointer;
  border-radius: 0%;
}
img:hover {
  border: 1px solid #777;
  border-radius: 1%;
}
.outer-div {
  margin: 5%;
}
.heading {
  font-style: italic;
  font-size: 50px;
  color: rgb(116, 199, 224);
}
.rating {
  font-style: oblique;
  font-size: 15px;
  color: rgba(234, 238, 240, 0.966);
}
.showName {
  font-style: oblique;
  font-size: 15px;
  color: rgba(234, 238, 240, 0.966);
}
.star-icon {
  color: rgb(207, 204, 25);
}
</style>
