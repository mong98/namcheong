import { Component, OnDestroy, OnInit } from '@angular/core'
import { IssuingAuthorityService } from '../../services/issuingauthority.service'
import { LocalDataSource } from 'ng2-smart-table'

import { Injectable } from '@angular/core'
import { Subscription } from 'rxjs'
import { IssuingAuthority } from '../../interfaces/issuingauthority'

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'ngx-issuingauthority',
  templateUrl: './issuingauthority.component.html',
  styleUrls: ['../jobportal/open-vacancy.component.scss']
})
export class IssuingAuthorityComponent implements OnInit, OnDestroy {
  issuingauthorities: any = []
  _subscription: Subscription

  public source = new LocalDataSource()

  constructor(private service: IssuingAuthorityService) { }

  ngOnInit(): void {
    this.getIssuingAuthorities()
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe()
    }
  }

  getIssuingAuthorities() {
    this._subscription = this.service.getAllIssuingAuthorities().subscribe(
      (result: any) => {
        this.issuingauthorities = result
        this._refreshData()
      },
      (err) => alert('Failed to load issuing authorities')
    )
  }

  settings = {
    delete: {
      confirmDelete: true
    },
    add: {
      addButtonContent: 'Add',
      confirmCreate: true
    },
    edit: {
      confirmSave: true
    },
    columns: {
      No: {
        title: 'No',
        filter: false,
        editable: false,
        addable: false
      },
      Id: {
        title: 'Id',
        hide: true
      },
      Name: {
        title: 'Issuing Authority',
        filter: false
      },
      Description: {
        title: 'Description',
        filter: false
      }
    },
    actions: {
      add: true,
      position: 'right'
    }
  }

  onDeleteConfirm(event) {
    if (window.confirm(`Are you sure you want to delete ${event.data.Name}?`)) {
      const subscription = this.service.deleteIssuingAuthority(event.data.Id).subscribe((res: any) => {
        if (res.Id == null) {
          alert(`Failed to delete ${event.data.Name}`)
        } else {
          this.issuingauthorities = this.issuingauthorities.filter(a => a.Id !== event.data.Id)
          this._refreshData()
          event.confirm.resolve(event.newData)
        }
        subscription.unsubscribe()
      })
    } else {
      event.confirm.reject()
    }
  }

  onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      event.confirm.resolve(event.newData)

      const subscription = this.service.updateIssuingAuthority(
        JSON.stringify(event.newData))
        .subscribe((res: any) => {
          if (res.Id == null) {
            alert('Failed to update issuing authority')
          } else {
            event.confirm.resolve(event.newData)
          }
          subscription.unsubscribe()
        })
    } else {
      event.confirm.reject()
    }
  }

  onCreateConfirm(event) {
    if (window.confirm(`Are you sure you want to add ${event.newData.Name}?`)) {
      const subscription = this.service.addIssuingAuthority(
        JSON.stringify({ Name: event.newData.Name, Description: event.newData.Description })
      ).subscribe((res: any) => {
        if (res.Id == null) {
          alert(`Failed to create ${event.newData.Name}`)
        } else {
          event.newData.No = this.issuingauthorities.length + 1
          event.newData.Id = res.Id
          this.issuingauthorities.push(event.newData)
          event.confirm.resolve(event.newData)
        }
        subscription.unsubscribe()
      })
    } else {
      event.confirm.reject()
    }
  }

  _refreshData() {
    this.source.load(
      this.issuingauthorities.map((item: IssuingAuthority, index: number) => {
        return {
          No: index + 1,
          Id: item.Id,
          Name: item.Name,
          Description: item.Description
        }
      })
    )
  }
}
