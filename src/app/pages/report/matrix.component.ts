import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatrixService } from '../../services/matrix.service'
import { MatrixTemplateService } from '../../services/matrix-template.service'
import { VesselNameService } from '../../services/vessel-name.service'
import { MatrixDataService } from '../../services/matrix-data.service'
import { ApplicantService } from '../../services/applicant.service'
import * as XLSX from 'xlsx'
import { Subscription } from 'rxjs'

@Component({
  selector: 'ngx-matrix',
  templateUrl: './matrix.component.html',
})
export class MatrixComponent implements OnDestroy, OnInit {
  matrixTemplates = []
  vessels = []
  genders = []
  newTableDetails: any
  vesselName = ""
  selectedTemplate: any
  selectedDate: any
  selectedDate2: any
  selectedFormat = 'Horizontal' // Default to Horizontal
  hasSearch = false // Used to denote whether first search has occurred
  formats = ['Horizontal', 'Vertical']
  tableHeader = []

  private _matrixSubscription: Subscription
  private _matrixTemplateSubscription: Subscription
  private _vesselNameSubscription: Subscription
  private _genderSubscription: Subscription

  constructor(
    private matrixService: MatrixService,
    private matrixTemplateService: MatrixTemplateService,
    private vesselNameService: VesselNameService,
    private matrixDataService: MatrixDataService,
    private applicantService: ApplicantService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.newTableDetails = {}
    this.newTableDetails.dict = []
    this.newTableDetails.horizontal = [] // Added by Hakim on 29 Jan 2021
    this.newTableDetails.arr = [] // Added by Hakim on 29 Jan 2021

    await this.getGender()

    this._matrixSubscription = this.matrixService.getMatrix().subscribe(
      (result: any) => {
        this.matrixTemplates = []
        for (let i = 0; i < result.length; i++) {
          const matrixTemplate = {}
          matrixTemplate['matrixName'] = result[i].Matrix
          this.matrixTemplates.push(matrixTemplate)
        }
      },
      (err) => alert('Failed to load Matrix')
    )

    this._matrixTemplateSubscription = this.matrixTemplateService.getMatrixTemplate().subscribe(
      (result: any) => {
        // Result is an JSON array
        for (let i = 0; i < this.matrixTemplates.length; i++) {
          this.matrixTemplates[i].Item = []
          this.matrixTemplates[i].ItemDesc = []
          this.matrixTemplates[i].SeqNo = []
          for (let j = 0; j < result.length; j++) {
            if (result[j].Matrix === this.matrixTemplates[i].matrixName) {
              this.matrixTemplates[i].Item.push(result[j].Item)
              this.matrixTemplates[i].ItemDesc.push(result[j].ItemDesc)
              this.matrixTemplates[i].SeqNo.push(result[j].SeqNo[0])
            }
          }
        }
      },
      (err) => alert('Failed to load Matrix')
    )

    this._vesselNameSubscription = this.vesselNameService.getVesselName().subscribe(
      (result: any) => {
        this.vessels = result,
        console.log("check vessels")
        console.log(this.vessels)
        
      },
      (err) => alert('Failed to load Vessel Name')
    )
  }

  ngOnDestroy(): void {
    if (this._matrixSubscription) {
      this._matrixSubscription.unsubscribe()
    }
    if (this._matrixTemplateSubscription) {
      this._matrixTemplateSubscription.unsubscribe()
    }
    if (this._vesselNameSubscription) {
      this._vesselNameSubscription.unsubscribe()
    }
  }

  getGender() {
    return new Promise((resolve, reject) => {
      this._genderSubscription = this.applicantService.getGender().subscribe(
        (result: any) => {
          this.genders = result
          return resolve(true)
        },
        (err) => { console.log(err); return resolve(false); }
      )
    })
  }

