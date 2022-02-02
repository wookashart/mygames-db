-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: mysql18.mydevil.net
-- Generation Time: Feb 02, 2022 at 01:48 PM
-- Server version: 5.7.35-log
-- PHP Version: 7.3.31

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
-- Table structure for table `user_games_status`
--

CREATE TABLE `user_games_status` (
  `ugs_id` int(255) NOT NULL,
  `ugs_game_id` int(255) NOT NULL,
  `ugs_user_id` int(255) NOT NULL,
  `ugs_status` varchar(255) COLLATE utf8_polish_ci NOT NULL COMMENT 'played, skip, planned',
  `ugs_status_detail` varchar(255) COLLATE utf8_polish_ci NOT NULL COMMENT '100p, endless, dropped, story',
  `ugs_date` date NOT NULL,
  `ugs_time` int(255) NOT NULL COMMENT 'played time in minutes',
  `ugs_favourite` int(1) NOT NULL DEFAULT '0' COMMENT '0 - not favourite, 1 - favourite'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user_games_status`
--
ALTER TABLE `user_games_status`
  ADD PRIMARY KEY (`ugs_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user_games_status`
--
ALTER TABLE `user_games_status`
  MODIFY `ugs_id` int(255) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
