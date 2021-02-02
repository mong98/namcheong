import { Component } from '@angular/core'
import { LocalDataSource } from 'ng2-smart-table'
import { Subscription } from 'rxjs'
import { OpenVacancy } from '../../interfaces/openvacancy'
import { OpenVacancyService } from '../../services/openvacancy.service'
import { ImoNoService } from '../../services/imono.service'

import {
  SmartTableDatepickerComponent,
  SmartTableDatepickerRenderComponent,
} from '../../smart-table-datepicker/smart-table-datepicker.component'
import { PositionService } from '../../services/position.service'
import { Position } from '../../interfaces/position'

@Component({
  selector: 'ngx-openvacancy',
  templateUrl: './open-vacancy.component.html',
  styleUrls: ['./open-vacancy.component.scss'],
})
export class OpenVacancyComponent {
  openVacancies: any = []
  vessels: any = []
  vesselsList: any = []
  positions: any = []
  positionsList: any = []
  private _vacanciesSubscription: Subscription
  private _vesselSubscription: Subscription
  private _positionSubscription: Subscription

  public source = new LocalDataSource()

  constructor(
    private service: OpenVacancyService,
    private imoNoService: ImoNoService,
    private positionService: PositionService
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  ngOnDestroy(): void {
    if (this._vacanciesSubscription) {
      this._vacanciesSubscription.unsubscribe()
    }
    if (this._vesselSubscription) {
      this._vesselSubscription.unsubscribe()
    }
    if (this._positionSubscription) {
      this._positionSubscription.unsubscribe()
    }
  }

  getData() {
    this._vacanciesSubscription = this.service.getAllOpenVacancies().subscribe(
      (result: any) => {
        this.openVacancies = result
        this._refreshData()
      },
      (err) => alert('Failed to load open vacancies')
    )
    this._vesselSubscription = this.imoNoService.getAllVessels().subscribe(
      (result: any) => {
        this.vessels = result

        this.vessels.forEach((vessel: any) => {
          this.vesselsList.push({
            value: vessel.VesselName,
            title: vessel.VesselName
          })
        })

        const newSettings = {
          delete: {
            confirmDelete: true,
          },
          add: {
            addButtonContent: 'Add',
            confirmCreate: true,
          },
          edit: {
            confirmSave: true,
          },
          columns: {
            No: {
              title: 'No',
              filter: false,
              editable: false,
              addable: false
            },
            Id: {
              title: 'ID',
              hide: true
            },
            Position: {
              title: 'Position',
              filter: false,
              type: 'html',
              editor: {
                type: 'list',
                config: {
                  selectText: 'Select...',
                  list: this.positionsList,
                },
              },
            },
            DateEnd: {
              title: 'End Date',
              type: 'custom',
              renderComponent: SmartTableDatepickerRenderComponent,
              filter: false,
              editor: {
                type: 'custom',
                component: SmartTableDatepickerComponent,
                pickerType: 'calendar',
                timePicker: false,
                format: 'dd/MM/yyyy',
              },
            },
            HullNo: {
              title: 'Vessel Type',
              filter: false,
              type: 'html',
              editor: {
                type: 'list',
                config: {
                  selectText: 'Select...',
                  list: this.vesselsList,
                },
              },
            },
            Qualification: {
              title: 'Qualification',
              filter: false,
            },
          },
          actions: {
            add: true,
            position: 'right'
          },
        }
        this.settings = Object.assign(newSettings)
      },
      (err) => alert('Failed to load vessels')
    )

    this._positionSubscription = this.positionService.getAllPositions().subscribe(
      (result: any) => {
        this.positions = result

        this.positions.forEach((position: Position) => {
          this.positionsList.push({
            value: position.Id,
            title: position.Position
          })
        })

        const newSettings = {
          delete: {
            confirmDelete: true,
          },
          add: {
            addButtonContent: 'Add',
            confirmCreate: true,
          },
          edit: {
            confirmSave: true,
          },
          columns: {
            No: {
              title: 'No',
              filter: false,
              editable: false,
              addable: false
            },
            Id: {
              title: 'ID',
              hide: true
            },
            Position: {
              title: 'Position',
              filter: false,
              type: 'html',
              editor: {
                type: 'list',
                config: {
                  selectText: 'Select...',
                  list: this.positionsList,
                },
              },
            },
            DateEnd: {
              title: 'End Date',
              type: 'custom',
              renderComponent: SmartTableDatepickerRenderComponent,
              filter: false,
              editor: {
                type: 'custom',
                component: SmartTableDatepickerComponent,
                pickerType: 'calendar',
                timePicker: false,
                format: 'dd/MM/yyyy',
              },
            },
            HullNo: {
              title: 'Vessel Type',
              filter: false,
              type: 'html',
              editor: {
                type: 'list',
                config: {
                  selectText: 'Select...',
                  list: this.vesselsList,
                },
              },
            },
            Qualification: {
              title: 'Qualification',
              filter: false,
            },
          },
          actions: {
            add: true,
            position: 'right'
          },
        }
        this.settings = Object.assign(newSettings)
      },
      (err) => alert('Failed to load positions')
    )
  }

  settings = {
    delete: {
      confirmDelete: true,
    },
    add: {
      addButtonContent: 'Add',
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
    },
    columns: {
      No: {
        title: 'No',
        filter: false,
        editable: false,
        addable: false
      },
      Id: {
        title: 'ID',
        hide: true
      },
      Position: {
        title: 'Position',
        filter: false,
      },
      DateEnd: {
        title: 'End Date',
        type: 'custom',
        renderComponent: SmartTableDatepickerRenderComponent,
        filter: false,
        editor: {
          type: 'custom',
          component: SmartTableDatepickerComponent,
          pickerType: 'calendar',
          timePicker: false,
          format: 'dd/MM/yyyy',
        },
      },
      HullNo: {
        title: 'Vessel Type',
        filter: false,
        type: 'html',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: this.vesselsList,
          },
        },
      },
      Qualification: {
        title: 'Qualification',
        filter: false,
      },
    },
    actions: {
      add: true,
      position: 'right'
    },
  }

  onDeleteConfirm(event) {
    if (window.confirm(`Are you sure you want to delete ${event.data.Position}?`)) {
      const subscription = this.service.deleteOpenVacancy(event.data.Id).subscribe((res: any) => {
        if (res.Id == null) {
          alert(`Failed to delete ${event.data.Position}`)
        } else {
          this.openVacancies = this.openVacancies.filter(a => a.Id !== event.data.Id)
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
    if (!this.isValid(event)) return

    if (window.confirm('Are you sure you want to save?')) {
      event.confirm.resolve(event.newData)

      const subscription = this.service.updateOpenVacancy(
        JSON.stringify(event.newData)
      ).subscribe((res: any) => {
        if (res.Id == null) {
          alert('Failed to update open vacancy')
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
    if (!this.isValid(event)) return

    if (window.confirm(`Are you sure you want to add ${event.newData.Position}?`)) {
      const subscription = this.service.addOpenVacancy(
        JSON.stringify({
          Position: event.newData.Position,
          DateEnd: event.newData.DateEnd,
          HullNo: event.newData.HullNo,
          Qualification: event.newData.Qualification
        })
      ).subscribe((res: any) => {
        if (res.Id == null) {
          alert(`Failed to create ${event.newData.Position}`)
        } else {
          event.newData.No = this.openVacancies.length + 1
          event.newData.Id = res.Id
          this.openVacancies.push(event.newData)
          event.confirm.resolve(event.newData)
        }
        subscription.unsubscribe()
      })
    } else {
      event.confirm.reject()
    }
  }

  isValid(event) {
    if (event.newData.EndDate === '') {
      window.alert('Please specify date')
      return false
    }
    if (event.newData.Position === '') {
      window.alert('Please specify position')
      return false
    }
    if (event.newData.VesselType === '') {
      window.alert('Please specify vessel type')
      return false
    }
    if (event.newData.Qualification === '') {
      window.alert('Please specify qualification')
      return false
    }
    return true
  }

  _refreshData() {
    this.source.load(
      this.openVacancies.map((item: OpenVacancy, index: number) => {
        return {
          No: index + 1,
          Id: item.Id,
          Position: item.Position,
          DateEnd: new Date(item.DateEnd).toLocaleDateString('dd/MM/yyyy') ,
          HullNo: item.HullNo || '',
          Qualification: item.Qualification || ''
        }
      })
    )
  }
}
