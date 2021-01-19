import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core'
import { Router } from '@angular/router'

import { CheckboxComponent } from '../../shared/CheckboxComponent.component'
import { UserIdConfigService } from '../../services/useridconfigure.service'
import { Subscription } from 'rxjs'
import { LocalDataSource } from 'ng2-smart-table'
import { UserModule } from '../../interfaces/usermodule'
import { environment } from '../../../environments/environment'

@Component({
  selector: 'ngx-useridconfigurecrud',
  templateUrl: './useridconfigurecrud.component.html',
  styleUrls: ['../jobportal/open-vacancy.component.scss'],
})
export class UserIdConfigureCrudComponent implements OnInit, OnDestroy {
  Id: any
  config: any[]
  modules: any[]
  allManagers: any[] = []
  name: string
  userId: string
  userName: string
  selectedManager: string
  signaturePath: string
  signatureAdminPath: string
  signature: File
  signatureAdmin: File

  isCreate: boolean = true
  public source = new LocalDataSource()
  private _subscription: Subscription
  private _moduleSubscription: Subscription
  private _managerSubscription: Subscription

  @Input() rowData: any
  @Input() data: any

  @Output() save: EventEmitter<any> = new EventEmitter()

  constructor(
    private router: Router,
    private service: UserIdConfigService
  ) {
    const navigation = this.router.getCurrentNavigation()
    this.Id = parseInt(navigation.extras as string)
    this.isCreate = isNaN(this.Id)
  }

