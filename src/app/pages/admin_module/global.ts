// global.ts
export function onDeleteConfirm(event) {
  if (window.confirm('Are you sure you want to delete?')) {
    event.confirm.resolve()
  } else {
    event.confirm.reject()
  }
}

export function onSaveConfirm(event) {
  if (window.confirm('Are you sure you want to save?')) {
    event.newData['name'] += ' + added in code'
    event.confirm.resolve(event.newData)
  } else {
    event.confirm.reject()
  }
}

export function onCreateConfirm(event) {
  if (window.confirm('Are you sure you want to create?')) {
    event.newData['name'] += ' + added in code'
    event.confirm.resolve(event.newData)
  } else {
    event.confirm.reject()
  }
}
