import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NodeComponent, BoxComponent } from "./components/";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [NodeComponent, BoxComponent],
  imports: [CommonModule, FormsModule],
  exports: [FormsModule, NodeComponent, BoxComponent],
})
export class SharedModule {}
