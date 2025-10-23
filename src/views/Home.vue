<!-- src/views/Home.vue -->
<template>
  <div class="container">
    <h2>情緒日記列表</h2>
    <button @click="$router.push('/new')">新增日記</button>
    <div v-if="entries.length===0" style="margin-top:12px">目前還沒有日記，按「新增日記」開始。</div>
    <div v-for="e in entries" :key="e.id" class="card">
      <div style="display:flex; justify-content:space-between">
        <div><strong>{{ formatDate(e.date) }}</strong> — 強度：{{ e.intensity }}</div>
        <div><button @click="deleteEntry(e.id)">刪除</button></div>
      </div>
      <div style="margin-top:6px">{{ e.cause }} / {{ e.people }}</div>
      <div style="margin-top:6px">{{ e.happened }}</div>
      <div v-if="e.sketchDataUrl" style="margin-top:6px">
        <img :src="e.sketchDataUrl" style="max-width:200px; border:1px solid #ddd" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() { return { entries: [] } },
  mounted() {
    const raw = localStorage.getItem('mood_entries') || '[]'
    this.entries = JSON.parse(raw)
  },
  methods: {
    formatDate(d) { return new Date(d).toLocaleString() },
    deleteEntry(id) {
      if (!confirm('確定要刪除？')) return
      this.entries = this.entries.filter(x => x.id !== id)
      localStorage.setItem('mood_entries', JSON.stringify(this.entries))
    }
  }
}
</script>

<style scoped>
.card { border:1px solid #eee; padding:12px; margin-top:12px; border-radius:8px; }
</style>
