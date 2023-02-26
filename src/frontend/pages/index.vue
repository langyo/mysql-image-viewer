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
        <el-col :span="24">
          <el-input
            v-model="databaseUrl"
            placeholder="数据库地址"
            @change="() => setLocalStorage('databaseUrl')"
          />
        </el-col>
        <el-col :span="24">
          <el-input
            v-model="sqlStatement"
            placeholder="解析语句"
            @change="() => setLocalStorage('sqlStatement')"
          />
        </el-col>
        <el-col :span="24">
          <el-input
            v-model="imageColumnName"
            placeholder="图片列名"
            @change="() => setLocalStorage('imageColumnName')"
          />
        </el-col>
        <el-col :span="24">
          <el-input
            v-model="imageFolderPath"
            placeholder="图片文件夹路径"
            @change="() => setLocalStorage('imageFolderPath')"
          />
        </el-col>
        <el-col :span="24">
          <el-button size="large">
            {{ '开始解析' }}
          </el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card style="width: 100%">
      <el-table :data="result">
        <el-table-column prop="label" label="标签" />
        <el-table-column prop="filePath" label="图片">
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
const sqlStatement = ref(
  localStorage.getItem('sqlStatement') ||
    (localStorage.setItem(
      'sqlStatement',
      'select * from test where label = "Rin"'
    ),
    localStorage.getItem('sqlStatement')) ||
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
    case 'sqlStatement':
      localStorage.setItem('sqlStatement', sqlStatement.value);
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
  },
};
</script>
