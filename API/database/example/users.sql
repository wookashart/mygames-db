-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: mysql18.mydevil.net
-- Generation Time: Oct 01, 2021 at 07:53 PM
-- Server version: 5.7.34-37-log
-- PHP Version: 7.3.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `m1249_myGames-DB`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(255) NOT NULL,
  `user_name` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `user_email` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `user_password` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `user_type` int(1) NOT NULL DEFAULT '0' COMMENT '0 - default, 1 - admin',
  `user_city` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `user_birthday` date DEFAULT NULL,
  `user_gender` int(1) NOT NULL DEFAULT '0' COMMENT '0 - not defined, 1 - male, 2 - female, 3 - other',
  `user_description` longtext COLLATE utf8_polish_ci,
  `user_avatar` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL COMMENT 'path to image',
  `user_register` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_name` (`user_name`),
  ADD UNIQUE KEY `user_email` (`user_email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(255) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
