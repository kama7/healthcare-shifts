<template>
  <q-dialog
    maximized
    full-height
    :model-value="modelValue"
    :position="position"
    @hide="emit('update:modelValue', false)">

    <div class="base-dialog bg-white">
      <slot></slot>
    </div>

  </q-dialog>
</template>

<script setup lang="ts">
import { QDialogProps } from 'quasar';

type Props = {
  modelValue: boolean;
  position?: QDialogProps['position']
}

type Emits = {
  'update:modelValue': [value: boolean];
}

withDefaults(defineProps<Props>(), {
  position: 'right'
});

const emit = defineEmits<Emits>();
</script>

<style scoped lang="scss">
.base-dialog {
  width: 27rem;
}
</style>
