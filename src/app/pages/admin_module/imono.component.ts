import { Component, OnDestroy, OnInit } from '@angular/core'
import { ImoNoService } from '../../services/imono.service'
import { LocalDataSource } from 'ng2-smart-table'

import { Injectable } from '@angular/core'
import { Subscription } from 'rxjs'
import { ImoNo } from '../../interfaces/imono'

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'ngx-imono',
  templateUrl: './imono.component.html',
  styleUrls: ['../jobportal/open-vacancy.component.scss']
})
export class ImoNoComponent implements OnInit, OnDestroy {
  imoNos: any = []
  vessels: any = []
  vesselsList: any = []
  _imoNoSubscription: Subscription
  _vesselSubscription: Subscription

  public source = new LocalDataSource()

  constructor(private service: ImoNoService) { }

  ngOnInit(): void {
    this.getData()
  }

  ngOnDestroy(): void {
    if (this._imoNoSubscription) {
      this._imoNoSubscription.unsubscribe()
    }
    if (this._vesselSubscription) {
      this._vesselSubscription.unsubscribe()
    }
  }

  getData() {
    this._imoNoSubscription = this.service.getAllImoNos().subscribe(
      (result: any) => {
        this.imoNos = result
        this._refreshData()
      },
      (err) => alert('Failed to load IMO No')
    )

    this._vesselSubscription = this.service.getAllVessels().subscribe(
      (result: any) => {
        this.vessels = result

        this.vessels.forEach((vessel: any) => {
          this.vesselsList.push({
            value: vessel.HullNo,
            title: vessel.HullNo
          })
        })

        const newSettings = {
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
            IMONo: {
              title: 'IMO No',
              filter: false
            },
            VesselName: {
              title: 'Name of Vessel',
              filter: false,
              type: 'html',
              editor: {
                type: 'list',
                config: {
                  selectText: 'Select...',
                  list: this.vesselsList
                }
              }
            }
          },
          actions: {
            add: true,
            position: 'right'
          }
        }
        this.settings = Object.assign(newSettings)
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
      IMONo: {
        title: 'IMO No',
        filter: false
      },
      VesselName: {
        title: 'Name of Vessel',
        filter: false,
        type: 'html',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: this.vesselsList
          }
        }
      }
    },
    actions: {
      add: true,
      position: 'right'
    }
  }

  onDeleteConfirm(event) {
    if (window.confirm(`Are you sure you want to delete ${event.data.IMONo}?`)) {
      const subscription = this.service.deleteImoNo(event.data.Id).subscribe((res: any) => {
        if (res.Id == null) {
          alert(`Failed to delete ${event.data.IMONo}`)
        } else {
          this.imoNos = this.imoNos.filter(a => a.Id !== event.data.Id)
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

      const subscription = this.service.updateImoNo(
        JSON.stringify(event.newData))
        .subscribe((res: any) => {
          if (res.Id == null) {
            alert('Failed to update imoNo')
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
    if (window.confirm(`Are you sure you want to add ${event.newData.IMONo}?`)) {
      const subscription = this.service.addImoNo(
        JSON.stringify({ IMONo: event.newData.IMONo })
      ).subscribe((res: any) => {
        if (res.Id == null) {
          alert(`Failed to create ${event.newData.IMONo}`)
        } else {
          event.newData.No = this.imoNos.length + 1
          event.newData.Id = res.Id
          this.imoNos.push(event.newData)
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
      this.imoNos.map((item: ImoNo, index: number) => {
        return {
          No: index + 1,
          Id: item.Id,
          IMONo: item.IMONo,
          VesselName: item.VesselName
        }
      })
    )
  }
}
