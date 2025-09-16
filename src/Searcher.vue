<template>
  <AutocompleteField
    v-model="item"
    v-model:search="search"
    return-object
    no-filter
    autocomplete="false"
    :hide-no-data="hideNoData"
    :loading="loading"
    :item-title="(v) => itemTitle(v, searchArgs || {})"
    :items="items"
    :no-data-text="loading ? 'Searching...' : 'No Data'"
    v-bind="$attrs"
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
  </AutocompleteField>
</template>

<script setup>
import { ref, toRef, watch } from "vue";
import AutocompleteField from "./AutocompleteField.vue";

const props = defineProps({
  hideNoData: { type: Boolean, default: true },
  modelValue: {
    type: Object,
    required: false,
    default: () => {},
  },
  searchArgs: {
    type: Object,
    required: false,
    default: null,
  },
});

const emit = defineEmits(["update:model-value"]);

const items = ref([]);
const item = ref(null);
const search = ref("");
const loading = ref(false);

const itemTitle = (v) => v.name;
function fetchResults() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res([
        { email: "test@test.com", name: "Test 1", id: 1 },
        { email: "test2@test.com", name: "Test 2", id: 2 },
      ]);
    }, 1000);
  });
}

let timer;
function debounceAndSearch() {
  if (timer) clearTimeout(timer);
  timer = setTimeout(fetchItems, 200);
}

async function fetchItems() {
  loading.value = true;
  try {
    const result = await fetchResults(search.value, props.searchArgs || {});

    items.value.splice(0, items.value.length);
    items.value.push(...result);
    console.log(items.value);
  } catch (e) {
    snackbar.showErrorSnackbar({ message: parseErrorMessage(e) });
  } finally {
    loading.value = false;
  }
}

watch(search, debounceAndSearch);
</script>
