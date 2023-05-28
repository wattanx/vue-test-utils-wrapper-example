import Vue from "vue";
import type { MountOptions, Wrapper } from "@vue/test-utils";
import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import type { Component } from "vue";

export type GlobalMountOptions = {
  plugins?: any[];
  /**
   * Customizes Vue application global configuration
   * @see https://v3.vuejs.org/api/application-config.html#application-config
   */
  config?: any;
  /**
   * Applies a mixin for components under testing.
   * @see https://test-utils.vuejs.org/api/#global-mixins
   */
  mixins?: any[];
  /**
   * Mocks a global instance property.
   * This is designed to mock variables injected by third party plugins, not
   * Vue's native properties such as $root, $children, etc.
   * @see https://test-utils.vuejs.org/api/#global-mocks
   */
  mocks?: Record<string, any>;
  /**
   * Provides data to be received in a setup function via `inject`.
   * @see https://test-utils.vuejs.org/api/#global-provide
   */
  provide?: Record<any, any>;
  /**
   * Registers components globally for components under testing.
   * @see https://test-utils.vuejs.org/api/#global-components
   */
  components?: Record<string, Component | object>;
  /**
   * Registers a directive globally for components under testing
   * @see https://test-utils.vuejs.org/api/#global-directives
   */
  directives?: Record<string, any>;
  /**
   * Stubs a component for components under testing.
   * @default "{ transition: true, 'transition-group': true }"
   * @see https://test-utils.vuejs.org/api/#global-stubs
   */
  stubs?: any;
  /**
   * Allows rendering the default slot content, even when using
   * `shallow` or `shallowMount`.
   * @default false
   * @see https://test-utils.vuejs.org/api/#global-renderstubdefaultslot
   */
  renderStubDefaultSlot?: boolean;
};

export interface WrapperMountOptions
  extends Omit<
    MountOptions<Vue>,
    "propsData" | "mocks" | "stubs" | "localVue"
  > {
  /** @deprecated use props instead. */
  propsData?: Record<string, any>;
  props?: Record<string, any>;
  globals?: GlobalMountOptions;

  /**
   * @deprecated use `globals.mocks` instead.
   */
  mocks?: Record<string, any>;

  /**
   * @deprecated use `globals.stubs` instead.
   */
  stubs?: Record<string, any>;
}

export interface WrapperMountReturnType extends Omit<Wrapper<Vue>, "destroy"> {
  /**
   * @deprecated use `unmount` instead.
   */
  destroy: () => void;
  unmount: () => void;
}

export async function mountWrapper(
  component: any,
  options: WrapperMountOptions,
  shallow: boolean = false
): Promise<WrapperMountReturnType> {
  const localVue = createLocalVue();

  if (options.globals && options.globals.plugins) {
    const vuex = await import("vuex");
    const store = options.globals.plugins?.find(
      (plugin) => plugin instanceof vuex.Store
    );

    if (store) {
      localVue.use(vuex);
      // @ts-ignore
      options.store = store;
    }
  }

  options.mocks = options.globals?.mocks;
  options.stubs = options.globals?.stubs;

  if (!options.propsData && !!options.props) {
    options.propsData = options.props;
    delete options.props;
  }

  // @ts-ignore
  options.localVue = localVue;

  const wrapper = shallow
    ? shallowMount(component, options)
    : mount(component, options);

  return Object.assign(wrapper, {
    unmount: () => wrapper.destroy(),
  });
}
