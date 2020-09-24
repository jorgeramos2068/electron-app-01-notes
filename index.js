const {app, BrowserWindow, Menu} = require('electron');
const menu = require('./menu');

function createWindow() {
  // Create the browser window
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  // Load index.html of the app
  win.loadFile('index.html');
}

app.whenReady().then(createWindow);
Menu.setApplicationMenu(menu);
