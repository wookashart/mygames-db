-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: mysql18.mydevil.net
-- Generation Time: Jan 26, 2022 at 05:26 PM
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
-- Table structure for table `platform_distribution`
--

CREATE TABLE `platform_distribution` (
  `pd_id` int(255) NOT NULL,
  `pd_name` int(255) NOT NULL,
  `pd_platform_id` varchar(255) COLLATE utf8_polish_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `platform_distribution`
--
ALTER TABLE `platform_distribution`
  ADD PRIMARY KEY (`pd_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `platform_distribution`
--
ALTER TABLE `platform_distribution`
  MODIFY `pd_id` int(255) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
