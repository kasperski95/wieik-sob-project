import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-error-output",
  templateUrl: "./error-output.component.html",
  styleUrls: ["./error-output.component.scss"],
})
export class ErrorOutputComponent implements OnInit {
  @Input("showError") active: Boolean;

  constructor() {}

  ngOnInit(): void {}
}
