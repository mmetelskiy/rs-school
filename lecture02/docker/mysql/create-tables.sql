CREATE TABLE `rs-db`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `surname` VARCHAR(50) NOT NULL,
  `github_login` VARCHAR(50) NOT NULL,
  `role` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

CREATE TABLE `rs-db`.`relations` (
  `mentor_id` INT NOT NULL,
  `student_id` INT NOT NULL,
  INDEX `id_idx` (`mentor_id` ASC),
  INDEX `student_to_user_idx` (`student_id` ASC),
  CONSTRAINT `mentor_to_user`
    FOREIGN KEY (`mentor_id`)
    REFERENCES `rs-db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `student_to_user`
    FOREIGN KEY (`student_id`)
    REFERENCES `rs-db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

INSERT INTO `rs-db`.`users` (`name`, `surname`, `github_login`, `role`) VALUES ('mikhail', 'miatselski', 'mmetelskiy', 'mentor');
INSERT INTO `rs-db`.`users` (`name`, `surname`, `github_login`, `role`) VALUES ('pavel', 'klimashevsky', 'klimashevsky-pavel', 'student');
INSERT INTO `rs-db`.`users` (`name`, `surname`, `github_login`, `role`) VALUES ('palina', 'kartsel', 'kartelpol', 'student');
INSERT INTO `rs-db`.`users` (`name`, `surname`, `github_login`, `role`) VALUES ('andrei', 'shelenhouski', 'manuminsk', 'student');
INSERT INTO `rs-db`.`users` (`name`, `surname`, `github_login`, `role`) VALUES ('vadzim', 'stalmashonak', 'stvader', 'student');

INSERT INTO `rs-db`.`relations` (`mentor_id`, `student_id`) VALUES ('1', '2');
INSERT INTO `rs-db`.`relations` (`mentor_id`, `student_id`) VALUES ('1', '3');
INSERT INTO `rs-db`.`relations` (`mentor_id`, `student_id`) VALUES ('1', '4');


use `rs-db`;

select s.name, s.surname, s.github_login, m.name as mentor_name, m.surname as mentor_surname
from users s, users m, relations
  where m.id = relations.mentor_id
    and s.id = relations.student_id;
