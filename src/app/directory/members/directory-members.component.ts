import { Component, OnInit, OnDestroy } from '@angular/core';
import { select } from "@angular-redux/store";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { directoryMembersStoreInit } from "../redux/directory.reducer";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DirectoryActions } from "../redux/directory.actions";
import { IDirectoryMembers } from "../interfaces/directory-members.interface";
import { NAV_CONST } from "../../shared/constants/navigation";
import { IUserStore } from "../../user/redux/user.reducer";

@Component({
  selector: 'app-directory-members',
  templateUrl: './directory-members.component.html',
  styleUrls: ['./directory-members.component.scss']
})
export class DirectoryMembersComponent implements OnInit, OnDestroy {
  @select() user$: Observable<IUserStore>;
  @select(['members', 'data']) readonly members$: Observable<IDirectoryMembers>;
  @select(['members', 'pending']) readonly pending$: Observable<boolean>;
  @select(['members', 'error']) readonly error$: Observable<string>;

  directoryMembers: IDirectoryMembers;
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
    this.directoryMembers = directoryMembersStoreInit.data;

    // Getting data from url
    this.route.params.takeUntil(this.ngUnsubscribe).subscribe((params: any) => {
      this.page_size = parseInt(params.page_size);
      this.page = parseInt(params.page);
      this.listType = "Members"

      // Load profile to store
      this.DirectoryActions.getDirectoryMembers(this.page, this.page_size);
      this.initUrls()
    });

    this.members$.takeUntil(this.ngUnsubscribe).subscribe((directoryMembers: IDirectoryMembers) => {
      if (directoryMembers.count) {
        this.directoryMembers = Object.assign({}, directoryMembers);
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

  redirectToMember(id: number) {
    this.router.navigate([`/${NAV_CONST.member}/${id}`]);
  }

  ngOnDestroy() {
    // Complete subscriptions
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
