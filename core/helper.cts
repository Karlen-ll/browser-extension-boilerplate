const replace = require('buffer-replace');

const pageMap = {
  popup: '<style>html{display:flex;background-color:#131418;min-height:100vh;justify-content:center;' +
      'align-items:center;overflow-x:hidden}body{width: min-content;outline:1px solid #000;' +
      'background-color:#fff;overflow:hidden;margin:0}</style>',
};

const addStyleToFile = (file) => {
  if (pageMap[file.stem]) {
    const mark = '</head>';
    const style = pageMap[file.stem];

    if (style) {
      file.contents = replace(Buffer.from(file.contents), mark, `${ style }\n${ mark }`);
    }
  }
};

module.exports = {
  addStyleToFile,
};
