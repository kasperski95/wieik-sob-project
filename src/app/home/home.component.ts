import { Component, OnInit } from "@angular/core";
import { StoreService } from "../core/services";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private storeService: StoreService) {}

  ngOnInit(): void {}

  getBits() {
    return this.storeService.getBits();
  }

  toogleBit(index: number) {
    this.storeService.toggleBit(index);
  }
}
