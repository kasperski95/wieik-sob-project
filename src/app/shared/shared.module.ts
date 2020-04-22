import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NodeComponent } from "./components/";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [NodeComponent],
  imports: [CommonModule, FormsModule],
  exports: [FormsModule, NodeComponent],
})
export class SharedModule {}
