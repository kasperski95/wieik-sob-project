import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-box",
  templateUrl: "./box.component.html",
  styleUrls: ["./box.component.scss"],
})
export class BoxComponent implements OnInit {
  @Input() img: string;
  @Input() size: number;
  @Input() flipX: boolean;

  constructor() {}

  ngOnInit(): void {}
}
