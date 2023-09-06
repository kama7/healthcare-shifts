<template>
  <div class="q-pa-md">
    <div class="heading--underline inline-block relative-position
     q-my-md text-h5 text-weight-bold text-primary">
      {{currentIndex >= 0
        ? $t('edit')
        : $t('create') }}
    </div>

    <div class="q-mb-lg">
      <q-form @submit.prevent>
        <div class="text-subtitle2 text-grey-7">{{ $t('title') }}</div>

        <q-input
          v-model="v$.form.title.$model"
          maxlength="100"
          autofocus
          dense
          color="dark"
          outlined
          :error="v$.form.title.$invalid && v$.form.title.$dirty"
          error-message="Please enter a title">
        </q-input>

        <div class="text-subtitle2 text-grey-7">{{ $t('description') }}</div>

        <q-input
          v-model="v$.form.description.$model"
          dense
          color="dark"
          maxlength="500"
          outlined
          type="textarea"/>

        <div class="text-subtitle2 text-grey-7 q-mt-lg">{{ $t('dates') }}</div>

        <q-input
          v-model="v$.form.dates.$model"
          outlined
          dense
          color="dark"
          :error="v$.form.dates.$invalid && v$.form.dates.$dirty"
          error-message="Please choose a date"
          @update:model-value="handleShifts"
        >
          <q-popup-proxy
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date
              v-model="v$.form.dates.$model"
              subtitle="Select multiple dates"
              minimal
              :options="vacancyDateOptions"
              multiple
              mask=" DD-MM-YYYY"
              @update:model-value="handleShifts"
            >
            </q-date>
          </q-popup-proxy>

          <template v-slot:append>
            <q-icon
              name="event"
              class="cursor-pointer"
            >
            </q-icon>
          </template>
        </q-input>

        <CreateShiftWrapper
          :key="shiftCount"
          :shifts="v$.form.shifts.$model"
          :shift-error-index="shiftErrorIndex"
          @delete-shift="deleteShift"
        />

        <div class="row q-gutter-lg justify-center">
          <q-btn
            class="col"
            outline
            color="primary"
            @click="deleteVacancy"
          >
            {{ currentIndex >= 0 ? $t('delete') : $t('cancel') }}
          </q-btn>

          <q-btn
            class="col"
            color="primary"
            type="submit"
            @click="submit"
          >
            {{ $t('save') }}
          </q-btn>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import useCreateVacancy from './composables/useCreateVacancy';
import CreateShiftWrapper from '../shifts/CreateShiftWrapper.vue';

type Props = {
  currentIndex: number;
}

type Emits = {
  'close-create-vacancy-modal': [];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const {
  v$,
  submit,
  shiftCount,
  deleteShift,
  handleShifts,
  deleteVacancy,
  shiftErrorIndex,
  vacancyDateOptions,
} = useCreateVacancy(props, emit);
</script>
