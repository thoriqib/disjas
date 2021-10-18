let globalChart = null;
let dynamicChart = null;

drawDynamicChart();

drawChart(
    "Grafik Kasus Harian Covid-19 di Indonesia",
    "Jumlah Kasus",
    "Tanggal",
    "Jumlah Kasus",
    "2021"
);

function graph() {
  const pil = document.getElementById("data-selector");
  drawChart(
    "Grafik Kasus Harian Covid-19 di Indonesia",
    "Jumlah Kasus",
    "Tanggal",
    "Jumlah Kasus",
    pil.value
  );
}

async function graphByDate() {
  let dateStart = document.getElementById("date-start");
  let dateEnd = document.getElementById("date-end");

  let temp1 = moment(dateStart.value)
  let temp2 = moment(dateEnd.value)

  dateStart = temp1.format("DD-MM-YYYY")
  dateEnd = temp2.format("DD-MM-YYYY")

  var ctx = document.getElementById('myChart').getContext('2d');
  Chart.defaults.scales.linear.min = 0;
  const datapoint = await getData();

  let indexStart = datapoint.tgl.indexOf(dateStart);
  let indexEnd = datapoint.tgl.indexOf(dateEnd);

  if(indexEnd < indexStart){
    let temp = indexEnd;
    indexEnd = indexStart;
    indexStart = temp;
  }

  const tgl = datapoint.tgl.slice(indexStart, indexEnd);
  const kasus = datapoint.kasus.slice(indexStart, indexEnd);
  datapoint.tgl = tgl;
  datapoint.kasus = kasus;
  if (globalChart != null) {
    globalChart.destroy();
  }

  const data = {
    labels: datapoint.tgl,
    datasets: [
      {
        label: "Jumlah Kasus",
        data: bouncer(datapoint.kasus),
        borderColor: "#0F00FF",
        backgroundColor: "#0F00FF",
        fill: false,
        cubicInterpolationMode: "monotone",
      },
      {
        label: "Model Linear",
        data: linearModel(bouncer(datapoint.kasus)),
        borderColor: "#FFA400",
        backgroundColor: "#FFA400",
        borderDash: [20, 10],
        fill: false,
        cubicInterpolationMode: "monotone",
      },
      {
        label: "Model Kuadratik",
        data: quadraticModel(bouncer(datapoint.kasus)),
        borderColor: "#E02401",
        backgroundColor: "#E02401",
        borderDash: [20, 10],
        fill: false,
        cubicInterpolationMode: "monotone",
      },
    ],
  };

  //config
  const config = {
    type: "line",
    data: data,
    options: {
      elements: {
        point: {
          radius: 0,
        },
      },
      aspectRatio: 1.4,
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Grafik Kasus Harian Covid-19 di Indonesia",
          font: {
            size: 20,
          },
        },
        subtitle: {
          display: true,
          font: {
            size: 14,
          },
          text: `${temp1.format("DD-MM-YYYY")} sampai ${temp2.format("DD-MM-YYYY")}`
        }
      },
      interaction: {
        intersect: false,
      },
      layout: {
        padding: 3,
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: "Tanggal",
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "Jumlah Kasus",
          },
        },
      },
    },
  };
  globalChart = new Chart(ctx, config);
}

