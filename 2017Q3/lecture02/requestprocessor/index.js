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
  const mentor = req.body;
  let error;

  if (!mentor.name || !mentor.name.length) {
    error = new Error('No name specified.');
    error.code = 400;
  } else if (!mentor.surname || !mentor.surname.length) {
    error = new Error('No surname specified.');
    error.code = 400;
  } else if (!mentor.github_login || !mentor.github_login.length) {
    error = new Error('No github_login specified.');
    error.code = 400;
  }

  if (error) {
    processError(error, res);
    return;
  }

  const mentorToPutToDb = {
    name: mentor.name,
    surname: mentor.surname,
    github_login: mentor.github_login
  };

  dataprovider.addMentor(mentorToPutToDb, error => {
    if (error) {
      processError(error, res);
    } else {
      res
        .status(201)
        .end();
    }
  });
};
