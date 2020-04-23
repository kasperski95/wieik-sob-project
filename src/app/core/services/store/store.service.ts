import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class StoreService {
  private state = {
    bits: [1, 0, 1, 0],
    code: [0, 1, 0],
    mode: "0 -> 1" as "0 -> 1" | "1 -> 0",
  };

  getBits() {
    return this.state.bits;
  }

  getBitsLength() {
    return this.state.bits.length;
  }

  getMode() {
    return this.state.mode;
  }

  toggleBit(pos: number) {
    this.state.bits[pos] = 1 - this.state.bits[pos];
  }

  toggleMode() {
    this.state.mode = this.state.mode === "0 -> 1" ? "1 -> 0" : "0 -> 1";
  }

  getError() {
    return true;
  }

  addMSB() {
    this.state.bits.push(0);
  }
  removeMSB() {
    if (this.state.bits.length > 1) this.state.bits.pop();
  }
}
