import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class StateService {
  private state = {
    bits: "1010",
    code: "010",
  };

  getBits() {
    return this.state.bits;
  }
}
