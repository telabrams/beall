import { Injectable } from "@angular/core";
import { dispatch, NgRedux } from "@angular-redux/store";
import { IDirectoryMembers } from "../interfaces/directory-members.interface";
import { IDirectoryCompanies } from "../interfaces/directory-companies.interface";
import { DirectoryService } from "../services/directory.service";

@Injectable()
export class DirectoryActions {
  static GET_DIRECTORY_MEMBER = "GET_DIRECTORY_MEMBER";
  static GET_DIRECTORY_COMPANY = "GET_DIRECTORY_COMPANY";
  static SET_DIRECTORY_MEMBER_PENDING = "SET_DIRECTORY_MEMBER_PENDING";

  constructor(private directoryService: DirectoryService) {
  }

  @dispatch() storeGetDirectoryMembers = (member: IDirectoryMembers) => ({ type: DirectoryActions.GET_DIRECTORY_MEMBER, payload: member });
  @dispatch() storeGetDirectoryCompanies = (company: IDirectoryCompanies) => ({ type: DirectoryActions.GET_DIRECTORY_COMPANY, payload: company });
  @dispatch() storeSetPending = (flag: boolean) => ({ type: DirectoryActions.SET_DIRECTORY_MEMBER_PENDING, payload: flag });

  getDirectoryMembers(page, size) {
    this.storeSetPending(true);
    this.directoryService.getDirectoryMembers(page, size).subscribe((member: IDirectoryMembers) => {
      this.storeGetDirectoryMembers(member);
    }, (err) => {
      // Error handling
    })
  }

  getDirectoryCompanies(page, size) {
    this.storeSetPending(true);
    this.directoryService.getDirectoryCompanies(page, size).subscribe((company: IDirectoryCompanies) => {
      this.storeGetDirectoryCompanies(company);
    }, (err) => {
      // Error handling
    })
  }
}
