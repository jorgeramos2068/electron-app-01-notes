const {Menu, shell, ipcMain, BrowserWindow} = require('electron');

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

ipcMain.on('editor-channel', (event, arg) => {
  console.log('Received message: ', arg);
});

const menu = Menu.buildFromTemplate(template);

module.exports = menu;
