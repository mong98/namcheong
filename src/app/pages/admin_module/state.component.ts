import { Component, OnDestroy, OnInit } from '@angular/core'
import { StateService } from '../../services/state.service'
import { LocalDataSource } from 'ng2-smart-table'

import { Injectable } from '@angular/core'
import { Subscription } from 'rxjs'
import { State } from '../../interfaces/state'

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'ngx-state',
  templateUrl: './state.component.html',
  styleUrls: ['../jobportal/open-vacancy.component.scss']
})
export class StateComponent implements OnInit, OnDestroy {
  states: any = []
  _subscription: Subscription

  public source = new LocalDataSource()

  constructor(private service: StateService) { }

  ngOnInit(): void {
    this.getStates()
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe()
    }
  }

  getStates() {
    this._subscription = this.service.getAllStates().subscribe(
      (result: any) => {
        this.states = result
        this._refreshData()
      },
      (err) => alert('Failed to load states')
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
      State: {
        title: 'State',
        filter: false
      }
    },
    actions: {
      add: true,
      position: 'right'
    }
  }

  onDeleteConfirm(event) {
    if (window.confirm(`Are you sure you want to delete ${event.data.State}?`)) {
      const subscription = this.service.deleteState(event.data.Id).subscribe((res: any) => {
        if (res.Id == null) {
          alert(`Failed to delete ${event.data.State}`)
        } else {
          this.states = this.states.filter(a => a.Id !== event.data.Id)
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

      const subscription = this.service.updateState(
        JSON.stringify(event.newData))
        .subscribe((res: any) => {
          if (res.Id == null) {
            alert('Failed to update state')
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
    if (window.confirm(`Are you sure you want to add ${event.newData.State}?`)) {
      const subscription = this.service.addState(
        JSON.stringify({ State: event.newData.State })
      ).subscribe((res: any) => {
        if (res.Id == null) {
          alert(`Failed to create ${event.newData.State}`)
        } else {
          event.newData.No = this.states.length + 1
          event.newData.Id = res.Id
          this.states.push(event.newData)
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
      this.states.map((item: State, index: number) => {
        return {
          No: index + 1,
          Id: item.Id,
          State: item.State
        }
      })
    )
  }
}
