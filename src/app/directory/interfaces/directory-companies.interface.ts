import { ISite, ISiteServer } from "../../shared/interfaces";
import { siteServer } from "../../shared/interfaces-consts";
import { ISkill } from "../../member/member.interface"

export interface IDirectoryCompaniesResults {
  id: number;
  name: string;
  slogen: string;
  website: string;
  profilePictureUrl: string;
  location: ISite;
  industries: ISkill[];
}

export interface IDirectoryCompanies {
  count: number;
  next: string;
  previous: string;
  results: IDirectoryCompaniesResults[];
}

// API interfaces
export interface IDirectoryCompaniesResultsServer {
  id: number;
  name: string;
  slogen: string;
  website: string;
  profile_picture_url: string;
  location: ISiteServer;
  industries: ISkill[];
}

interface IDirectoryCompaniesServer {
  count: number;
  next: string;
  previous: string;
  results: IDirectoryCompaniesResultsServer[];
}

// Convert API fields to our required format
export const industriesServer = (industry: ISkill): ISkill => ({
  key: industry.key,
  name: industry.name
})

export const directoryCompaniesResultsServer = (result: IDirectoryCompaniesResultsServer): IDirectoryCompaniesResults => ({
  id: result.id,
  name: result.name,
  slogen: result.slogen,
  website: result.website,
  profilePictureUrl: result.profile_picture_url,
  location: siteServer(result.location),
  industries: Array.from(result.industries, industry => industriesServer(industry)),
});

export const directoryCompaniesServer = (record: IDirectoryCompaniesServer): IDirectoryCompanies => ({
  count: record.count,
  next: record.next,
  previous: record.previous,
  results: Array.from(record.results, result => directoryCompaniesResultsServer(result))
});
