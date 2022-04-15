<script setup>
const props = defineProps({ pv: Number })

const levels = [
  { from: 70, light: 'bg-green-400', dark: 'bg-green-800' },
  { from: 30, light: 'bg-yellow-400', dark: 'bg-yellow-700' },
  { from: 0, light: 'bg-red-500', dark: 'bg-red-900' }
]
</script>

<template>
  <div class="flex items-center px-4 py-2 bg-zinc-100 border-4 border-zinc-200 rounded-2xl">
    <span class="flex-none pr-4 text-zinc-400 font-bold">PV</span>
    <div
      :class="levels.find(level => level.from < props.pv).dark"
      class="h-2 flex-auto rounded-full"
    >
      <div
        :style="{ width: `${ props.pv }%` }"
        :class="levels.find(level => level.from < props.pv).light"
        class="h-full rounded-full"
      ></div>
    </div>
  </div>
</template>