import { Component, OnDestroy, OnInit } from '@angular/core'
import { CountryService } from '../../services/country.service'
import { LocalDataSource } from 'ng2-smart-table'

import { Injectable } from '@angular/core'
import { Subscription } from 'rxjs'
import { Country } from '../../interfaces/country'

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'ngx-country',
  templateUrl: './country.component.html',
  styleUrls: ['../jobportal/open-vacancy.component.scss']
})
export class CountryComponent implements OnInit, OnDestroy {
  countries: any = []
  _subscription: Subscription

  public source = new LocalDataSource()

  constructor(private service: CountryService) { }

  ngOnInit(): void {
    this.getCountries()
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe()
    }
  }

  getCountries() {
    this._subscription = this.service.getAllCountries().subscribe(
      (result: any) => {
        this.countries = result
        this._refreshData()
      },
      (err) => alert('Failed to load countries')
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
      Country: {
        title: 'Country',
        filter: false
      }
    },
    actions: {
      add: true,
      position: 'right'
    }
  }

  onDeleteConfirm(event) {
    if (window.confirm(`Are you sure you want to delete ${event.data.Country}?`)) {
      const subscription = this.service.deleteCountry(event.data.Id).subscribe((res: any) => {
        if (res.Id == null) {
          alert(`Failed to delete ${event.data.Country}`)
        } else {
          this.countries = this.countries.filter(a => a.Id !== event.data.Id)
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

      const subscription = this.service.updateCountry(
        JSON.stringify(event.newData))
        .subscribe((res: any) => {
          if (res.Id == null) {
            alert('Failed to update country')
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
    if (window.confirm(`Are you sure you want to add ${event.newData.Country}?`)) {
      const subscription = this.service.addCountry(
        JSON.stringify({ Country: event.newData.Country })
      ).subscribe((res: any) => {
        if (res.Id == null) {
          alert(`Failed to create ${event.newData.Country}`)
        } else {
          event.newData.No = this.countries.length + 1
          event.newData.Id = res.Id
          this.countries.push(event.newData)
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
      this.countries.map((item: Country, index: number) => {
        return {
          No: index + 1,
          Id: item.Id,
          Country: item.Country
        }
      })
    )
  }
}
