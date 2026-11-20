/* ============================================================================
   (MANTÉN AQUÍ EL CÓDIGO PREVIO QUE YA TENÍAS EN TU ARCHIVO script.js)
   ============================================================================ */


/* ============================================================================
   MÓDULO ANALÍTICO: DASHBOARD TURISMO EN PERÚ (GOOGLE CHARTS + DC.JS)
   ============================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Verificamos si estamos en dashboard.html antes de ejecutar los gráficos
  const conversionContainer = document.getElementById('chart_conversion');
  const tendenciaContainer = document.getElementById('chart_tendencia');
  const destinosContainer = document.getElementById('chart_destinos_dc');
  const canalesContainer = document.getElementById('chart_canales_dc');

  if (!conversionContainer || !tendenciaContainer || !destinosContainer || !canalesContainer) {
    return; // Evita errores si script.js se carga en machu.html, caral.html, nazca.html o tablas.html
  }

  // --------------------------------------------------------------------------
  // 1. GOOGLE CHARTS (Gráfico 1: Conversión | Gráfico 2: Tendencia Mensual)
  // --------------------------------------------------------------------------
  function drawGoogleCharts() {
    if (typeof google === 'undefined' || !google.visualization) return;

    // --- GRÁFICO 1: Embudo de Conversión de Clientes ---
    const conversionData = google.visualization.arrayToDataTable([
      ['Etapa del Embudo', 'Usuarios', { role: 'style' }, { role: 'annotation' }],
      ['1. Visitas Sitio Web', 12500, '#3b82f6', '100% (12,500)'],
      ['2. Exploran Destinos', 5800, '#6366f1', '46.4% (5,800)'],
      ['3. Cotizan Paquete', 2150, '#f59e0b', '17.2% (2,150)'],
      ['4. Reserva Pagada', 875, '#16a34a', '7.0% (875)']
    ]);

    const conversionOptions = {
      legend: { position: 'none' },
      chartArea: { width: '78%', height: '72%', top: 18, bottom: 32 },
      vAxis: {
        minValue: 0,
        gridlines: { color: '#f0f0f0' },
        textStyle: { fontSize: 11 }
      },
      hAxis: {
        textStyle: { fontSize: 11, bold: true }
      },
      annotations: {
        alwaysOutside: true,
        textStyle: { fontSize: 11, bold: true, color: '#111' }
      },
      animation: { startup: true, duration: 600, easing: 'out' }
    };

    const conversionChart = new google.visualization.ColumnChart(conversionContainer);
    conversionChart.draw(conversionData, conversionOptions);

    // --- GRÁFICO 2: Tendencia Estacional de Reservas ---
    const tendenciaData = google.visualization.arrayToDataTable([
      ['Mes', 'Turistas Extranjeros', 'Turistas Nacionales'],
      ['Ene', 420, 310],
      ['Feb', 350, 290],
      ['Mar', 390, 320],
      ['Abr', 510, 410],
      ['May', 640, 380],
      ['Jun', 890, 450],
      ['Jul', 980, 620],
      ['Ago', 940, 510],
      ['Sep', 720, 390],
      ['Oct', 680, 430],
      ['Nov', 590, 400],
      ['Dic', 650, 540]
    ]);

    const tendenciaOptions = {
      colors: ['#ea580c', '#0284c7'],
      legend: { position: 'top', textStyle: { fontSize: 11 } },
      chartArea: { width: '82%', height: '68%', top: 30, bottom: 28 },
      pointSize: 5,
      lineWidth: 2.5,
      areaOpacity: 0.15,
      vAxis: {
        minValue: 0,
        gridlines: { color: '#f0f0f0' },
        textStyle: { fontSize: 11 }
      },
      hAxis: {
        textStyle: { fontSize: 11 }
      }
    };

    const tendenciaChart = new google.visualization.AreaChart(tendenciaContainer);
    tendenciaChart.draw(tendenciaData, tendenciaOptions);
  }

  if (typeof google !== 'undefined' && google.charts) {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(drawGoogleCharts);
  }

  // --------------------------------------------------------------------------
  // 2. DC.JS + CROSSFILTER (Gráfico 3: Destinos | Gráfico 4: Canales)
  // --------------------------------------------------------------------------
  if (typeof dc !== 'undefined' && typeof crossfilter !== 'undefined') {
    const tourismRecords = [
      { destino: 'Machu Picchu', canal: 'Google Ads / SEO', reservas: 210, ingresos: 42000 },
      { destino: 'Machu Picchu', canal: 'Instagram & TikTok', reservas: 145, ingresos: 29000 },
      { destino: 'Machu Picchu', canal: 'Agencias Aliadas', reservas: 95, ingresos: 19000 },
      { destino: 'Machu Picchu', canal: 'Email Marketing', reservas: 45, ingresos: 9000 },

      { destino: 'Líneas de Nazca', canal: 'Google Ads / SEO', reservas: 85, ingresos: 12750 },
      { destino: 'Líneas de Nazca', canal: 'Instagram & TikTok', reservas: 90, ingresos: 13500 },
      { destino: 'Líneas de Nazca', canal: 'Agencias Aliadas', reservas: 40, ingresos: 6000 },
      { destino: 'Líneas de Nazca', canal: 'Email Marketing', reservas: 25, ingresos: 3750 },

      { destino: 'Caral', canal: 'Google Ads / SEO', reservas: 45, ingresos: 4500 },
      { destino: 'Caral', canal: 'Instagram & TikTok', reservas: 55, ingresos: 5500 },
      { destino: 'Caral', canal: 'Agencias Aliadas', reservas: 20, ingresos: 2000 },
      { destino: 'Caral', canal: 'Email Marketing', reservas: 20, ingresos: 2000 }
    ];

    const ndx = crossfilter(tourismRecords);

    // Dimensiones y métricas agrupadas
    const destinoDim = ndx.dimension((d) => d.destino);
    const reservasPorDestino = destinoDim.group().reduceSum((d) => d.reservas);

    const canalDim = ndx.dimension((d) => d.canal);
    const ingresosPorCanal = canalDim.group().reduceSum((d) => d.ingresos);

    const pieDestinos = new dc.PieChart('#chart_destinos_dc');
    const rowCanales = new dc.RowChart('#chart_canales_dc');

    function renderDCCharts() {
      const pieW = destinosContainer.clientWidth || 380;
      const pieH = destinosContainer.clientHeight || 200;
      const radius = Math.min(pieW, pieH) / 2 - 14;

      // --- GRÁFICO 3: Participación de Reservas por Destino ---
      pieDestinos
        .width(pieW)
        .height(pieH)
        .radius(radius)
        .innerRadius(radius * 0.42)
        .dimension(destinoDim)
        .group(reservasPorDestino)
        .ordinalColors(['#f59e0b', '#0ea5e9', '#10b981'])
        .label((d) => `${d.key}: ${d.value}`)
        .title((d) => `${d.key}: ${d.value} reservas`);

      const rowW = canalesContainer.clientWidth || 380;
      const rowH = canalesContainer.clientHeight || 200;

      // --- GRÁFICO 4: Ingresos (USD) por Canal de Marketing ---
      rowCanales
        .width(rowW)
        .height(rowH)
        .margins({ top: 10, right: 25, bottom: 25, left: 15 })
        .dimension(canalDim)
        .group(ingresosPorCanal)
        .ordinalColors(['#2563eb', '#db2777', '#d97706', '#059669'])
        .elasticX(true)
        .label((d) => `${d.key} ($${d.value.toLocaleString()})`)
        .title((d) => `${d.key}: $${d.value.toLocaleString()} USD`)
        .xAxis()
        .ticks(4);

      dc.renderAll();
    }

    // Botón de reinicio de filtros interactivos de DC.js
    const resetBtn = document.getElementById('btn_reset_dc');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        dc.filterAll();
        dc.redrawAll();
      });
    }

    // Renderizado inicial y reajuste responsivo al cambiar el tamaño de ventana
    renderDCCharts();
    window.addEventListener('resize', () => {
      drawGoogleCharts();
      renderDCCharts();
    });
  }
});

/* ============================================================================
   (MANTÉN AQUÍ EL CÓDIGO PREVIO QUE YA TENÍAS EN TU ARCHIVO script.js)
   ============================================================================ */


