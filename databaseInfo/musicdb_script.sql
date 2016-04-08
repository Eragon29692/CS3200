-- MySQL Script generated by MySQL Workbench
-- 03/31/16 16:48:03
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema musicdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema musicdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `musicdb` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema new_schema1
-- -----------------------------------------------------
USE `musicdb` ;

-- -----------------------------------------------------
-- Table `musicdb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `musicdb`.`users` (
  `userid` VARCHAR(50) NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `email` VARCHAR(80) NOT NULL,
  `roles` ENUM('admin', 'user') NULL,
  PRIMARY KEY (`userid`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `musicdb`.`songs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `musicdb`.`songs` (
  `songid` VARCHAR(50) NOT NULL,
  `title` VARCHAR(45) NULL,
  `artist` VARCHAR(80) NULL,
  `album` VARCHAR(80) NULL,
  `year` INT NULL,
  PRIMARY KEY (`songid`),
  UNIQUE INDEX `songid_UNIQUE` (`songid` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `musicdb`.`library`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `musicdb`.`library` (
  `userid` VARCHAR(50) NOT NULL,
  `songid` VARCHAR(50) NOT NULL,
  INDEX `library_song_fk_idx` (`songid` ASC),
  INDEX `library_user_fk_idx` (`userid` ASC),
  PRIMARY KEY (`userid`, `songid`),
  CONSTRAINT `library_song_fk`
    FOREIGN KEY (`songid`)
    REFERENCES `musicdb`.`songs` (`songid`),
  CONSTRAINT `library_user_fk`
    FOREIGN KEY (`userid`)
    REFERENCES `musicdb`.`user` (`userid`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `musicdb`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `musicdb`.`comments` (
  `userid` VARCHAR(50) NOT NULL,
  `songid` VARCHAR(50) NOT NULL,
  `comment` VARCHAR(50) NOT NULL,
  INDEX `comments_user_fk_idx` (`userid` ASC),
  INDEX `comments_song_fk_idx` (`songid` ASC),
  PRIMARY KEY (`userid`, `songid`),
  CONSTRAINT `comments_user_fk`
    FOREIGN KEY (`userid`)
    REFERENCES `musicdb`.`user` (`userid`),
  CONSTRAINT `comments_song_fk`
    FOREIGN KEY (`songid`)
    REFERENCES `musicdb`.`songs` (`songid`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `musicdb`.`playlist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `musicdb`.`playlists` (
  `playlist_id` VARCHAR(50) NOT NULL,
  `userid` VARCHAR(50) NOT NULL,
  `songid` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`playlist_id`),
  INDEX `playlist_user_fk_idx` (`userid` ASC),
  INDEX `playlist_song_fk_idx` (`songid` ASC),
  CONSTRAINT `playlist_user_fk`
    FOREIGN KEY (`userid`)
    REFERENCES `musicdb`.`user` (`userid`),
  CONSTRAINT `playlist_song_fk`
    FOREIGN KEY (`songid`)
    REFERENCES `musicdb`.`songs` (`songid`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
