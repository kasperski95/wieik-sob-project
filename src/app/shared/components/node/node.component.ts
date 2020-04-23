import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "app-node",
  templateUrl: "./node.component.html",
  styleUrls: ["./node.component.scss"],
})
export class NodeComponent implements OnInit {
  @Input() type: "input" | "valid" | "invalid" | "output" = "output";
  @Output() toggle = new EventEmitter();
  @Output() increase = new EventEmitter();
  @Output() decrease = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