/* ============================================================================
   MÓDULO ANALÍTICO: DASHBOARD TURISMO EN PERÚ (GOOGLE CHARTS + DC.JS)
   ============================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Verificamos si estamos en dashboard.html antes de ejecutar los gráficos
  const conversionContainer = document.getElementById('chart_conversion');
  const tendenciaContainer = document.getElementById('chart_tendencia');
  const destinosContainer = document.getElementById('chart_destinos_dc');
  const canalesContainer = document.getElementById('chart_canales_dc');

  if (!conversionContainer || !tendenciaContainer || !destinosContainer || !canalesContainer) {
    return; // Evita errores si script.js se carga en machu.html, caral.html, nazca.html o tablas.html
  }

  // --------------------------------------------------------------------------
  // 1. GOOGLE CHARTS (Gráfico 1: Conversión | Gráfico 2: Tendencia Mensual)
  // --------------------------------------------------------------------------
  function drawGoogleCharts() {
    if (typeof google === 'undefined' || !google.visualization) return;

    // --- GRÁFICO 1: Embudo de Conversión de Clientes ---
    const conversionData = google.visualization.arrayToDataTable([
      ['Etapa del Embudo', 'Usuarios', { role: 'style' }, { role: 'annotation' }],
      ['1. Visitas Sitio Web', 12500, '#3b82f6', '100% (12,500)'],
      ['2. Exploran Destinos', 5800, '#6366f1', '46.4% (5,800)'],
      ['3. Cotizan Paquete', 2150, '#f59e0b', '17.2% (2,150)'],
      ['4. Reserva Pagada', 875, '#16a34a', '7.0% (875)']
    ]);

    const conversionOptions = {
      legend: { position: 'none' },
      chartArea: { width: '78%', height: '72%', top: 18, bottom: 32 },
      vAxis: {
        minValue: 0,
        gridlines: { color: '#f0f0f0' },
        textStyle: { fontSize: 11 }
      },
      hAxis: {
        textStyle: { fontSize: 11, bold: true }
      },
      annotations: {
        alwaysOutside: true,
        textStyle: { fontSize: 11, bold: true, color: '#111' }
      },
      animation: { startup: true, duration: 600, easing: 'out' }
    };

    const conversionChart = new google.visualization.ColumnChart(conversionContainer);
    conversionChart.draw(conversionData, conversionOptions);

    // --- GRÁFICO 2: Tendencia Estacional de Reservas ---
    const tendenciaData = google.visualization.arrayToDataTable([
      ['Mes', 'Turistas Extranjeros', 'Turistas Nacionales'],
      ['Ene', 420, 310],
      ['Feb', 350, 290],
      ['Mar', 390, 320],
      ['Abr', 510, 410],
      ['May', 640, 380],
      ['Jun', 890, 450],
      ['Jul', 980, 620],
      ['Ago', 940, 510],
      ['Sep', 720, 390],
      ['Oct', 680, 430],
      ['Nov', 590, 400],
      ['Dic', 650, 540]
    ]);

    const tendenciaOptions = {
      colors: ['#ea580c', '#0284c7'],
      legend: { position: 'top', textStyle: { fontSize: 11 } },
      chartArea: { width: '82%', height: '68%', top: 30, bottom: 28 },
      pointSize: 5,
      lineWidth: 2.5,
      areaOpacity: 0.15,
      vAxis: {
        minValue: 0,
        gridlines: { color: '#f0f0f0' },
        textStyle: { fontSize: 11 }
      },
      hAxis: {
        textStyle: { fontSize: 11 }
      }
    };

    const tendenciaChart = new google.visualization.AreaChart(tendenciaContainer);
    tendenciaChart.draw(tendenciaData, tendenciaOptions);
  }

  if (typeof google !== 'undefined' && google.charts) {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(drawGoogleCharts);
  }


  if (typeof dc !== 'undefined' && typeof crossfilter !== 'undefined') {
    const tourismRecords = [
      { destino: 'Machu Picchu', canal: 'Google Ads / SEO', reservas: 210, ingresos: 42000 },
      { destino: 'Machu Picchu', canal: 'Instagram & TikTok', reservas: 145, ingresos: 29000 },
      { destino: 'Machu Picchu', canal: 'Agencias Aliadas', reservas: 95, ingresos: 19000 },
      { destino: 'Machu Picchu', canal: 'Email Marketing', reservas: 45, ingresos: 9000 },

      { destino: 'Líneas de Nazca', canal: 'Google Ads / SEO', reservas: 85, ingresos: 12750 },
      { destino: 'Líneas de Nazca', canal: 'Instagram & TikTok', reservas: 90, ingresos: 13500 },
      { destino: 'Líneas de Nazca', canal: 'Agencias Aliadas', reservas: 40, ingresos: 6000 },
      { destino: 'Líneas de Nazca', canal: 'Email Marketing', reservas: 25, ingresos: 3750 },

      { destino: 'Caral', canal: 'Google Ads / SEO', reservas: 45, ingresos: 4500 },
      { destino: 'Caral', canal: 'Instagram & TikTok', reservas: 55, ingresos: 5500 },
      { destino: 'Caral', canal: 'Agencias Aliadas', reservas: 20, ingresos: 2000 },
      { destino: 'Caral', canal: 'Email Marketing', reservas: 20, ingresos: 2000 }
    ];

    const ndx = crossfilter(tourismRecords);


    const destinoDim = ndx.dimension((d) => d.destino);
    const reservasPorDestino = destinoDim.group().reduceSum((d) => d.reservas);

    const canalDim = ndx.dimension((d) => d.canal);
    const ingresosPorCanal = canalDim.group().reduceSum((d) => d.ingresos);

    const pieDestinos = new dc.PieChart('#chart_destinos_dc');
    const rowCanales = new dc.RowChart('#chart_canales_dc');

    function renderDCCharts() {
      const pieW = destinosContainer.clientWidth || 380;
      const pieH = destinosContainer.clientHeight || 200;
      const radius = Math.min(pieW, pieH) / 2 - 14;

      pieDestinos
        .width(pieW)
        .height(pieH)
        .radius(radius)
        .innerRadius(radius * 0.42)
        .dimension(destinoDim)
        .group(reservasPorDestino)
        .ordinalColors(['#f59e0b', '#0ea5e9', '#10b981'])
        .label((d) => `${d.key}: ${d.value}`)
        .title((d) => `${d.key}: ${d.value} reservas`);

      const rowW = canalesContainer.clientWidth || 380;
      const rowH = canalesContainer.clientHeight || 200;


      rowCanales
        .width(rowW)
        .height(rowH)
        .margins({ top: 10, right: 25, bottom: 25, left: 15 })
        .dimension(canalDim)
        .group(ingresosPorCanal)
        .ordinalColors(['#2563eb', '#db2777', '#d97706', '#059669'])
        .elasticX(true)
        .label((d) => `${d.key} ($${d.value.toLocaleString()})`)
        .title((d) => `${d.key}: $${d.value.toLocaleString()} USD`)
        .xAxis()
        .ticks(4);

      dc.renderAll();
    }

    const resetBtn = document.getElementById('btn_reset_dc');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        dc.filterAll();
        dc.redrawAll();
      });
    }

 
    renderDCCharts();
    window.addEventListener('resize', () => {
      drawGoogleCharts();
      renderDCCharts();
    });
  }
});