<template>
  <div class="vacancy-page">
    <div class="row q-my-lg">
      <div class="heading--underline relative-position text-h5 text-weight-bold">{{ $t('filter') }}</div>
    </div>

    <div class="row items-center no-wrap">
      <div class="col-shrink">{{ $t('filter.on-price') }}</div>

      <q-range
        v-model="filterRange"
        class="col-6 q-pa-lg"
        label-always
        color="grey-7"
        thumb-color="pink-11"
        label-color="grey-7"
        :min="VACANCY_FILTER_MIN"
        :max="VACANCY_FILTER_MAX"
      />
    </div>

    <div class="row q-my-lg justify-between">
      <div class="heading--underline relative-position text-h5 text-weight-bold">{{ $t('shifts') }}</div>

      <q-btn
        color="primary"
        padding="xs lg"
        @click="editVacancy(-1)"
      >
        {{ $t('shift.add') }}
      </q-btn>
    </div>

    <q-card
      :key="index"
      v-for="(vacancy, index) in filteredVacancies"
      class="q-my-lg q-px-md shadow-5"
    >
      <q-card-section>
        <div class="row justify-between">
          <div class="text-h5 text-primary text-weight-medium text-capitalize">{{vacancy.title}}</div>

          <q-btn
            @click="editVacancy(index)"
            round
            size="sm"
            icon="edit"
            flat
          />
        </div>

        <div>{{vacancy.description}}</div>
      </q-card-section>

      <q-card-section>
        <div class="text-h5 text-weight-medium text-capitalize text-primary">
          {{ $t('dates') }}
        </div>

        <div
          v-for="(shift,i) in vacancy.shifts"
          :key="i"
          class="row q-ma-sm q-py-sm q-px-lg rounded-borders bg-primary text-white"
        >
          <div class="col-3"> {{date.formatDate(
            date.extractDate(shift.date, ' DD-MM-YYYY'),
            'DD MMM YYYY'
          )}}</div>

          <div class="col-2">{{shift.startTime}}</div>

          <div class="col-2"> {{shift.endTime}}</div>

          <div class="col-3">{{shift.type}}</div>

          <div class="col-2 text-right items-center row justify-end">
            <q-icon
              name="euro"
              class="q-mr-xs"
            />

            <div>{{shift.price}}</div>
          </div>
        </div>
      </q-card-section>

    </q-card>

    <BaseDialog v-model="isCreateVacancyModalVisible">
      <CreateVacancy
        :current-index="currentIndex"
        @close-create-vacancy-modal="isCreateVacancyModalVisible = false"
      />
    </BaseDialog>
  </div>
</template>

<script setup lang="ts">
import { date } from 'quasar';
import { computed, ref } from 'vue';
import BaseDialog from '../common/BaseDialog.vue';
import CreateVacancy from './create/CreateVacancy.vue';
import { VACANCY_FILTER_MAX, VACANCY_FILTER_MIN } from './constants/vacancyConstants';
import { useVacancyStore } from '../../stores/vacancyStore';

const vacancyStore = useVacancyStore();

const currentIndex = ref<number>(-1);
const isCreateVacancyModalVisible = ref(false);
const filterRange = ref({
  min: 0,
  max: 500
})

const filteredVacancies = computed(() => vacancyStore.vacancies.filter((vacancy) => (
    vacancy.shifts.some((shift) => (
      filterRange.value.min <= shift.price && shift.price <= filterRange.value.max
    ))
  ))
)

const editVacancy = (index: number) => {
  currentIndex.value = index
  isCreateVacancyModalVisible.value = true;
}
</script>

<style scoped lang="scss">
.vacancy-page {
  margin-left: auto;
  margin-right: auto;
  width: 40rem;
}
</style>
