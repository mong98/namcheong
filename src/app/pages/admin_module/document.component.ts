import { Component, OnDestroy, OnInit } from '@angular/core'
import { DocumentService } from '../../services/document.service'
import { LocalDataSource } from 'ng2-smart-table'

import { Injectable } from '@angular/core'
import { Subscription } from 'rxjs'
import { Document } from '../../interfaces/document'

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'ngx-documents',
  templateUrl: './document.component.html',
  styleUrls: ['../jobportal/open-vacancy.component.scss']
})
export class DocumentComponent implements OnInit, OnDestroy {
  documents: any = []
  _subscription: Subscription

  public source = new LocalDataSource()

  constructor(private service: DocumentService) { }

  ngOnInit(): void {
    this.getDocuments()
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe()
    }
  }

  getDocuments() {
    this._subscription = this.service.getAllDocuments().subscribe(
      (result: any) => {
        this.documents = result
        this._refreshData()
      },
      (err) => alert('Failed to load documents')
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
      Document: {
        title: 'Document',
        filter: false
      }
    },
    actions: {
      add: true,
      position: 'right'
    }
  }

  onDeleteConfirm(event) {
    if (window.confirm(`Are you sure you want to delete ${event.data.Document}?`)) {
      const subscription = this.service.deleteDocument(event.data.Id).subscribe((res: any) => {
        if (res.Id == null) {
          alert(`Failed to delete ${event.data.Document}`)
        } else {
          this.documents = this.documents.filter(a => a.Id !== event.data.Id)
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

      const subscription = this.service.updateDocument(
        JSON.stringify(event.newData))
        .subscribe((res: any) => {
          if (res.Id == null) {
            alert('Failed to update document')
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
    if (window.confirm(`Are you sure you want to add ${event.newData.Document}?`)) {
      const subscription = this.service.addDocument(
        JSON.stringify({ Document: event.newData.Document })
      ).subscribe((res: any) => {
        if (res.Id == null) {
          alert(`Failed to create ${event.newData.Document}`)
        } else {
          event.newData.No = this.documents.length + 1
          event.newData.Id = res.Id
          this.documents.push(event.newData)
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
      this.documents.map((item: Document, index: number) => {
        return {
          No: index + 1,
          Id: item.Id,
          Document: item.Document
        }
      })
    )
  }
}
