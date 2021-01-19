import { Injectable } from '@angular/core'

import { BaseService } from './base.service'

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private _entity = 'document'

  constructor(private service: BaseService) { }

  getAllDocuments() {
    return this.service.get(this._entity)
  }

  addDocument(data: any) {
    return this.service.add(this._entity, data)
  }

  updateDocument(data: any) {
    return this.service.update(this._entity, data)
  }

  deleteDocument(id: string) {
    return this.service.delete(this._entity, id)
  }
}
