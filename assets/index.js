// import cup  from './assets/Cup.png';
// import J  from './assets/J.png';
// import Q  from './assets/Q.png';
// import K  from './assets/K.png';
// import A  from './assets/A.png';

// export {
//   cup,
//   J,
//   Q,
//   K,
//   A,
// }

// const testFolder = './';
// const fs = require('fs');
// const path = require('path')

// const allowedExts = [
//   '.png',
//   '.jpg' // add any extensions you need
// ]

// const modules = {};

// const files = fs.readdirSync(testFolder);

// if (files && files.length) {
//   files
//     .filter(file => allowedExts.indexOf(path.extname(file)) > -1)
//     .forEach(file => exports[path.basename(file, path.extname(file))] = require(`./${file}`));
// }

// module.exports = modules;