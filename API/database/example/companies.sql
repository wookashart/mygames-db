-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: mysql18.mydevil.net
-- Generation Time: Feb 19, 2022 at 04:51 PM
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
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `company_id` int(255) NOT NULL,
  `company_name` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `company_type` varchar(255) COLLATE utf8_polish_ci NOT NULL COMMENT 'producer|distributor|distributor_pl',
  `company_description` longtext COLLATE utf8_polish_ci NOT NULL,
  `company_www` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `company_address` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `company_logo` varchar(255) COLLATE utf8_polish_ci NOT NULL COMMENT 'image name',
  `company_create_date` date NOT NULL,
  `company_edit_date` date NOT NULL,
  `company_create_by` int(255) NOT NULL COMMENT 'user ID',
  `company_edit_by` int(255) NOT NULL COMMENT 'user ID'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`company_id`),
  ADD UNIQUE KEY `company_name` (`company_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `company_id` int(255) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
