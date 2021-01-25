import { HttpClient } from '@angular/common/http'
import { Component, SystemJsNgModuleLoader } from '@angular/core'
import { DocumentComponent } from './document.component'
import { MatrixService } from '../../services/matrix.service'
import { MatrixFieldService } from '../../services/matrix-field.service'
import { MatrixTemplateService } from '../../services/matrix-template.service'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'

@Component({
  selector: 'ngx-matrixtemplate',
  styleUrls: ['./matrix-template.component.scss'],
  templateUrl: './matrix-template.component.html',
})
export class MatrixTemplateComponent {
  documentServices: DocumentComponent
  retrievedFields = []
  matrixNames = []
  matrixTemplates = []
  allFields = []
  originalFields = []
  matrixNameSelectedValue = ""
  isDisabledLeftButton = true
  isDisabledRightButton = true
  constructor(private documentComponent: DocumentComponent,
              private router: Router,
              private matrixService: MatrixService,
              private matrixField: MatrixFieldService,
              private matrixTemplateService: MatrixTemplateService) {
    matrixService.getMatrix().subscribe(
      (result: any) => {
        // Put a dummy "Select" matrix name
        this.matrixTemplates.push({matrixName: "Select"})
        for(var i=0; i<result.length; i++){
          this.retrievedFields.push(result[i].Matrix)
          var matrixTemplate = {}
          matrixTemplate['matrixName'] = result[i].Matrix
          this.matrixNames.push(result[i].Matrix)
          this.matrixTemplates.push(matrixTemplate)
        }
        //console.log(this.retrievedFields)
      },
      (err) => alert('Failed to load Matrix')
    )
    matrixField.getMatrixField().subscribe(
      (result: any) => {
        //console.log(result)
        this.allFields = result
        // Keep a backup of original fields
        this.originalFields = result.slice()
        //console.log(result)
      },
      (err) => alert('Failed to load Matrix')
    )
    matrixTemplateService.getMatrixTemplate().subscribe(
      (result: any) => {
        // Result is an JSON array
        for(var i=0; i<this.matrixTemplates.length; i++) {
          this.matrixTemplates[i].Item = []
          this.matrixTemplates[i].ItemDesc = []
          for(var j=0; j < result.length; j++) {
            if(result[j].Matrix === this.matrixTemplates[i].matrixName) {
              this.matrixTemplates[i].Item.push(result[j].Item)
              this.matrixTemplates[i].ItemDesc.push(result[j].ItemDesc)
            }
          }
        }
        //console.log(this.matrixTemplates)
      },
      (err) => alert('Failed to load Matrix')
    )
  }
  //output = this.documentComponent.getDocuments();
  // templates = [
  //   {
  //     name: 'Template 1',
  //     listOfFields: ['AAE Date Expiry', 'AAE Date Issue', 'AAE Date Format'],
  //   },
  //   {
  //     name: 'Template 2',
  //     listOfFields: [],
  //   },
  //   {
  //     name: 'Template 3',
  //     listOfFields: [],
  //   },
  // ]

  // originalFields = [
  //   'AAE Date Expiry',
  //   'AAE Date Issue',
  //   'AAE No',
  //   'Position',
  //   'Application Date',
  //   'Login Email',
  //   'Password',
  //   'Name',
  //   'Gender',
  //   'IC',
  //   'Validity Date',
  //   'DOB',
  //   'Place of Birth',
  //   'Date Format',
  // ]
  // fields = [
  //   'AAE Date Expiry',
  //   'AAE Date Issue',
  //   'AAE No',
  //   'Application Date',
  //   'Login Email',
  //   'Password',
  //   'Name',
  //   'Gender',
  //   'IC',
  //   'Validity Date',
  //   'DOB',
  //   'Place of Birth',
  //   'AAE Date Format',
  // ]
  addedFields = []

