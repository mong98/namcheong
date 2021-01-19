import { Component } from '@angular/core'

import { ContactListsService } from '../../services/contactLists.service'

@Component({
  selector: 'ngx-applicant',
  templateUrl: './contact-us.html',
})
export class ContactUsComponent {
  name = ""
  email = ""
  message = ""
  contactNo = ""

  constructor(private contactListsService : ContactListsService ) {
  }

  fnCountWord(){
    return this.message.length
  }

  submitForm(){
    var contactListTemplate = {
      Name: this.name,
      Email: this.email,
      ContactNo: this.contactNo,
      Message: this.message,
    }
    if (this.fnCountWord() > 300) {
      alert("Message too long")
      return
    }
    var subscription = this.contactListsService.addContactLists(contactListTemplate).subscribe((res: any) => {
      if (res.Id == null) {
        alert('Fail to submit!')
        subscription.unsubscribe()
      }
      else {
        alert('Successfully submitted!')
      }
    })
    alert("Message submitted successfully")
  }
}
