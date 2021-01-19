import { Component, Injectable, OnDestroy, OnInit } from '@angular/core'

import { Router } from '@angular/router'
import { LocalDataSource } from 'ng2-smart-table'
import { Subscription } from 'rxjs'
import { UserIdConfig } from '../../interfaces/useridconfig'
import { UserIdConfigService } from '../../services/useridconfigure.service'

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'ngx-useridconfigure',
  templateUrl: './useridconfigure.component.html',
  styleUrls: ['../jobportal/open-vacancy.component.scss'],
})
export class UserIdConfigureComponent implements OnInit, OnDestroy {
  configs: any = []
  _subscription: Subscription

  public source = new LocalDataSource()

  constructor(
    private router: Router,
    private service: UserIdConfigService,
  ) {
  }

  ngOnInit() {
    this.getConfigs()
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe()
    }
  }

  getConfigs() {
    this._subscription = this.service.getAllUserIdConfigs().subscribe(
      (result: any) => {
        this.configs = result
        this._refreshData()
      },
      (err) => alert('Failed to load user ID configs')
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
    hideSubHeader: true, // hide the add new fields
    columns: {
      No: {
        title: 'No',
        filter: false,
        editable: false,
        addable: false,
      },
      Id: {
        title: 'Id',
        hide: true,
      },
      UserID: {
        title: 'UserID',
        filter: false,
      },
      UserName: {
        title: 'UserName',
        filter: false,
      },
    },
    mode: 'external',
    actions: {
      delete: true,
      add: false,
      edit: true,
      position: 'right',
    },
  }

  onDeleteConfirm(event) {
    if (
      window.confirm(
        'Are you sure you want to delete the UserID? Please noted the UserID will be deleted from the database.'
      )
    ) {
      const subscription = this.service.deleteUserIdConfig(event.data.Id).subscribe((res: any) => {
        if (res.UserConfigureID == null) {
          alert(`Failed to delete ${event.data.UserName}`)
        } else {
          this.configs = this.configs.filter(c => c.UserConfigureID !== event.data.Id)
          this._refreshData()
        }
        subscription.unsubscribe()
      })
    }
  }

  onEditConfirm(event) {
    this.router.navigate(
      ['pages/admin_module/user_id_configure_crud'],
      event.data.Id
    )
  }

  onCreateConfirm(event) {
    this.router.navigate(
      ['pages/admin_module/user_id_configure_crud']
    )
  }

  private _refreshData() {
    this.source.load(
      this.configs.map((item: UserIdConfig, index: number) => {
        return {
          No: index + 1,
          Id: item.UserConfigureID,
          UserID: item.UserID,
          UserName: item.UserName,
        }
      })
    )
  }
}
