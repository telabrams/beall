import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from "@angular/common/http";
import { BACKEND_URL, BASE_URL } from "../../shared/constants/backend";
import { directoryMembersServer } from "../interfaces/directory-members.interface";
import { directoryCompaniesServer } from "../interfaces/directory-companies.interface";


@Injectable()
export class DirectoryService {
  constructor(private authHttp: HttpClient) {
  }

  getDirectoryMembers(page, size) {
    const url = `${BASE_URL}${BACKEND_URL.membersDirectory}/?page=${page}&page_size=${size}`;
    return this.authHttp.get(url)
      .map(directoryMembersServer);
  }

  getDirectoryCompanies(page, size) {
    const url = `${BASE_URL}${BACKEND_URL.companiesDirectory}/?page=${page}&page_size=${size}`;
    return this.authHttp.get(url)
      .map(directoryCompaniesServer);
  }
}
