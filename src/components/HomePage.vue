<template>
  <div>
    <div class="container">
      <div class="outer-div">
        <div class="row">
          <div class="heading">Popular Shows</div>
          <div class="scroll">
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
                  <span class="show-rating" v-if="shows.rating">
                    {{ shows.rating.average }}
                  </span>
                </div>
                <p class="showName">{{ shows.name }}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="tvShowLists row"
          v-for="shows in categorisedShows"
          :key="shows.id"
        >
          <p class="heading">{{ shows.name }}</p>

          <div class="scroll">
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
                <span class="show-rating" v-if="show.rating">
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
      categories: [],
      filteredShows: [],
    };
  },

  mounted() {
    this.getAllTvShows();
  },

  methods: {
    getAllTvShows() {
      getAllShows()
        .then((response) => {
          this.showsList = response.data;
          this.showsList.forEach((shows) => {
            if (shows.rating.average > 9) {
              this.filteredShows.push(shows);
            }
          });

          const set = new Set();
          this.showsList.forEach((i) => {
            i.genres.forEach((j) => {
              set.add(j);
            });
          });
          this.categories = [...set];
          this.categorisedShows = this.categories.map((genre) => {
            const shows = this.showsList
              .filter((show) => show.genres.includes(genre))
              .sort((a, b) => b.rating.average - a.rating.average);
            return { name: genre, shows };
          });
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
  font-size: 30px;
  color: rgb(116, 199, 224);
}
.col-md-3 {
  padding: 15px;
}
.showName {
  font-style: oblique;
  font-size: 15px;
  color: rgba(234, 238, 240, 0.966);
}
.star-icon {
  color: rgb(207, 204, 25);
}
.show-rating{
  color: white;
}
.scroll {
  display: flex;
  overflow-x: auto;
}
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  padding: 100px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  padding: 100px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
  padding: 100px;
}
</style>
