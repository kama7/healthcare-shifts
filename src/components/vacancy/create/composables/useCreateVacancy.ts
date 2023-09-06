import { useVuelidate } from '@vuelidate/core';
import { required, minLength, maxLength } from '@vuelidate/validators';
import { Shift, ShiftType, Vacancy } from '../../types/Vacancy';
import { ref } from 'vue';
import { useVacancyStore } from '../../../../stores/vacancyStore';
import { date } from 'quasar';
import { VACANCY_DATES_SELECT_LIMIT } from '../../constants/vacancyConstants';

type Props = {
  currentIndex: number;
}

type Emits = {
  (event: 'close-create-vacancy-modal'): void;
}

const useCreateVacancy = (props: Props, emit: Emits) => {
  const vacancyStore = useVacancyStore()

  const form = ref<Vacancy>(
    props.currentIndex >= 0
      ? JSON.parse(JSON.stringify(vacancyStore.vacancies[props.currentIndex]))
      : {
        title: '',
        description: undefined,
        dates: [],
        shifts: []
      }
  );

  const rules = {
    form: {
      title: {
        required,
        minLengthValue: minLength(1),
        maxLengthValue: maxLength(100)
      },
      description: {
        maxLengthValue: maxLength(500),
      },
      dates: {
        required,
      },

      shifts: {
        required
      },
    },
  };

  const v$ = useVuelidate(rules, { form })

  const shiftCount = ref(1);
  const shiftErrorIndex = ref(-1);

  const createDummyShift = () => {
    return {
      startTime: '',
      endTime: '',
      price: 0,
      type: ShiftType.CONSULTATION
    }
  }

  const vacancyDateOptions = (localDate: string) => {
    if(!form.value.dates) {
      return true;
    }

    if(form.value.dates.length < VACANCY_DATES_SELECT_LIMIT) {
      return true;
    }

    const formattedDate = date.formatDate(localDate, ' DD-MM-YYYY')

    return form.value.dates.includes(formattedDate);

  }

  const handleShifts = () => {
    shiftCount.value+=1;

    if(!form.value.dates) {
      form.value.shifts = [];

      return;
    }

    const indexesToDelete: number[] = []

    form.value.shifts.map((shift, shiftIndex) => {

      const index = form.value.dates.indexOf(shift.date);

      if(index < 0) {
        indexesToDelete.push(shiftIndex);
      }
    })

    indexesToDelete.sort((a,b ) => b - a);

    for (let i = 0; i < indexesToDelete.length; i++) {
      const index = indexesToDelete[i];

      if (index >= 0 && index < form.value.shifts.length) {
        form.value.shifts.splice(index, 1);
      }
    }

    form.value.dates.map((date) => {
      const index = form.value.shifts.findIndex((shift) => shift.date === date)

      if(index < 0) {
        form.value.shifts.push({
          date,
          ...createDummyShift()
        })
      }
    })
  }

  const deleteShift = (index: number) => {
    if(!form.value.dates) {
      handleShifts();

      return
    }

    const indexOf = form.value.dates.indexOf(form.value.shifts[index].date);

    if(indexOf > -1){
      form.value.dates.splice(indexOf, 1);
      handleShifts();
    }
  }

  const deleteVacancy = () => {
    if(props.currentIndex >= 0) {
      vacancyStore.deleteVacancyByIndex(props.currentIndex)
    }

    emit('close-create-vacancy-modal');
  }

  const isTimeInBetween = (shift: Shift, existingShift:Shift) => {
    const shiftStartTime = new Date(`1970-01-01T${shift.startTime}`);
    const ShiftEndTime = new Date(`1970-01-01T${shift.endTime}`);
    const existingShiftStartTime = new Date(`1970-01-01T${existingShift.startTime}`);
    const existingShiftEndTime = new Date(`1970-01-01T${existingShift.endTime}`);

    return shiftStartTime <= existingShiftEndTime && ShiftEndTime >= existingShiftStartTime;
  };

  const isShiftOverlapping = () => form.value.shifts.some((shift, i) => {
      const isOverlapping = vacancyStore.vacancies.some((vacancy, index) => (
        props.currentIndex !== index && vacancy.shifts.some((existingShift) => (
          existingShift.type === shift.type && date.isSameDate(existingShift.date, shift.date)
            ? isTimeInBetween(shift, existingShift)
            : false
        ))
      ));

      if (isOverlapping) {
        shiftErrorIndex.value = i;

        return true;
      }

      return false;

  });

  const submit = () => {
    v$.value.$touch();

    if(v$.value.$invalid){
      return;
    }

    if(isShiftOverlapping()){
      return;
    }

    if(props.currentIndex >= 0) {
      vacancyStore.vacancies[props.currentIndex] = form.value;
    }
    else {
      vacancyStore.vacancies.push(form.value);
    }

    shiftErrorIndex.value = -1;

    emit('close-create-vacancy-modal');
  }

  return {
    v$,
    form,
    submit,
    shiftCount,
    deleteShift,
    handleShifts,
    deleteVacancy,
    shiftErrorIndex,
    vacancyDateOptions,
  }
}

export default useCreateVacancy;
