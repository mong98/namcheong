import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Subscription } from 'rxjs'
import { ApplicantService } from '../../../services/applicant.service'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'ngx-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.scss'],
})
export class SignatureComponent implements OnInit {
  _subscription: Subscription
  allowances: any = []

  constructor(
    private service: ApplicantService,
    private router: Router,
    private dialogRef: MatDialogRef<SignatureComponent>,
    @Inject(MAT_DIALOG_DATA) public applicant: any
  ) {}

  ngOnInit() {
  }
  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe()
    }
  }

  onSubmit() {
    if (window.confirm('Do you really want to confirm?')) {
      // find a way to save/update data
      const subscription = this.service
        .updateConfirmApplicant(JSON.stringify(this.applicant))
        .subscribe((res: any) => {
          if (res.Id == null) {
            alert('Failed to confirm applicant')
          } else {
            alert('Confirm Record Successful')
            //event.confirm.resolve(event.newData)
          }
          subscription.unsubscribe()
        })
        this.onClose()
      this.router.navigate(['pages/jobportal/applicant'])
    } else {
      //event.confirm.reject()
    }
  }

  onClose() {
    this.dialogRef.close()
  }
}
