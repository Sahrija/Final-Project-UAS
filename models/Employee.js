// import database
const db = require('../config/database');

// membuat class Employee
class Employee {
  // buat fungsi

  static all() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM employees;";

      db.query(query, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static create(employee) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO employees VALUES(
          '',
          '${employee.name}',
          '${employee.gender}',
          '${employee.phone}',
          '${employee.address}',
          '${employee.email}',
          '${employee.status}',
          '${employee.hired_on}',
          CURRENT_TIMESTAMP
        )`;

      db.query(query, (err, results) => {
        if (err) return reject(err);

        const id = results.insertId;
        const new_employee = this.find(id);
        resolve(new_employee);
      });
    });
  }

  static update(id, employee) {
    return new Promise((resolve, reject) => {
      /**
       * mengambil data employee lama yang akan di edit
       * untuk set data lama yang tidak ada dalam request
       */
      const old_employee_query = `SELECT * FROM employees where id = '${id}'`;

      db.query(old_employee_query, (err, old_employee_results) => {

        if (err) { reject(err); return; };

        // check if the employee wants to be updated is exists
        const [old_employee] = old_employee_results;
        if (!old_employee) {
          reject({
            status: 404,
            message: `resource with id ${id} to be updated was not found`
          })
        }
        else {
          // check all request body
          const name = employee["name"] ?? old_employee["name"];
          const gender = employee["gender"] ?? old_employee["gender"];
          const phone = employee["phone"] ?? old_employee["phone"];
          const address = employee["address"] ?? old_employee["address"];
          const email = employee["email"] ?? old_employee["email"];
          const status = employee["status"] ?? old_employee["status"];
          const hired_on = employee["hired_on"] ?? old_employee["hired_on"];

          const query = `
            UPDATE employees SET 
            name = '${name}', 
            gender = '${gender}', 
            phone = '${phone}', 
            address = '${address}', 
            email = '${email}', 
            status = '${status}', 
            hired_on = '${hired_on}'

            WHERE id = '${id}'
            `;

          db.query(query, (err, results) => {
            if (err) reject(err);
            resolve(results);
          });
        }

      });
    });
  }

  static destroy(id) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM employees WHERE id = '${id}'`;

      db.query(query, (err, results) => {
        if (err) reject(err);
        if (results.affectedRows == 0) reject({ message: `resource id ${id} not found` })
        resolve(results);
      });
    });
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM employees WHERE id = '${id}'`;

      db.query(query, (err, results) => {
        if (err) reject(err);
        const [employee] = results;
        resolve(employee);
      });
    })
  }

  static search(searchTerm) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM employees WHERE name LIKE '%${searchTerm}%'`;

      db.query(query, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static findByStatus(status) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM employees WHERE status = '${status}'`;

      db.query(query, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    })
  }

}
// export class Employee
module.exports = Employee;
