import { shallowMount, createLocalVue } from '@vue/test-utils';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Navbar from '@/components/Navbar.vue';
import VueRouter from 'vue-router';
import { routes } from '@/router/index';


describe('Navbar.vue', () => {
  let wrapper;
  const router = new VueRouter({ routes });
  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(BootstrapVue);
    localVue.use(IconsPlugin);
    wrapper = shallowMount(Navbar, {
      localVue,
      router,
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });
  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });
  it('calling the router',()=>{
    wrapper.vm.$router.push= jest.fn();
    wrapper.vm.goToSearch();
        expect(wrapper.vm.$router.push).toHaveBeenCalled();
  })
});
