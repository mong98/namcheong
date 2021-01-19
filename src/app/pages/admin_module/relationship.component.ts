import { Component, OnDestroy, OnInit } from '@angular/core'
import { RelationshipService } from '../../services/relationship.service'
import { LocalDataSource } from 'ng2-smart-table'

import { Injectable } from '@angular/core'
import { Subscription } from 'rxjs'
import { Relationship } from '../../interfaces/relationship'

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'ngx-relationship',
  templateUrl: './relationship.component.html',
  styleUrls: ['../jobportal/open-vacancy.component.scss']
})
export class RelationshipComponent implements OnInit, OnDestroy {
  relationships: any = []
  _subscription: Subscription

  public source = new LocalDataSource()

  constructor(private service: RelationshipService) { }

  ngOnInit(): void {
    this.getRelationships()
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe()
    }
  }

  getRelationships() {
    this._subscription = this.service.getAllRelationships().subscribe(
      (result: any) => {
        this.relationships = result
        this._refreshData()
      },
      (err) => alert('Failed to load relationships')
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
      Relationship: {
        title: 'Relationship',
        filter: false
      }
    },
    actions: {
      add: true,
      position: 'right'
    }
  }

  onDeleteConfirm(event) {
    if (window.confirm(`Are you sure you want to delete ${event.data.Relationship}?`)) {
      const subscription = this.service.deleteRelationship(event.data.Id).subscribe((res: any) => {
        if (res.Id == null) {
          alert(`Failed to delete ${event.data.Relationship}`)
        } else {
          this.relationships = this.relationships.filter(a => a.Id !== event.data.Id)
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

      const subscription = this.service.updateRelationship(
        JSON.stringify(event.newData))
        .subscribe((res: any) => {
          if (res.Id == null) {
            alert('Failed to update relationship')
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
    if (window.confirm(`Are you sure you want to add ${event.newData.Relationship}?`)) {
      const subscription = this.service.addRelationship(
        JSON.stringify({ Relationship: event.newData.Relationship })
      ).subscribe((res: any) => {
        if (res.Id == null) {
          alert(`Failed to create ${event.newData.Relationship}`)
        } else {
          event.newData.No = this.relationships.length + 1
          event.newData.Id = res.Id
          this.relationships.push(event.newData)
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
      this.relationships.map((item: Relationship, index: number) => {
        return {
          No: index + 1,
          Id: item.Id,
          Relationship: item.Relationship
        }
      })
    )
  }
}
