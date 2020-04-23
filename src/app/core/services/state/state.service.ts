import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class StateService {
  private state = {
    bits: [1, 0, 1, 0],
    code: [0, 1, 0],
  };

  getBits() {
    return this.state.bits;
  }

  toggleBit(pos: number) {
    this.state.bits[pos] = 1 - this.state.bits[pos];
  }
}
