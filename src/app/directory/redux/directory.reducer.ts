import { IDirectoryMembers, IDirectoryMembersResults } from "../interfaces/directory-members.interface";
import { IDirectoryCompanies, IDirectoryCompaniesResults } from "../interfaces/directory-companies.interface";
import { ISkill } from "../../member/member.interface"
import { siteInit } from "../../shared/interfaces-consts";
import { ICompanyLink } from "../../shared/interfaces";
import { DirectoryActions } from "./directory.actions";

export interface IDirectoryMembersStore {
  data: IDirectoryMembers
  pending: boolean
  error: string
}

export interface IDirectoryCompaniesStore {
  data: IDirectoryCompanies
  pending: boolean
  error: string
}

const directoryMembersInit: IDirectoryMembers = {
  count: null,
  next: '',
  previous: '',
  results: []
}

const directoryCompaniesInit: IDirectoryCompanies = {
  count: null,
  next: '',
  previous: '',
  results: []
}

export const directoryMembersStoreInit: IDirectoryMembersStore = {
  data: directoryMembersInit,
  pending: true,
  error: null,
};

export const directoryCompaniesStoreInit: IDirectoryCompaniesStore = {
  data: directoryCompaniesInit,
  pending: true,
  error: null,
};


export function DirectoryMembersReducer(state: IDirectoryMembersStore = directoryMembersStoreInit, action: any) {
  switch (action.type) {

    case DirectoryActions.GET_DIRECTORY_MEMBER: {
      return {
        ...state,
        data: action.payload,
        pending: false,
        error: false,
      }
    }

    default:
      return state;
  }
}

export function DirectoryCompaniesReducer(state: IDirectoryCompaniesStore = directoryCompaniesStoreInit, action: any) {
  switch (action.type) {

    case DirectoryActions.GET_DIRECTORY_COMPANY: {
      return {
        ...state,
        data: action.payload,
        pending: false,
        error: false,
      }
    }

    default:
      return state;
  }
}
