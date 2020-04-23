import { dialog } from "electron";

export const menu = [
  {
    label: "File",
    submenu: [
      {
        label: "Open",
        click(menuItem, browserWindow, event) {
          dialog.showOpenDialog({
            properties: ["openFile"],
          });
        },
      },
      { label: "Generate Report" },
    ],
  },
];
