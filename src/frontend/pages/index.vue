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
    <el-card style="width: 100%">
      <el-row>
        <el-col :span="6">
          <p class="label">{{ $t('index.databaseUrl') }}</p>
        </el-col>
        <el-col :span="18">
          <el-input
            v-model="databaseUrl"
            @change="() => setLocalStorage('databaseUrl')"
          />
        </el-col>
        <el-col :span="6">
          <p class="label">{{ $t('index.imageTableName') }}</p>
        </el-col>
        <el-col :span="18">
          <el-input
            v-model="imageTableName"
            @change="() => setLocalStorage('imageTableName')"
          />
        </el-col>
        <el-col :span="6">
          <p class="label">{{ $t('index.imageColumnName') }}</p>
        </el-col>
        <el-col :span="18">
          <el-input
            v-model="imageColumnName"
            @change="() => setLocalStorage('imageColumnName')"
          />
        </el-col>
        <el-col :span="6">
          <p class="label">{{ $t('index.imageFolderPath') }}</p>
        </el-col>
        <el-col :span="18">
          <el-input
            v-model="imageFolderPath"
            @change="() => setLocalStorage('imageFolderPath')"
          />
        </el-col>
        <el-col :span="24">
          <el-divider />
        </el-col>
        <el-col :span="24">
          <el-button size="large" @click="handleExecute">
            {{ $t('index.startParse') }}
          </el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card style="width: 100%">
      <el-table :data="result">
        <el-table-column prop="label" :label="$t('index.label')" />
        <el-table-column prop="filePath" :label="$t('index.image')">
          <template #default="scope">
            <div style="width: 100%; display: flex; align-items: center">
              <img
                :src="`/image/${scope.row.filePath}`"
                style="height: 100px; object-fit: cover"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.label {
  margin: 8px;
  font-size: 14px;
  color: var(--el-text-color-regular);
  user-select: none;
}
</style>

<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t: $t } = useI18n();

const databaseUrl = ref(
  localStorage.getItem('databaseUrl') ||
    (localStorage.setItem(
      'databaseUrl',
      'mysql://localhost:3306/test?charset=utf8mb4&user=root&password='
    ),
    localStorage.getItem('databaseUrl')) ||
    ''
);
const imageTableName = ref(
  localStorage.getItem('imageTableName') ||
    (localStorage.setItem('imageTableName', 'testTable'),
    localStorage.getItem('imageTableName')) ||
    ''
);
const imageColumnName = ref(
  localStorage.getItem('imageColumnName') ||
    (localStorage.setItem('imageColumnName', 'image'),
    localStorage.getItem('imageColumnName')) ||
    ''
);
const imageFolderPath = ref(
  localStorage.getItem('imageFolderPath') ||
    (localStorage.setItem('imageFolderPath', 'D:\\Pictures'),
    localStorage.getItem('imageFolderPath')) ||
    ''
);

function setLocalStorage(label: string) {
  switch (label) {
    case 'databaseUrl':
      localStorage.setItem('databaseUrl', databaseUrl.value);
      break;
    case 'imageTableName':
      localStorage.setItem('imageTableName', imageTableName.value);
      break;
    case 'imageColumnName':
      localStorage.setItem('imageColumnName', imageColumnName.value);
      break;
    case 'imageFolderPath':
      localStorage.setItem('imageFolderPath', imageFolderPath.value);
      break;
  }
}

interface IResult {
  label: string;
  filePath: string;
}

const result = ref<IResult[]>([{ label: 'Rin', filePath: 'rin-pizacg.jpg' }]);

async function handleExecute() {
  const res = await fetch('/execute', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      databaseUrl: databaseUrl.value,
      imageTableName: imageTableName.value,
      imageColumnName: imageColumnName.value,
      imageFolderPath: imageFolderPath.value,
    }),
  });
  const data = await res.json();
  console.log(data);
  result.value = data['data'].map((item: any) => ({
    label: `${item}`,
    filePath: `${item}`,
  }));
}
</script>

<script lang="ts">
import {
  ElRow,
  ElCol,
  ElCard,
  ElButton,
  ElInput,
  ElTable,
  ElTableColumn,
  ElDivider,
} from 'element-plus';

export default {
  components: {
    ElRow,
    ElCol,
    ElCard,
    ElButton,
    ElInput,
    ElTable,
    ElTableColumn,
    ElDivider,
  },
};
</script>
