function bouncer(arr) {
  return arr.filter(Boolean);
}

function isGenap(n) {
  return n % 2 == 0;
}

function quadraticModel(data) {
  const x = [];
  const x2 = [];
  const x4 = [];
  const xy = [];
  const ymod = [];
  const x2y = [];
  const panjang = data.length;
  if (isGenap(panjang)) {
    i = -1 * (panjang / 2);
    data.forEach((row) => {
      if (i !== 0) {
        x.push(i);
        x2.push(i * i);
        x4.push(i * i * i * i);
        xy.push(i * row);
        x2y.push(i * i * row);
      } else {
        i++;
        x.push(i);
        x2.push(i * i);
        x4.push(i * i * i * i);
        xy.push(i * row);
        x2y.push(i * i * row);
      }
      i++;
    });
  } else {
    i = (-1 * (panjang - 1)) / 2;
    data.forEach((row) => {
      x.push(i);
      x2.push(i * i);
      x4.push(i * i * i * i);
      xy.push(i * row);
      x2y.push(i * i * row);
      i++;
    });
  }
  const sumx4 = x4.reduce((a, b) => a + b, 0);
  const sumx2y = x2y.reduce((a, b) => a + b, 0);
  const sumx2 = x2.reduce((a, b) => a + b, 0);
  const sumxy = xy.reduce((a, b) => a + b, 0);
  const sumy = data.reduce((a, b) => a + b, 0);

  const a = (sumy * sumx4 - sumx2y * sumx2) / (panjang * sumx4 - sumx2 * sumx2);
  const b = sumxy / sumx2;
  const c =
    (panjang * sumx2y - sumx2 * sumy) / (panjang * sumx4 - sumx2 * sumx2);

  x.forEach((row) => {
    ymod.push(a + b * row + c * row * row);
  });

  return ymod;
}

function linearModel(data) {
  const x = [];
  const x2 = [];
  const xy = [];
  const ymod = [];
  const panjang = data.length;
  if (isGenap(panjang)) {
    i = -1 * (panjang / 2);
    data.forEach((row) => {
      if (i !== 0) {
        x.push(i);
        x2.push(i * i);
        xy.push(i * row);
      } else {
        z = i + 1;
        x.push(z);
        x2.push(z * z);
        xy.push(z * row);
        i++;
      }
      i++;
    });
  } else {
    i = (-1 * (panjang - 1)) / 2;
    data.forEach((row) => {
      x.push(i);
      x2.push(i * i);
      xy.push(i * row);

      i++;
    });
  }
  const sumy = data.reduce((a, b) => a + b, 0);
  const sumxy = xy.reduce((a, b) => a + b, 0);
  const sumx2 = x2.reduce((a, b) => a + b, 0);
  const a = sumy / panjang;
  const b = sumxy / sumx2;
  x.forEach((row) => {
    ymod.push(a + b * row);
  });
  return ymod;
}