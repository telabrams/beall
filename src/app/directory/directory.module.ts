import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectoryMembersComponent } from "./members/directory-members.component";
import { DirectoryCompaniesComponent } from "./companies/directory-companies.component";
import { DirectoryActions } from "./redux/directory.actions";
import { DirectoryService } from "./services/directory.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "../shared/shared.module";
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatSelectModule,
    MatButtonModule
  ],
  declarations: [
    DirectoryMembersComponent,
    DirectoryCompaniesComponent
  ],
  providers: [
    DirectoryActions,
    DirectoryService,
    NgbModal
  ]
})
export class DirectoryModule { }
