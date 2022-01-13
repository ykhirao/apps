import { Bar } from '../BaseCharts'
import { reactiveProp } from './mixin'

export default {
  extends: Bar,
  mixins: [reactiveProp],
  data: () => ({
    chartData: '',
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),

  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
