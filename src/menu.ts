import { dialog, ipcMain, BrowserWindow } from "electron";

export const getMenu = () => [
  {
    label: "File",
    submenu: [
      {
        label: "Open",
        async click(menuItem, browserWindow: BrowserWindow, event) {
          try {
            const result = await dialog.showOpenDialog({
              properties: ["openFile"],
            });
            if (result.filePaths[0]) browserWindow.webContents.send("LOAD_FILE", { payload: result.filePaths[0] });
          } catch (e) {
            console.error(e);
          }
        },
      },
      { label: "Generate Report" },
    ],
  },
];
