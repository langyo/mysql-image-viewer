import { createI18n } from 'vue-i18n';
import { isNil } from 'lodash-es';

import langZhCN from '@res/lang/zhCN.json5';

export const i18n = createI18n({
  locale: !isNil(navigator) ? navigator.language : 'zh-CN',
  fallbackLocale: 'zh-CN',
  legacy: false,
  messages: {
    'zh-CN': langZhCN,
  },
});
