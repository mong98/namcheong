const express = require('express')
const controller = require('../controller/MatrixDataController')
const router = express.Router()

router.get(
  '/get_matrix_data/:ContractPeriodFrom&:VesselName',
  controller.getMatrixData
)

module.exports = router
