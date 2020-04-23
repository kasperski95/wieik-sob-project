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

  toggleBit(invPos: number) {
    const pos = this.state.bits.length - 1 - invPos;
    this.state.bits[pos] ^= 1;
    this.state.transformedBits[pos] ^= 1;
    this.updateCode();
  }

  toggleMode() {
    this.state.mode = this.state.mode === "0 -> 1" ? "1 -> 0" : "0 -> 1";
  }

  getError() {
    return true;
  }

  toggleBitErrors(invPos: number) {
    const pos = this.state.transformedBits.length - 1 - invPos;
    this.state.transformedBits[pos] ^= 1;
    this.state.errorsInBits[pos] ^= 1;
    this.updateCode();
  }

  toggleCodeErrors(invPos: number) {
    const pos = this.state.transformedCode.length - 1 - invPos;
    this.state.transformedCode[pos] ^= 1;
    this.state.errorsInCode[pos] ^= 1;
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
    const pos = this.state.errorsInBits.length - 1 - invPos;
    return !this.state.errorsInCode[pos];
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
      .map((n) => parseInt(n))
      .reverse();

    const expectedCodeLength = this.getCodeLength();

    for (let i = 0; i < expectedCodeLength - code.length; ++i) {
      code.push(0);
    }

    let transformedCode = [...this.state.transformedCode];
    let errorsInCode = [...this.state.errorsInCode];

    for (let i = 0; i < expectedCodeLength - this.state.transformedCode.length; ++i) {
      transformedCode.push(0);
      errorsInCode.push(0);
    }

    for (let i = 0; i < this.state.transformedCode.length - expectedCodeLength; ++i) {
      transformedCode.pop();
      errorsInCode.pop();
    }

    this.state.transformedCode = transformedCode;
    this.state.code = code;
    this.state.errorsInCode = errorsInCode;
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
}
