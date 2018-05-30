import { Component, OnInit, OnDestroy } from '@angular/core';
import { BASE_URL } from "../../shared/constants/backend";

import { select } from "@angular-redux/store";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { directoryCompaniesStoreInit } from "../redux/directory.reducer";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DirectoryActions } from "../redux/directory.actions";
import { IDirectoryCompanies } from "../interfaces/directory-companies.interface";
import { NAV_CONST } from "../../shared/constants/navigation";
import { IUserStore } from "../../user/redux/user.reducer";

@Component({
  selector: 'app-directory-companies',
  templateUrl: './directory-companies.component.html',
  styleUrls: ['./directory-companies.component.scss']
})
export class DirectoryCompaniesComponent implements OnInit, OnDestroy {
  @select() user$: Observable<IUserStore>;
  @select(['companies', 'data']) readonly companies$: Observable<IDirectoryCompanies>;
  @select(['companies', 'pending']) readonly companiesPending$: Observable<boolean>;
  @select(['companies', 'error']) readonly companiesError$: Observable<string>;

  directoryCompanies: IDirectoryCompanies
  searchText: string;
  directoryMembersUrl: string;
  directoryCompaniesUrl: string;
  listType: string;

  private page_size: number;
  private page: number;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private DirectoryActions: DirectoryActions) {

  }

  ngOnInit() {
    this.directoryCompanies = directoryCompaniesStoreInit.data;

    // Getting data from url
    this.route.params.takeUntil(this.ngUnsubscribe).subscribe((params: any) => {
      this.page_size = parseInt(params.page_size);
      this.page = parseInt(params.page);
      this.listType = "Companies"

      // Load profile to store
      this.DirectoryActions.getDirectoryCompanies(this.page, this.page_size);
      this.initUrls()
    });

    this.companies$.takeUntil(this.ngUnsubscribe).subscribe((directoryCompanies: IDirectoryCompanies) => {
      if (directoryCompanies.count) {
        this.directoryCompanies = Object.assign({}, directoryCompanies);
      }
    })
  }

  initUrls() {
    this.directoryMembersUrl = `/${NAV_CONST.directoryMembers}/10/${this.page}`;
    this.directoryCompaniesUrl = `/${NAV_CONST.directoryCompanies}/10/${this.page}`;
  }

  onEnter(value: string) {
    this.searchText = value;
  }

  nextPage() {
    this.page++
    this.router.navigate([`/${NAV_CONST.directoryMembers}/10/${this.page}`]);
  }

  prevPage() {
    if (this.page !== 1) {
      this.page--
      this.router.navigate([`/${NAV_CONST.directoryMembers}/10/${this.page}`]);
    }
  }

  redirectToCompany(id: number) {
    this.router.navigate([`/${NAV_CONST.company}/${id}`]);
  }

  ngOnDestroy() {
    // Complete subscriptions
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
