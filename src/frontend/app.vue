<template>
  <div v-if="initialized">
    <el-container direction="column">
      <el-header
        style="
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          padding: 0 16px;
          background: linear-gradient(
            to bottom,
            var(--el-color-primary) -200%,
            rgba(0, 0, 0, 0) 1000%
          );
          backdrop-filter: blur(4px);
          color: var(--el-color-white);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          user-select: none;
        "
      >
        <span
          style="
            height: 24px;
            line-height: 24px;
            font-size: 24px;
            margin-bottom: 4px;
          "
        >
          {{ $t('index.title') }}
        </span>
      </el-header>

      <el-main>
        <div
          style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: max-content;
          "
        >
          <router-view />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss">
*,
html,
body {
  margin: 0px;
  padding: 0px;
  outline: none;
  box-sizing: border-box;
  background: transparent;
  font-family: sans-serif;
}

button,
h1,
h2,
h3,
h4,
h5,
h6,
a {
  outline: none;
  text-decoration: none;
}
</style>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useStore } from '@/utils/store';

const { t: $t } = useI18n();
const route = useRoute();
const router = useRouter();
const store = useStore();
const initialized = computed(() => store.initialized);

onMounted(async () => {
  await store.init();
});

const isDrawerOpen = ref(false);

function linkTo(name: string) {
  router.push({ name });
  isDrawerOpen.value = false;
}

function logout() {
  router.push({ name: 'login' });
  isDrawerOpen.value = false;
}
</script>

<script lang="ts">
import {
  ElContainer,
  ElButton,
  ElDrawer,
  ElAvatar,
  ElDivider,
  ElIcon,
  ElHeader,
  ElMain,
} from 'element-plus';
import { RouterView } from 'vue-router';

export default {
  components: {
    ElContainer,
    ElButton,
    ElDrawer,
    ElAvatar,
    ElDivider,
    ElIcon,
    ElHeader,
    ElMain,

    RouterView,
  },
};
</script>
