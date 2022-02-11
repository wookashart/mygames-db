-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: mysql18.mydevil.net
-- Generation Time: Feb 11, 2022 at 10:51 AM
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
-- Table structure for table `dlc`
--

CREATE TABLE `dlc` (
  `dlc_id` int(255) NOT NULL,
  `dlc_name` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `dlc_name_pl` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `dlc_name_sort` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `dlc_platforms` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `dlc_early_access` int(1) NOT NULL DEFAULT '0',
  `dlc_first_date` date DEFAULT NULL,
  `dlc_description` longtext COLLATE utf8_polish_ci,
  `dlc_cover` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `dlc_create_date` date NOT NULL,
  `dlc_edit_date` date NOT NULL,
  `dlc_create_by` int(255) NOT NULL,
  `dlc_edit_by` int(255) NOT NULL,
  `dlc_game_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dlc`
--
ALTER TABLE `dlc`
  ADD PRIMARY KEY (`dlc_id`),
  ADD UNIQUE KEY `dlc_name` (`dlc_name`),
  ADD UNIQUE KEY `dlc_name_sort` (`dlc_name_sort`),
  ADD UNIQUE KEY `dlc_platforms` (`dlc_platforms`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dlc`
--
ALTER TABLE `dlc`
  MODIFY `dlc_id` int(255) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
