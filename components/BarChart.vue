<template>
  <div class="chart-container">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// Props passed from parent component
const props = defineProps({
  selectedCurrency: String,
  selectedBankData: Object,
  exchangeType: String
});

// Helper function to format date and time
const formatDateTime = (date) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

// Reactive chart data
const chartData = ref({
  labels: [], // This will be an array of formatted strings
  datasets: [
    {
      label: 'Exchange Rate',
      data: [],
      backgroundColor: 'rgba(76, 175, 80, 0.6)',
      borderColor: '#4CAF50',
      borderWidth: 1
    }
  ]
});

// Chart options
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true
    },
    tooltip: {
      backgroundColor: 'white', // Set background color of tooltip to white
      titleColor: 'black', // Set color of tooltip title text
      bodyColor: 'black', // Set color of tooltip body text
      borderColor: 'rgba(0, 0, 0, 0.1)', // Border color for better visibility
      borderWidth: 1, // Border width for the tooltip
      callbacks: {
        label: function (tooltipItem) {
          return `Value: ${tooltipItem.raw}`;
        }
      }
    }
  },
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        display: false // Hide grid lines for x-axis
      },
      ticks: {
        autoSkip: true,
        maxRotation: 90, // Rotate labels to fit better
        minRotation: 45,
        callback: function (value) {
          return value; // Use formatted labels
        }
      },
      title: {
        display: true,
        text: 'Date and Time'
      },
      type: 'category', // Ensure the x-axis is treated as a category
    },
    y: {
      beginAtZero: true,
      grid: {
        display: true,
        borderColor: 'transparent', // Hide the border to reduce gaps
        drawBorder: false, // Hide the border to reduce gaps
        drawTicks: false // Hide y-axis ticks to reduce space
      },
      ticks: {
        stepSize: 10,
        callback: function (value) {
          return Number(value.toFixed(2));
        },
        padding: 0 // Remove padding from y-axis ticks
      }
    }
  },
  layout: {
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  }
};

// Function to update chart data based on user selection
const updateChartData = () => {
  if (props.selectedBankData && props.selectedCurrency && props.exchangeType) {
    const rate = props.selectedBankData[props.selectedCurrency][props.exchangeType];

    // Use the current date and time as a label and format it
    const currentDateTime = formatDateTime(new Date());

    // Update chart data with formatted labels
    chartData.value = {
      labels: [currentDateTime], // Formatted string labels with date and time
      datasets: [{
        label: `${props.selectedCurrency} ${props.exchangeType} Rate`,
        data: [rate],
        backgroundColor: 'rgba(76, 175, 80, 0.6)',
        borderColor: '#4CAF50',
        borderWidth: 1
      }]
    };
  }
};

// Watch for changes in props and update chart data accordingly
watch(
  [() => props.selectedCurrency, () => props.selectedBankData, () => props.exchangeType],
  updateChartData,
  { immediate: true }
);

// Initial update on component mount
onMounted(updateChartData);
</script>



<style scoped>
.chart-container {
  width: 100%;
  height: 220px; /* 🔹 smaller fixed height */
  max-width: 100%;
  position: relative;
  margin: 0 auto; /* center chart */
}

.chart-container canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
  object-fit: contain; /* 🔹 keeps chart inside box */
}
</style>
