-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: mysql18.mydevil.net
-- Generation Time: Dec 29, 2021 at 02:16 PM
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
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `game_id` int(255) NOT NULL,
  `game_name` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `game_name_pl` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `game_name_sort` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `game_group` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `game_platforms` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `game_early_access` int(1) NOT NULL,
  `game_first_date` date DEFAULT NULL,
  `game_tags` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `game_producer` int(255) DEFAULT NULL,
  `game_distributor` int(255) DEFAULT NULL,
  `game_distributor_pl` int(255) DEFAULT NULL,
  `game_description` longtext COLLATE utf8_polish_ci,
  `game_cover` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `game_min_cpu` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `game_min_gpu` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `game_min_ram` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `game_min_system` int(255) DEFAULT NULL,
  `game_min_directx` int(255) DEFAULT NULL,
  `game_min_hdd` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `game_recommended_cpu` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `game_recommended_gpu` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `game_recommended_ram` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `game_recommended_system` int(255) DEFAULT NULL,
  `game_recommended_directx` int(255) DEFAULT NULL,
  `game_recommended_hdd` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `game_create_date` date NOT NULL,
  `game_edit_date` date NOT NULL,
  `game_create_by` int(255) NOT NULL,
  `game_edit_by` int(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`game_id`),
  ADD UNIQUE KEY `game_name` (`game_name`),
  ADD UNIQUE KEY `game_name_sort` (`game_name_sort`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `game_id` int(255) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
