import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatrixService } from '../../services/matrix.service'
import { MatrixTemplateService } from '../../services/matrix-template.service'
import { VesselNameService } from '../../services/vessel-name.service'
import { VesselService } from '../../services/vessel.service'
import { MatrixDataService } from '../../services/matrix-data.service'
import * as XLSX from 'xlsx'
import { Subscription } from 'rxjs'

@Component({
  selector: 'ngx-matrix',
  templateUrl: './matrix.component.html',
})
export class MatrixComponent implements OnDestroy, OnInit {
  matrixTemplates = []
  vessels = []
  newTableDetails: any
  vesselName = ""
  selectedTemplate: any
  selectedDate: any
  selectedFormat = 'Horizontal' // Default to Horizontal
  hasSearch = false // Used to denote whether first search has occurred
  formats = ['Horizontal', 'Vertical']

  private _matrixSubscription: Subscription
  private _matrixTemplateSubscription: Subscription
  private _vesselNameSubscription: Subscription

  constructor(
    private matrixService: MatrixService,
    private matrixTemplateService: MatrixTemplateService,
    private vesselNameService: VesselNameService,
    private matrixDataService: MatrixDataService
  ) {
  }

  ngOnInit(): void {
    this.newTableDetails = {}
    this.newTableDetails.dict = []

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

  exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.newTableDetails.dict);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'matrix.xlsx');
  }

  alert() {
    if (!this.selectedDate) {
      alert('Please select a date period')
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

    this.newTableDetails = {}
    this.newTableDetails.dict = []
    this.hasSearch = true

    const subscription = this.matrixDataService.getMatrixData(this.selectedDate, this.vesselName).subscribe(
      (result: any) => {
        console.log("check matrix data")
        console.log(result)
        if (result && result.length > 0) {
          // Only take the first result
          const matrixData = result[0]
          matrixData.Position = matrixData.ApplyPosition
          const selectedMatrix = this.matrixTemplates.find(t => t.matrixName === this.selectedTemplate)

          console.log("matrix data")
          console.log(matrixData)
          console.log("selected matrix")
          console.log(selectedMatrix)

          for (let key in matrixData) {
            var index = selectedMatrix.Item.indexOf(key)
            if (index >= 0) {
              this.newTableDetails.dict.push({
                "key": selectedMatrix.ItemDesc[index],
                "value": matrixData[key]
              })
            }
          }
        }
        subscription.unsubscribe()
      },
      (err) => alert('Failed to query matrix data ' + err)
    )
  }
}