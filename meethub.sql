-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 19, 2025 at 03:37 PM
-- Server version: 8.4.3
-- PHP Version: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `meethub`
--

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

CREATE TABLE `activities` (
  `activity_id` int NOT NULL,
  `name_activity` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activities`
--

INSERT INTO `activities` (`activity_id`, `name_activity`) VALUES
(1, 'meeting'),
(2, 'belajar'),
(3, 'kerja'),
(4, 'event');

-- --------------------------------------------------------

--
-- Table structure for table `facilities`
--

CREATE TABLE `facilities` (
  `facility_id` int NOT NULL,
  `name_facility` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `facilities`
--

INSERT INTO `facilities` (`facility_id`, `name_facility`) VALUES
(1, 'WiFi'),
(2, 'proyektor'),
(3, 'whiteboard'),
(4, 'printer'),
(5, 'air conditioning');

-- --------------------------------------------------------

--
-- Table structure for table `places`
--

CREATE TABLE `places` (
  `place_id` int NOT NULL,
  `name_place` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `rating` float NOT NULL,
  `rating_source` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `price_range` int NOT NULL,
  `capacity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `places`
--

INSERT INTO `places` (`place_id`, `name_place`, `address`, `city`, `latitude`, `longitude`, `description`, `rating`, `rating_source`, `price_range`, `capacity`) VALUES
(1, 'Meeting Room A', 'Jl. Sudirman No. 10', 'Jakarta', -6.21462000, 106.84513000, 'Ruang meeting nyaman dengan WiFi dan proyektor.', 4.5, 'Google', 100, 20),
(2, 'StudyClubs', 'Jl. Margasatwa 2 No.29', 'Jakarta', -6.21460000, 106.84510000, 'Tempat belajar modern dengan kapasitas besar dan proyektor.', 4.7, 'Google', 30, 20),
(3, 'Kopi Kerja', 'Jl. Soekarno Hatta No. 23', 'Bandung', -6.93450000, 107.60480000, 'Tempat ngopi sambil kerja, nyaman dan tenang.', 4.5, 'Google', 30, 10),
(4, 'Study Space 101', 'Jl. Dipatiukur No. 10', 'Bandung', -6.89010000, 107.61020000, 'Ruang belajar dengan fasilitas lengkap dan Wi-Fi kencang.', 4.7, 'Google', 20, 8),
(5, 'MeetingHub', 'Jl. Gatot Subroto No. 88', 'Jakarta', -6.21460000, 106.84510000, 'Tempat meeting modern dengan kapasitas besar dan proyektor.', 4.2, 'Google', 50, 20);

-- --------------------------------------------------------

--
-- Table structure for table `place_activities`
--

CREATE TABLE `place_activities` (
  `place_id` int NOT NULL,
  `activity_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `place_activities`
--

INSERT INTO `place_activities` (`place_id`, `activity_id`) VALUES
(1, 1),
(2, 1),
(1, 3),
(1, 4),
(2, 4);

-- --------------------------------------------------------

--
-- Table structure for table `place_facilities`
--

CREATE TABLE `place_facilities` (
  `place_id` int NOT NULL,
  `facility_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `place_facilities`
--

INSERT INTO `place_facilities` (`place_id`, `facility_id`) VALUES
(1, 1),
(1, 2),
(2, 2),
(1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'khins123', '$2b$10$iSelxG6N.IlVymoHr09x5e4vkBXVwMKJNrMs2p6mD/1scOGAPe93m');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`activity_id`);

--
-- Indexes for table `facilities`
--
ALTER TABLE `facilities`
  ADD PRIMARY KEY (`facility_id`);

--
-- Indexes for table `places`
--
ALTER TABLE `places`
  ADD PRIMARY KEY (`place_id`);

--
-- Indexes for table `place_activities`
--
ALTER TABLE `place_activities`
  ADD PRIMARY KEY (`place_id`,`activity_id`),
  ADD KEY `activity_id` (`activity_id`);

--
-- Indexes for table `place_facilities`
--
ALTER TABLE `place_facilities`
  ADD PRIMARY KEY (`place_id`,`facility_id`),
  ADD KEY `facility_id` (`facility_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `activity_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `facilities`
--
ALTER TABLE `facilities`
  MODIFY `facility_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `places`
--
ALTER TABLE `places`
  MODIFY `place_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `place_activities`
--
ALTER TABLE `place_activities`
  ADD CONSTRAINT `place_activities_ibfk_1` FOREIGN KEY (`place_id`) REFERENCES `places` (`place_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `place_activities_ibfk_2` FOREIGN KEY (`activity_id`) REFERENCES `activities` (`activity_id`) ON DELETE CASCADE;

--
-- Constraints for table `place_facilities`
--
ALTER TABLE `place_facilities`
  ADD CONSTRAINT `place_facilities_ibfk_1` FOREIGN KEY (`place_id`) REFERENCES `places` (`place_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `place_facilities_ibfk_2` FOREIGN KEY (`facility_id`) REFERENCES `facilities` (`facility_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
