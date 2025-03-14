<template>
    <q-card class="q-mb-sm">
      <q-card-section>
        <div class="text-h6">{{ value.name }}</div>
        <div class="text-caption">{{ value.description }}</div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Редактировать" @click="$emit('onEditClick', value)" />
      </q-card-actions>
    </q-card>
  </template>
  
  <script setup lang="ts">
  import { ProjectDto } from '../../../backend/src/common/types';
  
  defineProps<{
    value: ProjectDto;
  }>();
  </script>