async function drawChart(title, titleline, xtitle, ytitle, click) {
  //data
  var ctx = document.getElementById('myChart').getContext('2d');
  Chart.defaults.scales.linear.min = 0;
  document.getElementById('spinner-cases').classList.add('spinner-border');
  const datapoint = await getData();
  const panjang = datapoint.tgl.length;

  if (click == "1") {
    if (globalChart != null) {
      globalChart.destroy();
    }
  }
  if (click == "2020") {
    const slice = datapoint.tgl.indexOf("01-01-2021");
    const tgl = datapoint.tgl.slice(0, slice);
    const kasus = datapoint.kasus.slice(0, slice);
    datapoint.tgl = tgl;
    datapoint.kasus = kasus;
    if (globalChart != null) {
      globalChart.destroy();
    }
  }
  if (click == "2021") {
    const slice = datapoint.tgl.indexOf("01-01-2021");
    const tgl = datapoint.tgl.slice(slice, panjang);
    const kasus = datapoint.kasus.slice(slice, panjang);
    datapoint.tgl = tgl;
    datapoint.kasus = kasus;
    if (globalChart != null) {
      globalChart.destroy();
    }
  }

  const data = {
    labels: datapoint.tgl,
    datasets: [
      {
        label: titleline,
        data: bouncer(datapoint.kasus),
        borderColor: "#0F00FF",
        backgroundColor: "#0F00FF",
        fill: false,
        cubicInterpolationMode: "monotone",
      },
      {
        label: "Model Linear",
        data: linearModel(bouncer(datapoint.kasus)),
        borderColor: "#FFA400",
        backgroundColor: "#FFA400",
        borderDash: [20, 10],
        fill: false,
        cubicInterpolationMode: "monotone",
      },
      {
        label: "Model Kuadratik",
        data: quadraticModel(bouncer(datapoint.kasus)),
        borderColor: "#E02401",
        backgroundColor: "#E02401",
        borderDash: [20, 10],
        fill: false,
        cubicInterpolationMode: "monotone",
      },
    ],
  };

  //config
  const config = {
    type: "line",
    data: data,
    options: {
      elements: {
        point: {
          radius: 0,
        },
      },
      aspectRatio: 1.4,
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: title,
          font: {
            size: 20,
          },
        },
        subtitle: {
          display: true,
          font: {
            size: 14,
          },
          text: (click !== '1') ? `Tahun ${click}` : '' 
        }
      },
      interaction: {
        intersect: false,
      },
      layout: {
        padding: 3,
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: xtitle,
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: ytitle,
          },
        },
      },
    },
  };
  document.getElementById('spinner-cases').classList.remove('spinner-border');
  globalChart = new Chart(ctx, config);
}

async function drawDynamicChart(){
  document.getElementById('spinner-dynamic').classList.add('spinner-border');
  if (dynamicChart != null) dynamicChart.destroy();
  var dynamic = document.getElementById('dynamic').getContext('2d');
  // <block:data:2>
  let data = await getData();
  document.getElementById('spinner-dynamic').classList.remove('spinner-border');
  // </block:data>

  // <block:animation:1>
  const totalDuration = 10000;
  const delayBetweenPoints = totalDuration / data.kasus.length;
  const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
  const animation = {
    x: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: NaN, // the point is initially skipped
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.xStarted) {
          return 0;
        }
        ctx.xStarted = true;
        return ctx.index * delayBetweenPoints;
      }
    },
    y: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: previousY,
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.yStarted) {
          return 0;
        }
        ctx.yStarted = true;
        return ctx.index * delayBetweenPoints;
      }
    }
  };
  // </block:animation>
  console.log(data.tgl)
  // <block:config:0>
  const config = {
    type: 'line',
    data: {
      labels: data.tgl,
      datasets: [{
        label: 'Jumlah Kasus',
        data: bouncer(data.kasus),
        borderColor: "#0F00FF",
        backgroundColor: "#0F00FF",
        fill: false,
        cubicInterpolationMode: "monotone",
      },
      {
        label: "Model Linear",
        data: linearModel(bouncer(data.kasus)),
        borderColor: "#FFA400",
        backgroundColor: "#FFA400",
        borderDash: [20, 10],
        fill: false,
        cubicInterpolationMode: "monotone",
      },
      {
        label: "Model Kuadratik",
        data: quadraticModel(bouncer(data.kasus)),
        borderColor: "#E02401",
        backgroundColor: "#E02401",
        borderDash: [20, 10],
        fill: false,
        cubicInterpolationMode: "monotone",
      }]
    },
    options: {
      animation,
      elements: {
        point: {
          radius: 0,
        },
      },
      aspectRatio: 1.4,
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Grafik Dinamis Kasus Harian Covid-19 Indonesia',
          font: {
            size: 20,
          },
        },
      },
      interaction: {
        intersect: false,
      },
      layout: {
        padding: 3,
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Tanggal',
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Jumlah Kasus',
          },
        },
      },
    }
  };
  // </block:config>
  dynamicChart = new Chart(dynamic, config);
}

async function getData() {
    let tgl = [];
    let kasus = [];

    let data = fetch('https://apicovid19indonesia-v2.vercel.app/api/indonesia/harian')
    .then(response => response.json())
    .then(res => {
        res.forEach(element => {
            let tanggal = moment(element.tanggal)
            tanggal = tanggal.format("DD-MM-YYYY")
            tgl.push(tanggal);
            kasus.push(element.positif);
        });
        return {
            tgl,
            kasus,
        };
    })
    .catch(error => console.log(error));
    return data;
}