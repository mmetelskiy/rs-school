const databaserepository = require('./repository/databaserepository');

exports.getUsers = function (callback) {
  const query = 'select name, surname, github_login, role from users';

  databaserepository.query(query, null, (error, result) => {
    let users;

    if (Array.isArray(result)) {
      users = result.map(user => ({
        name: user.name,
        surname: user.surname,
        github_login: user.github_login,
        role: user.role
      }));
    } else {
      users = [];
    }

    callback(error, users);
  });
};

exports.getStudents = function (callback) {
  const query = `select s.name,
      s.surname,
      s.github_login,
      m.name as mentor_name,
      m.surname as mentor_surname
    from users s
    left outer join (relations join users m
        on relations.mentor_id = m.id)
      on s.id = relations.student_id
      where s.role = 'student'`;

  databaserepository.query(query, null, (error, result) => {
    callback(error, result);
  });
};

exports.getMentors = function (callback) {
  // hey
};

const gitHubAccountExistsInDb = function (connection, githubLogin, callback) {
  const query = 'SELECT github_login from users where github_login = ?';

  connection.query(query, [githubLogin], (error, result) => {
    if (error) {
      callback(error);
      return;
    }

    if (!result || !result[0]) {
      callback(null, false);
    } else {
      callback(null, true);
    }
  });
};

const checkGithubAccountExists = function (githubLogin, callback) {
  callback(null, true);
};

const addUser = function (user, callback) {
  const query = 'INSERT INTO `users` (`name`, `surname`, `github_login`, `role`) VALUES (?, ?, ?, ?)';

  databaserepository.performTransaction([
    function checkGhAccExistsInDb(connection, next) {
      gitHubAccountExistsInDb(connection, user.github_login, (error, exists) => {
        if (exists) {
          const error = new Error('Gh acc exists');

          error.code = 409;
          next(error);
        } else {
          next(null);
        }
      });
    },
    function checkGhAccExists(connection, next) {
      checkGithubAccountExists(user.github_login, (error, exists) => {
        if (exists) {
          next(null);
        } else {
          const error = new Error('Gh does not exist in nature');

          error.code = 400;
          next(error);
        }
      });
    },
    function finallyAddUser(connection, next) {
      connection.query(query, [
        user.name,
        user.surname,
        user.github_login,
        user.role
      ], error => {
        next(error);
      });
    }
  ], error => {
    callback(error);
  });
};

exports.addMentor = function (mentor, callback) {
  addUser({
    name: mentor.name,
    surname: mentor.surname,
    github_login: mentor.github_login,
    role: 'mentor'
  }, error => {
    callback(error);
  });
};
