-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: mysql18.mydevil.net
-- Generation Time: Oct 08, 2021 at 03:59 PM
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
-- Table structure for table `platform_producer`
--

CREATE TABLE `platform_producer` (
  `pproducer_id` int(255) NOT NULL,
  `pproducer_name` varchar(255) COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `platform_producer`
--
ALTER TABLE `platform_producer`
  ADD PRIMARY KEY (`pproducer_id`),
  ADD UNIQUE KEY `pproducer_name` (`pproducer_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `platform_producer`
--
ALTER TABLE `platform_producer`
  MODIFY `pproducer_id` int(255) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
