// assets/charts.js — 课程进度图
(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  var el = document.getElementById('chart-progress');
  if (!el || typeof echarts === 'undefined') return;

  var chart = echarts.init(el, null, { renderer: 'svg' });
  chart.setOption({
    animation: false,
    legend: {
      top: 0, right: 10, itemWidth: 12, itemHeight: 12,
      textStyle: { color: muted, fontSize: 12, fontFamily: 'Outfit, Microsoft YaHei, sans-serif' }
    },
    grid: { left: 16, right: 30, top: 36, bottom: 12, containLabel: true },
    xAxis: {
      type: 'value', max: 25,
      splitLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, fontSize: 12, formatter: '{value} 节' }
    },
    yAxis: {
      type: 'category', data: ['古希腊文明'],
      axisLine: { lineStyle: { color: rule } },
      axisTick: { show: false },
      axisLabel: { color: ink, fontSize: 14, fontWeight: 600 }
    },
    tooltip: {
      trigger: 'axis', appendToBody: true,
      axisPointer: { type: 'shadow' },
      textStyle: { color: ink, fontSize: 12 },
      formatter: function(params) {
        var s = params[0].name + '<br/>';
        params.forEach(function(p) {
          s += p.marker + ' ' + p.seriesName + '：' + p.value + ' 节<br/>';
        });
        return s;
      }
    },
    series: [
      {
        name: 'Agent 已完成', type: 'bar', stack: 'total', data: [5], barWidth: 38,
        itemStyle: {
          color: { type: 'linear', x: 0, y: 0, x2: 1, y2: 0, colorStops: [
            { offset: 0, color: accent }, { offset: 1, color: accent2 }
          ] },
          borderRadius: [8, 0, 0, 8]
        },
        label: { show: true, position: 'inside', color: '#ffffff', fontSize: 12, fontWeight: 700, formatter: '已完成 5' }
      },
      {
        name: '待续刷', type: 'bar', stack: 'total', data: [20], barWidth: 38,
        itemStyle: { color: rule, borderRadius: [0, 8, 8, 0] },
        label: { show: true, position: 'inside', color: muted, fontSize: 12, fontWeight: 700, formatter: '待续刷 20' }
      }
    ]
  });

  window.addEventListener('resize', function() { chart.resize(); });
})();
