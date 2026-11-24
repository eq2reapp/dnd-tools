<template>
  <UContainer>
    <h1>Hit Rate</h1>

    <UForm class="space-y-4" @submit.prevent="calculateHitrate()">
      <UFormField label="Enemy AC" name="targetAc">
        <UInput v-model.number="targetAc" />
      </UFormField>

      <UFormField label="Player level" name="level">
        <UInput v-model.number="level" />
      </UFormField>

      <UFormField label="Player primary stat" name="primaryStat">
        <UInput v-model.number="primaryStat" />
      </UFormField>

      <UCheckbox v-model="advantage" label="Attack with advantage" />

      <UCheckbox v-model="bless" label="Attack with bless" />

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

class HitrateCalc {
  public profficiency: number = 0
  public primaryStat: number = 0
  public advantage: boolean = false
  public bless: boolean = false
  public targetAc: number = 0
  public hitRate: number = 0

  constructor(
    profficiency: number,
    primaryStat: number,
    advantage: boolean,
    bless: boolean,
    targetAc: number
  ) {
    this.profficiency = profficiency
    this.primaryStat = primaryStat
    this.advantage = advantage
    this.bless = bless
    this.targetAc = targetAc
  }

  public validate(): void {
    if (!Number.isInteger(this.profficiency) || this.profficiency < 1)
      throw 'Profficiency must be an integer > 1'
    if (!Number.isInteger(this.primaryStat) || this.primaryStat < 1)
      throw 'Primary stat must be an integer > 1'
    if (!Number.isInteger(this.targetAc) || this.targetAc < 1)
      throw 'Target AC must be an integer > 1'
  }

  public calculate(): boolean {
    try {
      this.validate()
    } catch (err) {
      errors.value.push(`Invalid parameter: ${err}`)
      return false
    }

    let hits = 0
    for (let i = 0; i < NUM_RUNS; i++) {
      if (this.advantage) {
        hits += this.rollForHit() || this.rollForHit() ? 1 : 0
      } else {
        hits += this.rollForHit() ? 1 : 0
      }
    }
    this.hitRate = hits / (1.0 * NUM_RUNS)

    return true
  }

  private rollForHit(): boolean {
    const roll20 = 1 + Math.floor(Math.random() * 20)
    const blessRoll = this.bless ? 1 + Math.floor(Math.random() * 4) : 0
    const attackVal = roll20 + this.profficiency + this.primaryStat + blessRoll
    return attackVal >= this.targetAc
  }
}

const targetAc = ref(15)
const level = ref(5)
const primaryStat = ref(5)
const advantage = ref(false)
const bless = ref(false)
const simulations = ref<HitrateCalc[]>([])
const errors = ref<string[]>([])
const NUM_RUNS = 1000000

const columns: TableColumn<HitrateCalc>[] = [
  {
    accessorKey: 'targetAc',
    header: 'Enemy AC'
  },
  {
    accessorKey: 'profficiency',
    header: 'Profficiency',
    cell: ({ row }) => row.getValue('profficiency')
  },
  {
    accessorKey: 'primaryStat',
    header: 'Primary Stat',
    cell: ({ row }) => row.getValue('primaryStat')
  },
  {
    accessorKey: 'advantage',
    header: 'Advantage',
    cell: ({ row }) => (row.getValue('advantage') ? 'Yes' : 'No')
  },
  {
    accessorKey: 'hitRate',
    header: 'Hit Rate',
    cell: ({ row }) => `${(row.getValue('hitRate') * 100).toFixed(2)}%`
  }
]

function calculateHitrate() {
  errors.value = []
  const simulation = new HitrateCalc(
    getProfficiency(level.value),
    primaryStat.value,
    advantage.value,
    bless.value,
    targetAc.value
  )
  if (simulation.calculate()) {
    simulations.value.push(simulation)
  }
}

function getProfficiency(level: number): number {
  if (level < 1) return 2
  if (level > 20) return 6
  const profficiencies = [2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6]
  return profficiencies[level]!
}
</script>
