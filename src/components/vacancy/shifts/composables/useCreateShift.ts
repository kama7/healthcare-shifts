import { ref } from 'vue';
import { Shift } from '../../types/Vacancy';
import { required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

type Props = {
  shift: Shift
}

const useCreateShift = (props: Props) => {
  const form = ref<Shift>(props.shift);

  const rules = {
    form: {
      startTime: {
        required,
      },
      endTime: {
        required,
      },
      price: {
        required,
      },
      type: {
        required
      },
    },
  };
  const v$ = useVuelidate(rules, { form })

  return {
    v$,
    form,
  }
}

export default useCreateShift;
