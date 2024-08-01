-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 01 Ağu 2024, 23:07:32
-- Sunucu sürümü: 10.4.32-MariaDB
-- PHP Sürümü: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `musteri_sadakat`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `admin`
--

INSERT INTO `admin` (`admin_id`, `username`, `password_hash`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'asdasd123', '2024-07-04 08:42:28', '2024-07-04 08:42:28');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `appointments`
--

CREATE TABLE `appointments` (
  `appointment_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `hairdresser_id` int(11) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `appointment_time` varchar(8) NOT NULL,
  `appointment_date` date NOT NULL,
  `service_details` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `available_appointments`
--

CREATE TABLE `available_appointments` (
  `appointment_id` int(11) NOT NULL,
  `hairdresser_id` int(11) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `appointment_date` date DEFAULT NULL,
  `appointment_time` varchar(8) DEFAULT NULL,
  `state` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `available_appointments`
--

INSERT INTO `available_appointments` (`appointment_id`, `hairdresser_id`, `staff_id`, `appointment_date`, `appointment_time`, `state`, `created_at`, `updated_at`) VALUES
(6, 3, 5, '2024-07-23', '00:15', 1, '2024-07-20 20:16:00', '2024-07-20 20:16:00'),
(7, 3, 5, '2024-07-23', '03:15', 1, '2024-07-20 20:16:08', '2024-07-20 20:16:08');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `feedback`
--

CREATE TABLE `feedback` (
  `feedback_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `hairdresser_id` int(11) DEFAULT NULL,
  `rating` decimal(3,2) DEFAULT NULL,
  `comments` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `feedback`
--

INSERT INTO `feedback` (`feedback_id`, `user_id`, `hairdresser_id`, `rating`, `comments`, `created_at`, `updated_at`) VALUES
(4, 15, 2, 5.00, 'Mükemmel bir kuaför, herkese tavsiye ederim.', '2024-07-31 18:10:14', '2024-07-31 18:10:14');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `hairdressers`
--

CREATE TABLE `hairdressers` (
  `hairdresser_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `approved` tinyint(1) NOT NULL DEFAULT 0,
  `filename` text NOT NULL DEFAULT 'defaultimage.png',
  `rating` decimal(3,2) NOT NULL,
  `sub_day` int(11) NOT NULL DEFAULT 0,
  `hidden_price` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `hairdressers`
--

INSERT INTO `hairdressers` (`hairdresser_id`, `name`, `address`, `phone_number`, `email`, `password_hash`, `approved`, `filename`, `rating`, `sub_day`, `hidden_price`, `created_at`, `updated_at`) VALUES
(2, 'SAYGIN KUAFÖR', 'Torbalı Mahallesi 5097 Sokak No : 5', '5538828009', 'semihsaygin3021@outlook.com', '$2b$10$wSytbDAXX0/luWQ12w4g0.8wdTuWGLUOjeCeh3M86aIYe5PX3uidW', 1, '1722375420631-1720518085091-1720439594036-kuafor_salonu_tasarimi_sedat_biga_35.jpg', 5.00, 1, 0, '2024-07-04 11:05:22', '2024-08-01 17:51:37'),
(3, 'ÇARŞI KUAFÖR', 'Çarşı Mahallesi, Çarşı Sokak No: 15/A, 34000 Eyüp/İstanbul', '01112223344', 'testkuafor@hotmail.com', '$2b$10$5q.tASQIuhesMhNzkI2MAOv//vKi28xg9IHR6DOsjKvxG3vI7peGG', 1, 'defaultimage.png', 2.00, 0, 0, '2024-07-20 20:02:43', '2024-07-20 20:09:12');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `hairdresserscode`
--

CREATE TABLE `hairdresserscode` (
  `code_id` int(11) NOT NULL,
  `cpcode` varchar(6) DEFAULT NULL,
  `hairdresser_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `hairdresserscode`
--

INSERT INTO `hairdresserscode` (`code_id`, `cpcode`, `hairdresser_id`) VALUES
(1, 'Rr8c9s', 2);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `loyaltypoints`
--

CREATE TABLE `loyaltypoints` (
  `loyalty_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `hairdresser_id` int(11) DEFAULT NULL,
  `points_earned` decimal(8,2) DEFAULT NULL,
  `points_redeemed` decimal(8,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `loyaltypoints`
--

INSERT INTO `loyaltypoints` (`loyalty_id`, `user_id`, `hairdresser_id`, `points_earned`, `points_redeemed`, `created_at`, `updated_at`) VALUES
(6, 15, 2, 160.00, 0.00, '2024-07-31 18:09:24', '2024-07-31 22:03:36'),
(7, 16, 2, 55.00, 0.00, '2024-07-31 18:22:51', '2024-07-31 18:22:51');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `notification`
--

CREATE TABLE `notification` (
  `notification_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `title` text NOT NULL DEFAULT 'SİSTEM',
  `message` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `notification`
--

INSERT INTO `notification` (`notification_id`, `user_id`, `title`, `message`, `created_at`, `updated_at`) VALUES
(20, 15, 'SİSTEM', 'SAYGIN KUAFÖR adlı kuaförden 550 TL değerinde hizmet aldınız ve kuaför tarafından 55.00 sadakat puanı kazandınız.', '2024-07-31 18:09:24', '2024-07-31 18:09:24'),
(21, 16, 'SİSTEM', 'SAYGIN KUAFÖR adlı kuaförden 550 TL değerinde hizmet aldınız ve kuaför tarafından 55.00 sadakat puanı kazandınız.', '2024-07-31 18:22:51', '2024-07-31 18:22:51'),
(22, 15, 'SİSTEM', 'SAYGIN KUAFÖR adlı kuaförden 500 TL değerinde hizmet aldınız ve kuaför tarafından 50.00 sadakat puanı kazandınız.', '2024-07-31 18:47:07', '2024-07-31 18:47:07'),
(23, 15, 'SİSTEM', 'SAYGIN KUAFÖR adlı kuaförden 550 TL değerinde hizmet aldınız ve kuaför tarafından 55.00 sadakat puanı kazandınız.', '2024-07-31 22:03:36', '2024-07-31 22:03:36'),
(26, 15, 'SAYGIN KUAFÖR', '01.08.2024 Tarihinde Tüm Hizmetlerimizde %5 İndirim!', '2024-08-01 05:28:57', '2024-08-01 05:28:57'),
(27, 16, 'SAYGIN KUAFÖR', '01.08.2024 Tarihinde Tüm Hizmetlerimizde %5 İndirim!', '2024-08-01 05:28:57', '2024-08-01 05:28:57'),
(28, 15, 'SAYGIN KUAFÖR', 'TEST', '2024-07-31 20:01:29', '2024-07-31 20:01:29'),
(29, 16, 'SAYGIN KUAFÖR', 'TEST', '2024-07-31 20:01:29', '2024-07-31 20:01:29'),
(30, 15, 'SAYGIN KUAFÖR', 'TEST SAAT', '2024-07-31 20:01:35', '2024-07-31 20:01:35'),
(31, 16, 'SAYGIN KUAFÖR', 'TEST SAAT', '2024-07-31 20:01:35', '2024-07-31 20:01:35');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `services`
--

CREATE TABLE `services` (
  `service_id` int(11) NOT NULL,
  `hairdresser_id` int(11) DEFAULT NULL,
  `service_name` varchar(100) DEFAULT NULL,
  `service_description` text DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `image` text NOT NULL,
  `point` decimal(8,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `services`
--

INSERT INTO `services` (`service_id`, `hairdresser_id`, `service_name`, `service_description`, `price`, `image`, `point`, `created_at`, `updated_at`) VALUES
(7, 2, 'Saç Boyama', 'Saçınızı istediğiniz renge boyuyoruz', 500, '1722503722724-1721208676166-download.jpg', 50.00, '2024-07-17 09:31:16', '2024-08-01 09:15:22'),
(8, 2, 'Saç Kestirme', 'Saçınızı İstediğiniz Şekilde Kesiyoruz', 400, '1722503723704-1721208747298-images.jpg', 40.00, '2024-07-17 09:32:27', '2024-08-01 09:15:23'),
(9, 2, 'Saç Yıkama', 'Saçınızı Yıkıyoruz', 150, 'Yok', 15.00, '2024-07-17 09:33:03', '2024-07-31 00:53:27');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `staff`
--

CREATE TABLE `staff` (
  `staff_id` int(11) NOT NULL,
  `hairdresser_id` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `surname` varchar(100) DEFAULT NULL,
  `position` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `staff`
--

INSERT INTO `staff` (`staff_id`, `hairdresser_id`, `name`, `surname`, `position`, `created_at`, `updated_at`) VALUES
(5, 3, 'AHMET', 'KAYA', 'SAÇ KESİM UZMANI', '2024-07-20 20:15:33', '2024-07-20 20:15:33'),
(8, 2, 'SEMİH', 'SAYGIN', NULL, '2024-08-01 17:48:25', '2024-08-01 17:48:25'),
(9, 2, 'AYŞEGÜL', 'KARAKUŞ', NULL, '2024-08-01 17:48:35', '2024-08-01 17:48:35');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `staff_service`
--

CREATE TABLE `staff_service` (
  `staff_service_id` int(11) NOT NULL,
  `hairdresser_id` int(11) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `service` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `staff_service`
--

INSERT INTO `staff_service` (`staff_service_id`, `hairdresser_id`, `staff_id`, `service`) VALUES
(6, 2, 8, 'Saç Kestirme'),
(7, 2, 8, 'Saç Yıkama'),
(8, 2, 9, 'Saç Boyama'),
(9, 2, 9, 'Saç Yıkama');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `subscribe_payments`
--

CREATE TABLE `subscribe_payments` (
  `payment_id` int(11) NOT NULL,
  `state` int(11) DEFAULT 0,
  `type` varchar(30) DEFAULT NULL,
  `merchant_oid` varchar(256) NOT NULL,
  `hairdresser_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `subscribe_payments`
--

INSERT INTO `subscribe_payments` (`payment_id`, `state`, `type`, `merchant_oid`, `hairdresser_id`) VALUES
(6, 1, 'Aylık Abonelik', 'IN1722274993135322', 2),
(7, 1, 'Aylık Abonelik', 'IN1722275112193431', 2),
(8, 1, 'Aylık Abonelik', 'IN1722275168985376', 2),
(9, 1, 'Aylık Abonelik', 'IN1722275208503734', 2),
(10, 1, 'Aylık Abonelik', 'IN1722275322321579', 2),
(11, 1, 'Yıllık Abonelik', 'IN1722275568160082', 2),
(12, 0, 'Yıllık Abonelik', 'IN1722276381818022', 2),
(13, 0, 'Yıllık Abonelik', 'IN1722278606415891', 2),
(14, 0, 'Aylık Abonelik', 'IN1722279140287374', 2),
(15, 1, 'Aylık Abonelik', 'IN1722279174641346', 2),
(16, 1, 'Yıllık Abonelik', 'IN1722280928124188', 2),
(17, 0, 'Aylık Abonelik', 'IN1722281113451878', 2),
(18, 0, 'Aylık Abonelik', 'IN1722281372867858', 2),
(19, 0, 'Aylık Abonelik', 'IN1722281392159619', 2),
(20, 0, 'Aylık Abonelik', 'IN1722281418111284', 2),
(21, 0, 'Aylık Abonelik', 'IN1722325742777584', 2),
(22, 0, 'Aylık Abonelik', 'IN1722325828437356', 2),
(23, 0, 'Aylık Abonelik', 'IN1722325842633265', 2),
(24, 1, 'Aylık Abonelik', 'IN1722325975171189', 2),
(25, 0, 'Yıllık Abonelik', 'IN1722326366070848', 2),
(26, 0, 'Yıllık Abonelik', 'IN1722372356536620', 2),
(27, 0, 'Yıllık Abonelik', 'IN1722372364121174', 2),
(28, 0, 'Yıllık Abonelik', 'IN1722372366930497', 2),
(29, 0, 'Yıllık Abonelik', 'IN1722372371397397', 2),
(30, 0, 'Aylık Abonelik', 'IN1722377383809168', 2),
(31, 0, 'Aylık Abonelik', 'IN1722412566345791', 2),
(32, 0, 'Aylık Abonelik', 'IN1722448485022547', 2),
(33, 0, 'Yıllık Abonelik', 'IN1722449918306115', 2),
(34, 0, 'Yıllık Abonelik', 'IN1722451333060881', 2),
(35, 0, 'Yıllık Abonelik', 'IN1722451341844922', 2),
(36, 0, 'Aylık Abonelik', 'IN1722463586067344', 2),
(37, 0, 'Aylık Abonelik', 'IN1722490951289618', 2),
(38, 0, 'Aylık Abonelik', 'IN1722503604184814', 2),
(39, 0, 'Aylık Abonelik', 'IN1722511474000905', 2),
(40, 0, 'Aylık Abonelik', 'IN1722511720419545', 2),
(41, 0, 'Aylık Abonelik', 'IN1722511728131562', 2),
(42, 0, 'Aylık Abonelik', 'IN1722511773250619', 2),
(43, 0, 'Aylık Abonelik', 'IN1722511774491495', 2),
(44, 0, 'Aylık Abonelik', 'IN1722511779237084', 2),
(45, 0, 'Aylık Abonelik', 'IN1722511780384485', 2),
(46, 0, 'Aylık Abonelik', 'IN1722511781518950', 2),
(47, 0, 'Aylık Abonelik', 'IN1722511782535476', 2),
(48, 0, 'Aylık Abonelik', 'IN1722511785791419', 2),
(49, 0, 'Aylık Abonelik', 'IN1722511788314635', 2),
(50, 0, 'Yıllık Abonelik', 'IN1722513054415583', 2),
(51, 0, 'Aylık Abonelik', 'IN1722513323612566', 2),
(52, 0, 'Aylık Abonelik', 'IN1722513550388166', 2);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `surname` varchar(100) DEFAULT NULL,
  `unique_code` varchar(50) DEFAULT NULL,
  `approved` tinyint(1) DEFAULT 0,
  `approved_code` varchar(6) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`user_id`, `email`, `phone_number`, `password_hash`, `name`, `surname`, `unique_code`, `approved`, `approved_code`, `created_at`, `updated_at`) VALUES
(15, 'semihsaygin3021@outlook.com', '5538828009', '$2b$10$IUQowuELMHOz5cjyR770heuMpc8GymgpHxVAgE3gxUlUo8hTNelTa', 'SEMİH', 'SAYĞIN', 'oVtEwRqxv3RFBYTAnC3R', 1, 'dN7yjF', '2024-07-31 18:08:18', '2024-07-31 18:08:28'),
(16, 'alperenkekec461@gmail.com', '5374511289', '$2b$10$gkiGEQhZ4LvZweUOQaGZ6.NAf5XwXftsQh8xBvLZzd8N0jm4TCLxe', 'ALPEREN', 'KEKEÇ', 'BBNOzBvQCF5zSCtvR4PM', 1, 'LZ7hYa', '2024-07-31 18:13:12', '2024-07-31 18:14:18');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `userscode`
--

CREATE TABLE `userscode` (
  `code_id` int(11) NOT NULL,
  `cpcode` varchar(6) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `userscode`
--

INSERT INTO `userscode` (`code_id`, `cpcode`, `user_id`) VALUES
(3, '2tsaIl', 16);

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Tablo için indeksler `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`appointment_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `hairdresser_id` (`hairdresser_id`),
  ADD KEY `staff_id` (`staff_id`);

--
-- Tablo için indeksler `available_appointments`
--
ALTER TABLE `available_appointments`
  ADD PRIMARY KEY (`appointment_id`),
  ADD KEY `hairdresser_id` (`hairdresser_id`),
  ADD KEY `staff_id` (`staff_id`);

--
-- Tablo için indeksler `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feedback_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `hairdresser_id` (`hairdresser_id`);

--
-- Tablo için indeksler `hairdressers`
--
ALTER TABLE `hairdressers`
  ADD PRIMARY KEY (`hairdresser_id`);

--
-- Tablo için indeksler `hairdresserscode`
--
ALTER TABLE `hairdresserscode`
  ADD PRIMARY KEY (`code_id`),
  ADD KEY `hairdresser_id` (`hairdresser_id`);

--
-- Tablo için indeksler `loyaltypoints`
--
ALTER TABLE `loyaltypoints`
  ADD PRIMARY KEY (`loyalty_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `hairdresser_id` (`hairdresser_id`);

--
-- Tablo için indeksler `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Tablo için indeksler `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`service_id`),
  ADD KEY `hairdresser_id` (`hairdresser_id`);

--
-- Tablo için indeksler `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`staff_id`),
  ADD KEY `hairdresser_id` (`hairdresser_id`);

--
-- Tablo için indeksler `staff_service`
--
ALTER TABLE `staff_service`
  ADD PRIMARY KEY (`staff_service_id`),
  ADD KEY `hairdresser_id` (`hairdresser_id`),
  ADD KEY `staff_id` (`staff_id`);

--
-- Tablo için indeksler `subscribe_payments`
--
ALTER TABLE `subscribe_payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `hairdresser_id` (`hairdresser_id`);

--
-- Tablo için indeksler `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Tablo için indeksler `userscode`
--
ALTER TABLE `userscode`
  ADD PRIMARY KEY (`code_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tablo için AUTO_INCREMENT değeri `appointments`
--
ALTER TABLE `appointments`
  MODIFY `appointment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Tablo için AUTO_INCREMENT değeri `available_appointments`
--
ALTER TABLE `available_appointments`
  MODIFY `appointment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=716;

--
-- Tablo için AUTO_INCREMENT değeri `feedback`
--
ALTER TABLE `feedback`
  MODIFY `feedback_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Tablo için AUTO_INCREMENT değeri `hairdressers`
--
ALTER TABLE `hairdressers`
  MODIFY `hairdresser_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Tablo için AUTO_INCREMENT değeri `hairdresserscode`
--
ALTER TABLE `hairdresserscode`
  MODIFY `code_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tablo için AUTO_INCREMENT değeri `loyaltypoints`
--
ALTER TABLE `loyaltypoints`
  MODIFY `loyalty_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Tablo için AUTO_INCREMENT değeri `notification`
--
ALTER TABLE `notification`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Tablo için AUTO_INCREMENT değeri `services`
--
ALTER TABLE `services`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Tablo için AUTO_INCREMENT değeri `staff`
--
ALTER TABLE `staff`
  MODIFY `staff_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Tablo için AUTO_INCREMENT değeri `staff_service`
--
ALTER TABLE `staff_service`
  MODIFY `staff_service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Tablo için AUTO_INCREMENT değeri `subscribe_payments`
--
ALTER TABLE `subscribe_payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Tablo için AUTO_INCREMENT değeri `userscode`
--
ALTER TABLE `userscode`
  MODIFY `code_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`hairdresser_id`) REFERENCES `hairdressers` (`hairdresser_id`),
  ADD CONSTRAINT `appointments_ibfk_3` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`);

--
-- Tablo kısıtlamaları `available_appointments`
--
ALTER TABLE `available_appointments`
  ADD CONSTRAINT `available_appointments_ibfk_1` FOREIGN KEY (`hairdresser_id`) REFERENCES `hairdressers` (`hairdresser_id`),
  ADD CONSTRAINT `available_appointments_ibfk_2` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`);

--
-- Tablo kısıtlamaları `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`hairdresser_id`) REFERENCES `hairdressers` (`hairdresser_id`);

--
-- Tablo kısıtlamaları `hairdresserscode`
--
ALTER TABLE `hairdresserscode`
  ADD CONSTRAINT `hairdresserscode_ibfk_1` FOREIGN KEY (`hairdresser_id`) REFERENCES `hairdressers` (`hairdresser_id`);

--
-- Tablo kısıtlamaları `loyaltypoints`
--
ALTER TABLE `loyaltypoints`
  ADD CONSTRAINT `loyaltypoints_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `loyaltypoints_ibfk_2` FOREIGN KEY (`hairdresser_id`) REFERENCES `hairdressers` (`hairdresser_id`);

--
-- Tablo kısıtlamaları `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Tablo kısıtlamaları `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `services_ibfk_1` FOREIGN KEY (`hairdresser_id`) REFERENCES `hairdressers` (`hairdresser_id`);

--
-- Tablo kısıtlamaları `staff`
--
ALTER TABLE `staff`
  ADD CONSTRAINT `staff_ibfk_1` FOREIGN KEY (`hairdresser_id`) REFERENCES `hairdressers` (`hairdresser_id`);

--
-- Tablo kısıtlamaları `staff_service`
--
ALTER TABLE `staff_service`
  ADD CONSTRAINT `staff_service_ibfk_1` FOREIGN KEY (`hairdresser_id`) REFERENCES `hairdressers` (`hairdresser_id`),
  ADD CONSTRAINT `staff_service_ibfk_2` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`);

--
-- Tablo kısıtlamaları `subscribe_payments`
--
ALTER TABLE `subscribe_payments`
  ADD CONSTRAINT `subscribe_payments_ibfk_1` FOREIGN KEY (`hairdresser_id`) REFERENCES `hairdressers` (`hairdresser_id`);

--
-- Tablo kısıtlamaları `userscode`
--
ALTER TABLE `userscode`
  ADD CONSTRAINT `userscode_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
