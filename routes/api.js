// import EmployeeController
const EmployeeController = require("../controllers/EmployeeController");
// import express
const express = require("express");
// import express validator
const { validateRequestBody } = require("../validation/validation");

// membuat object router
const router = express.Router();

/**
 * Membuat routing
 */

// Membuat routing employee

// crud
router.get('/employees', EmployeeController.index);
router.post('/employees', validateRequestBody, EmployeeController.store);
router.get('/employees/:id', EmployeeController.show);
router.put('/employees/:id', EmployeeController.update);
router.delete('/employees/:id', EmployeeController.destroy);

// other
router.get('/employees/search/:name', EmployeeController.search);
router.get('/employees/status/active', EmployeeController.active);
router.get('/employees/status/inactive', EmployeeController.inactive);
router.get('/employees/status/terminated', EmployeeController.terminated);


// export router
module.exports = router;
