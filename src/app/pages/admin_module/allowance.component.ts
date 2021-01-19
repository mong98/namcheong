import { Component, OnDestroy, OnInit } from '@angular/core'
import { AllowanceService } from '../../services/allowance.service'
import { LocalDataSource } from 'ng2-smart-table'

import { Injectable } from '@angular/core'
import { Subscription } from 'rxjs'
import { Allowance } from '../../interfaces/allowance'

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'ngx-allowance',
  templateUrl: './allowance.component.html',
  styleUrls: ['../jobportal/open-vacancy.component.scss']
})
export class AllowanceComponent implements OnInit, OnDestroy {
  allowances: any = []
  _subscription: Subscription

  public source = new LocalDataSource()

  constructor(private service: AllowanceService) { }

  ngOnInit(): void {
    this.getAllowances()
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe()
    }
  }

  getAllowances() {
    this._subscription = this.service.getAllAllowances().subscribe(
      (result: any) => {
        this.allowances = result
        this._refreshData()
      },
      (err) => alert('Failed to load allowances')
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
      Allowance: {
        title: 'Allowance',
        filter: false
      }
    },
    actions: {
      add: true,
      position: 'right'
    }
  }

  onDeleteConfirm(event) {
    if (window.confirm(`Are you sure you want to delete ${event.data.Allowance}?`)) {
      const subscription = this.service.deleteAllowance(event.data.Id).subscribe((res: any) => {
        if (res.Id == null) {
          alert(`Failed to delete ${event.data.Allowance}`)
        } else {
          this.allowances = this.allowances.filter(a => a.Id !== event.data.Id)
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

      const subscription = this.service.updateAllowance(
        JSON.stringify(event.newData))
        .subscribe((res: any) => {
          if (res.Id == null) {
            alert('Failed to update allowance')
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
    if (window.confirm(`Are you sure you want to add ${event.newData.Allowance}?`)) {
      const subscription = this.service.addAllowance(
        JSON.stringify({ Allowance: event.newData.Allowance })
      ).subscribe((res: any) => {
        if (res.Id == null) {
          alert(`Failed to create ${event.newData.Allowance}`)
        } else {
          event.newData.No = this.allowances.length + 1
          event.newData.Id = res.Id
          this.allowances.push(event.newData)
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
      this.allowances.map((item: Allowance, index: number) => {
        return {
          No: index + 1,
          Id: item.Id,
          Allowance: item.Allowance
        }
      })
    )
  }
}
