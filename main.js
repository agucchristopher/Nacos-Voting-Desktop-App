const { app, BrowserWindow, Notification } = require("electron");
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  const NOTIFICATION_TITLE = "Basic Notification";
  const NOTIFICATION_BODY = "Notification from the Main process";

  new Notification({
    title: NOTIFICATION_TITLE,
    body: NOTIFICATION_BODY,
    sound: "./assets/beep.mp3",
  }).show();
  win.loadFile("./pages/index.html");
};

app.whenReady().then(() => {
  createWindow();
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
