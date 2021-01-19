import { Component } from '@angular/core'
import { ContactListsService } from '../../services/contactLists.service'

import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table'

@Component({
  selector: 'ngx-afecvsea',
  templateUrl: './contact-us.component.html',
})
export class ReportContactUs {
  document_list: any
  source: LocalDataSource
  constructor(private contactListsService : ContactListsService ) {
  }

  ngOnInit() {
    this.getDocuments()
  }

  getDocuments() {
    this.contactListsService.getContactLists().subscribe(
      (result) => {
        this.document_list = result
        this.source = new LocalDataSource(this.document_list)
      },
      (err) => console.log(err)
    )
  }
  settings = {
    //selectMode: 'multi', // multiple row select
    delete: {
      confirmDelete: true,
    },
    add: {
      addButtonContent: 'Add',
      //createButtonContent: 'Save', // change 'Create' to 'Save'
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
    },
    hideSubHeader: true, // hide the add new fields
    columns: {
      Id: {
        title: 'No',
        filter: false,
        editable: false,
        addable: false,
      },
      Name: {
        title: 'Name',
        filter: false,
      },
      Email: {
        title: 'Email',
        filter: false,
      },

      ContactNo: {
        title: 'Contact No',
        filter: false,
      },
      Message: {
        title: 'Message',
        filter: false,
      },
    },
    actions: {
      delete: false,
      add: false,
      edit: false,
      position: 'right', // left|right
    },
  }

  /*applicant_list = [
    {
      Id: 1,
      Email: 'arfah@gmail.com',
      ContactNo: '6012-3456789',
      Name: 'Arfah',
      Message: 'Testing 123',
    },
    {
      Id: 2,
      Email: 'parrot@gmail.com',
      ContactNo: '6012-9876543',
      Name: 'John Cleese',
      Message: 'Testing 123',
    },
    {
      Id: 3,
      Email: 'sillywalks@monty.com',
      ContactNo: '61251563',
      Name: 'Ministry of Silly Walks',
      Message: `I am writing to ask you to consider an addition to your marketing team. Your organization has been in the news as a leader in the industry. I am an innovator of new ideas, an excellent communicator with buyers, and have a demonstrated history of marketing success. I believe I would be a good fit in your organization.

            Currently, I market computer products for a major supplier using television, radio and news advertising. I have a reputation for seeing every project through to success.

            Enclosed is my resume for your review and consideration. EFTG Industries has a reputation for excellence. I would like to use my talents to market your quality line of technical products. I will call you to further discuss your needs and how I could benefit your company. If you prefer, you may reach me in the evenings at (555) 555-5555.

            Thank you for your time. I look forward to meeting you.

            Sincerely,`,
    },
    {
      Id: 4,
      Email: 'spam@morespam.com',
      ContactNo: '6012-3456789',
      Name: 'More Spam',
      Message: 'Spam Spam Spam',
    },
  ]*/



  // onSearch function, pass in values from html #id value
  onSearch(applicant_name, applicant_email, contactNo) {
    // clear the filter

    this.source.setFilter([])

    if (applicant_name !== '' || applicant_email !== '' || contactNo !== '') {
      // filter to exclude position='ALL' in filter
      this.source.setFilter(
        [
          // fields we want to include in the search
          {
            field: 'Name',
            search: applicant_name,
          },
          {
            field: 'Email',
            search: applicant_email,
          },
          {
            field: 'ContactNo',
            search: contactNo,
          },
        ],false
      )

      return
    }

    // console.log("Inside onSearch: - applicant_name:", applicant_name, " applicant_email:", applicant_email, " applicant_position:", applicant_position, " positionStr:", positionStr);

    // AND filter
    // set filter to filter name & email, position
    this.source.setFilter(
      [
        // fields we want to include in the search
        {
          field: 'Name',
          search: applicant_name,
        },
        {
          field: 'Email',
          search: applicant_email,
        },
        {
          field: 'ContactNo',
          search: contactNo,
        },
      ],
      true
    )
  }
}
