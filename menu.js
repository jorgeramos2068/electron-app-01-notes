const {
  Menu, shell, ipcMain, BrowserWindow, app, globalShortcut, dialog
} = require('electron');
const fs = require('fs');

const template = [{
  role: 'help',
  submenu: [
    {
      label: 'About us',
      click() {
        shell.openExternal('https://www.electronjs.org');
      }
    },
    { role: 'toggledevtools' },
  ],
},
{
  label: 'Communication',
  submenu: [
    {
      label: 'Bold',
      click() {
        const win = BrowserWindow.getFocusedWindow();
        win.webContents.send('editor-channel', 'style-bold');
      }
    },
    {
      label: 'Italic',
      click() {
        const win = BrowserWindow.getFocusedWindow();
        win.webContents.send('editor-channel', 'style-italic');
      }
    },
    {
      label: 'H1',
      click() {
        const win = BrowserWindow.getFocusedWindow();
        win.webContents.send('editor-channel', 'style-h1');
      }
    },
    {
      label: 'H2',
      click() {
        const win = BrowserWindow.getFocusedWindow();
        win.webContents.send('editor-channel', 'style-h2');
      }
    },
  ],
}];

if (process.env.DEBUG) {
  template.push(
    {
      label: 'Debugging',
      submenu: [
        { role: 'toggledevtools' },
        {
          role: 'reload',
          accelerator: 'Alt+C'
        },
        { type: 'separator' },
        { role: 'quit' }
      ],
    }
  );
};

if (process.platform === 'darwin') {
  template.push({
    label: 'MacOS',
    submenu: [
      { role: 'toggledevtools' }
    ]
  });
}

// Save file
ipcMain.on('file-save', (event, arg) => {
  const win = BrowserWindow.getFocusedWindow();
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
  fs.writeFileSync(path, arg);
});

const menu = Menu.buildFromTemplate(template);

app.on('ready', () => {
  // Save file
  globalShortcut.register('CommandOrControl+Shift+S', () => {
    const win = BrowserWindow.getFocusedWindow();
    win.webContents.send('editor-channel', 'file-save');
  });
  // Open file
  globalShortcut.register('CommandOrControl+Shift+O', () => {
    const win = BrowserWindow.getFocusedWindow();
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
  });
});

module.exports = menu;
