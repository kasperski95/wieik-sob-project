import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { NodeComponent, BoxComponent, SwitchComponent } from "./components/";
import { FormsModule } from "@angular/forms";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

@NgModule({
  declarations: [NodeComponent, BoxComponent, SwitchComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
  ],
  exports: [FormsModule, NodeComponent, BoxComponent, SwitchComponent],
})
export class SharedModule {}
