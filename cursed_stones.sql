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
(1, 56, 4),
(6, 37, 1),
(6, 41, 1),
(6, 43, 2),
(6, 45, 1),
(6, 46, 1),
(6, 47, 6),
(6, 48, 1),
(6, 49, 1),
(6, 50, 7),
(6, 51, 1),
(6, 52, 1),
(6, 53, 1),
(6, 54, 3),
(6, 55, 1),
(6, 56, 2),
(11, 46, 2),
(11, 47, 4),
(11, 48, 7),
(11, 49, 6),
(11, 52, 6),
(11, 53, 5),
(12, 43, 5),
(12, 47, 5),
(12, 50, 5),
(12, 54, 5),
(12, 55, 5),
(12, 56, 5),
(13, 43, 5),
(13, 47, 5),
(13, 50, 5),
(13, 54, 5),
(13, 55, 5),
(13, 56, 5),
(14, 46, 20),
(14, 48, 5),
(14, 51, 5),
(15, 43, 5),
(15, 44, 5),
(15, 47, 5),
(15, 50, 5),
(15, 54, 5),
(15, 56, 5),
(16, 43, 5),
(16, 47, 5),
(16, 50, 5),
(16, 54, 5),
(16, 55, 5),
(16, 56, 5),
(17, 43, 5),
(17, 47, 5),
(17, 50, 5),
(17, 54, 5),
(17, 55, 5),
(17, 56, 5),
(18, 43, 5),
(18, 47, 5),
(18, 50, 5),
(18, 54, 5),
(18, 55, 5),
(18, 56, 5),
(19, 43, 5),
(19, 47, 5),
(19, 50, 5),
(19, 54, 5),
(19, 55, 5),
(19, 56, 5),
(20, 37, 1),
(20, 41, 1),
(20, 43, 5),
(20, 44, 1),
(20, 45, 1),
(20, 47, 5),
(20, 48, 1),
(20, 50, 5),
(20, 51, 1),
(20, 52, 1),
(20, 53, 1),
(20, 54, 5),
(20, 55, 1),
(20, 56, 1),
(21, 43, 5),
(21, 47, 5),
(21, 50, 5),
(21, 54, 5),
(21, 55, 5),
(21, 56, 5);

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
(1, 1, 'Default'),
(6, 13, 'Hola'),
(11, 29, 'Def et rush'),
(12, 28, 'akil'),
(13, 28, 'zeaeds'),
(14, 28, 'tes'),
(15, 28, 'first'),
(16, 28, 'dsds'),
(17, 28, 'dssqd'),
(18, 28, 'New one please'),
(19, 28, 'Another test'),
(20, 13, 'Test'),
(21, 30, 'New');

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

--
-- Dumping data for table `Sessions`
--

