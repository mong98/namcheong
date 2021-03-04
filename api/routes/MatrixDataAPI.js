const express = require('express')
const controller = require('../controller/MatrixDataController')
const router = express.Router()

router.get(
  // '/get_matrix_data/:ContractPeriodFrom&:VesselName',
  '/get_matrix_data/:ContractPeriodFrom/:ContractPeriodFrom2/:VesselName', // Added by Hakim on 1 Feb 2021 // Fixed server restrict '&' symbol
  controller.getMatrixData
)

module.exports = router