  exportToExcel() {

    if (this.selectedFormat == 'Horizontal') {
      let dataToExport = []
      dataToExport.push(this.tableHeader)
      dataToExport = dataToExport.concat(this.newTableDetails.arr)
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport, {skipHeader: true});
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'matrix.xlsx');
    } else {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.newTableDetails.dict);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'matrix.xlsx');
    }
  }

  alert() {
    if (!this.selectedDate) {
      alert('Please select a date range period')
      return
    }
    if (!this.selectedDate2) {
      alert('Please select a date range period')
      return
    }
    if (!this.selectedTemplate) {
      alert('Please select a matrix template')
      return
    }
    if (!this.vesselName) {
      alert('Please select a vessel')
      return
    }

    this.tableHeader = []
    this.newTableDetails = {}
    this.newTableDetails.dict = []
    this.newTableDetails.horizontal = [] // Added by Hakim on 29 Jan 2021
    this.newTableDetails.arr = [] // Added by Hakim on 29 Jan 2021
    this.hasSearch = true
    let selectedDateRange = this.selectedDate + "/" + this.selectedDate2

    const subscription = this.matrixDataService.getMatrixData(selectedDateRange, this.vesselName).subscribe(
      (result: any) => {
        console.log("check matrix data")
        console.log(result)
        // if (result && result.length > 0) {
        for (let i = 0; i < result.length; i++) {
          // Only take the first result
          const matrixData = result[i]
          matrixData.Position = matrixData.ApplyPosition
          const selectedMatrix = this.matrixTemplates.find(t => t.matrixName === this.selectedTemplate)

          console.log("matrix data")
          console.log(matrixData)
          console.log("selected matrix")
          console.log(selectedMatrix)
        
          // Added by Hakim on 28 Jan 2021 - Start
          let selectedDateFormat1 = ''
          let selectedDateFormat2 = ''
          var itemKey = selectedMatrix.Item
          var itemHeader = selectedMatrix.ItemDesc
          if (selectedMatrix.Item != null) {
            selectedDateFormat1 = selectedMatrix.Item.find(data => data == 'DateFormat1')
            selectedDateFormat2 = selectedMatrix.Item.find(data => data == 'DateFormat2')

            if (i == 0) {

              if (itemKey.indexOf('DateFormat1') >= 0) {
                itemKey.splice(itemKey.indexOf('DateFormat1'), 1);
              } else if (itemKey.indexOf('DateFormat2') >= 0) {
                itemKey.splice(itemKey.indexOf('DateFormat2'), 1);
              }

              if (itemHeader.indexOf('Date Format dd/mm/yyyy') >= 0) {
                itemHeader.splice(itemHeader.indexOf('Date Format dd/mm/yyyy'), 1);
              } else if (itemHeader.indexOf('Date Format mm/dd/yyyy') >= 0) {
                itemHeader.splice(itemHeader.indexOf('Date Format mm/dd/yyyy'), 1);
              }

              this.tableHeader = itemHeader
            }
          }

          let dictHorizontal = {}
          let arrHorizontal = []
          // Added by Hakim on 28 Jan 2021 - End

          for (let i = 0; i < selectedMatrix.Item.length; i++) {
            let key = selectedMatrix.Item[i]
            let value = matrixData[key]

            // Change date format
            if (value != null) {
              let dataNumber = Number(value)
              let dataDate = new Date(value)
              if (dataDate.getDate() != null && !dataNumber && !isNaN(dataDate.getDate())) {
                if (selectedDateFormat2 != null) {
                  value = (dataDate.getMonth()+1) + '/' + dataDate.getDate() + '/' + dataDate.getFullYear()
                } else {
                  value = dataDate.getDate() + '/' + (dataDate.getMonth()+1) + '/' + dataDate.getFullYear()
                }
              }
            }

            // Set gender
            if (key == "Gender" && this.genders.length > 0) {
              let gender = this.genders.filter((gender) => { return gender.Id == matrixData[key] })
              value = gender.length > 0 ? gender[0].Gender : ''
            }

            this.newTableDetails.dict.push({
              "key": selectedMatrix.ItemDesc[i],
              "value": value
            })

            arrHorizontal.push(value)
            dictHorizontal[key] = value
          }

          // for (let key in matrixData) {
          //   var index = selectedMatrix.Item.indexOf(key)
          //   if (index >= 0) {
          //     // Added by Hakim on 28 Jan 2021 - Start
          //     // Change date format
          //     if (matrixData[key] != null) {
          //       let dataNumber = Number(matrixData[key])
          //       let dataDate = new Date(matrixData[key])
          //       if (dataDate.getDate() != null && !dataNumber && !isNaN(dataDate.getDate())) {
          //         if (selectedDateFormat2 != null) {
          //           matrixData[key] = (dataDate.getMonth()+1) + '/' + dataDate.getDate() + '/' + dataDate.getFullYear()
          //         } else {
          //           matrixData[key] = dataDate.getDate() + '/' + (dataDate.getMonth()+1) + '/' + dataDate.getFullYear()
          //         }
          //       }
          //     }
          //     // Added by Hakim on 28 Jan 2021 - End

          //     // Added by Hakim on 3 March 2021 - Start
          //     // Set gender
          //     if (key == "Gender" && this.genders.length > 0) {
          //       let gender = this.genders.filter((gender) => { return gender.Id == matrixData[key] })
          //       matrixData[key] = gender.length > 0 ? gender[0].Gender : ''
          //     }
          //     // Added by Hakim on 3 March 2021 - End

          //     this.newTableDetails.dict.push({
          //       "key": selectedMatrix.ItemDesc[index],
          //       "value": matrixData[key]
          //     })

          //     arrHorizontal[index] = matrixData[key]
          //     // arrHorizontal.push(matrixData[key]) // Added by Hakim on 29 Jan 2021
          //     dictHorizontal[key] = matrixData[key] // Added by Hakim on 29 Jan 2021

          //     // Added by Hakim on 29 Jan 2021 - Start
          //     // if (i == 0) {
          //       // this.tableHeader.push(selectedMatrix.ItemDesc[index],)
          //     // }
          //     // Added by Hakim on 29 Jan 2021 - End
          //   }
          // }
          this.newTableDetails.arr.push(arrHorizontal) // Added by Hakim on 29 Jan 2021
          this.newTableDetails.horizontal.push(dictHorizontal) // Added by Hakim on 29 Jan 2021
        }
        subscription.unsubscribe()
      },
      (err) => alert('Failed to query matrix data ' + err)
    )
  }
}
