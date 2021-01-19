import { Component, OnDestroy, OnInit } from '@angular/core'
import { RaceService } from '../../services/race.service'
import { LocalDataSource } from 'ng2-smart-table'

import { Injectable } from '@angular/core'
import { Subscription } from 'rxjs'
import { Race } from '../../interfaces/race'

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'ngx-race',
  templateUrl: './race.component.html',
  styleUrls: ['../jobportal/open-vacancy.component.scss']
})
export class RaceComponent implements OnInit, OnDestroy {
  races: any = []
  _subscription: Subscription

  public source = new LocalDataSource()

  constructor(private service: RaceService) { }

  ngOnInit(): void {
    this.getRaces()
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe()
    }
  }

  getRaces() {
    this._subscription = this.service.getAllRaces().subscribe(
      (result: any) => {
        this.races = result
        this._refreshData()
      },
      (err) => alert('Failed to load races')
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
      Race: {
        title: 'Race',
        filter: false
      }
    },
    actions: {
      add: true,
      position: 'right'
    }
  }

  onDeleteConfirm(event) {
    if (window.confirm(`Are you sure you want to delete ${event.data.Race}?`)) {
      const subscription = this.service.deleteRace(event.data.Id).subscribe((res: any) => {
        if (res.Id == null) {
          alert(`Failed to delete ${event.data.Race}`)
        } else {
          this.races = this.races.filter(a => a.Id !== event.data.Id)
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

      const subscription = this.service.updateRace(
        JSON.stringify(event.newData))
        .subscribe((res: any) => {
          if (res.Id == null) {
            alert('Failed to update race')
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
    if (window.confirm(`Are you sure you want to add ${event.newData.Race}?`)) {
      const subscription = this.service.addRace(
        JSON.stringify({ Race: event.newData.Race })
      ).subscribe((res: any) => {
        if (res.Id == null) {
          alert(`Failed to create ${event.newData.Race}`)
        } else {
          event.newData.No = this.races.length + 1
          event.newData.Id = res.Id
          this.races.push(event.newData)
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
      this.races.map((item: Race, index: number) => {
        return {
          No: index + 1,
          Id: item.Id,
          Race: item.Race
        }
      })
    )
  }
}
