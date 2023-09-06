<template>
  <q-form @submit.prevent>
    <div class="row q-gutter-x-md">
      <div class="col">
        <div class="text-subtitle2 q-mb-sm text-grey-4">{{ $t('shift.time.start') }}</div>

        <q-input
          v-model="v$.form.startTime.$model"
          dense
          color="dark"
          no-error-icon
          outlined
          bg-color="white"
          format24h
          :error="v$.form.startTime.$invalid && v$.form.startTime.$dirty"
          mask="time"
          :rules="['time']"
        >
          <q-popup-proxy
            transition-show="scale"
            transition-hide="scale"
          >
            <q-time
              v-model="v$.form.startTime.$model"
              format24h
            />
          </q-popup-proxy>

          <template v-slot:append>
            <q-icon
              size="sm"
              name="access_time"
              class="cursor-pointer"
            />
          </template>
        </q-input>
      </div>

      <div class="col">
        <div class="text-subtitle2 q-mb-sm text-grey-4">{{ $t('shift.time.end') }}</div>

        <q-input
          v-model="v$.form.endTime.$model"
          dense
          outlined
          no-error-icon
          color="dark"
          :disable="v$.form.startTime.$invalid"
          :error="v$.form.endTime.$invalid && v$.form.endTime.$dirty"
          bg-color="white"
          mask="time"
          :rules="['time']"
        >
          <q-popup-proxy
            transition-show="scale"
            transition-hide="scale"
          >
            <q-time
              v-model="v$.form.endTime.$model"
              :options="endTimeOptions"
              format24h
            />
          </q-popup-proxy>

          <template v-slot:append>
            <q-icon
              name="access_time"
              class="cursor-pointer"
            />
          </template>
        </q-input>
      </div>

      <div class="col">
        <div class="text-subtitle2 q-mb-sm text-grey-4">{{ $t('shift.price') }}</div>

        <q-input
          v-model="v$.form.price.$model"
          min="0"
          dense
          no-error-icon
          color="dark"
          outlined
          type="number"
          bg-color="white"
        >
          <template v-slot:append>
            <q-icon name="euro"/>
          </template>
        </q-input>
      </div>
    </div>

    <div class="row q-mb-md">
      <div class="text-subtitle2 q-mb-sm text-grey-4">{{ $t('shift.type') }}</div>

      <q-select
        v-model="v$.form.type.$model"
        outlined
        bg-color="white"
        class="full-width"
        :options="Object.values(ShiftType)"
      ></q-select>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { date } from 'quasar'
import { computed } from 'vue';
import { Shift, ShiftType } from '../types/Vacancy';
import useCreateShift from './composables/useCreateShift';

type Props = {
  shift: Shift
}

const props = defineProps<Props>();

const { v$, form } = useCreateShift(props);

const minimumStartTime = computed(() => date.addToDate(
  date.extractDate(form.value.startTime, 'HH:mm'), {
  minute:1,
}))

const endTimeOptions = (hours: number, minutes: number | null) => {
  if(hours < minimumStartTime.value.getHours()) {
    return false;
  }

  return minimumStartTime.value.getHours() === hours
    ? minutes !== null ? minimumStartTime.value.getMinutes() <= minutes: true
    : true

}
</script>
