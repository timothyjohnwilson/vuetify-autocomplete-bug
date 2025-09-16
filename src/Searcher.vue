<template>
  <VAutocomplete
    v-model="item"
    v-model:search="search"
    return-object
    no-filter
    autocomplete="false"
    hide-no-data
    :loading="loading"
    :item-title="(v) => itemTitle(v)"
    :items="items"
    :no-data-text="loading ? 'Searching...' : 'No Data'"
    v-bind="$attrs"
  />
</template>

<script setup>
import { ref, watch } from "vue";
import { VAutocomplete } from "vuetify/components";

const props = defineProps({
  modelValue: {
    type: Object,
    required: false,
    default: () => {},
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
  if (!search.value) return;
  if (
    items.value.some(
      (v) => search.value === itemTitle(v, props.searchArgs || {})
    ) &&
    items.value.length === 1
  ) {
    return;
  }

  loading.value = true;
  try {
    const result = await fetchResults(search.value, props.searchArgs || {});

    items.value.splice(0, items.value.length);
    items.value.push(...result);
    console.log(items.value); // see how data gets updated here?
    setTimeout(() => {
      items.value.push({ email: "test3@test.com", name: "Test 3", id: 3 });
    }, 100);
  } catch (e) {
    snackbar.showErrorSnackbar({ message: parseErrorMessage(e) });
  } finally {
    loading.value = false;
  }
}

watch(search, debounceAndSearch);
</script>
