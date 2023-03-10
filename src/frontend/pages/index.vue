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
        <el-row
          style="width: 100%; margin-bottom: 8px"
          v-for="(_, index) in tagColumnNames"
          :key="index"
        >
          <el-col :span="21">
            <el-input
              v-model="tagColumnNames[index]"
              @change="(val) => handleChangeLine(index, val)"
            />
          </el-col>
          <el-col :span="3">
            <el-button type="danger" @click="() => handleRemoveLine(index)">
              {{ $t('index.removeLine') }}
            </el-button>
          </el-col>
        </el-row>
        <el-col :span="24">
          <el-button @click="handleAddLine">
            {{ $t('index.addLine') }}
          </el-button>
        </el-col>
        <el-col :span="24">
          <el-divider />
        </el-col>
        <el-col :span="24">
          <el-button type="primary" @click="handleExecute">
            {{ $t('index.startParse') }}
          </el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card style="width: 100%">
      <el-table :data="result">
        <el-table-column :label="$t('index.image')">
          <template #default="scope">
            <div style="width: 100%; display: flex; align-items: center">
              <img
                :src="`/image/${scope.row[`${imageColumnName}`]}`"
                style="height: 100px; object-fit: cover"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :prop="`${imageColumnName}`"
          :label="$t('index.label')"
        />
        <el-table-column
          v-for="tagColumnName in tagColumnNames"
          :key="tagColumnName"
          :prop="tagColumnName"
          :label="tagColumnName"
        />
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
import { isNil } from 'lodash-es';

const { t: $t } = useI18n();

const databaseUrl = ref(
  localStorage.getItem('databaseUrl') ||
    (localStorage.setItem(
      'databaseUrl',
      'mysql://localhost:3306/test?charset=utf8mb4&user=root&password=root'
    ),
    localStorage.getItem('databaseUrl')) ||
    ''
);
const imageTableName = ref(
  localStorage.getItem('imageTableName') ||
    (localStorage.setItem('imageTableName', 'image_test'),
    localStorage.getItem('imageTableName')) ||
    ''
);
const imageColumnName = ref(
  localStorage.getItem('imageColumnName') ||
    (localStorage.setItem('imageColumnName', 'images'),
    localStorage.getItem('imageColumnName')) ||
    ''
);
const tagColumnNames = ref<string[]>(
  (!isNil(localStorage.getItem('tagColumnNames')) &&
    JSON.parse(localStorage.getItem('tagColumnNames')!)) ||
    (localStorage.setItem('tagColumnNames', '[]'), []) ||
    []
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
    case 'tagColumnNames':
      localStorage.setItem(
        'tagColumnNames',
        JSON.stringify(tagColumnNames.value)
      );
      break;
    case 'imageFolderPath':
      localStorage.setItem('imageFolderPath', imageFolderPath.value);
      break;
  }
}

function handleChangeLine(index: number, val: string) {
  tagColumnNames.value[index] = val;
  setLocalStorage('tagColumnNames');
}

function handleAddLine() {
  tagColumnNames.value = [...tagColumnNames.value, ''];
  setLocalStorage('tagColumnNames');
}

function handleRemoveLine(index: number) {
  tagColumnNames.value = tagColumnNames.value.filter((_, i) => i !== index);
  setLocalStorage('tagColumnNames');
}

interface IResult {
  label: string;
  filePath: string;
}

const result = ref<IResult[]>([]);

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
      tagColumnNames: tagColumnNames.value,
      imageFolderPath: imageFolderPath.value,
    }),
  });
  const data = await res.json();
  console.log(data);
  if (data['success']) {
    result.value = data['data'];
  } else {
    ElMessage.error(data['reason']);
  }
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
  ElMessage,
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
