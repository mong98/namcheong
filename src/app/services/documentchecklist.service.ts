import { Injectable } from '@angular/core'

import { BaseService } from './base.service'

@Injectable({
  providedIn: 'root'
})
export class DocumentChecklistService {
  private _entity = 'documentchecklist'

  constructor(private service: BaseService) { }

  getAllDocumentChecklists() {
    return this.service.get(this._entity)
  }

  getDocumentChecklistById(id: string) {
    return this.service.getById(this._entity, id)
  }

  updateDocumentChecklist(positionId: string, data: any) {
    return this.service.updateWithId(this._entity, positionId, data)
  }
}
