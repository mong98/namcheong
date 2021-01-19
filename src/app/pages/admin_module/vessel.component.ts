import { Component, OnDestroy, OnInit } from '@angular/core'
import { VesselService } from '../../services/vessel.service'
import { LocalDataSource } from 'ng2-smart-table'

import { Injectable } from '@angular/core'
import { Subscription } from 'rxjs'
import { Vessel } from '../../interfaces/vessel'

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'ngx-vessel',
  templateUrl: './vessel.component.html',
  styleUrls: ['../jobportal/open-vacancy.component.scss']
})
export class VesselComponent implements OnInit, OnDestroy {
  vessels: any = []
  vesselsList: any = []
  _vesselSubscription: Subscription

  public source = new LocalDataSource()

  constructor(private service: VesselService) { }

  ngOnInit(): void {
    this.getData()
  }

  ngOnDestroy(): void {
    if (this._vesselSubscription) {
      this._vesselSubscription.unsubscribe()
    }
  }

  getData() {
    this._vesselSubscription = this.service.getAllVessels().subscribe(
      (result: any) => {
        this.vesselsList = result
        this._refreshData()
      },
      (err) => alert('Failed to load vessels')
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
      VesselName: {
        title: 'Ship Name',
        filter: false,
      },
      VesselType: {
        title: 'Vessel Type',
        filter: false,
      }
    },
    actions: {
      add: true,
      position: 'right'
    }
  }

  onDeleteConfirm(event) {
    if (window.confirm(`Are you sure you want to delete ${event.data.VesselName}?`)) {
      const subscription = this.service.deleteVessel(event.data.Id).subscribe((res: any) => {
        if (res.Id == null) {
          alert(`Failed to delete ${event.data.VesselName}`)
        } else {
          this.vesselsList = this.vesselsList.filter(a => a.Id !== event.data.Id)
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

      const subscription = this.service.updateVessel(
        JSON.stringify(event.newData))
        .subscribe((res: any) => {
          if (res.Id == null) {
            alert('Failed to update Vessel')
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
    if (window.confirm(`Are you sure you want to add ${event.newData.VesselName}?`)) {
      const subscription = this.service.addVessel(
        JSON.stringify({ Id: event.newData.Id, 
          VesselName: event.newData.VesselName,
          VesselType: event.newData.VesselType })
      ).subscribe((res: any) => {
        if (res.Id == null) {
          alert(`Failed to create ${event.newData.Vessel}`)
        } else {
          event.newData.No = this.vesselsList.length + 1
          event.newData.Id = res.Id
          this.vesselsList.push(event.newData)
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
      this.vesselsList.map((item: Vessel, index: number) => {
        return {
          No: index + 1,
          Id: item.Id,
          VesselType: item.VesselType,
          VesselName: item.VesselName
        }
      })
    )
  }
}
