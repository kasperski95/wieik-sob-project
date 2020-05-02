import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { StoreService, ElectronService } from "../core/services";
import { IpcRendererEvent } from "electron";
import { IInputData } from "../core/services/store/IInputData";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private storeService: StoreService, private electronService: ElectronService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.storeService.subscribe(() => {
      this.cdr.detectChanges();
    });

    this.electronService.ipcRenderer.on("LOAD_FILE", (event: IpcRendererEvent, { payload: filePath }: { payload: string }) => {
      this.loadStateFromFile(filePath);
    });

    this.electronService.ipcRenderer.on("GENERATE_REPORT", (event: IpcRendererEvent, { payload: filePath }: { payload: string }) => {
      this.generateReport(filePath);
    });
  }

  loadStateFromFile(filePath: string) {
    const rawData = this.electronService.fs.readFileSync(filePath).toString();
    const data = JSON.parse(rawData) as IInputData;
    this.storeService.generateState(data);
  }

  generateReport(filePath: string) {
    const data = this.storeService.generateReport();
    this.electronService.fs.writeFileSync(filePath, data);
  }
}
