import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-node",
  templateUrl: "./node.component.html",
  styleUrls: ["./node.component.scss"],
})
export class NodeComponent implements OnInit {
  value = 0;

  constructor() {}

  ngOnInit(): void {}

  toggleValue() {
    this.value = 1 - this.value;
  }
}
