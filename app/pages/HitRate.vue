<template>
  <UContainer>
    <h1>Hit Rate</h1>

    <UForm class="space-y-4" @submit.prevent="calculateHitrate()">
      <UFormField label="Target AC" name="targetAc">
        <UInput v-model.number="targetAc" />
      </UFormField>

      <UFormField label="Level" name="level">
        <UInput v-model.number="level" />
      </UFormField>

      <UFormField label="Primary stat" name="primaryStat">
        <UInput v-model.number="primaryStat" />
      </UFormField>

      <UCheckbox v-model="advantage" label="Advantage" />

      <UButton type="submit" class="mt-2">Calculate</UButton>
    </UForm>

    <UAlert
      v-if="errors.length > 0"
      color="error"
      title="Oops!"
      icon="i-lucide-message-circle-x"
      class="mt-3"
    >
      <template #description>
        <ul>
          <li v-for="(err, index) in errors" :key="index">{{ err }}</li>
        </ul>
      </template>
    </UAlert>

    <div v-if="simulations.length > 0">
      <UTable :data="simulations" class="flex-1 mt-8" />
      <UButton
        type="button"
        class="mt-2"
        @click="
          simulations = [];
          errors = [];
        "
        >Clear</UButton
      >
    </div>
  </UContainer>
</template>

<script setup lang="ts">
class HitrateCalc {
  profficiency: number = 0;
  primaryStat: number = 0;
  advantage: boolean = false;
  targetAc: number = 0;
  hitRate: number = 0;

  constructor(
    profficiency: number,
    primaryStat: number,
    advantage: boolean,
    targetAc: number,
  ) {
    this.profficiency = profficiency;
    this.primaryStat = primaryStat;
    this.advantage = advantage;
    this.targetAc = targetAc;
  }

  public validate(): void {
    if (!Number.isInteger(this.profficiency) || this.profficiency < 1)
      throw "Profficiency must be an integer > 1";
    if (!Number.isInteger(this.primaryStat) || this.primaryStat < 1)
      throw "Primary stat must be an integer > 1";
    if (!Number.isInteger(this.targetAc) || this.targetAc < 1)
      throw "Target AC must be an integer > 1";
  }

  public calculate(): boolean {
    try {
      this.validate();
    } catch (err) {
      errors.value.push(`Invalid parameter: ${err}`);
      return false;
    }

    let hits = 0;
    for (let i = 0; i < NUM_RUNS; i++) {
      if (this.advantage) {
        hits += this.rollForHit() || this.rollForHit() ? 1 : 0;
      } else {
        hits += this.rollForHit() ? 1 : 0;
      }
    }
    this.hitRate = hits / (1.0 * NUM_RUNS);

    return true;
  }

  private rollForHit(): boolean {
    const roll20 = 1 + Math.floor(Math.random() * 20);
    const attackVal = roll20 + this.profficiency + this.primaryStat;
    return attackVal >= this.targetAc;
  }
}

const targetAc = ref(15);
const level = ref(4);
const primaryStat = ref(5);
const advantage = ref(false);
const simulations = ref<HitrateCalc[]>([]);
const errors = ref<string[]>([]);
const NUM_RUNS = 100000;

function calculateHitrate() {
  errors.value = [];
  const simulation = new HitrateCalc(
    getProfficiency(level.value),
    primaryStat.value,
    advantage.value,
    targetAc.value,
  );
  if (simulation.calculate()) {
    simulations.value.push(simulation);
  }
}

function getProfficiency(level: number): number {
  if (level < 1) return 2;
  if (level > 20) return 6;
  const profficiencies = [
    2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6,
  ];
  return profficiencies[level]!;
}
</script>
