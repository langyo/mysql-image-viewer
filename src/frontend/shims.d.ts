/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent;
  export default component;
}

declare module '*.scss' {
  const $c: { [key: string]: string };
  export default $c;
}

declare module '*.json5' {
  const value: any;
  export default value;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.ico' {
  const base64: string;
  export default base64;
}

declare module '*.png' {
  const base64: string;
  export default base64;
}
