-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: mysql18.mydevil.net
-- Generation Time: Jan 26, 2022 at 04:32 PM
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
-- Table structure for table `games_ratio`
--

CREATE TABLE `games_ratio` (
  `gr_id` int(255) NOT NULL,
  `gr_game_id` int(255) NOT NULL,
  `gr_user_id` int(255) NOT NULL,
  `gr_ratio` int(2) NOT NULL,
  `gr_date` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `games_ratio`
--
ALTER TABLE `games_ratio`
  ADD PRIMARY KEY (`gr_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `games_ratio`
--
ALTER TABLE `games_ratio`
  MODIFY `gr_id` int(255) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
