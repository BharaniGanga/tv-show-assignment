import { shallowMount, createLocalVue } from '@vue/test-utils';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import DetailsPage from '@/components/DetailsPage.vue';

jest.mock("axios", () => ({
  get: () =>
    Promise.resolve({
      data: [{
        id:1,
        url:"https://www.tvmaze.com/shows/1/under-the-dome",
        genres:["Drama","Science-Fiction","Thriller"],"rating":{"average":6.6},
        image:{
          medium:"https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg"
        },
        summary:"<p><b>Under the Dome</b></p>",

      }]
    })
}));

describe('HomePage.vue', () => {
  let wrapper;
  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(BootstrapVue);
    localVue.use(IconsPlugin);
    wrapper = shallowMount(DetailsPage, {
      localVue,     
    });
  });

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
it('Should search the showsDetails properly when mounted',async ()=>{
  let mockedResponse = [{"id":1,"url":"https://www.tvmaze.com/shows/1/under-the-dome","genres":
  ["Drama","Science-Fiction","Thriller"],"rating":{"average":6.6},
  "image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg"},
  "summary":"<p><b>Under the Dome</b></p>",}]
  await wrapper.vm.getTvShowDetails();
  expect(wrapper.vm.showDetails).toEqual(mockedResponse);
}) 
});
