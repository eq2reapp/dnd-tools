<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink
          to="/"
          class="focus-visible:outline-3 outline-primary/25 rounded-md p-1 -ms-1"
        >{{ title }}
        </NuxtLink>

        <TemplateMenu />
      </template>

      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>

    <UMain class="mb-10">
      <NuxtPage />
    </UMain>

    <USeparator />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          Built with <ULink
            to="https://nuxt.com"
            target="_blank"
          >Nuxt</ULink>,
          <ULink
            to="https://ui.nuxt.com"
            target="_blank"
          >Nuxt UI</ULink> • ©
          {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
        <UButton
          to="https://github.com/eq2reapp/dnd-tools"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </UApp>
</template>

<script setup>
useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'D&D Tools'
const description = 'Some references and calculators.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})
</script>
