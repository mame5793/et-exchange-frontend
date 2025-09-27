<template>
  <div class="chart-wrap">
    <div v-if="!isClient || !mainBank" class="loading">Loading chart…</div>
    <canvas v-else ref="canvasRef" class="chart-canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  mainBank: { type: Object, default: null },
  compareBank: { type: Object, default: null },
  currency: { type: String, default: 'USD' },
  type: { type: String, default: 'buying' },
  time: { type: String, default: '1D' }
})

const canvasRef = ref(null)
let chartInstance = null
const isClient = typeof window !== 'undefined'

// helper: generate labels based on time
const makeLabels = (time) => {
  if (time === '1H') return Array.from({length:12}, (_,i)=> `${i*5}m`)
  if (time === '4H') return Array.from({length:16}, (_,i)=> `${i}h`)
  if (time === '1D') return ['00:00','06:00','12:00','18:00','24:00']
  if (time === '1W') return ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
  if (time === '1M') return Array.from({length: 8}, (_,i)=> `D${i+1}`)
  return ['1','2','3','4','5']
}

// deterministic series generation for demo (replace with real history later)
const makeSeries = (bank, currency, type, points) => {
  if (!bank || !bank[currency]) return Array(points).fill(null)
  const base = Number(bank[currency][type]) || 0
  const step = base * 0.0025
  return Array.from({length:points}, (_,i) => +(base + (i - points/2) * step).toFixed(4))
}

const render = async () => {
  if (!isClient || !canvasRef.value || !props.mainBank) return
  // dynamic import Chart.js to avoid SSR import
  const Chart = (await import('chart.js/auto')).default || (await import('chart.js/auto'))
  const labels = makeLabels(props.time)
  const points = labels.length

  const datasets = [
    {
      label: `${props.mainBank.name} (${props.type})`,
      data: makeSeries(props.mainBank, props.currency, props.type, points),
      borderColor: '#4ade80',
      backgroundColor: 'rgba(74,222,128,0.12)',
      tension: 0.25,
      pointRadius: 2
    }
  ]
  if (props.compareBank) {
    datasets.push({
      label: `${props.compareBank.name} (${props.type})`,
      data: makeSeries(props.compareBank, props.currency, props.type, points),
      borderColor: '#60a5fa',
      backgroundColor: 'rgba(96,165,250,0.12)',
      tension: 0.25,
      pointRadius: 2
    })
  }

  if (chartInstance) chartInstance.destroy()
  chartInstance = new Chart(canvasRef.value, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom' } },
      interaction: { mode: 'index', intersect: false }
    }
  })
}

watch(() => [props.mainBank, props.compareBank, props.currency, props.type, props.time], () => {
  render()
}, { immediate: true })

onMounted(() => render())
onBeforeUnmount(() => { if (chartInstance) chartInstance.destroy() })
</script>

<style scoped>
.chart-wrap { position: relative; background:#0f0f0f; border-radius:10px; padding:12px; min-height:260px }
.loading { color:#9aa0a6; padding:32px 0; text-align:center }
.chart-canvas { width:100%; height:260px; display:block }
</style>
