const {
  Menu, shell, ipcMain, BrowserWindow, app, globalShortcut,
} = require('electron');
const {openFile, saveFile} = require('./editorOptions');

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open',
        accelerator: 'CommandOrControl+Shift+O',
        click() {
          const win = BrowserWindow.getFocusedWindow();
          openFile(win);
        }
      },
      {
        label: 'Save',
        accelerator: 'CommandOrControl+Shift+S',
        click() {
          const win = BrowserWindow.getFocusedWindow();
          win.webContents.send('editor-channel', 'file-save');
        }
      }
    ],
  },
  {
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
  }
];

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
  saveFile(win, arg);
});

// Open file
ipcMain.on('file-open', (event, arg) => {
  const win = BrowserWindow.getFocusedWindow();
  openFile(win);
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
    openFile(win);
  });
});

module.exports = menu;
