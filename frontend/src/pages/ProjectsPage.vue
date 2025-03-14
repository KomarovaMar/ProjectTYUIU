<template>
  <div>
    <q-bar class="q-py-lg">
      <q-btn color="primary" @click="onNewClick">Создать проект</q-btn>
    </q-bar>

    <div class="row">
      <div class="col text-center text-h5">Новый</div>
      <div class="col text-center text-h5">В процессе</div>
      <div class="col text-center text-h5">Завершен</div>
    </div>

    <div class="row">
      <div class="col q-pa-sm">
        <ProjectComponent
          class="q-mb-sm"
          v-for="project in activeProjects"
          :key="project.id"
          :value="project"
          @onEditClick="onProjectEdit"
        ></ProjectComponent>
      </div>

      <div class="col q-pa-sm">
        <ProjectComponent
          class="q-mb-sm"
          v-for="project in pausedProjects"
          :key="project.id"
          :value="project"
          @onEditClick="onProjectEdit"
        ></ProjectComponent>
      </div>

      <div class="col q-pa-sm">
        <ProjectComponent
          class="q-mb-sm"
          v-for="project in completedProjects"
          :key="project.id"
          :value="project"
          @onEditClick="onProjectEdit"
        ></ProjectComponent>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import ProjectEditForm from '../components/ProjectEditForm.vue';
import ProjectComponent from 'src/components/ProjectComponent.vue';
import { computed, onMounted, ref } from 'vue';
import * as api from '../api/project.api';
import { ProjectDto, ProjectStatus } from '../../../backend/src/common/types';

const $q = useQuasar();

const allProjects = ref([] as ProjectDto[]);

const activeProjects = computed(() =>
  allProjects.value.filter((v) => v.status === ProjectStatus.new)
);

const pausedProjects = computed(() =>
  allProjects.value.filter((v) => v.status === ProjectStatus.inProgress)
);

const completedProjects = computed(() =>
  allProjects.value.filter((v) => v.status === ProjectStatus.done)
);

const getProjectsFromServer = async () => {
  const response = await api.getProjects();
  allProjects.value = response;
};

onMounted(async () => {
  await getProjectsFromServer();
});

const onNewClick = async () => {
  $q.dialog({
    component: ProjectEditForm,

    // props forwarded to your custom component
    componentProps: {
      new: true,
    },
  })
    .onOk(async () => {
      console.log('OK');
      await getProjectsFromServer();
    })
    .onCancel(() => {
      console.log('Cancel');
    });
};

const onProjectEdit = (project: ProjectDto) => {
  $q.dialog({
    component: ProjectEditForm,

    // props forwarded to your custom component
    componentProps: {
      new: false,
      project: project,
    },
  })
    .onOk(async () => {
      console.log('OK');
      await getProjectsFromServer();
    })
    .onCancel(() => {
      console.log('Cancel');
    });
};
</script>