import { ICompanyLink, ILocation, ILocationServer } from "../../shared/interfaces";
import { locationServer } from "../../shared/interfaces-consts";
import { ISkill } from "../../member/member.interface"

export interface IDirectoryMembersResults {
  id: number;
  fullName: string;
  title: string;
  profilePictureUrl: string;
  company: ICompanyLink;
  skills: ISkill[];
  location: ILocation;
}

export interface IDirectoryMembers {
  count: number;
  next: string;
  previous: string;
  results: IDirectoryMembersResults[];

}

// API interfaces
export interface IDirectoryMembersResultsServer {
  id: number;
  first_name: string;
  last_name: string;
  title: string;
  profile_picture_url: string;
  company: ICompanyLink;
  skills: ISkill[];
  location: ILocationServer;
}

interface IDirectoryMembersServer {
  count: number;
  next: string;
  previous: string;
  results: IDirectoryMembersResultsServer[];
}

// Convert API fields to our required format
export const skillsServer = (skill: ISkill): ISkill => ({
  key: skill.key,
  name: skill.name
})

export const directoryMembersResultsServer = (result: IDirectoryMembersResultsServer): IDirectoryMembersResults => ({
  id: result.id,
  fullName: `${result.first_name} ${result.last_name}`,
  title: result.title,
  profilePictureUrl: result.profile_picture_url,
  company: result.company,
  skills: Array.from(result.skills, skill => skillsServer(skill)),
  location: locationServer(result.location)
});

export const directoryMembersServer = (record: IDirectoryMembersServer): IDirectoryMembers => ({
  count: record.count,
  next: record.next,
  previous: record.previous,
  results: Array.from(record.results, result => directoryMembersResultsServer(result))
});
