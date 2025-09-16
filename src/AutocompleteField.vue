<template>
  <VAutocomplete
    v-bind="attrs"
    density="compact"
    variant="outlined"
    auto-select-first
    :class="{
      'success-field': success,
      'error-field': errorMessages.length,
    }"
    :clearable="props.clearable"
    :base-color="success ? 'success' : 'basic'"
    :color="success ? 'success' : 'primary'"
    :error-messages="errorMessages"
    @update:model-value="handleUpdate"
  >
    <template v-if="$slots.item" #item="slotProps">
      <slot name="item" v-bind="slotProps" />
    </template>
    <template v-if="$slots['no-data']" #no-data>
      <slot name="no-data" />
    </template>
    <template v-if="$slots.label" #label>
      <slot name="label" />
    </template>
    <template v-if="$slots.message" #message="slotProps">
      <slot name="message" v-bind="slotProps" />
    </template>
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>
    <template v-if="$slots['append-inner']" #append-inner>
      <slot name="append-inner" />
    </template>
    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>
    <template v-if="$slots['prepend-inner']" #prepend-inner>
      <slot name="prepend-inner" />
    </template>
  </VAutocomplete>
</template>

<script setup>
import { useAttrs } from "vue";
import { VAutocomplete } from "vuetify/components";
const attrs = useAttrs();
const props = defineProps({
  clearable: Boolean,
  success: Boolean,
  errorMessages: { type: Array, default: () => [] },
});
const emit = defineEmits(["update:model-value"]);

function handleUpdate(e) {
  if (!props.clearable && e === null) return;
  emit("update:model-value", e);
}
</script>
