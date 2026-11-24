<template>
  <UContainer>
    <h1>Home</h1>

    <p class="mb-5">
      Select a tool from the menu.
    </p>

    <p class="mb-5">
      Or, some useful links:
      <ul class="mt-2 ml-8">
        <li
          v-for="link in usefulLinks"
          :key="link.href"
        >
          <ULink
            :href="link.href"
            target="_blank"
            external
          >{{ link.label }}</ULink>
        </li>
      </ul>
    </p>
  </UContainer>
</template>

<script setup lang="ts">
const usefulLinks = [
  { label: 'D&D Beyond - Classes', href: 'https://www.dndbeyond.com/classes' },
  { label: 'D&D Beyond - Spells', href: 'https://www.dndbeyond.com/spells' },
  { label: 'D&D Beyond - Feats', href: 'https://www.dndbeyond.com/feats' },
  { label: 'D&D Beyond - Items', href: 'https://www.dndbeyond.com/magic-items' },
  { label: 'D&D Beyond - Monsters', href: 'https://www.dndbeyond.com/monsters' },
  { label: 'D&D Beyond - Rules', href: 'https://www.dndbeyond.com/sources/dnd/br-2024/rules-glossary#RulesDefinitions' },
  { label: 'D&D 5.5 Creation Wiki', href: 'https://dnd5-5creation.wikidot.com/' }
]
</script>
