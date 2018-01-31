const databaserepository = require('./repository/databaserepository');

exports.getUsers = function (callback) {
  const query = 'select name, surname, github_login, role from users';

  databaserepository.query(query, null, (error, result) => {
    callback(error, result);
  });
};

exports.getStudents = function (callback) {
  const query = `select s.name,
      s.surname,
      s.github_login,
      m.name as mentor_name,
      m.surname as mentor_surname
    from users s
    left outer join (relations join users m on relations.mentor_id = m.id)
      on s.id = relations.student_id
      where s.role = 'student';`;

  databaserepository.query(query, null, (error, result) => {
    callback(error, result);
  });
};

exports.getMentors = function (callback) {

};


