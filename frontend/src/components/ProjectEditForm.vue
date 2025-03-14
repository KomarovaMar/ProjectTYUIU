<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-center">
          <span v-if="!props.new">Редактирование проекта</span>
          <span v-if="props.new">Новый проект</span>
        </div>
      </q-card-section>

      <q-card-section>
        <q-input label="Название" v-model="name" dense />
        <q-input label="Описание" v-model="description" type="textarea" dense />
        <q-select
          v-model="status"
          :options="statusesDict"
          label="Статус"
          emit-value
          :display-value="getStatusLabel(status)"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="Сохранить" @click="onOKClick" />
        <q-btn color="primary" label="Отмена" @click="onDialogCancel" />
        <q-btn
          v-if="!props.new"
          color="red"
          label="Удалить"
          @click="onDelete"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import {
  CreateUpdateProjectDto,
  ProjectDto,
  ProjectStatus,
} from '../../../backend/src/common/types';
import { Ref, ref } from 'vue';
import * as api from '../api/project.api';

interface ProjectEditProps {
  new: boolean;
  project?: ProjectDto;
}

type StatusRecord = {
  label: string;
  value: ProjectStatus;
};

const props = defineProps<ProjectEditProps>();

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const name = ref(props.project ? props.project.name : '');
const description = ref(props.project ? props.project.description : '');
const status: Ref<ProjectStatus> = ref(
  props.project ? props.project.status : ProjectStatus.new
);

const statusesDict: StatusRecord[] = [
  {
    label: 'Новый',
    value: ProjectStatus.new,
  },
  {
    label: 'В процессе',
    value: ProjectStatus.inProgress,
  },
  {
    label: 'Завершен',
    value: ProjectStatus.done,
  },
];

const getStatusLabel = (status: ProjectStatus) => {
  const statusOption = statusesDict.find((v) => v.value == status);
  if (statusOption) {
    return statusOption.label;
  } else {
    return 'Не найдено';
  }
};

async function onOKClick() {
  const newProject: CreateUpdateProjectDto = {
    name: name.value,
    description: description.value,
    status: status.value,
  };

  if (props.new) {
    await api.createProject(newProject);
  } else if (props.project) {
    await api.updateProject(props.project.id, newProject);
  }

  onDialogOK();
}

const onDelete = async () => {
  if (props.project) {
    await api.deleteProject(props.project.id);
    onDialogOK();
  }
};
</script>