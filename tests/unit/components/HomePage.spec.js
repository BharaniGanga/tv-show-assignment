import { shallowMount, createLocalVue } from '@vue/test-utils';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import HomePage from '@/components/HomePage.vue';
import VueRouter from 'vue-router';
import { routes } from '@/router/index';

const categorisedShows = [{
  name: 'Thriller',
  shows: [{
    id:2,
    name: "Under the Dome",
    rating: { average: 6.6},
    image: { medium: "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg"},
    genres: ["Drama","Science-Fiction","Thriller"]
  }]
}]

jest.mock('@/Service/api', () => ({
  getAllShows: ()=>{return Promise.resolve( {data:[{"id":2,"name":"Under the Dome","rating":{"average":6.6},
  "image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg"},"genres":["Drama","Science-Fiction","Thriller"]}]} )},
}));

describe('HomePage.vue', () => {
  let wrapper;
  const router = new VueRouter({ routes });
  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(BootstrapVue);
    localVue.use(IconsPlugin);
    wrapper = shallowMount(HomePage, {
      localVue,
      router,
      data() {
        return {
          showsList: [],
          categorisedShows: categorisedShows,
          categories: [
            "Action",
            "Crime",
            "Science-Fiction",
            "Horror",
            "Thriller",
            "War",
            "Western",
          ],
        }
      }
        
    });
  });

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });
   it('Should call redirectToShowDetailsPage when image is clicked',()=>{
    wrapper.vm.goToDetails=jest.fn();
    wrapper.find('img').trigger('click')
    expect(wrapper.vm.goToDetails).toHaveBeenCalled();
    //const img = wrapper.find('img');
    //console.log("Image tag", img);
  }) 
  it('Should call redirectToShowDetailsPage when image is clicked',() => {
    const imgtest = wrapper.find('img');
    expect(imgtest.element.id).toBe('images');
  });
  it('calling the router',()=>{
    wrapper.vm.$router.push= jest.fn();
    wrapper.vm.goToDetails(1);
        expect(wrapper.vm.$router.push).toHaveBeenCalled();
  })
  it('Should load the shows data properly when mounted',async ()=>{
    let mockedResponse = [{"id":2,"name":"Under the Dome","rating":{"average":6.6},
    "image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg"},"genres":["Drama","Science-Fiction","Thriller"]}]
    await wrapper.vm.getAllTvShows()
    expect(wrapper.vm.showsList).toEqual(mockedResponse);
  })
  afterEach(() => {
    wrapper.destroy();
  });
});
