<template>
  <UDropdownMenu v-slot="{ open }" :modal="false" :items="getMenuItems()" :content="{ align: 'start' }"
    :ui="{ content: 'w-32' }" size="xl" class="px-5">
    <UButton label="Select a tool" variant="subtle" trailing-icon="i-lucide-chevron-down" size="lg"
      class="-mb-[6px] font-semibold rounded-full truncate ml-5" :class="[open && 'bg-primary/15']" :ui="{
        trailingIcon: [
          'transition-transform duration-200',
          open ? 'rotate-180' : undefined
        ]
          .filter(Boolean)
          .join(' ')
      }" />
  </UDropdownMenu>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const items: DropdownMenuItem[] = [
  {
    label: 'Home',
    to: '/'
  },
  {
    label: 'Hit Rate',
    to: '/HitRate'
  },
  {
    label: 'Crit Rate',
    to: '/CritRate'
  }
]

function getMenuItems() {
  return items
}
</script>
