let globalChart = null;
// fetch('https://apicovid19indonesia-v2.vercel.app/api/indonesia/harian')
//     .then(response => response.json())
//     .then(res => {
//         var momentDate = moment(res[500].tanggal)
//         console.log(momentDate.day())
//         let labels = [];
//         let cases = [];
//         res.forEach(element => {
//              labels.push(element.tanggal);
//              cases.push(element.positif);
//         });

//         document.querySelector('#loading').innerHTML = ""
//         var myChart = new Chart(ctx, {
//             type: 'line',
//             data: {
//                 labels: labels,
//                 datasets: [{
//                     label: 'COVID-19 Cases Indonesia',
//                     data: bouncer(cases),
//                     fill: false,
//                     borderColor: 'rgb(75, 192, 192)',
//                 },{
//                     label: 'Model Linier',
//                     data: linearModel(bouncer(cases)),
//                     fill: false,
//                     borderColor: 'rgb(192, 75, 192)',
//                 }, {
//                     label: 'Model Kuadratik',
//                     data: quadraticModel(bouncer(cases)),
//                     fill: false,
//                     borderColor: 'rgb(192, 192, 75)',
//                 }]
//             }
//         });
//     })
//     .catch(error => console.log(error));

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

async function drawChart(title, titleline, xtitle, ytitle, click) {
  //data
  var ctx = document.getElementById('myChart').getContext('2d');
  Chart.defaults.scales.linear.min = 0;
  const datapoint = await getData();
  const panjang = datapoint.tgl.length;

  if (click == "1") {
    if (globalChart != null) {
      globalChart.destroy();
    }
  }
  if (click == "2020") {
    const slice = datapoint.tgl.indexOf("2021-01-01");
    const tgl = datapoint.tgl.slice(0, slice);
    const kasus = datapoint.kasus.slice(0, slice);
    datapoint.tgl = tgl;
    datapoint.kasus = kasus;
    if (globalChart != null) {
      globalChart.destroy();
    }
  }
  if (click == "2021") {
    const slice = datapoint.tgl.indexOf("2021-01-01");
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
        borderColor: "#003f5c",
        backgroundColor: "#003f5c",
        fill: false,
        cubicInterpolationMode: "monotone",
      },
      {
        label: "Model linear",
        data: linearModel(bouncer(datapoint.kasus)),
        borderColor: "#bc5090",
        backgroundColor: "#bc5090",
        borderDash: [5, 5],
        fill: false,
        cubicInterpolationMode: "monotone",
      },
      {
        label: "Model kuadrat",
        data: quadraticModel(bouncer(datapoint.kasus)),
        borderColor: "#ffa600",
        backgroundColor: "#ffa600",
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
  globalChart = new Chart(ctx, config);
}

async function getData() {
    let tgl = [];
    let kasus = [];

    let data = fetch('https://apicovid19indonesia-v2.vercel.app/api/indonesia/harian')
    .then(response => response.json())
    .then(res => {
        res.forEach(element => {
            let tanggal = moment(element.tanggal)
            tanggal = tanggal.format("YYYY-MM-DD")
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