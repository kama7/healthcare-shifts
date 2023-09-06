import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Vacancy } from '../components/vacancy/types/Vacancy';

export const useVacancyStore = defineStore('counter', () => {
  const vacancies = ref<Vacancy[]>([])

  const deleteVacancyByIndex = (index: number) => {
    vacancies.value.splice(index,1);
  }

  return {
    vacancies,
    deleteVacancyByIndex
  }
});
