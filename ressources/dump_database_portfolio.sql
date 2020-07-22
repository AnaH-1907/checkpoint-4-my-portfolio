CREATE DATABASE `portfolio`;

USE `portfolio`;

CREATE TABLE `projects` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `logo` VARCHAR(300) NOT NULL,
  `client` VARCHAR(100) NOT NULL,
  `start_date` DATE NOT NULL,
  `delivery_date` DATE NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
