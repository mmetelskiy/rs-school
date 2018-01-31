const dataprovider = require('../dataproviders/databaseprovider');

const processError = function (error, res) {
  const statusCode = error.code || 500;

  res.status(statusCode).json({
    message: error.message
  });
};

exports.getUsers = function (req, res) {
  dataprovider.getUsers(function processUsers(error, users) {
    if (error) {
      processError(error, res);
      return;
    }

    res.status(200).json({
      users
    });
  });
};

exports.getStudents = function (req, res) {
  dataprovider.getStudents(function processStudents(error, students) {
    if (error) {
      processError(error, res);
      return;
    }

    res.status(200).json({
      students
    });
  });
};

exports.addMentor = function (req, res) {

};
