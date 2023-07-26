const {dialog} = require('electron');
const fs = require('fs');
const path = require('path');

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
    win.webContents.send('file-change-title', path.basename(paths[0]));
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
  const auxPath = dialog.showSaveDialogSync(win, options);
  if (auxPath) {
    fs.writeFileSync(auxPath, data);
  }
};
