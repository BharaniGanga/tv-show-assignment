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

jest.mock("axios", () => ({
  get: () =>
    Promise.resolve({
      data: [{
        id: 1,
        url: "https://www.tvmaze.com/shows/1/under-the-dome",
        genres: ["Drama", "Science-Fiction", "Thriller"], "rating": { "average": 6.6 },
        image: {
          medium: "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg"
        },
        summary: "<p><b>Under the Dome</b></p>",

      }],
    })
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
          tvShowCast: cast,
          showSeason: season,
          propsData: {
            shows : {"id":1,"url":"https://www.tvmaze.com/shows/1/under-the-dome","genres":
            ["Drama","Science-Fiction","Thriller"],"rating":{"average":6.6},
            "image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg"},
            "summary":"<p><b>Under the Dome</b></p>",}
          }
        };
      },
  
    }
    )
  })

  afterEach(() => {
    wrapper.destroy();
   // console.log(wrapper.html());
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
      data() {
        return {
          tvShowCast: cast,
        };
      },
      propsData: {
        shows: undefined
      }
    }
    )
    detailsWrapper.vm.$router.push = jest.fn();
    detailsWrapper.vm.getTvShowDetails();
    expect(wrapper.vm.$route.path).toBe('/');
  }) */
   it('Should search the CastDetails properly when mounted', async () => {
    let mockedResponse = [{
      "person": { "id": 1, "url": "https://www.tvmaze.com/people/1/mike-vogel", "name": "Mike Vogel", "image": { "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/0/1815.jpg" } },
    }]
    await wrapper.vm.getTvShowCasts();
    expect(wrapper.vm.tvShowCast).toEqual(mockedResponse);
  }) 
   it('Should search the showDetails properly when mounted', async () => {
    let mockedResponse = [{
      "person": { "id":1,"url":"https://www.tvmaze.com/shows/1/under-the-dome","genres":
            ["Drama","Science-Fiction","Thriller"],"rating":{"average":6.6},
            "image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg"},
            "summary":"<p><b>Under the Dome</b></p>",}}]
    await wrapper.vm.getTvShowDetails();
    expect(wrapper.vm.showDetails).toEqual(mockedResponse);
  }) 

});