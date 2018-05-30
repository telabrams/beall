import { NgModule } from "@angular/core";

import { UrlPipe } from "./url.pipe";
import { NewlinePipe } from "./new-line.pipe";
import { FilterPipe } from "./filter.pipe";


@NgModule({
  declarations: [
    UrlPipe,
    NewlinePipe,
    FilterPipe
  ],
  exports: [
    UrlPipe,
    NewlinePipe,
    FilterPipe
  ]
})

export class PipeModule {

}
