const { BrowserWindow, app, dialog, globalShortcut } = require('electron');
const path = require("path");
const os = require('os')

let mainWindow;

const flash_path = path.join(__dirname, `${os.arch() === 'x64' ? "flash_plugin/64x/libpepflashplayer.so" : "flash_plugin/32x/libpepflashplayer.so"}`);
app.commandLine.appendSwitch("ppapi-flash-path", flash_path);
app.commandLine.appendSwitch("ppapi-flash-version", `${os.arch() === 'x64' ? "32.0.0.387" : "26.0.0.151"}`);

dialog.showErrorBox = function(title, content) {
  console.log(`${title}\n${content}`);
};

app.on("ready", function() {
  mainWindow = new BrowserWindow({
    "width": 800,
    "height": 600,
    'title': "Transformice",
    'icon': path.join(__dirname, "icons/icone48.png"),
    "webPreferences": {
      "plugins": true,
      "sandbox": true
    }
  });

  mainWindow.setMenu(null)
  mainWindow.setMenuBarVisibility(false)

  const id = mainWindow.id
  globalShortcut.register("Ctrl+q", () => {
    const window = BrowserWindow.fromId(id);
    window.close()
  });

  globalShortcut.register("Ctrl+m", () => {
    const window = BrowserWindow.fromId(id);
    if (window.isMaximized()) {
      window.unmaximize();
    } else {
      window.maximize();
    }
  });

  mainWindow.loadURL("file://" + __dirname + "/TFM/index.html");

  setTimeout(() => {
    mainWindow.loadURL('http://www.transformice.com/TransformiceChargeur.swf');
  }, 1600)
});
