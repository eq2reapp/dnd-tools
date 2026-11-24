<template>
  <UContainer>
    <h1>Crit Rate</h1>

    <UForm class="space-y-4" @submit.prevent="calculateCritRate()">

      <UCheckbox v-model="critOn20" label="Crit on 20" />

      <UCheckbox v-model="critOn19" label="Crit on 19" />

      <UCheckbox v-model="critOn18" label="Crit on 18" />

      <UCheckbox v-model="advantage" label="Attack with advantage" />

      <UButton type="submit" class="mt-2">
        Calculate
      </UButton>
    </UForm>

    <UAlert v-if="errors.length > 0" color="error" title="Oops!" icon="i-lucide-message-circle-x" class="mt-3">
      <template #description>
        <ul>
          <li v-for="(err, index) in errors" :key="index">
            {{ err }}
          </li>
        </ul>
      </template>
    </UAlert>

    <div v-if="simulations.length > 0">
      <UTable :data="simulations" :columns="columns" class="flex-1 mt-8" />
      <UButton type="button" class="mt-2" @click="
        simulations = [];
      errors = [];
      ">
        Clear
      </UButton>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

class CritrateCalc {
  public critRate: number = 0
  public advantage: boolean = false
  public critOn20: boolean = false
  public critOn19: boolean = false
  public critOn18: boolean = false

  constructor(
    advantage: boolean,
    critOn20: boolean,
    critOn19: boolean,
    critOn18: boolean
  ) {
    this.advantage = advantage
    this.critOn20 = critOn20
    this.critOn19 = critOn19
    this.critOn18 = critOn18
  }

  public calculate(): boolean {
    let crits = 0
    for (let i = 0; i < NUM_RUNS; i++) {
      if (this.advantage) {
        crits += this.rollForCrit() || this.rollForCrit() ? 1 : 0
      } else {
        crits += this.rollForCrit() ? 1 : 0
      }
    }
    this.critRate = crits / (1.0 * NUM_RUNS)

    return true
  }

  private rollForCrit(): boolean {
    const roll20 = 1 + Math.floor(Math.random() * 20)
    return (
      (this.critOn20 && roll20 === 20) ||
      (this.critOn19 && roll20 === 19) ||
      (this.critOn18 && roll20 === 18)
    )
  }
}

const advantage = ref(false)
const critOn20 = ref(true)
const critOn19 = ref(false)
const critOn18 = ref(false)
const simulations = ref<CritrateCalc[]>([])
const errors = ref<string[]>([])
const NUM_RUNS = 1000000

const columns: TableColumn<CritrateCalc>[] = [
  {
    accessorKey: 'critRate',
    header: 'Crit Rate'
  },
  {
    accessorKey: 'critOn20',
    header: 'Crit on 20',
    cell: ({ row }) => (row.getValue('critOn20') ? 'Yes' : 'No')
  },
  {
    accessorKey: 'critOn19',
    header: 'Crit on 19',
    cell: ({ row }) => (row.getValue('critOn19') ? 'Yes' : 'No')
  },
  {
    accessorKey: 'critOn18',
    header: 'Crit on 18',
    cell: ({ row }) => (row.getValue('critOn18') ? 'Yes' : 'No')
  }
  ,
  {
    accessorKey: 'critRate',
    header: 'Crit Rate',
    cell: ({ row }) => `${(row.getValue('critRate') * 100).toFixed(2)}%`
  }
]

function calculateCritRate() {
  errors.value = []
  const simulation = new CritrateCalc(
    advantage.value,
    critOn20.value,
    critOn19.value,
    critOn18.value
  )
  if (simulation.calculate()) {
    simulations.value.push(simulation)
  }
}

</script>
