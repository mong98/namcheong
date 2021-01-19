import { NbMenuItem, NbCardModule } from '@nebular/theme'

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
      },
      {
        title: 'Applicant',
        link: '/pages/jobportal/applicant',
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
      },
      {
        title: 'AFE / CV / SEA',
        link: '/pages/report/afe_cv_sea',
      },
      {
        title: 'Contact Us',
        link: '/pages/report/contact-us',
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
      },
      {
        title: 'Document',
        link: '/pages/admin_module/document',
      },
      {
        title: 'Document Check List',
        link: '/pages/admin_module/document_check_list',
      },
      {
        title: 'Matrix Template',
        link: '/pages/admin_module/matrix_template',
      },
      {
        title: 'Allowance',
        link: '/pages/admin_module/allowance',
      },
      {
        title: 'Vessel',
        link: '/pages/admin_module/vessel',
      },
      {
        title: 'IMO No',
        link: '/pages/admin_module/imo_no',
      },
      {
        title: 'Port Of Registry',
        link: '/pages/admin_module/port_of_registry',
      },
      {
        title: 'Race',
        link: '/pages/admin_module/race',
      },
      {
        title: 'Religion',
        link: '/pages/admin_module/religion',
      },
      {
        title: 'Relationship',
        link: '/pages/admin_module/relationship',
      },
      {
        title: 'State',
        link: '/pages/admin_module/state',
      },
      {
        title: 'Country',
        link: '/pages/admin_module/country',
      },
      {
        title: 'Issuing Authority',
        link: '/pages/admin_module/issuing_authority',
      },
      {
        title: 'User Id Configure',
        link: '/pages/admin_module/user_id_configure',
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