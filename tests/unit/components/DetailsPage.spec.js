import { shallowMount, createLocalVue } from '@vue/test-utils';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import DetailsPage from '@/components/DetailsPage.vue';

import VueRouter from 'vue-router';
import { routes } from '@/router/index';

const localVue = createLocalVue();

localVue.use(VueRouter);
localVue.use(BootstrapVue);
localVue.use(IconsPlugin);
describe('DetailsPage.vue', () => {
  let wrapper;
  const router = new VueRouter({ routes });
  beforeEach(() => {


    wrapper = shallowMount(DetailsPage, {
      localVue,
      router,
      propsData:{
        shows:1
      }

    });
  });

  afterEach(() => {
    wrapper.destroy();
  });
   it('is a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });
  it('should find show casts service',async () => {
    jest.mock('@/Service/api', () => ({
      get: () => {
      return Promise.resolve({
        data: true
      })
    },
  })); 

  const localWrapper=shallowMount(DetailsPage, {
    localVue,
    router,
    propsData:{
      shows: 1
    }
  }
  )

  const resp = await localWrapper.vm.getTvShowCasts();
  expect(localWrapper.vm.tvShowCast).toBeDefined(); 

  });
   it('Should search the showDetails properly when mounted', async () => {
    let mockedResponse = {
      "id": 2, "name": "Under the Dome", "rating": { "average": 6.6 },
      "image": { "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg" }, "genres": ["Drama", "Science-Fiction", "Thriller"]
    }
    await wrapper.vm.getTvShowDetails();
    expect(wrapper.vm.showDetails).toBeDefined();
  }) 

  it('Should search the seasonDetails properly when mounted', async () => {
    let mockedResponse = [{
      "id": 3,
          "url": "https://www.tvmaze.com/seasons/3/person-of-interest-season-1",
          "number": 1,
          "image": {
            "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/24/60864.jpg",}}]
    
    await wrapper.vm.getTvShowSeasons();
    expect(wrapper.vm.showSeason).toBeDefined();
  }) 

   

});

