<template>
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
    <el-card shadow="never">
      <el-button size="large">
        {{ 'test' }}
      </el-button>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { t: $t } = useI18n();
</script>

<script lang="ts">
import { ElRow, ElCol, ElCard, ElButton, ElIcon } from 'element-plus';

export default {
  components: {
    ElRow,
    ElCol,
    ElCard,
    ElButton,
    ElIcon,
  },
};
</script>
