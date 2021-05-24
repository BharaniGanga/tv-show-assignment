import { shallowMount, createLocalVue } from '@vue/test-utils';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import DetailsPage from '@/components/DetailsPage.vue';

import VueRouter from 'vue-router';
import { routes } from '@/router/index';


 /*  jest.mock('@/Service/api', () => ({
    getShowCasts: () => {
    return Promise.resolve({
      data: {  "id": 2, "name": "Under the Domesss", "rating": { "average": 6.6 },
      "image": { "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg" }, "genres": ["Drama", "Science-Fiction", "Thriller"]
     }
    })
  },
}));   */
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
      data(){
        return{
          showDetails: { "id": 2, "name": "Under the Dome", "rating": { "average": 6.6 },
          "image": { "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg" }, "genres": ["Drama", "Science-Fiction", "Thriller"]
        },
         /*  tvShowCast: [{
          "id": 2, "name": "Under the Dome", "rating": { "average": 6.6 },
          "image": { "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg" }, "genres": ["Drama", "Science-Fiction", "Thriller"]
        
        }],  */
        showSeason: [{"id": 3,
          "url": "https://www.tvmaze.com/seasons/3/person-of-interest-season-1",
          "number": 1,
          "image": {
            "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/24/60864.jpg",
          }}]
        }
      }

    });
  });

  afterEach(() => {
    wrapper.destroy();
  });
   it('is a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy();
    console.log(wrapper.html())
  }); 
 /*  it('should find p tag', () => {
    let wrappers;
    wrappers = shallowMount(DetailsPage, {
      localVue,
      router,
      data(){
        return{
          showDetails: {  "id": 2, "name": "Under the Dome", "rating": { "average": 6.6 },
          "image": { "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg" }, "genres": ["Drama", "Science-Fiction", "Thriller"]
        }
        }
      },
      propsData:{
        shows: show
      }
    }
    )
    expect(wrappers.html()).toContain("p")
  });

  it('should find h3 tag', () => {
    expect(wrapper.html()).toContain("h3")
  });  */
   it('Should search the showDetails properly when mounted', async () => {
    let mockedResponse = {
      "id": 2, "name": "Under the Dome", "rating": { "average": 6.6 },
      "image": { "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg" }, "genres": ["Drama", "Science-Fiction", "Thriller"]
    }
    await wrapper.vm.getTvShowDetails();
    console.log("shoe",wrapper.vm.showDetails)
    expect(wrapper.vm.showDetails).toEqual(mockedResponse);
  }) 

  it('Should search the showDetails properly when mounted', async () => {
    let mockedResponse = [{
      "id": 3,
          "url": "https://www.tvmaze.com/seasons/3/person-of-interest-season-1",
          "number": 1,
          "image": {
            "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/24/60864.jpg",}}]
    
    await wrapper.vm.getTvShowSeasons();
    console.log("shoe",wrapper.vm.showSeason)
    expect(wrapper.vm.showSeason).toEqual(mockedResponse);
  }) 

   

});

