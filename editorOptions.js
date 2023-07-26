const {dialog} = require('electron');
const fs = require('fs');

module.exports.openFile = (win) => {
  const options = {
    title: 'Open file',
    filters: [
      {
        name: 'Text',
        extensions: ['txt']
      }
    ],
  };
  const paths = dialog.showOpenDialogSync(win, options);
  if (paths?.length > 0) {
    const content = fs.readFileSync(paths[0]).toString();
    win.webContents.send('file-open', content);
  }
};

module.exports.saveFile = (win, data) => {
  const options = {
    title: 'Save file',
    filters: [
      {
        name: 'Text',
        extensions: ['txt']
      }
    ],
  };
  const path = dialog.showSaveDialogSync(win, options);
  if (path) {
    fs.writeFileSync(path, data);
  }
};
