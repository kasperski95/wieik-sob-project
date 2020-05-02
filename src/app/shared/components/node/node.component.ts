import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "app-node",
  templateUrl: "./node.component.html",
  styleUrls: ["./node.component.scss"],
})
export class NodeComponent implements OnInit {
  @Input() type: "number" | "input" | "valid" | "invalid" | "output" = "output";
  @Input() lineT: number;
  @Input() lineR: number;
  @Input() lineB: number;
  @Input() lineL: number;
  @Output() toggle = new EventEmitter();
  @Output() increase = new EventEmitter();
  @Output() decrease = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
