import { shallowMount, createLocalVue } from '@vue/test-utils';
import search from '@/components/Search.vue';
import VueRouter from 'vue-router';
import { routes } from '@/router/index';

jest.mock('@/Service/api', () => ({
  searchShows: ()=>{return Promise.resolve( {data:[{"score":27.562412,"show":{"id":2,"name":"Under the Dome","rating":{"average":6.6},
  "image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg"},"genres":["Drama","Science-Fiction","Thriller"]}}]} )},
}));

describe('Search.vue', () => {
  let searchWrapper;
  const router = new VueRouter({ routes });
  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    searchWrapper = shallowMount(search, {
      localVue,
      router,
    });
  });

  afterEach(() => {
    searchWrapper.destroy();
  });
  it('is a Vue instance', () => {
    expect(searchWrapper.isVueInstance).toBeTruthy();
  });
  it('calling the router',()=>{
    searchWrapper.vm.$router.push= jest.fn();
    searchWrapper.vm.goToDetails(1);
        expect(searchWrapper.vm.$router.push).toHaveBeenCalled();
  })
  
  it('Should search the shows properly when mounted',async ()=>{
    let mockedResponse = [{"score":27.562412,"show":{"id":2,"name":"Under the Dome","rating":{"average":6.6},
    "image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg"},"genres":["Drama","Science-Fiction","Thriller"]}}]
    await searchWrapper.vm.searchTvShow();
    expect(searchWrapper.vm.searchList).toEqual(mockedResponse);
  }) 

});
