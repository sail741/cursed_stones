-- phpMyAdmin SQL Dump
-- version 4.2.12deb2+deb8u1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 19, 2017 at 09:30 AM
-- Server version: 10.0.23-MariaDB-0+deb8u1
-- PHP Version: 5.6.17-0+deb8u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `cursed_stones`
--

-- --------------------------------------------------------

--
-- Table structure for table `cards`
--

CREATE TABLE IF NOT EXISTS `cards` (
`id_card` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(300) NOT NULL,
  `type_card` varchar(5) NOT NULL,
  `cost` int(11) NOT NULL,
  `img` varchar(150) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cards`
--

INSERT INTO `cards` (`id_card`, `name`, `description`, `type_card`, `cost`, `img`) VALUES
(37, 'Okami', 'Petit loup (ou grande Déesse, c''est selon !)', 'chara', 3, 'okami.png'),
(41, 'Ragnarock', 'Dieu des flammes dur comme la pierre, et chaotique', 'chara', 9, 'ragnarock.png'),
(43, 'Escarmoche', 'A ne pas confondre avec un ulcère pas beau !', 'chara', 1, 'escarmoche.png'),
(44, 'Moemoekyun', 'Son charme vous touchera :3', 'chara', 2, 'moemoekyun.png'),
(45, 'Speedpanda', 'Aussi rapide que l''éclair.', 'chara', 4, 'speedpanda.png'),
(46, 'Mimic', 'Semblable à un tresor mais qui a du mordant', 'chara', 5, 'mimic.png'),
(47, 'Gobelaid', 'Olé, le gobelaid laid qui boit du lait ! (on abuse les gars...)', 'chara', 1, 'gobelaid.png'),
(48, 'Grimlir', 'Quarante-deux ! Ce n''est pas mal pour un principicule elfe aux oreilles pointues. Pour ma part, je suis assis sur mon quarante-troisième.', 'chara', 6, 'grimlir.png'),
(49, 'Ainz Ooal Gown', 'Le GM de Great Tomb of Nazarick. Il fumerait bien Albedo (pudum shii)', 'chara', 8, 'ainz_ooal_gown.png'),
(50, 'Momses', '[description aborté pour éviter des blagues scabreuses]', 'chara', 1, 'momses.png'),
(51, 'Seeyoulator', 'Le cousin rock''n roll de Renekton.', 'chara', 4, 'seeyoulator.png'),
(52, 'Chaman', 'Quel est le félin à moitié homme ?', 'chara', 2, 'chaman.png'),
(53, 'Diego', 'Derrière ses grandes dents, s''endort peut êêêêtreuh.', 'chara', 3, 'diego.png'),
(54, 'Chibzilla', 'Godzilla en devenir. D''ici quelques années, il sera grand.', 'chara', 1, 'chibzilla.png'),
(55, 'Jigoroth', 'Toujours prêt à taper, nanananana !', 'chara', 2, 'jigoroth.png'),
(56, 'Bebemuth', 'Plus kawaii que Bahamut, mais un peu moins féroce.', 'chara', 2, 'bebemuth.png');

-- --------------------------------------------------------

--
-- Table structure for table `cards_chara`
--

CREATE TABLE IF NOT EXISTS `cards_chara` (
  `id_card` int(11) NOT NULL,
  `attack` int(11) NOT NULL,
  `defence` int(11) NOT NULL,
  `life` int(11) NOT NULL,
  `movement` int(11) NOT NULL,
  `range` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cards_chara`
--

INSERT INTO `cards_chara` (`id_card`, `attack`, `defence`, `life`, `movement`, `range`) VALUES
(37, 3, 1, 2, 3, 1),
(41, 9, 3, 9, 3, 1),
(43, 1, 3, 1, 1, 1),
(44, 3, 1, 2, 2, 2),
(45, 3, 1, 3, 5, 1),
(46, 5, 5, 2, 2, 1),
(47, 2, 1, 2, 1, 1),
(48, 6, 2, 6, 2, 1),
(49, 8, 3, 3, 5, 3),
(50, 2, 1, 1, 2, 1),
(51, 3, 3, 3, 3, 1),
(52, 3, 1, 1, 2, 3),
(53, 2, 4, 1, 3, 1),
(54, 1, 1, 1, 3, 1),
(55, 2, 1, 3, 2, 1),
(56, 1, 3, 1, 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `cards_magic`
--

CREATE TABLE IF NOT EXISTS `cards_magic` (
  `id_card` int(11) NOT NULL,
  `type_spell` int(11) NOT NULL,
  `power_spell` int(11) NOT NULL,
  `range_spell` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `decks`
--

CREATE TABLE IF NOT EXISTS `decks` (
  `id_deck` int(11) NOT NULL,
  `id_card` int(11) NOT NULL,
  `qty_card` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `decks`
--

INSERT INTO `decks` (`id_deck`, `id_card`, `qty_card`) VALUES
(1, 43, 1),
(1, 45, 3),
(1, 47, 1),
(1, 48, 3),
(1, 49, 2),
(1, 50, 3),
(1, 52, 2),
(1, 53, 3),
(1, 54, 6),
(1, 55, 2),
(1, 56, 4);

-- --------------------------------------------------------

--
-- Table structure for table `histo`
--

CREATE TABLE IF NOT EXISTS `histo` (
  `date` date NOT NULL,
  `id_user1` int(11) NOT NULL,
  `id_user2` int(11) NOT NULL,
  `result` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `info_decks`
--

CREATE TABLE IF NOT EXISTS `info_decks` (
`id_deck` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `name_deck` varchar(30) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `info_decks`
--

INSERT INTO `info_decks` (`id_deck`, `id_user`, `name_deck`) VALUES
(1, 1, 'Default');

-- --------------------------------------------------------

--
-- Table structure for table `Sessions`
--

CREATE TABLE IF NOT EXISTS `Sessions` (
  `userId` varchar(50) NOT NULL,
  `expires` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `data` varchar(5000) NOT NULL,
  `sid` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
`id_user` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(64) NOT NULL,
  `points` int(11) NOT NULL,
  `country` varchar(30) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `username`, `password`, `points`, `country`) VALUES
(1, 'admin', 'MK/eGlK2eXUSSNfEHisnfnSJPZWVzUPZNJwawWnI2oo=', 0, 'EUW'),
(2, 'test2', 'w2ONNt/xzbYRi7TtUaox+h2c6/5i+1Q839QO9hL1gzo=', -35, 'France'),
(28, 'test', 'w2ONNt/xzbYRi7TtUaox+h2c6/5i+1Q839QO9hL1gzo=', -115, 'France');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cards`
--
ALTER TABLE `cards`
 ADD PRIMARY KEY (`id_card`);

--
-- Indexes for table `cards_chara`
--
ALTER TABLE `cards_chara`
 ADD PRIMARY KEY (`id_card`);

--
-- Indexes for table `cards_magic`
--
ALTER TABLE `cards_magic`
 ADD PRIMARY KEY (`id_card`);

--
-- Indexes for table `decks`
--
ALTER TABLE `decks`
 ADD PRIMARY KEY (`id_deck`,`id_card`), ADD KEY `id_card` (`id_card`);

--
-- Indexes for table `histo`
--
ALTER TABLE `histo`
 ADD PRIMARY KEY (`date`,`id_user1`,`id_user2`), ADD KEY `id_user1` (`id_user1`), ADD KEY `id_user2` (`id_user2`);

--
-- Indexes for table `info_decks`
--
ALTER TABLE `info_decks`
 ADD PRIMARY KEY (`id_deck`);

--
-- Indexes for table `Sessions`
--
ALTER TABLE `Sessions`
 ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`id_user`), ADD UNIQUE KEY `email` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cards`
--
ALTER TABLE `cards`
MODIFY `id_card` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=57;
--
-- AUTO_INCREMENT for table `info_decks`
--
ALTER TABLE `info_decks`
MODIFY `id_deck` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=31;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `cards_chara`
--
ALTER TABLE `cards_chara`
ADD CONSTRAINT `cards_chara_ibfk_1` FOREIGN KEY (`id_card`) REFERENCES `cards` (`id_card`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cards_magic`
--
ALTER TABLE `cards_magic`
ADD CONSTRAINT `cards_magic_ibfk_1` FOREIGN KEY (`id_card`) REFERENCES `cards` (`id_card`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `decks`
--
ALTER TABLE `decks`
ADD CONSTRAINT `decks_ibfk_2` FOREIGN KEY (`id_card`) REFERENCES `cards` (`id_card`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `decks_ibfk_3` FOREIGN KEY (`id_deck`) REFERENCES `info_decks` (`id_deck`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `histo`
--
ALTER TABLE `histo`
ADD CONSTRAINT `histo_ibfk_1` FOREIGN KEY (`id_user1`) REFERENCES `users` (`id_user`) ON DELETE NO ACTION ON UPDATE CASCADE,
ADD CONSTRAINT `histo_ibfk_2` FOREIGN KEY (`id_user2`) REFERENCES `users` (`id_user`) ON DELETE NO ACTION ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
