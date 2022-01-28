/* eslint-disable consistent-return */
const userModel = require('../models/user');

const getUsers = (req, res) => {
  userModel.getUsers((results) => res.json({
    success: true,
    message: 'List Users',
    results,
  }));
};

const getUser = (req, res) => {
  const { id } = req.params;
  userModel.getUser(id, (results) => {
    if (results.length > 0) {
      return res.json({
        success: true,
        message: 'Detail User',
        results: results[0],
      });
    }
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  });
};

// eslint-disable-next-line require-jsdoc
function validateDataUser(data) {
  // expected data {email, password, name, phone_number, address,
  // display_name, gender, birth_date, picture(nullable)}
  const error = [];

  if (data.email === undefined || data.email.length === 0) {
    error.push('Input parameter email salah!');
  }
  // todo add validation for email
  if (data.password === undefined || data.password.length === 0) {
    error.push('Input parameter password salah!');
  }
  if (data.password.length > 20) {
    error.push('Password terlalu panjang!');
  }
  if (data.name === undefined || data.name.length === 0) {
    error.push('Input parameter nama salah!');
  }
  if (
    data.phone_number === undefined
    || data.phone_number.length === 0
    || data.phone_number.length > 16
  ) {
    error.push('Input parameter nomor telepon salah!');
  }
  if (
    data.address === undefined || data.address.length === 0
  ) {
    error.push('Input parameter alamat salah!');
  }
  if (
    data.display_name === undefined
    || data.display_name.length === 0
  ) {
    error.push('Input parameter display name salah!');
  }
  if (data.display_name.length > 32) {
    error.push('Display name terlalu panjang');
  }
  if (
    data.gender === undefined
    || !['male', 'female'].includes(data.gender.toLowerCase())
  ) {
    error.push('Input parameter jenis kelamin salah!');
  }
  if (data.birth_date === undefined) { // todo: add validation date yyyy-mm-dd
    error.push('Input parameter tanggal lahir salah!');
  }
  return error;
}

const addUser = (req, res) => {
  const data = req.body;
  const error = validateDataUser(data);
  if (error.length > 0) {
    return res.status(400).json({
      success: false,
      error,
    });
  }

  userModel.addUser(data, (result) => res.json({
    success: true,
    message: `${result.affectedRows} user added`,
  }));
};

const editUser = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const error = validateDataUser(data);
  if (error.length > 0) {
    return res.json({
      success: false,
      error,
    });
  }

  userModel.getUser(id, (results) => {
    if (results.length > 0) {
      userModel.editUser(id, data, (result) => res.json({
        success: true,
        sql_res: `Affected rows: ${result.affectedRows}`,
        message: `User with id ${id} has been updated`,
      }));
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  userModel.getUser(id, (results) => {
    if (results.length > 0) {
      userModel.deleteUser(id, (result) => res.json({
        succes: true,
        sql_res: `Affected rows: ${result.affectedRows}`,
        message: `User with id ${id} has been deleted`,
      }));
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
  });
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  editUser,
  deleteUser,
};