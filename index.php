<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <title>Dashboard Statistik Distribusi & Jasa</title>
  </head>
  <body>
      <div class="container">
          <h1>Dashboard Statistik Distribusi & Jasa</h1>


          <h2>Grafik Ekspor Impor Bulanan Provinsi Bali (US $)</h2>
          <div class="flourish-embed flourish-bar-chart-race" data-src="visualisation/7487567"><script src="https://public.flourish.studio/resources/embed.js"></script></div>
          <h3>Penjelasan & Evaluasi Singkat</h3>
          <p>Dari grafik terlihat bahwa bulan Maret, ekspor di Provinsi Bali selalu tinggi</p>
          
          <hr>
          <h2>Nilai Ekspor Provinsi Bali Menurut Kawasan Tujuan (Ribu US$)</h2>
          <div class="flourish-embed flourish-bar-chart-race" data-src="visualisation/7451468"><script src="https://public.flourish.studio/resources/embed.js"></script></div>
          
          <h3>Penjelasan & Evaluasi Singkat</h3>
          <p>Sejak 2011 hingga tahun 2019, Amerika menjadi tujuan ekspor terbanyak disusul oleh negara-negara Asia (Non Asean),
            dan Eropa. Sebelum tahun 2011, negara-negara Asia (Non Asean) menjadi tujuan ekspor terbanyak dari Provinsi Bali.
          </p>

          <hr>

          <h5>Sumber Data: BPS Provinsi Bali</h5>
          <h5>Nama/NIM: Thoriq Ibadurrohman/221810626</h5>
          <h5>Kelas: 4SI1</h5>
          <h5>Dosen: Dr. Ir. Sasmito Hadi Wibowo, M.Sc</h5>
      </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <script>
      fetch('https://covid.ourworldindata.org/data/owid-covid-data.json')
      .then(result => JSON.parse(result))
      .then(result => console.log(result))
    </script>
  </body>
</html>