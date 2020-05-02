export interface IInputData {
  bits: number[];
  errorsInCode: number[];
  errorsInBits: number[];
  mode: "0 -> 1" | "1 -> 0";
}
