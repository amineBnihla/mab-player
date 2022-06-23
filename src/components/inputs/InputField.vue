<script setup>
import { computed, defineEmits, defineProps, useAttrs } from "vue";
const props = defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
const focused = computed(() => (props.modelValue.length > 0 ? true : false));

const attrs = useAttrs();
console.log(attrs.type);
</script>

<template>
  <div class="relative">
    <input
      class="w-full py-2 px-4 outline-none border-none peer"
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="$attrs.type"
      :name="$attrs.id"
      :id="$attrs.id"
      :class="$attrs.class"
    />
    <label
      :for="$attrs.id"
      class="
        absolute
        left-2
        top-2/4
        -translate-y-2/4
        text-slate-400
        pointer-events-none
        peer-focus:text-slate-600
        peer-focus:-top-4
        peer-focus:left-0
        peer-focus:font-semibold
        duration-500
      "
      :class="{ '-top-4 left-0 font-semibold text-slate-600': focused }"
      >{{ $attrs.label }}</label
    >
  </div>
</template>


<style>
</style>