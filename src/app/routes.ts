import { MemberComponent } from "./member/member.component";
import { CompanyComponent } from "./company/company.component";
import { NAV_CONST } from "./shared/constants/navigation";
import { DirectoryCompaniesComponent } from "./directory/companies/directory-companies.component";
import { DirectoryMembersComponent } from "./directory/members/directory-members.component";

export const appRoutes = [
  { path: '', redirectTo: `${NAV_CONST.member}/1`, pathMatch: 'full' },
  { path: 'member/:id', component: MemberComponent },
  { path: 'company/:id', component: CompanyComponent },
  {
    path: 'directory', children: [
      { path: 'companies/:page_size/:page', component: DirectoryCompaniesComponent },
      { path: 'members/:page_size/:page', component: DirectoryMembersComponent },
    ]
  },
  { path: '**', redirectTo: `${NAV_CONST.member}/1` }
];
