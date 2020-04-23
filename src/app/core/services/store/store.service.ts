import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class StoreService {
  private state = {
    bits: [0],
    code: [1],
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

  toggleBit(inv_pos: number) {
    const pos = this.state.bits.length - 1 - inv_pos;
    this.state.bits[pos] = 1 - this.state.bits[pos];
    this.updateCode();
  }

  toggleMode() {
    this.state.mode = this.state.mode === "0 -> 1" ? "1 -> 0" : "0 -> 1";
  }

  getError() {
    return true;
  }

  dec2bin(dec: number) {
    return (dec >>> 0).toString(2);
  }

  getCode() {
    return this.state.code;
  }

  getCodeLength() {
    return Math.ceil(Math.log2(this.state.bits.length + 1));
  }

  updateCode() {
    const nZeros = this.state.bits.filter((b) => !b).length;
    let code = this.dec2bin(nZeros)
      .split("")
      .map((n) => parseInt(n));
    const expectedCodeLength = this.getCodeLength();
    for (let i = 0; i < expectedCodeLength - code.length; ++i) {
      code.push(0);
    }
    this.state.code = code;
  }

  addMSB() {
    this.state.bits.push(0);
    this.updateCode();
  }
  removeMSB() {
    if (this.state.bits.length > 1) {
      this.state.bits.pop();
      this.updateCode();
    }
  }
}
