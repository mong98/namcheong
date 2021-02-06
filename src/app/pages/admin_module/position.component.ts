import { Component, OnDestroy, OnInit } from '@angular/core'
import { PositionService } from '../../services/position.service'
import { UserIdConfigService } from '../../services/useridconfigure.service' // Added by Hakim on 5 Feb 2021
import { LocalDataSource } from 'ng2-smart-table'

import { Injectable } from '@angular/core'
import { Subscription } from 'rxjs'
import { Position } from '../../interfaces/position'

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'ngx-position',
  templateUrl: './position.component.html',
  styleUrls: ['../jobportal/open-vacancy.component.scss']
})

export class PositionComponent implements OnInit, OnDestroy {
  positions: any = []
  adminDetails: any = {} // Added by Hakim on 5 Feb 2021
  _subscription: Subscription

  public source = new LocalDataSource()

  constructor(private service: PositionService, private serviceUserConfigure: UserIdConfigService) { }

  ngOnInit(): void {
    this.getPositions()
    this.getAdminId()
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe()
    }
  }

  getPositions() {
    this.service.getAllPositions().subscribe(
      (result) => {
        this.positions = result
        this._refreshData()
      },
      (err) => alert('Failed to load positions')
    )
  }

  // Added by Hakim on 5 Feb 2021 - Start
  getAdminId() {
    this.serviceUserConfigure
      .getAdminDetails(localStorage.getItem('adminUsername'))
      .subscribe(
        (result: any) => {
          if(result.length != 0){
            this.adminDetails = result[0]
          }
        },
        (err) => alert('Failed to load admin details')
      )
  }
  // Added by Hakim on 5 Feb 2021 - End

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
      Position: {
        title: 'Position',
        filter: false
      }
    },
    actions: {
      add: true,
      position: 'right'
    }
  }

  onDeleteConfirm(event) {
    if (window.confirm(`Are you sure you want to delete ${event.data.Position}?`)) {
      const subscription = this.service.deletePosition(event.data.Id).subscribe((res: any) => {
        if (res.Id == null) {
          alert(`Failed to delete ${event.data.Position}`)
        } else {
          this.positions = this.positions.filter(p => p.Id !== event.data.Id)
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
      const subscription = this.service.updatePosition(
        JSON.stringify(event.newData)
      ).subscribe((res: any) => {
        if (res.Id == null) {
          alert('Failed to update position')
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
    if (window.confirm(`Are you sure you want to add ${event.newData.Position}?`)) {
      const subscription = this.service.addPosition(
        JSON.stringify({ 
          Position: event.newData.Position,
          CreatedBy: this.adminDetails.Id
        })
      ).subscribe((res: any) => {
        if (res.Id == null) {
          alert(`Failed to create ${event.newData.Position}`)
        } else {
          event.newData.No = this.positions.length + 1
          event.newData.Id = res.Id
          this.positions.push(event.newData)
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
      this.positions.map((item: Position, index: number) => {
        return {
          No: index + 1,
          Id: item.Id,
          Position: item.Position
        }
      })
    )
  }
}
