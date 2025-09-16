<template>
  <VApp>
    <VContainer>
      <VDialog :model-value="true">
        <VCard>
          <Searcher data-testid="searcher" />
        </VCard>
      </VDialog>
    </VContainer>
  </VApp>
</template>

<script setup>
import { VApp, VCard, VContainer, VDialog } from "vuetify/components";
import Searcher from "./Searcher.vue";
</script>