  ngOnInit(): void {
    this._getData()
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe()
    }
    if (this._moduleSubscription) {
      this._moduleSubscription.unsubscribe()
    }
    if (this._managerSubscription) {
      this._managerSubscription.unsubscribe()
    }
  }

  private _getData() {
    if (!this.isCreate) {
      this._subscription = this.service.getUserIdConfigById(this.Id).subscribe(
        (result: any) => {
          this.config = result
          console.log("config: ", this.config)
          if (result && result.length > 0) {
            const cfg = this.config?.find(c => c.UserConfigureID === this.Id.toString())
            this.name = cfg.Name || ''
            this.userId = cfg.UserID || ''
            this.userName = cfg.UserName || ''
            this.signaturePath = cfg.Signature
            this.signatureAdminPath = cfg.SignatureAdmin
            this.selectedManager = cfg.ManagerId || ''
          }
          this._refreshData()
        },
        (err) => alert('Failed to load user ID config')
      )
    }

    this._moduleSubscription = this.service.getAllUserModules().subscribe(
      (result: any) => {
        this.modules = result
        this._refreshData()
      },
      (err) => alert('Failed to load modules')
    )

    this._managerSubscription = this.service.getAllManagers().subscribe(
      (result: any) => {
        this.allManagers = result.map(m => {
          return {
            ManagerId: m.UserID,
            ManagerName: m.LastName ? `${m.LastName}, ${m.FirstName}` : m.FirstName
          }
        })
      }
    )
  }

  settings = {
    hideSubHeader: true, // hide the add new fields
    columns: {
      No: {
        title: 'No',
        filter: false,
        editable: false,
        addable: false,
      },
      Chk: {
        title: 'Check',
        type: 'custom',
        filter: false,
        renderComponent: CheckboxComponent,
        valuePrepareFunction: (value) => {
          return { value, column: 'Chk' }
        }
      },
      Module: {
        title: 'Module',
        filter: false,
      },
      SubModule: {
        title: 'Sub Module',
        filter: false,
      },
    },
    actions: {
      delete: false,
      add: false,
      edit: false,
      position: 'right',
    },
  }

  signatureChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.signature = fileList[0];
    }
  }

  signatureAdminChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.signatureAdmin = fileList[0];
    }
  }


  viewSignature() {
    if (this.signaturePath && this.signaturePath.length > 0) {
      window.open('../'+`${environment.documentPathPrefix}/${this.signaturePath}`, '_blank')
    }
  }

  removeSignature() {
    if (window.confirm('Are you sure you want to remove signature?')) {
      const subscription = this.service.deleteSignature(this.Id).subscribe(
        (result: any) => {
          console.log(result)
          if(result.success_code == 0) {
            alert('Successfully removed Signature')
            this.signaturePath = null
          }
        },
        (err) => alert('Failed to remove signature')
      )
    }
  }

  
  viewSignatureAdmin() {
    if (this.signatureAdminPath && this.signatureAdminPath.length > 0) {
      window.open('../'+`${environment.documentPathPrefix}/${this.signatureAdminPath}`, '_blank')
    }
  }

  removeSignatureAdmin() {
    if (window.confirm('Are you sure you want to remove manager\'s signature?')) {
      const subscription = this.service.deleteSignatureAdmin(this.Id).subscribe(
        (result: any) => {
          console.log(result)
          if(result.success_code == 0) {
            alert('Successfully removed manager\'s Signature')
            this.signaturePath = null
          }
        },
        (err) => alert('Failed to remove manager\'s signature')
      )
    }
  }

  async onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      const manager = this.allManagers.find(m => m.ManagerId === Number(this.selectedManager))
      console.log(manager , this.Id)
      const subscription = this.service.updateUserIdConfig(this.Id,
        JSON.stringify(
          (await this.source.getAll())
            .map((item: any) => {
              return {
                UserConfigureID: item.UserConfigureID,
                ModuleID: item.ModuleID,
                UserID: this.userId,
                Name: this.name,
                UserName: this.userName,
                Chk: item.Chk,
                Module: item.Module,
                SubModule: item.SubModule,
                ManagerId: manager ? manager.ManagerId : null,
                ManagerName: manager ? manager.ManagerName : null
              }
            })
        )
      )
        .subscribe((res: any) => {
          if (res == null) {
            alert('Failed to update user config')
          } else {
            if (this.signature) {
              const fileUploadSubscription = this.service.uploadSignature(this.Id, this.userId, this.signature).subscribe(
                (sigRes: any) => {
                  if (!sigRes) {
                    alert('Failed to upload signature')
                  } else {
                    alert('Successfully updated user config')
                    this.router.navigate(['pages/admin_module/user_id_configure'])
                  }
                  fileUploadSubscription.unsubscribe()
                },
                (err) => {
                  alert('Failed to upload signature. Make sure you select the correct file.')
                }
              )
            } else {
              alert('Successfully updated user config')
              this.router.navigate(['pages/admin_module/user_id_configure'])
            }
            
            if (this.signatureAdmin) {
              const fileUploadSubscription = this.service.uploadSignatureAdmin(this.Id, this.userId, this.signatureAdmin).subscribe(
                (sigRes: any) => {
                  if (!sigRes) {
                    alert('Failed to upload signature Manager')
                  } else {
                    alert('Successfully updated user config!')
                    this.router.navigate(['pages/admin_module/user_id_configure'])
                  }
                  fileUploadSubscription.unsubscribe()
                },
                (err) => {
                  alert('Failed to upload signature Manager. Make sure you select the correct file.')
                }
              )
            } else {
              alert('Successfully updated user config')
              this.router.navigate(['pages/admin_module/user_id_configure'])
            }
          }
          subscription.unsubscribe()
        },
          (err) => alert('Failed to update user config')
        )
    } else {
      event.confirm.reject()
    }
  }

  async onCreateConfirm(event) {
    if (window.confirm('Are you sure you want to create user config?')) {
      const manager = this.allManagers.find(m => m.ManagerId === Number(this.selectedManager))
      const subscription = this.service.addUserIdConfig(
        JSON.stringify(
          (await this.source.getAll())
            .map((item: any) => {
              return {
                ModuleID: item.ModuleID,
                UserID: this.userId,
                Name: this.name,
                UserName: this.userName,
                Chk: item.Chk,
                Module: item.Module,
                SubModule: item.SubModule,
                ManagerId: manager ? manager.ManagerId : null,
                ManagerName: manager ? manager.ManagerName : null
              }
            })
        )
      )
        .subscribe((res: any) => {
          if (res && res.Id) {
            if (this.signature) {
              const fileUploadSubscription = this.service.uploadSignature(res.Id, this.userId, this.signature).subscribe(
                (sigRes: any) => {
                  if (!sigRes) {
                    alert('Failed to upload signature')
                  } else {
                    alert('Successfully created user config')
                    this.router.navigate(['pages/admin_module/user_id_configure'])
                  }
                  fileUploadSubscription.unsubscribe()
                },
                (err) => {
                  alert('Failed to upload signature. Make sure you select the correct file.')
                }
              )

              if (this.signatureAdmin) {
                const fileUploadSubscription = this.service.uploadSignatureAdmin(res.Id, this.userId, this.signatureAdmin).subscribe(
                  (sigRes: any) => {
                    if (!sigRes) {
                      alert('Failed to upload signature Manager')
                    } else {
                      alert('Successfully created user config')
                      this.router.navigate(['pages/admin_module/user_id_configure'])
                    }
                    fileUploadSubscription.unsubscribe()
                  },
                  (err) => {
                    alert('Failed to upload signature Manager. Make sure you select the correct file.')
                  }
                )
              } else {
                alert('Successfully created user config')
                this.router.navigate(['pages/admin_module/user_id_configure'])
              }

            } else {
              alert('Successfully created user config')
              this.router.navigate(['pages/admin_module/user_id_configure'])
            }
          } else {
            alert('Failed to create user config')
          }
          subscription.unsubscribe()
        })
    } else {
      event.confirm.reject()
    }
  }

  onCancel(event) {
    if (window.confirm('Are you sure you want to Cancel the Edit?')) {
      this.router.navigate(['pages/admin_module/user_id_configure'])
    } else {
      event.confirm.reject()
    }
  }

  private _refreshData() {
    if (!this.modules) {
      return
    }

    this.source.load(
      this.modules
        .map((item: UserModule, index: number) => {
          const cfg = this.config?.find(c => c.ModuleID === item.Id.toString())

          return {
            No: index + 1,
            UserConfigureID: this.Id,
            ModuleID: item.Id,
            UserID: this.userId,
            Name: this.name,
            UserName: this.userName,
            Chk: cfg ? cfg.Chk : 'N',
            Module: item.Module,
            SubModule: item.SubModule,
          }
        })
    )

  }
}
