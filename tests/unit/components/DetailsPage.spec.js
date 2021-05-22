import { shallowMount, createLocalVue } from '@vue/test-utils';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import DetailsPage from '@/components/DetailsPage.vue';

import VueRouter from 'vue-router';
import { routes } from '@/router/index';

 const cast = [{
  person: {
    id: 1,
    url: "https://www.tvmaze.com/people/1/mike-vogel",
    name: "Mike Vogel",
    image:
    {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/0/1815.jpg"
    },
  }
}] 
 const season = [{
  id: 3,
  url: "https://www.tvmaze.com/seasons/3/person-of-interest-season-1",
  number: 1,
  image:{
    medium: "https://static.tvmaze.com/uploads/images/medium_portrait/24/60864.jpg",
    }

}] 

/* const show = [{
  id: 2,
  name: "Under the Dome",
  rating: {
     average: 6.6 
    },
  image: {
    medium: "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg" 
  },
  genres: ["Drama", "Science-Fiction", "Thriller"]
      
}] */

/* jest.mock('@/Service/api', () => ({
  getShowDetails: () => {
    return Promise.resolve({
      data: [{"id":1,"url":"https://www.tvmaze.com/shows/1/under-the-dome","name":"Under the Dome","type":"Scripted","language":"English","genres":["Drama","Science-Fiction","Thriller"],"status":"Ended","runtime":60,"averageRuntime":60,"premiered":"2013-06-24","officialSite":"http://www.cbs.com/shows/under-the-dome/","schedule":{"time":"22:00","days":["Thursday"]},"rating":{"average":6.6},"weight":96,"network":{"id":2,"name":"CBS","country":{"name":"United States","code":"US","timezone":"America/New_York"}},"webChannel":null,"dvdCountry":null,"externals":{"tvrage":25988,"thetvdb":264492,"imdb":"tt1553656"},"image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg","original":"https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg"},"summary":"<p><b>Under the Dome</b> is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome. The town's inhabitants must deal with surviving the post-apocalyptic conditions while searching for answers about the dome, where it came from and if and when it will go away.</p>","updated":1621201742,"_links":{"self":{"href":"https://api.tvmaze.com/shows/1"},"previousepisode":{"href":"https://api.tvmaze.com/episodes/185054"}}}]
    })
  },
})); */
jest.mock("axios", () => ({
  get: () => {
    return Promise.resolve({
      data: [{"person": { "id": 1, "url": "https://www.tvmaze.com/people/1/mike-vogel", "name": "Mike Vogel", "image": { "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/0/1815.jpg" } },}]
    })
  },
}));
const localVue = createLocalVue();

localVue.use(VueRouter);
localVue.use(BootstrapVue);
localVue.use(IconsPlugin);
describe('HomePage.vue', () => {
  let wrapper;
  const router = new VueRouter({ routes });
  beforeEach(() => {
    const localVue = createLocalVue();

    localVue.use(VueRouter);
    localVue.use(BootstrapVue);
    localVue.use(IconsPlugin);
    wrapper = shallowMount(DetailsPage, {
      localVue,
      router,
      data() {
        return {
          showDetails: {"id": 2, "name": "Under the Dome", "rating": { "average": 6.6 },
          "image": { "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg" }, "genres": ["Drama", "Science-Fiction", "Thriller"]
        },
          tvShowCast: cast,
          showSeason: season,
          
        };
      },
  
    }
    )
  })

  afterEach(() => {
    wrapper.destroy();
  });
  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });
  it('should find p tag', () => {
    expect(wrapper.html()).toContain("p")
  });

  it('should find b tag', () => {
    expect(wrapper.html()).toContain("b")
  });
   /* it('calling the router', () => {
    let detailsWrapper;
    detailsWrapper = shallowMount(DetailsPage, {
      localVue,
      router,
      propsData: {
        shows: undefined
      }
    }
    )
    detailsWrapper.vm.$router.push = jest.fn();
    detailsWrapper.vm.getTvShowDetails();
    expect(wrapper.vm.$route.path).toBe('/');
 }) */
   it('Should search the showDetails properly when mounted', async () => {
    let mockedResponse = {
      "id": 2, "name": "Under the Dome", "rating": { "average": 6.6 },
        "image": { "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg" }, "genres": ["Drama", "Science-Fiction", "Thriller"]
      }
    await wrapper.vm.getTvShowDetails();
    expect(wrapper.vm.showDetails).toEqual(mockedResponse);
  }) 
  /* it('Should search the showDetails properly when mounted', async () => {
    let mockedResponse = [{
      "person": { "id": 1, "url": "https://www.tvmaze.com/people/1/mike-vogel", "name": "Mike Vogel", "image": { "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/0/1815.jpg" } },
   }]
    await wrapper.vm.getTvShowCasts();
    //wrapper.vm.not.toBe(undefined);
    expect(wrapper.find("shows").exists()).not.toBe(undefined)
    //expect(wrapper.vm.tvShowCast).toEqual(mockedResponse);
  })  */

  it('Should search the CastDetails properly when mounted', async () => {
    let mockedResponse = [{
      "person": { "id": 1, "url": "https://www.tvmaze.com/people/1/mike-vogel", "name": "Mike Vogel", "image": { "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/0/1815.jpg" } },
    }]
    
    await wrapper.vm.getTvShowCasts();
    //wrapper.vm.getShowCasts.toHaveBeenCalled();
    //wrapper.vm.shows=1;
    console.log("tvshows",wrapper.vm.tvShowCast)
    expect(wrapper.vm.tvShowCast).toEqual(mockedResponse);
  }) 


});