const {
  app,
  BrowserWindow,
  Notification,
  MenuItem,
  Menu,
  
} = require("electron");
const createWindow = () => {
  let progressInterval;
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  const NOTIFICATION_TITLE = "Login Successful";
  const NOTIFICATION_BODY = "Welcome back, let's start voting ✌";

  new Notification({
    title: NOTIFICATION_TITLE,
    body: NOTIFICATION_BODY,
    sound: "./assets/beep.mp3",
    timeoutType: "default",
  }).show();
  win.loadFile("./pages/index.html");
  const INCREMENT = 0.03;
  const INTERVAL_DELAY = 100; // ms

  let c = 0;
  progressInterval = setTimeout(() => {
    // update progress bar to next value
    // values between 0 and 1 will show progress, >1 will show indeterminate or stick at 100%
    win.setProgressBar(c);

    // increment or reset progress bar
    if (c < 2) {
      c += INCREMENT;
    } else {
      c = -INCREMENT * 5; // reset to a bit less than 0 to show reset state
    }
  }, INTERVAL_DELAY);
};

app.whenReady().then(createWindow);

// before the app is terminated, clear both timers
app.on("before-quit", () => {
  clearTimeout(progressInterval);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