  addNewTemplate = function () {
    var templateName = prompt('Please enter name of new template')
    if(templateName === null)
      return
    var addedFieldList = document.getElementById(
      'added_field_list'
    ) as HTMLSelectElement
    var listToBeAdded = addedFieldList.options
    var listToBeAddedLabel = []
    // Trim whitespace
    templateName = templateName.trim()
    if(templateName === '')
      return
    //console.log(this.matrixNames)
    if (this.matrixNames.indexOf(templateName) > -1) {
      alert("Template "+templateName+" already taken")
      return
    }
    var newTemplate = { matrixName: templateName, Item: [], ItemDesc: [] }
    // for (let i = 0; i < listToBeAdded.length; i++) {
    //   //listToBeAddedLabel.push(listToBeAdded[i].label)
    //   newTemplate.Item.push(listToBeAdded[i].getAttribute('item'))
    //   newTemplate.ItemDesc.push(listToBeAdded[i].label)
    //   //console.log(listToBeAdded[i].getAttribute('item'))
    // }
    //var newTemplate = { matrixName: templateName, Item: listToBeAdded[i].getAttribute('item'), ItemDesc: listToBeAddedLabel }
    this.matrixNames.push(templateName)
    this.matrixTemplates.push(newTemplate)
    //console.log(this.matrixTemplates)
    this.allFields = this.originalFields.slice()
    this.matrixNameSelectedValue = templateName
    this.addedFields = []
  }

  loadTemplate = function () {
    this.isDisabledLeftButton = true
    this.isDisabledRightButton = true
    var templateElement = document.getElementById(
      'template'
    ) as HTMLSelectElement
    var templateName = templateElement.value
    var addedFieldList = document.getElementById(
      'added_field_list'
    ) as HTMLSelectElement
    this.addedFields = []
    this.fields = this.originalFields
    //console.log(templateName)
    for (var i = 0; i < this.matrixTemplates.length; i++) {
      //console.log(this.matrixTemplates[i].matrixName)
      if (templateName === this.matrixTemplates[i].matrixName) {

        /*this.addedFields = this.matrixTemplates[i].ItemDesc
        this.fields = this.fields.filter(
          (e1) => !this.matrixTemplates[i].ItemDesc.includes(e1)
        )*/
        for(var j=0; j < this.matrixTemplates[i].ItemDesc.length; j++) {
          var ItemDict = {Item: this.matrixTemplates[i].Item[j], ItemDesc: this.matrixTemplates[i].ItemDesc[j]}
          this.addedFields.push(ItemDict)
        }
      }
    }
  }

  removeFunCallBack = function () {
    var fieldList = document.getElementById(
      'added_field_list'
    ) as HTMLSelectElement
    var addedFieldList = document.getElementById(
      'field_list'
    ) as HTMLSelectElement
    var templateElement = document.getElementById(
      'template'
    ) as HTMLSelectElement
    var templateName = templateElement.value
    var listToBeAdded = fieldList.selectedOptions
    var listToBeRemoved = []
    for (let i = 0; i < listToBeAdded.length; i++) {
      var ItemDict = {Item: listToBeAdded[i].getAttribute('item'), ItemDesc: listToBeAdded[i].label }
      this.allFields.push(ItemDict)
      const removeIndex = this.findItem(ItemDict, this.addedFields)
      this.removeItemFromTemplate(templateName, listToBeAdded[i].getAttribute('item'), listToBeAdded[i].label  )
      if (removeIndex > -1) {
        this.addedFields.splice(removeIndex, 1)
      }
    }
    this.allFields.sort((a, b) => (a.ItemDesc > b.ItemDesc) ? 1 : -1)
  }

  findItem(itemMap ,itemMapArray) {
    // ItemMapArray is array of dictionary of form { Item: <String>: ItemDesc: <String> }
    for(var i=0; i < itemMapArray.length; i++) {
      if(itemMap.Item == itemMapArray[i].Item && itemMap.ItemDesc == itemMapArray[i].ItemDesc)
        return i
    }
    return -1
  }

  addItemToTemplate(templateName, Item, ItemDesc) {
    for(var i=0; i < this.matrixTemplates.length; i++) {
      var matrixTemplate = this.matrixTemplates[i]
      if (templateName === matrixTemplate.matrixName) {
        matrixTemplate.Item.push(Item)
        matrixTemplate.ItemDesc.push(ItemDesc)
      }
    }
  }

