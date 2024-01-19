import { executeQuery, pool } from "../../../config/db";

const getAllEmployees = async (req, res) => {
  try {
    let employeeData = await executeQuery("SELECT * FROM employees;", []);
    res.status(200).send(employeeData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getEmployeeById = async (req, res) => {
  let id = req.query.id;

  try {
    let employeeData = await executeQuery(
      "SELECT * FROM employees WHERE employee_id = ?",
      [id]
    );
    res.status(200).json(employeeData);
  } catch (err) {
    console.error("Error in getEmployeeById:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteEmployeeById = async (req, res) => {
  let id = req.query.id;
  try {
    let employeeData = await executeQuery(
      "Delete FROM employees WHERE employee_id = ?",
      [id]
    );
    res.status(200).json(employeeData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const insertEmployee = async (req, res) => {
  let employee_id = req.body.id;
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let job_title = req.body.job_title;
  let salary = req.body.salary;
  let hire_date = req.body.hire_date;
  try {
    let employeeData = await executeQuery(
      "INSERT INTO employees(employee_id, first_name, last_name, job_title, salary, hire_date) VALUES (?, ?, ?, ?, ?, ?)",
      [employee_id, first_name, last_name, job_title, salary, hire_date]
    );
    employeeData = `Successfully inserted ${first_name} with employee ID: ${employee_id} as a ${job_title}`
    res.status(201).json(employeeData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateEmployee = async (req, res) => {
  try {
    let id = req.query.id;
    let job_title = req.body.job_title;
    let salary = req.body.salary;

    let employeeData = await executeQuery(
      'SELECT * FROM employees WHERE employee_id = ?',
      [id]
    );

    if (employeeData.length > 0) {
      let updateEmployee = await executeQuery(
        'UPDATE employees SET job_title = ?, salary = ? WHERE employee_id = ?',
        [job_title, salary, id]
      );

      updateEmployee = `Employee ${employeeData[0].first_name} ${employeeData[0].last_name}'s job title is updated to ${job_title} with salary ${salary}`;
      res.status(200).json(updateEmployee);
    } else {
      res.status(404).json("NO EMPLOYEE FOUND. BAD REQUEST");
    }
  } catch (err) {
    console.error('Error in updateEmployee:', err);
    res.status(500).json(err);
  }
};

export { getAllEmployees, deleteEmployeeById, getEmployeeById, insertEmployee, updateEmployee};
