import { dialog, ipcMain, BrowserWindow } from "electron";

export const getMenu = () => [
  {
    label: "File",
    submenu: [
      {
        label: "Open",
        accelerator: "CmdOrCtrl+o",

        async click(menuItem, browserWindow: BrowserWindow, event) {
          try {
            const result = await dialog.showOpenDialog({
              properties: ["openFile"],
              filters: [
                {
                  name: "Input Data",
                  extensions: ["json"],
                },
              ],
            });
            if (result.filePaths[0]) browserWindow.webContents.send("LOAD_FILE", { payload: result.filePaths[0] });
          } catch (e) {
            console.error(e);
          }
        },
      },
      {
        label: "Generate Report",
        accelerator: "CmdOrCtrl+s",
        async click(menuItem, browserWindow: BrowserWindow, event) {
          const result = await dialog.showSaveDialog(null, null);
          if (result.filePath) browserWindow.webContents.send("GENERATE_REPORT", { payload: result.filePath });
        },
      },
    ],
  },
];
