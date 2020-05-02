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

    // check existence
    if (!data.bits) {
      alert('Property "bits" is required.');
      return;
    }

    if (!data.errorsInCode) {
      alert('Property "errorsInCode" is required.');
      return;
    }

    if (!data.errorsInBits) {
      alert('Property "errorsInCode" is required.');
      return;
    }

    if (!data.mode) {
      alert('Property "mode" is required.');
      return;
    }

    // bits are bits
    if (!data.bits.every((bit) => bit === 0 || bit === 1)) {
      alert('Property "bits" must be an array of 0 or 1.');
      return;
    }

    if (!data.errorsInCode.every((bit) => bit === 0 || bit === 1)) {
      alert('Property "errorsInCode" must be an array of 0 or 1.');
      return;
    }

    if (!data.errorsInBits.every((bit) => bit === 0 || bit === 1)) {
      alert('Property "errorsInBits" must be an array of 0 or 1.');
      return;
    }

    // mode is mode
    if (!(data.mode === "0 -> 1" || data.mode === "1 -> 0")) {
      alert('Property "mode" must be "0 -> 1" or "1 -> 0".');
      return;
    }

    // check shape
    if (data.bits.length !== data.errorsInBits.length) {
      alert("Length of bits must be the same as length of errorsInBits.");
      return;
    }

    this.storeService.generateState(data);
  }

  generateReport(filePath: string) {
    const data = this.storeService.generateReport();
    this.electronService.fs.writeFileSync(filePath, data);
  }
}
