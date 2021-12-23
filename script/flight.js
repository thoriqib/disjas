// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

const pickRandomColor = (x) => {
  let color = []
  x.forEach(el => {
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    randomColor = '#' + randomColor;
    color.push(randomColor)
  });
  return color;
}

let today = moment();
let yesterday = moment().add(-1, 'days');
const bandara = ['Achmad Yani', 'Adisutjipto', 'Branti', 'Halim Perdana Kusuma', 'Hasanudin', 'Juanda', 'Mahmud Badaruddin Ii', 'Ngurah Rai International', 'Sultan Aji Muhamad Sulaiman Airport', 'Sultan Syarif Kasim Ii', null]
const chartColor = pickRandomColor(bandara)

$('.date').html(`${yesterday.format('DD/MM/YYYY')} - ${today.format('DD/MM/YYYY')}`)

fetch('http://api.aviationstack.com/v1/flights?access_key=ba4874b419b81bf02a32fcbd09cd555a&dep_iata=bdo')
  .then(response => response.json())
  .then(data => {
    let jumlahPesawat = []
    $('#dep-number').html(data.pagination.count)
    bandara.forEach(x => {
      let jml = data.data.filter(el => el.arrival.airport === x)
      jumlahPesawat.push(jml.length)
    });
    bandara[bandara.length-1] = 'Kualanamu'
    // Pie Chart Example
    var ctx = document.getElementById("chart-tujuan");
    var chartTujuan = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: bandara,
        datasets: [{
          data: jumlahPesawat,
          backgroundColor: chartColor,
          // hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
          // hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 10,
          yPadding: 10,
          displayColors: false,
          caretPadding: 5,
        },
      },
    });
});

fetch('http://api.aviationstack.com/v1/flights?access_key=ba4874b419b81bf02a32fcbd09cd555a&arr_iata=bdo')
  .then(response => response.json())
  .then(data => {
    let jumlahPesawat = []
    bandara[bandara.length-1] = 'Polonia'
    $('#arr-number').html(data.pagination.count)
    bandara.forEach(x => {
      let jml = data.data.filter(el => el.departure.airport === x)
      jumlahPesawat.push(jml.length)
    });
    bandara[bandara.length-1] = 'Kualanamu'
    // Pie Chart Example
    var ctx = document.getElementById("chart-asal");
    var chartTujuan = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: bandara,
        datasets: [{
          data: jumlahPesawat,
          backgroundColor: chartColor,
          // hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
          // hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 10,
          yPadding: 10,
          displayColors: false,
          caretPadding: 5,
        },
      },
    });

});
  
var map = L.map('map').setView([-6.90062, 107.576202], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([-6.90062, 107.576202]).addTo(map)
    .bindPopup('Bandara Internasional Husein Sastranegara Bandung (BDO)')
    .openPopup();

