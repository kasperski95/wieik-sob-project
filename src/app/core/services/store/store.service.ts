import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class StoreService {
  state = {
    bits: [0],
    code: [1],
    errorsInCode: [0],
    errorsInBits: [0],
    transformedBits: [0],
    transformedCode: [1],
    mode: "0 -> 1" as "0 -> 1" | "1 -> 0",
    isError: false,
  };

  getBits() {
    return this.state.bits;
  }

  getBitsLength() {
    return this.state.bits.length;
  }

  getCode() {
    return this.state.code;
  }

  getCodeLength() {
    return Math.ceil(Math.log2(this.state.bits.length + 1));
  }

  getError() {
    return this.state.isError;
  }

  getMode() {
    return this.state.mode;
  }

  getTransformedBits() {
    return this.state.transformedBits;
  }

  getTransformedCode() {
    return this.state.transformedCode;
  }

  isBitValid(invPos: number) {
    const pos = this.state.errorsInBits.length - 1 - invPos;
    return !this.state.errorsInBits[pos];
  }

  isCodeValid(invPos: number) {
    const pos = this.state.errorsInCode.length - 1 - invPos;
    return !this.state.errorsInCode[pos];
  }

  addMSB() {
    this.state.bits.push(0);
    this.state.transformedBits.push(0);
    this.state.errorsInBits.push(0);
    this.updateCode();
  }

  removeMSB() {
    if (this.state.bits.length > 1) {
      this.state.bits.pop();
      this.state.transformedBits.pop();
      this.state.errorsInBits.pop();
      this.updateCode();
    }
  }

  toggleBit(invPos: number) {
    const pos = this.state.bits.length - 1 - invPos;
    this.state.bits[pos] ^= 1;
    this.state.transformedBits[pos] ^= 1;
    this.updateCode();
  }

  toggleBitErrors(invPos: number) {
    const pos = this.state.transformedBits.length - 1 - invPos;
    this.state.transformedBits[pos] ^= 1;
    this.state.errorsInBits[pos] ^= 1;
    this.updateCode();
    this.updateError();
  }

  toggleCodeErrors(invPos: number) {
    const pos = this.state.transformedCode.length - 1 - invPos;
    this.state.errorsInCode[pos] ^= 1;
    this.updateCode();
    this.updateError();
  }

  toggleMode() {
    this.state.mode = this.state.mode === "0 -> 1" ? "1 -> 0" : "0 -> 1";
  }

  updateCode() {
    const nZeros = this.state.bits.filter((b) => !b).length;

    let code = this.dec2bin(nZeros)
      .split("")
      .map((n) => parseInt(n))
      .reverse();

    const expectedCodeLength = this.getCodeLength();
    const actualLen = code.length;

    for (let i = 0; i < expectedCodeLength - actualLen; ++i) code.push(0);

    let errorsInCode = [...this.state.errorsInCode];
    for (let i = 0; i < expectedCodeLength - errorsInCode.length; ++i) errorsInCode.push(0);
    for (let i = 0; i < errorsInCode.length - expectedCodeLength; ++i) errorsInCode.pop();

    this.state.code = code;
    this.state.errorsInCode = errorsInCode;
    this.state.transformedCode = [...code].map((e, i) => (e ^= errorsInCode[i]));
  }

  updateError() {
    this.state.isError = this.countZeros(this.state.transformedBits) < parseInt([...this.state.transformedCode].reverse().join(""), 2);
  }

  private dec2bin(dec: number) {
    return (dec >>> 0).toString(2);
  }

  private countZeros(arr: number[]) {
    return arr.filter((b) => !b).length;
  }
}
