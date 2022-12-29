--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
CREATE TABLE `movies` (
  `movies_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `country` varchar(100) DEFAULT NULL,
  `year` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`movies_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movies`
--

LOCK TABLES `movies` WRITE;
INSERT INTO `movies` VALUES (9,'Mencuri Raden Saleh','Indonesia','2022','2022-11-29 15:06:22',NULL),(10,'Avengers Endgame','America','2019','2022-11-29 15:07:09','2022-11-29 15:10:55'),(11,'kuch kuch hota hai','India','1998','2022-11-29 15:07:41',NULL);
UNLOCK TABLES;

--
-- Table structure for table `movies_rating`
--

DROP TABLE IF EXISTS `movies_rating`;
CREATE TABLE `movies_rating` (
  `movies_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rate` int(11) DEFAULT '0',
  UNIQUE KEY `movies_rating_UN` (`movies_id`,`user_id`),
  KEY `movies_rating_FK_1` (`user_id`),
  CONSTRAINT `movies_rating_FK` FOREIGN KEY (`movies_id`) REFERENCES `movies` (`movies_id`),
  CONSTRAINT `movies_rating_FK_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movies_rating`
--

LOCK TABLES `movies_rating` WRITE;
/*!40000 ALTER TABLE `movies_rating` DISABLE KEYS */;
INSERT INTO `movies_rating` VALUES (9,1,3),(9,2,4),(10,2,2),(10,3,4),(10,4,5),(11,2,3);
/*!40000 ALTER TABLE `movies_rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'userA','123456','user_a@test.com'),(2,'userB','123456','user_b@test.com'),(3,'userC','123456','user_c@test.com'),(4,'userD','123456','user_d@test.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;