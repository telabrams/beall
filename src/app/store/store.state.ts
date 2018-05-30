import { IMemberStore, memberStoreInit } from "../member/redux/member.reducer";
import { companyStoreInit, ICompanyStore } from "../company/redux/company.reducer";
import {
  directoryMembersStoreInit,
  IDirectoryMembersStore,
  directoryCompaniesStoreInit,
  IDirectoryCompaniesStore
} from "../directory/redux/directory.reducer";
import { IUserStore, userStoreInit } from "../user/redux/user.reducer";

export interface IAppState {
  user: IUserStore
  member: IMemberStore
  company: ICompanyStore
  members: IDirectoryMembersStore,
  companies: IDirectoryCompaniesStore
}

export const storeInit: IAppState = {
  user: userStoreInit,
  member: memberStoreInit,
  company: companyStoreInit,
  members: directoryMembersStoreInit,
  companies: directoryCompaniesStoreInit
};
