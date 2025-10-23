<!-- src/components/EmotionScale.vue -->
<template>
  <div class="scale">
    <input type="range" min="0" max="10" v-model="localLevel" @input="emitLevel" />
    <div class="ticks">
      <span v-for="n in 11" :key="n" class="tick">{{ n-1 }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    level: { type: Number, default: 5 }
  },
  emits: ['update:level'],
  data() {
    return { localLevel: this.level }
  },
  watch: {
    level(v) { this.localLevel = v }
  },
  methods: {
    emitLevel() { this.$emit('update:level', Number(this.localLevel)) }
  }
}
</script>

<style scoped>
.scale input[type="range"] { width:100%; margin-top:8px; }
.ticks { display:flex; justify-content:space-between; font-size:12px; margin-top:6px; }
.tick { width:1ch; text-align:center; }
</style>
