<template>
  <q-layout view="lHh Lpr lFf">
    <BaseHeader/>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import BaseHeader from '../common/BaseHeader.vue';
</script>
