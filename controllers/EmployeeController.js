// import Model Employee
const Employee = require('../models/Employee');
const { validationResult } = require('../validation/validation');
// buat class EmployeeController
class EmployeeController {
  // buat fungsi

  async index(req, res) {
    await Employee.all()
      .then((result) => {
        if (result.length == 0) res.status(200).json({ message: "data is empty" });
        const data = {
          message: "get all resource",
          data: result
        }
        res.status(200).json(data);
      })
      .catch((errors) => {
        res.status(500).json({
          message: "can't get resource",
          err_message: errors.message
        });
      });
  }

  async store(req, res) {
    // handle validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: "all fields must be filled correctly",
        errors: errors.array()
      });
    }

    await Employee.create(req.body)
      .then((result) => {
        const data = {
          message: "result is added successfully",
          data: result
        };

        res.status(200).json(data);

      })
      .catch((errors) => {
        res.status(400).json({ errors: errors.message });
      });
  }

  async update(req, res) {
    const { id } = req.params;
    await Employee.update(id, req.body)
      .then((result) => {
        const data = {
          message: `resource with ${id} was updated successfully`,
          data: result,
        };
        res.json(data);
      })
      .catch((error) => {
        res.status(error.status).json({ message: error.message });
      });
  }
  async destroy(req, res) {
    const id = req.params.id;

    await Employee.destroy(id)
      .then((result) => {
        const data = {
          message: `resource id ${id} was deleted successfully`,
          data: [result],
        };
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(404).json({ message: error.message });
      });

  }
  async show(req, res) {
    const { id } = req.params;

    Employee.find(id)
      .then((result) => {
        if (result == null) res.status(404).json({ message: 'resource not found' });

        const data = {
          message: `get detail resource`,
          data: [result],
        };

        res.json(data);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }

  async search(req, res) {
    const searchTerm = req.params.name;
    await Employee.search(searchTerm)
      .then((result) => {
        if (result.length == 0) {
          res.status(404).json({ message: 'resource not found' });
        }

        res.status(200).json({ message: 'get searched resource', data: result });
      });
  }

  async active(req, res) {
    await Employee.findByStatus('active')
      .then((results) => {
        if (results.length == 0) {
          res.status(404).json({ message: 'resource not found'});
        }

        res.status(200).json({ message: 'get active resource', data: results });
      });
  }

  async inactive(req, res) {
    await Employee.findByStatus('inactive')
      .then((results) => {
        if (results.length == 0) {
          res.status(404).json({ message: 'resource not found'});
        }

        res.status(200).json({ message: 'get inactive resource', data: results });
      });
  }

  async terminated(req, res) {
    await Employee.findByStatus('terminated')
      .then((results) => {
        if (results.length == 0) {
          res.status(404).json({ message: 'resource not found'});
        }

        res.status(200).json({ message: 'get terminated resource', data: results });
      });
  }
}

// membuat object EmployeeController
const object = new EmployeeController();

// export object EmployeeController
module.exports = object;
