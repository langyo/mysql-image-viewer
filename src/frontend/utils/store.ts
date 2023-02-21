import { defineStore } from 'pinia';
import { createInstance } from 'localforage';

const { getItem, setItem } = createInstance({
  name: 'mysql-image-viewer',
});

export const useStore = defineStore<
  'status',
  {
    initialized: boolean;
  },
  {},
  {
    init: () => Promise<void>;
  }
>('status', {
  state: () => ({
    initialized: false,

    loginName: '',
    loginToken: '',
    loginDepartment: '',
    loginLevel: '',
  }),
  actions: {
    async init() {
      this.initialized = true;
    },
  },
});
