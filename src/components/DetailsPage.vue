<template>
  <div v-if="isDataNotNull">
    <div class="container">
      <h3 class="heading">Details of movie {{ showDetails.name }}</h3>
      <img
        :src="showDetails.image.medium"
        max-height="200"
        v-if="showDetails.image"
      />
      <div v-else>
        <h6>Image not Available</h6>
      </div>
      <div>
        <span>
          <b-icon icon="star-fill" class="star-icon"></b-icon>
        </span>
        <span class="show-Details" v-if="showDetails.rating">
          {{ showDetails.rating.average }}
        </span>
      </div>
      <div class="show-Details" v-if="showDetails.language">
        <b>Language: {{ showDetails.language }}</b>
      </div>
      <div v-else class="show-Details">NA</div>
      <div>
        <div class="show-Details" v-if="showDetails.premiered">
          <b>Premiered on: {{ showDetails.premiered }}</b>
        </div>
        <span class="show-Details" v-else>Not Available</span>
      </div>
      <h3 class="heading">Summary</h3>
      <p class="show-Details" v-html="showDetails.summary"></p>
      <h6 class="show-Details">official Link:</h6>
      <p v-if="showDetails.officialSite" class="text-color">
        <a :href="showDetails.officialSite">{{ showDetails.officialSite }}</a>
      </p>
      <p class="show-Details" v-else>Not Available</p>
      <h3 class="heading">Seasons Available</h3>
      <div class="row">
        <div
          class="movie-season col-md-3 col-sm-3 col xs-3"
          v-for="(season, index) in showSeason"
          :key="index"
        >
          <div>
            <img
              width="150"
              height="150"
              :src="season.image.medium"
              v-if="season.image"
            />
            <div v-else>Image not Available</div>
            <p class="sub-heading">Season{{ season.number }}</p>
          </div>
        </div>
      </div>
      <h3 class="heading">Cast</h3>
      <div class="row">
        <div
          class="movie-image col-md-3 col-sm-3 col xs-3"
          v-for="(cast, index) in tvShowCast"
          :key="index"
        >
          <div class="container">
             <img
              class="shows-cast"
              width="50"
              height="100"
              :src="cast.person.image.medium"
              v-if="cast.person.image"
            />
            <div v-else>Image not Available</div> 
            <p class="sub-heading">
              {{ cast.person.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h3 class="text-danger">No Data Found...!!!</h3>
  </div>
</template>
<script>
import { getShowDetails } from "@/Service/api.js";
import { getShowSeason } from "@/Service/api.js";
import { getShowCasts } from "@/Service/api.js";

export default {
  name: "DetailsPage",
  data() {
    return {
      showDetails: {},
      tvShowCast: [],
      showSeason: [],
      isDataNotNull: true,
    };
  },
  props: ["shows"],
  mounted() {
    if (this.shows !== undefined) {
    this.getTvShowDetails();
    this.getTvShowSeasons();
    this.getTvShowCasts();
    }
    else{
      this.isDataNotNull=false;
    }
  },

  methods: {
    getTvShowDetails() {
        getShowDetails(this.shows)
          .then((response) => {
            this.showDetails = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    getTvShowSeasons() {
        getShowSeason(this.shows)
          .then((response) => {
            this.showSeason = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    getTvShowCasts() {
        getShowCasts(this.shows)
          .then((response) => {
            this.tvShowCast = response.data;
          })
          .catch((error) => {
            console.log(error);
          }); 
    },
  },
};
</script>
<style scoped>
.showName {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 40px;
  color: rgb(162, 201, 201);
}

.star-icon {
  color: rgb(207, 204, 25);
}
.heading {
  font-style: italic;
  color: rgb(116, 199, 224);
}
.sub-heading {
  color: rgb(252, 252, 248);
}
.show-Details {
  color: beige;
}
.shows-cast {
  border-radius: 50%;
}
</style>
