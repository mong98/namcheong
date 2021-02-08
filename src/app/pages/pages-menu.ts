import { NbMenuItem, NbCardModule } from '@nebular/theme'

const accessModule = localStorage.getItem('admin_accessModule');
const userID = localStorage.getItem('admin_userID');

let access = JSON.parse(accessModule);
console.log('accessModule');
console.log(access);

let Module1 = true
let Module2 = true
let Module3 = true
let Module4 = true
let Module5 = true
let Module6 = true
let Module7 = true
let Module8 = true
let Module9 = true
let Module10 = true
let Module11 = true
let Module12 = true
let Module13 = true
let Module14 = true
let Module15 = true
let Module16 = true
let Module17 = true
let Module18 = true
let Module19 = true
let Module20 = true



if (access) {

  if(access[0].Chk != 'Y'){
    Module1 = true
  }else{
    Module1 = false
  }
  if(access[1].Chk != 'Y'){
    Module2 = true
  }else{
    Module2 = false
  }
  if(access[2].Chk != 'Y'){
    Module3 = true
  }else{
    Module3 = false
  }
  if(access[3].Chk != 'Y'){
    Module4 = true
  }else{
    Module4 = false
  }
  if(access[4].Chk != 'Y'){
    Module5 = true
  }else{
    Module5 = false
  }
  if(access[5].Chk != 'Y'){
    Module6 = true
  }else{
    Module6 = false
  }
  if(access[6].Chk != 'Y'){
    Module7 = true
  }else{
    Module7 = false
  }
  if(access[7].Chk != 'Y'){
    Module8 = true
  }else{
    Module8 = false
  }
  if(access[8].Chk != 'Y'){
    Module9 = true
  }else{
    Module9 = false
  }
  if(access[9].Chk != 'Y'){
    Module10 = true
  }else{
    Module10 = false
  }
  if(access[10].Chk != 'Y'){
    Module11 = true
  }else{
    Module11 = false
  }
  if(access[11].Chk != 'Y'){
    Module12 = true
  }else{
    Module12 = false
  }
  if(access[12].Chk != 'Y'){
    Module13 = true
  }else{
    Module13 = false
  }
  if(access[13].Chk != 'Y'){
    Module14 = true
  }else{
    Module14 = false
  }
  if(access[14].Chk != 'Y'){
    Module15 = true
  }else{
    Module15 = false
  }
  if(access[15].Chk != 'Y'){
    Module16 = true
  }else{
    Module16 = false
  }
  if(access[16].Chk != 'Y'){
    Module17 = true
  }else{
    Module17 = false
  }
  if(access[17].Chk != 'Y'){
    Module18 = true
  }else{
    Module18 = false
  }
  if(access[18]!= null){
    if(access[18].Chk != 'Y'){
      Module19 = true
    }else{
      Module19 = false
    }
  }
  if(access[19]!= null){
    if(access[19].Chk != 'Y'){
      Module20 = true
    }else{
      Module20 = false
    }
  }
}


export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  /*{
	title: 'User Name',
    group: true,
  },*/
  /*{
    title: 'Applicant Job Portal',
    expanded: true,
    children: [
      {
        title: 'Job Application Page',
        link: '/pages/applicant_jobportal/crew_job_portal',
      },
      {
        title: 'Dashboard Applicant',
        link: '/pages/applicant_jobportal/dashboard-applicant',
      },
      {
        title: 'Change Password',
        link: '/pages/applicant_jobportal/change-password',
      },
      {
        title: 'Contact Us',
        link: '/pages/applicant_jobportal/contact-us',
      },
    ],
  },*/
  {
    title: 'Job Portal',
    expanded: true,
    children: [
      {
        title: 'Open Vacancy',
        link: '/pages/jobportal/open_vacancy',
        hidden: Module1
      },
      {
        title: 'Applicant',
        link: '/pages/jobportal/applicant',
        hidden: Module2
      },
      /*{
        title: 'Job Application Page',
        link: '/pages/jobportal/crew_job_portal',
      },
      {
        title: 'Dashboard Applicant',
        link: '/pages/dashboard-applicant',
      },
      {
        title: 'Change Password',
        link: '/pages/jobportal/change-password',
      },
      {
        title: 'Contact Us',
        link: '/pages/jobportal/contact-us',
      },*/
    ],
  },
  {
    title: 'Report',
    expanded: true,
    children: [
      {
        title: 'Matrix',
        link: '/pages/report/matrix',
        hidden: Module3
      },
      {
        title: 'AFE / CV / SEA',
        link: '/pages/report/afe_cv_sea',
        hidden: Module4
      },
      {
        title: 'Contact Us',
        link: '/pages/report/contact-us',
        hidden: Module18
      },
    ],
  },
  {
    title: 'Admin Module',
    expanded: true,
    children: [
      {
        title: 'Position',
        link: '/pages/admin_module/position',
        hidden: Module5
      },
      {
        title: 'Document',
        link: '/pages/admin_module/document',
        hidden: Module6
      },
      {
        title: 'Document Check List',
        link: '/pages/admin_module/document_check_list',
        hidden: Module7
      },
      {
        title: 'Matrix Template',
        link: '/pages/admin_module/matrix_template',
        hidden: Module8
      },
      {
        title: 'Allowance',
        link: '/pages/admin_module/allowance',
        hidden: Module9
      },
      {
        title: 'Vessel',
        link: '/pages/admin_module/vessel',
        hidden:Module19
      },
      {
        title: 'IMO No',
        link: '/pages/admin_module/imo_no',
        hidden: Module10
      },
      {
        title: 'Port Of Registry',
        link: '/pages/admin_module/port_of_registry',
        hidden: Module11
      },
      {
        title: 'Race',
        link: '/pages/admin_module/race',
        hidden: Module12
      },
      {
        title: 'Religion',
        link: '/pages/admin_module/religion',
        hidden: Module13
      },
      {
        title: 'Relationship',
        link: '/pages/admin_module/relationship',
        hidden: Module14
      },
      {
        title: 'State',
        link: '/pages/admin_module/state',
        hidden: Module15
      },
      {
        title: 'Country',
        link: '/pages/admin_module/country',
        hidden: Module16
      },
      {
        title: 'Issuing Authority',
        link: '/pages/admin_module/issuing_authority',
        hidden:Module20
      },
      {
        title: 'User Id Configure',
        link: '/pages/admin_module/user_id_configure',
        hidden: Module17
      },
    ],
  },
  {
    title: 'Settings',
    expanded: true,
    children: [
      {
        title: 'Change Password',
        link: '/pages/settings/change-password',
      },
 

    ],
  },
]

export const APPLICANT_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard Applicant',
    icon: 'home-outline',
    link: '/pages/applicant_jobportal/dashboard-applicant',
    home: true,
  },
  {
    title: 'Applicant Job Portal',
    expanded: true,
    children: [
      {
        title: 'Job Application Page',
        link: '/pages/applicant_jobportal/crew_job_portal',
      },
      {
        title: 'Application Status',
        link: '/pages/applicant_jobportal/application-status',
      },
      {
        title: 'Change Password',
        link: '/pages/applicant_jobportal/change-password',
      },
      {
        title: 'Contact Us',
        link: '/pages/applicant_jobportal/contact-us',
      },
    ],
  }
]