  removeItemFromTemplate(templateName, Item, ItemDesc) {
    for(var i=0; i < this.matrixTemplates.length; i++) {
      var matrixTemplate = this.matrixTemplates[i]
      if (templateName === matrixTemplate.matrixName) {
        var index = matrixTemplate.Item.indexOf(Item)
        if (index > -1) {
          matrixTemplate.Item.splice(index, 1)
        }
        index = matrixTemplate.ItemDesc.indexOf(ItemDesc)
        if (index > -1) {
          matrixTemplate.ItemDesc.splice(index, 1)
        }
      }
    }
  }

  addFunCallBack = function () {
    var fieldList = document.getElementById('field_list') as HTMLSelectElement
    var addedFieldList = document.getElementById(
      'added_field_list'
    ) as HTMLSelectElement
    var listToBeAdded = fieldList.selectedOptions
    var templateElement = document.getElementById(
      'template'
    ) as HTMLSelectElement
    var templateName = templateElement.value
    var listToBeRemoved = []
    for (let i = 0; i < listToBeAdded.length; i++) {
      var ItemDict = {Item: listToBeAdded[i].getAttribute('item'), ItemDesc: listToBeAdded[i].label }
      //this.addedFields.push(listToBeAdded[i].label)
      this.addItemToTemplate(templateName, listToBeAdded[i].getAttribute('item'), listToBeAdded[i].label)
      this.addedFields.push(ItemDict)
      const removeIndex = this.findItem(ItemDict, this.allFields)

      //console.log(listToBeAdded[i].getAttribute('item'), removeIndex, ItemDict, this.allFields)
      if (removeIndex > -1) {
        this.allFields.splice(removeIndex, 1)
      }
    }
  }

  addMatrix = function() {
    const subscription = this.matrixService.addMatrix(
      JSON.stringify({ MatrixName: 'abc' })
    ).subscribe((res: any) => {
      if (res.Id == null) {
        alert(`Failed to create new matrix`)
      }
      subscription.unsubscribe()
    })
  }

  removeMatrix = function() {
    const subscription = this.matrixService.deleteMatrix(
      'abc'
    ).subscribe((res: any) => {
      if (res.Id == null) {
        alert(`Failed to remove matrix`)
      }
      subscription.unsubscribe()
    })
  }

  editCallBack() {
    this.isDisabledLeftButton = false
    this.isDisabledRightButton = false
  }

  addMatrixNames() {
    // for(var i=0; i<this.matrixNames.length; i++) {
      var subscription1 = this.matrixService.addMatrix(
        { MatrixNames: this.matrixNames }
      ).subscribe((res: any) => {
        if (res.Id == null) {
          alert(`Failed to create new matrix`)
        }
        subscription1.unsubscribe()
      })

    // }
  }

  submitChanges() {

    // for(var a=0; a < this.matrixTemplates.length; a++) {
      let copyTemplate = JSON.parse(JSON.stringify(this.matrixTemplates))
      copyTemplate.shift()
      var matrixTemplate = {matrixs:  copyTemplate}
      //for(var i=0; i < matrixTemplate.length; i++) {
        //var firstItem = {MatrixName: matrixTemplate.matrixName, Item: matrixTemplate.Item[i], ItemDesc: matrixTemplate.ItemDesc[i], SeqNo: i+1}
        //console.log(matrixTemplate)
         var subscription = this.matrixTemplateService.addMatrixTemplate(matrixTemplate).subscribe((res: any) => {
          if (res.Id == null) {
            alert('Fail')
            subscription.unsubscribe()
          }
        })
      //}
    // }
    this.addMatrixNames()
    alert("Changes submitted successfully")
    location.reload();
    // console.log(this.matrixTemplates)
    // var matrixFields;
    // this.matrixService.getMatrix().subscribe(
    //   (result: any) => {
    //     if(result.indexOf(matrixItem.matrixName) > -1 ) {
    //       matrixFields
    //     }
    //   },
    //   (err) => alert('Failed to query matrix names')
    // )
    // for(var i=0; i < this.matrixTemplates.length; i++) {
    //   var matrixItem = this.matrixTemplates[i]

    // }
  }
}
