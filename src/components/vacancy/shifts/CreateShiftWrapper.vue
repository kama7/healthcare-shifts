<template>
  <div
    v-for="(shift, index) in shifts"
    :key="index"
  >
    <div class="flex no-wrap justify-between items-center">
      <div class="text-weight-bold text-grey-8">
        {{shift.date}}
      </div>

      <q-btn
        round
        size="sm"
        icon="close"
        flat
        @click="emit('delete-shift', index)"
      />
    </div>

    <div class="q-mb-lg bg-grey-9 rounded-borders">
      <CreateShift
        :shift="shift"
        class="q-pa-md"
      />

      <div
        v-if="index === shiftErrorIndex"
        class="text-caption q-px-md q-pb-md text-red-5 text-center"
      >
        {{ $t('shift.overlapping.error-message') }}
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { Vacancy } from '../types/Vacancy';
import CreateShift from './CreateShift.vue';

type Props = {
  shifts: Vacancy['shifts']
  shiftErrorIndex: number;
}

type Emits = {
  'delete-shift': [index: boolean];
}

defineProps<Props>();

const emit = defineEmits<Emits>()
</script>
