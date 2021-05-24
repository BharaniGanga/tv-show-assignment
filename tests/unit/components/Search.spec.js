import { shallowMount, createLocalVue } from '@vue/test-utils';
import search from '@/components/Search.vue';
import VueRouter from 'vue-router';
import { routes } from '@/router/index';

jest.mock('@/Service/api', () => ({
  searchShows: () => {
    return Promise.resolve({
      data: [{
        "score": 27.562412, "show": {
          "id": 2, "name": "Under the Dome", "rating": { "average": 6.6 },
          "image": { "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg" }, "genres": ["Drama", "Science-Fiction", "Thriller"]
        }
      }]
    })
  },
}));
const localVue = createLocalVue();
localVue.use(VueRouter);
describe('Search.vue', () => {
  let searchWrapper;
  const router = new VueRouter({ routes });
  beforeEach(() => {


    searchWrapper = shallowMount(search, {
      localVue,
      router,
      propsData: {
        shows: {
          "id": 1, "url": "https://www.tvmaze.com/shows/1/under-the-dome", "genres":
            ["Drama", "Science-Fiction", "Thriller"], "rating": { "average": 6.6 },
          "image": { "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg" },
          "summary": "<p><b>Under the Dome</b></p>",
        }
      }
    });
  });

  afterEach(() => {
    searchWrapper.destroy();
  });
  it('is a Vue instance', () => {
    expect(searchWrapper.isVueInstance).toBeTruthy();
  });
  it('calling the router', () => {
    searchWrapper.vm.$router.push = jest.fn();
    searchWrapper.vm.goToDetails(1);
    expect(searchWrapper.vm.$router.push).toHaveBeenCalled();
  })

  it('Should search the shows properly when mounted', async () => {
    let mockedResponse = [{
      "score": 27.562412, "show": {
        "id": 2, "name": "Under the Dome", "rating": { "average": 6.6 },
        "image": { "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg" }, "genres": ["Drama", "Science-Fiction", "Thriller"]
      }
    }]
    await searchWrapper.vm.searchTvShow();
    expect(searchWrapper.vm.searchList).toEqual(mockedResponse);
  })

  it('calling the router', () => {
    let wrapper;
    wrapper = shallowMount(search, {
      localVue,
      router,
      propsData: {
        shows: undefined
      }
    }
    )
    wrapper.vm.$router.push = jest.fn();
    wrapper.vm.searchTvShow();
    expect(wrapper.vm.$route.path).toBe('/');
  })

});
