CREATE DATABASE IF NOT EXISTS `kipp_blogs`;

USE `kipp_blogs`;

CREATE TABLE IF NOT EXISTS `blogs` (
  `author` varchar(255) NOT NULL,
  `username` varchar(45) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(45) NOT NULL,
  `temp_password` varchar(45) DEFAULT NULL,
  `date_created` datetime NOT NULL,
  `date_updated` datetime DEFAULT NULL,
  `date_temp_password_sent` datetime DEFAULT NULL,
  `auto_login_key` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auto_login_key_UNIQUE` (`auto_login_key`),
  KEY `EMAIL_USERNAME_INDEX` (`username`,`email`)
);
