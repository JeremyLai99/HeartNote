<!-- src/views/NewEntry.vue -->
<template>
  <div class="container">
    <h2>我的情緒日記 — 新增</h2>

    <div class="form">
      <label>產生的原因</label>
      <input v-model="entry.cause" placeholder="例如：被主管提醒專案進度" />

      <label>旁邊有誰</label>
      <input v-model="entry.people" placeholder="例如：有同事、小孩" />

      <label>發生什麼事（誰做了什麼 / 做了什麼）</label>
      <textarea v-model="entry.happened" rows="3" placeholder="描述事件"></textarea>

      <label>在哪裡</label>
      <input v-model="entry.where" placeholder="例如：公司會議室 / 在家" />

      <label>什麼時候開始有情緒</label>
      <input v-model="entry.when" placeholder="例如：下午2點，會議中" />

      <label>你會想到什麼（想法）</label>
      <textarea v-model="entry.thoughts" rows="2" placeholder="把當下想法寫下來"></textarea>

      <label>情緒強度：{{ entry.intensity }}</label>
      <EmotionScale v-model:level="entry.intensity" />

      <label>畫下來（手繪）</label>
      <SketchCanvas ref="sketch" />

      <div style="margin-top:12px">
        <button @click="save">儲存日記</button>
        <button @click="clearCanvas">清除畫布</button>
      </div>
    </div>
  </div>
</template>

<script>
import EmotionScale from '../components/EmotionScale.vue'
import SketchCanvas from '../components/SketchCanvas.vue'

export default {
  components: { EmotionScale, SketchCanvas },
  data() {
    return {
      entry: {
        id: Date.now(),
        date: new Date().toISOString(),
        cause: '',
        people: '',
        happened: '',
        where: '',
        when: '',
        thoughts: '',
        intensity: 5,
        sketchDataUrl: null,
      }
    }
  },
  methods: {
    save() {
      // 先把畫布轉成圖片
      const sketchComp = this.$refs.sketch
      if (sketchComp && sketchComp.getDataUrl) {
        this.entry.sketchDataUrl = sketchComp.getDataUrl()
      }
      // 讀取現有 entries
      const raw = localStorage.getItem('mood_entries') || '[]'
      const arr = JSON.parse(raw)
      arr.unshift(this.entry) // 最新在前
      localStorage.setItem('mood_entries', JSON.stringify(arr))
      alert('已儲存！')
      this.$router.push('/') // 回首頁
    },
    clearCanvas() {
      this.$refs.sketch.clear()
    }
  }
}
</script>

<style scoped>
.container { padding: 16px; max-width: 720px; margin: auto; }
.form label { display:block; margin-top:12px; font-weight:600; }
input, textarea { width:100%; padding:8px; border-radius:6px; border:1px solid #ccc; }
button { margin-right:8px; padding:8px 12px; border-radius:6px; }
</style>
