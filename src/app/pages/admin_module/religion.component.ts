import { Component, OnDestroy, OnInit } from '@angular/core'
import { ReligionService } from '../../services/religion.service'
import { LocalDataSource } from 'ng2-smart-table'

import { Injectable } from '@angular/core'
import { Subscription } from 'rxjs'
import { Religion } from '../../interfaces/religion'

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'ngx-religion',
  templateUrl: './religion.component.html',
  styleUrls: ['../jobportal/open-vacancy.component.scss']
})
export class ReligionComponent implements OnInit, OnDestroy {
  religions: any = []
  _subscription: Subscription

  public source = new LocalDataSource()

  constructor(private service: ReligionService) { }

  ngOnInit(): void {
    this.getReligions()
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe()
    }
  }

  getReligions() {
    this._subscription = this.service.getAllReligions().subscribe(
      (result: any) => {
        this.religions = result
        this._refreshData()
      },
      (err) => alert('Failed to load religions')
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
      Religion: {
        title: 'Religion',
        filter: false
      }
    },
    actions: {
      add: true,
      position: 'right'
    }
  }

  onDeleteConfirm(event) {
    if (window.confirm(`Are you sure you want to delete ${event.data.Religion}?`)) {
      const subscription = this.service.deleteReligion(event.data.Id).subscribe((res: any) => {
        if (res.Id == null) {
          alert(`Failed to delete ${event.data.Religion}`)
        } else {
          this.religions = this.religions.filter(a => a.Id !== event.data.Id)
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

      const subscription = this.service.updateReligion(
        JSON.stringify(event.newData))
        .subscribe((res: any) => {
          if (res.Id == null) {
            alert('Failed to update religion')
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
    if (window.confirm(`Are you sure you want to add ${event.newData.Religion}?`)) {
      const subscription = this.service.addReligion(
        JSON.stringify({ Religion: event.newData.Religion })
      ).subscribe((res: any) => {
        if (res.Id == null) {
          alert(`Failed to create ${event.newData.Religion}`)
        } else {
          event.newData.No = this.religions.length + 1
          event.newData.Id = res.Id
          this.religions.push(event.newData)
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
      this.religions.map((item: Religion, index: number) => {
        return {
          No: index + 1,
          Id: item.Id,
          Religion: item.Religion
        }
      })
    )
  }
}
