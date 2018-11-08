// const fs = require('fs');

const base = {
  Location: 0,
  Name: null,
  Frequency: null,
  Duplex: null,
  Offset: 0,
  Tone: null,
  rToneFreq: 88.5,
  cToneFreq: 88.5,
  DtcsCode: 23,
  DtscRxCode: 23,
  DtcsPolarity: 'NN',
  Mode: 'FM',
  TStep: 5,
  Comment: 'Colorado Council of Amateur Radio Clubs (CCARC)'
};

function leadingZeroes(number, count) {
  let num = number.toString();
  while (num.length <= count) {
    num = '0' + num;
  }
  return num;
}

const allData = [];
const names = ['2m', '1.25m', '70cm'];

names.forEach(name => {
  console.log('Starting', name);
  let data = JSON.parse(fs.readFileSync(`./${name}.json`));

  data.sort((a, b) => a.Frequency - b.Frequency);

  data.forEach((p, i) => {
    const d = {...base, ...p};

    d.Location = allData.length;
    d.Name = (`${name.substring(0, 4)}-${p.Name || leadingZeroes(i + 1, 1)}`);
    console.log(i, d);
    allData.push(d);
  });

  console.log('Finished', name);
});

fs.writeFileSync(`./radio-out.json`, JSON.stringify(allData));