INSERT INTO `Sessions` (`userId`, `expires`, `data`, `sid`) VALUES
('', '2017-05-19 21:42:59', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":{"id_user":28,"username":"test"}}}', '--7bo4MUTGyVYZfd37PsKgzzhTW6X8U6'),
('', '2017-05-20 06:46:40', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":{"id_user":2,"username":"test2"}}}', '-i4ZeFyCuFn9nURs4Z-311KpW2-Bj7Z1'),
('', '2017-05-19 23:16:23', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', '-X-qIoohQVBuR3cD5dKopVJhqpWNBAiL'),
('', '2017-05-19 19:04:20', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', '0Jzw4ixxHTkQKUG2ojM4rg9AfMRnl09b'),
('', '2017-05-19 21:30:20', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', '3FqM-BcdSWQUhgzZ_MEs5mK3Hw11swAL'),
('', '2017-05-19 23:16:23', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', '3Pv79AahJbuMiJFaMoSVsFzdB2g1W6Bh'),
('', '2017-05-19 15:22:44', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":{"id_user":28,"username":"test"}}}', '4lmpW1by_YhxogwwBnJAaXkttS2p8TGt'),
('', '2017-05-19 21:37:14', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":{"id_user":13,"username":"ralmn"}}}', '6QPUDbn_g2jOj_-D6xJvA4VgPs3MxoQ8'),
('', '2017-05-19 12:24:50', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', '7Z17IvVEuuq_0Gov82C9_hMny_0FARsH'),
('', '2017-05-20 00:43:03', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":{"id_user":28,"username":"test"}}}', '8ILYrasoiIMqMK5GB9Mqeb-tIrBCk-Jx'),
('', '2017-05-20 06:48:22', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":{"id_user":28,"username":"test"}}}', '9ZhW0nJ-Y3PywKEULW1LOUMN8FmMMdkx'),
('', '2017-05-19 15:28:48', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":{"id_user":2,"username":"test2"}}}', 'A85C_mlRVtTjanBLMGxM37oMrqbBeG4J'),
('', '2017-05-19 14:39:19', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":{"id_user":2,"username":"test2"}}}', 'aeKsOtad9bwR_NmKi1ukSUxwLsVfH43N'),
('', '2017-05-19 23:16:23', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', 'bi2pYf1DxcX8OpDu640O89Go2cuL3bxn'),
('', '2017-05-19 21:37:18', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', 'crKDQAEkv6mdmcg8FyP7fRsu2NW9eCDA'),
('', '2017-05-20 07:06:03', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":{"id_user":1,"username":"admin"}}}', 'cU9tzGSP_jTeMXgqx8TaKjYxsp2Lf_hs'),
('', '2017-05-19 21:30:20', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', 'dtbnz_u4d3swRpQt21Vd5Hww_CeQzm3d'),
('', '2017-05-19 15:17:47', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', 'egTN1z9WOy6juXcMZPE0TTm_O_uHYlRQ'),
('', '2017-05-19 16:42:52', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', 'FVxAvpzi5MYZVfNybsbDTbMUMA7wuyER'),
('', '2017-05-20 07:03:40', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":{"id_user":13,"username":"ralmn"}}}', 'g3pwaGzS5Gr-GHGPtTmgqG5byHeo85f_'),
('', '2017-05-20 07:05:44', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', 'HjO7xdIyVO8tnO7DdQPN8BoCtyA6r7Pk'),
('', '2017-05-19 15:21:04', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":{"id_user":2,"username":"test2"}}}', 'HJrs4elHXo-FQwEm03gOKlylnfF9tt2M'),
('', '2017-05-20 06:51:23', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', 'hruqZxXnRwDh4s8D5i78G9wtuQmSYywu'),
('', '2017-05-19 17:41:31', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', 'iMRYwqk0ERlMK82WDDfyTA2rQpXeOn_j'),
('', '2017-05-19 23:16:23', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', 'JFYv-CiI4fKqyRxoUiE-xdgPUZEmHTIg'),
('', '2017-05-19 15:17:47', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', 'jrzOs14vhQ9_1YlhTkDv8hvuhxWROsQB'),
('', '2017-05-19 21:30:21', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', 'K0LH0rQWnRbMDvrV6iKL_atlrCvPbGzr'),
('', '2017-05-19 21:38:03', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":{"id_user":17,"username":"Reivax"}}}', 'kEq7AiGeIEr-t3Lz0bdJnbc4FE1TZcxP'),
('', '2017-05-19 20:00:54', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":{"id_user":28,"username":"test"}}}', 'Kl3z2INltS_vfFZ8qBWhAOQTmP6R6Amp'),
('', '2017-05-20 07:08:09', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":{"id_user":13,"username":"ralmn"}}}', 'kTtkhZbG6RLHL7E4GUhdA46eMD5qQVlr'),
('', '2017-05-19 15:17:47', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', 'Ky8umLwxjdLssSMYbO-OvXUQ9KKsAdf0'),
('', '2017-05-19 12:24:51', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', 'L5O_A8-aFOmhIhQRPSSIhnh7PsE-e1IM'),
('', '2017-05-20 06:01:52', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":{"id_user":2,"username":"test2"}}}', 'mSJjxUv6RPXr5GIp1tlw8h4HehZpn4bF'),
('', '2017-05-19 13:22:36', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":{"id_user":2,"username":"test2"}}}', 'N8nji5LE8ZdbXFrA1j--30eRDImo-cAe'),
('', '2017-05-19 21:30:20', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', 'NbsJj5fcAg6t3cmn1no5U2Y5cJTXxYo0'),
('', '2017-05-19 15:17:47', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', 'NdxxbeEHLFs9vGhr2ajGzXy-oe7gK2Ru'),
('', '2017-05-20 07:04:45', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":{"id_user":2,"username":"test2"}}}', 'njkfDhZ5lVNW0RV2o8qG3fj0oMOgR1m4'),
('', '2017-05-19 12:24:50', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', 'NSW3d0xdZ6X3e2PRO5-ZOeo9f532qaWz'),
('', '2017-05-20 06:51:23', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', 'N_dks7HQEZvtUm_hDcSyDVFLZ3utcYT2'),
('', '2017-05-19 21:39:13', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":{"id_user":2,"username":"test2"}}}', 'P6nMOY5tr10ds7Vp0AQeYMZjWaZpviNr'),
('', '2017-05-19 15:17:47', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', 'qpenr955oEgagfontDw9L8llqtBMD5ab'),
('', '2017-05-19 12:26:59', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', 'Rq_S-3OvPrvc0eBJc5ht0ad0Bq_5iRRs'),
('', '2017-05-20 06:51:23', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', 'sQ1L2rRQVVaMnGuz_sYqvyo_UYsZIUwg'),
('', '2017-05-19 12:26:59', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', 'srIsYf2cgTVnDvMydmOcYObMQjQq2xtO'),
('', '2017-05-20 06:51:23', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', 'tCy127EH46YcK-RovlGNOUSMUa7wVYQ6'),
('', '2017-05-19 21:30:20', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', 'UbmXYkSXBhmd7zlYCpsrY4sQuHhoRGVI'),
('', '2017-05-19 17:16:31', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":{"id_user":2,"username":"test2"}}}', 'ujgQMUFUr-oQG2fms1QRjaB1fOa8vu96'),
('', '2017-05-19 13:25:36', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":{"id_user":28,"username":"test"}}}', 'vmpANIim9YIpGl-xoZpke9OkDux4e86L'),
('', '2017-05-20 01:00:52', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":{"id_user":2,"username":"test2"}}}', 'WbIWHjEh0-XXpPyOanS7MSgLOWehdbzl'),
('', '2017-05-20 06:51:23', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', 'wi2KWP755KiBSx3ZEp1QajjzgRZV8M3d'),
('', '2017-05-20 07:05:02', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":{"id_user":11,"username":"kevin"}}}', 'WJdVJedzZzvyAzpRqCaeoCNdf94o58lH'),
('', '2017-05-20 06:02:31', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":{"id_user":13,"username":"ralmn"}}}', 'YwDVGxlVbMsz00qfBpW_dnYkixbAmvJk'),
('', '2017-05-19 12:24:50', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', 'YYEEshUD8ny6J3bdnZAmQuizNp2MS1Jx'),
('', '2017-05-19 12:24:50', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', 'Z1kMXHSNdt-vNI2GUskNcAmJLg3VXJ3r'),
('', '2017-05-19 23:16:24', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', 'z8o-4wrIgyLK4sQhS7hhGzbaVCPfsVpQ'),
('', '2017-05-19 12:27:00', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', 'ZhBxDZKjkrvrU7jW4Aj3O4VZSzAuJzot'),
('', '2017-05-19 12:27:00', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', 'ZjWVTEIBej3xmjFd_aLSZnC3Qg8rtA7r'),
('', '2017-05-19 21:37:31', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', 'zlSjqKc0EdqjhxAaoJYP7Z1NgCKTBv3W'),
('', '2017-05-19 12:26:59', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', 'zYIqCpyOyixfjZPxPwIfigi7NDNFO105'),
('', '2017-05-19 21:53:55', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":{"id_user":28,"username":"test"}}}', '_fe8wKOHvjRTOpuiQ_4Y1xt3_3Jv-Qxs');

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
(4, 'app3', 'LnGhLX3sKIuk7Ij778XbEYW3IP1nlk6dre8VJtP357E=', 0, 'EUW'),
(5, 'akil', 'LnGhLX3sKIuk7Ij778XbEYW3IP1nlk6dre8VJtP357E=', 0, 'EUW'),
(6, 'nagati', 'kLjHt1Mh1nAGlY8cmRGZaUvaBxbljjhl/uD/wPeGMd8=', 0, 'EUW'),
(7, 'hohoho', 'byw6r5+fnBV5knPmzlqfcypeyTh8SWf13iKBYJ8dhRQ=', 0, 'EUW'),
(9, 'Vesuve', 'EU8wPbt4D2DjAxYrQz07xII41qQwirp7X4A88w1G6/A=', 0, 'EUW'),
(10, 'Polika', 'vmp2Tg/b5IkA8Vdva67XQKZVaWOYCkckelMCiwtdk3c=', 0, 'EUW'),
(11, 'kevin', 'w2ONNt/xzbYRi7TtUaox+h2c6/5i+1Q839QO9hL1gzo=', 0, 'EUW'),
(12, 'san37', 'VzvwHaifg/N1AS1WCp0z3TN/esh/mRf/yeEqoH/gPcM=', 0, 'EUW'),
(13, 'ralmn', '18qs/COVYCWrknFaT4Yg4gfiXgozgtUaME7Z2ZsnMs4=', -95, 'EUW'),
(14, 'Beepi', '3rpU8fK+yMFVTIGyd/6fWsC8eK8fwafOxoECik6Q0RI=', 0, 'EUW'),
(15, 'SuperSonic', 'WRHQoXRcgVJKLMU2R862aDcm0ymGKl1Q5WZ4O/zq8Ng=', 0, 'EUW'),
(16, 'atchisson', 'uhNqk5hxKLz0F7Fxo8wczdxzNdL3Srl3r5ZbTPz6VZw=', 0, 'EUW'),
(17, 'Reivax', 'iP7Y4k0TAmbx94KTln+zNj+ydiN7qZvZT88IS6PJg0Q=', 10, 'EUW'),
(18, 'Tchingy', 'oX3HaGLM+tX4Rv0I4tRIHao++ijhIJNw1d4230k8PmQ=', 0, 'EUW'),
(19, 'Aituglo', 'ID7R1mBffsqKyB23bGLdEaPVu6E9EaBpTs8sW0RllbU=', 0, 'EUW'),
(20, 'aa', 'Yp0lVavxdmXO7rHPR16F4R8BfbrSbnwzD1LPrugpIYI=', 0, 'EUW'),
(21, 'bb', '2q9UACXKM6/PoE0omSJ8fETxVFu0YY+4MDkH0v8qgUE=', 0, 'EUW'),
(22, 'Nozalys', 'Iu0D5HhZuIsiWGMO9dPIhwAHVYDB+Rhr7NJ8XzwUp5M=', 0, 'EUW'),
(23, 'Yolo', 'Iu0D5HhZuIsiWGMO9dPIhwAHVYDB+Rhr7NJ8XzwUp5M=', 0, 'EUW'),
(24, 'akilnagati', 'tsn3UVqUce1d2+YGc8RCFvkrl0dUh25nybnBJMIMZtA=', 50, 'EUW'),
(25, 'akilnagati2', 'w2ONNt/xzbYRi7TtUaox+h2c6/5i+1Q839QO9hL1gzo=', 0, 'EUW'),
(26, 'nagatiakil', 'w2ONNt/xzbYRi7TtUaox+h2c6/5i+1Q839QO9hL1gzo=', -45, 'EUW'),
(28, 'test', 'w2ONNt/xzbYRi7TtUaox+h2c6/5i+1Q839QO9hL1gzo=', -115, 'France'),
(29, 'sail741', '/Iehp19txL3YUa8uOusU/q5pYbvqacuGJQL2Z0kK0rc=', 170, 'EUW'),
(30, 'anagati', 'w2ONNt/xzbYRi7TtUaox+h2c6/5i+1Q839QO9hL1gzo=', 20, 'EUW');

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
