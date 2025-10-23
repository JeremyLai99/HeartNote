<!-- src/components/SketchCanvas.vue -->
<template>
  <div>
    <canvas ref="c" width="600" height="200" style="border:1px solid #ddd; touch-action: none;"></canvas>
  </div>
</template>

<script>
export default {
  methods: {
    startPos(e) {
      e.preventDefault()
      this.drawing = true
      const pos = this.getPos(e)
      this.ctx.beginPath()
      this.ctx.moveTo(pos.x, pos.y)
    },
    movePos(e) {
      if (!this.drawing) return
      const pos = this.getPos(e)
      this.ctx.lineTo(pos.x, pos.y)
      this.ctx.stroke()
    },
    endPos(e) {
      this.drawing = false
    },
    getPos(e) {
      const rect = this.canvas.getBoundingClientRect()
      let clientX, clientY
      if (e.touches && e.touches[0]) {
        clientX = e.touches[0].clientX; clientY = e.touches[0].clientY
      } else {
        clientX = e.clientX; clientY = e.clientY
      }
      return { x: clientX - rect.left, y: clientY - rect.top }
    },
    clear() {
      this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    },
    getDataUrl() {
      return this.canvas.toDataURL('image/png')
    }
  },
  mounted() {
    this.canvas = this.$refs.c
    this.ctx = this.canvas.getContext('2d')
    this.ctx.lineWidth = 2
    this.ctx.lineCap = 'round'
    // mouse
    this.canvas.addEventListener('mousedown', this.startPos)
    this.canvas.addEventListener('mousemove', this.movePos)
    window.addEventListener('mouseup', this.endPos)
    // touch
    this.canvas.addEventListener('touchstart', this.startPos)
    this.canvas.addEventListener('touchmove', this.movePos)
    window.addEventListener('touchend', this.endPos)
  },
  beforeUnmount() {
    // 可視情況移除監聽
  }
}
</script>

<style scoped>
canvas { width:100%; height:auto; border-radius:8px; background:#fff; }
</style>
