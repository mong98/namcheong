import { Component, OnDestroy, OnInit } from '@angular/core'
import { PortOfRegistryService } from '../../services/portofregistry.service'
import { LocalDataSource } from 'ng2-smart-table'

import { Injectable } from '@angular/core'
import { Subscription } from 'rxjs'
import { PortOfRegistry } from '../../interfaces/portofregistry'

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'ngx-portofregistry',
  templateUrl: './portofregistry.component.html',
  styleUrls: ['../jobportal/open-vacancy.component.scss']
})

export class PortOfRegistryComponent implements OnInit, OnDestroy {
  portsOfRegistry: any = []
  _subscription: Subscription

  public source = new LocalDataSource()

  constructor(private service: PortOfRegistryService) { }

  ngOnInit(): void {
    this.getPortsOfRegistry()
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe()
    }
  }

  getPortsOfRegistry() {
    this.service.getAllPortsOfRegistry().subscribe(
      (result) => {
        this.portsOfRegistry = result
        this._refreshData()
      },
      (err) => alert('Failed to load ports of registry')
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
      PortOfRegistry: {
        title: 'Port of Registry',
        filter: false
      }
    },
    actions: {
      add: true,
      position: 'right'
    }
  }

  onDeleteConfirm(event) {
    if (window.confirm(`Are you sure you want to delete ${event.data.PortOfRegistry}?`)) {
      const subscription = this.service.deletePortOfRegistry(event.data.Id).subscribe((res: any) => {
        if (res.Id == null) {
          alert(`Failed to delete ${event.data.PortOfRegistry}`)
        } else {
          this.portsOfRegistry = this.portsOfRegistry.filter(p => p.Id !== event.data.Id)
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
      const subscription = this.service.updatePortOfRegistry(
        JSON.stringify(event.newData))
        .subscribe((res: any) => {
          if (res.Id == null) {
            alert('Failed to update port of registry')
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
    if (window.confirm(`Are you sure you want to add ${event.newData.PortOfRegistry}?`)) {
      const subscription = this.service.addPortOfRegistry(
        JSON.stringify({ PortOfRegistry: event.newData.PortOfRegistry })
      ).subscribe((res: any) => {
        if (res.Id == null) {
          alert(`Failed to create ${event.newData.PortOfRegistry}`)
        } else {
          event.newData.No = this.portsOfRegistry.length + 1
          event.newData.Id = res.Id
          this.portsOfRegistry.push(event.newData)
          event.confirm.resolve(event.newData)
        }
        subscription.unsubscribe()
      })
    } else {
      event.confirm.reject()
    }
  }

  private _refreshData() {
    this.source.load(
      this.portsOfRegistry.map((item: PortOfRegistry, index: number) => {
        return {
          No: index + 1,
          Id: item.Id,
          PortOfRegistry: item.PortOfRegistry
        }
      })
    )
  }
}
