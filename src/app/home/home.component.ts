import { Component, OnInit } from "@angular/core";
import { StateService } from "../core/services";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private stateService: StateService) {}

  ngOnInit(): void {}

  getBits() {
    return this.stateService
      .getBits()
      .split("")
      .map((bit) => parseInt(bit));
  }

  toogleBit() {
    console.log(0);
  }
}
