CREATE DATABASE  IF NOT EXISTS `tinschema` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `tinschema`;
-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tinschema
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bibliotekarz`
--

DROP TABLE IF EXISTS `bibliotekarz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bibliotekarz` (
  `idOsoba` int(11) NOT NULL,
  `staż_pracy` int(11) DEFAULT NULL,
  `koniec_umowy` date NOT NULL,
  PRIMARY KEY (`idOsoba`),
  CONSTRAINT `bibliotekarz_ibfk_1` FOREIGN KEY (`idOsoba`) REFERENCES `użytkownik` (`idosoba`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bibliotekarz`
--

LOCK TABLES `bibliotekarz` WRITE;
/*!40000 ALTER TABLE `bibliotekarz` DISABLE KEYS */;
INSERT INTO `bibliotekarz` VALUES (2,12,'2020-01-21');
/*!40000 ALTER TABLE `bibliotekarz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `egzemplarz`
--

DROP TABLE IF EXISTS `egzemplarz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `egzemplarz` (
  `idEgzemplarz` int(11) NOT NULL,
  `idKsiążka` int(11) NOT NULL,
  `dostępność` tinyint(1) NOT NULL,
  PRIMARY KEY (`idEgzemplarz`,`idKsiążka`),
  KEY `idKsiążka` (`idKsiążka`),
  CONSTRAINT `egzemplarz_ibfk_1` FOREIGN KEY (`idKsiążka`) REFERENCES `książka` (`idksiążka`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `egzemplarz`
--

LOCK TABLES `egzemplarz` WRITE;
/*!40000 ALTER TABLE `egzemplarz` DISABLE KEYS */;
INSERT INTO `egzemplarz` VALUES (1,1,0),(1,2,1),(2,1,1),(3,1,1);
/*!40000 ALTER TABLE `egzemplarz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gatunek`
--

DROP TABLE IF EXISTS `gatunek`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `gatunek` (
  `idGatunek` int(11) NOT NULL,
  `nazwa` varchar(50) NOT NULL,
  `opis` text,
  PRIMARY KEY (`idGatunek`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gatunek`
--

LOCK TABLES `gatunek` WRITE;
/*!40000 ALTER TABLE `gatunek` DISABLE KEYS */;
INSERT INTO `gatunek` VALUES (1,'Kryminał',NULL),(2,'Fantasy',NULL),(3,'Dystopia',NULL),(4,'Romans',NULL),(5,'Dramat',NULL),(6,'Obyczajowy',NULL),(7,'Horror',NULL),(8,'Science Fiction','');
/*!40000 ALTER TABLE `gatunek` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gatunkiksiążki`
--

DROP TABLE IF EXISTS `gatunkiksiążki`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `gatunkiksiążki` (
  `idKsiążka` int(11) NOT NULL,
  `idGatunek` int(11) NOT NULL,
  `istotność` int(11) DEFAULT '1',
  PRIMARY KEY (`idKsiążka`,`idGatunek`),
  KEY `idGatunek` (`idGatunek`),
  CONSTRAINT `gatunkiksiążki_ibfk_1` FOREIGN KEY (`idKsiążka`) REFERENCES `książka` (`idksiążka`),
  CONSTRAINT `gatunkiksiążki_ibfk_2` FOREIGN KEY (`idGatunek`) REFERENCES `gatunek` (`idgatunek`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gatunkiksiążki`
--

LOCK TABLES `gatunkiksiążki` WRITE;
/*!40000 ALTER TABLE `gatunkiksiążki` DISABLE KEYS */;
INSERT INTO `gatunkiksiążki` VALUES (1,2,1),(1,3,1),(2,5,1),(2,6,2),(3,7,1);
/*!40000 ALTER TABLE `gatunkiksiążki` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `książka`
--

DROP TABLE IF EXISTS `książka`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `książka` (
  `idKsiążka` int(11) NOT NULL,
  `autor` varchar(50) NOT NULL,
  `tytuł` varchar(50) NOT NULL,
  `wydanie` smallint(6) DEFAULT '1',
  `miejsce_wydania` varchar(50) NOT NULL,
  `data_wydania` int(11) NOT NULL,
  `ilość_stron` int(11) NOT NULL,
  `strony_nienumerowane` int(11) NOT NULL,
  `Wymiary` float(5,2) DEFAULT NULL,
  `ISBN` bigint(13) DEFAULT NULL,
  `idWydawnictwo` int(11) NOT NULL,
  `zdjecie_adres` varchar(50) DEFAULT NULL,
  `opis` mediumtext,
  PRIMARY KEY (`idKsiążka`),
  KEY `idWydawnictwo` (`idWydawnictwo`),
  CONSTRAINT `książka_ibfk_1` FOREIGN KEY (`idWydawnictwo`) REFERENCES `wydawnictwo` (`idwydawnictwo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `książka`
--

LOCK TABLES `książka` WRITE;
/*!40000 ALTER TABLE `książka` DISABLE KEYS */;
INSERT INTO `książka` VALUES (1,'Samantha Shanon','Czas Żniw',1,'Kraków',2013,520,5,20.50,9788379240821,1,'czas_zniw.jpg',NULL),(2,'Nic Stone','Drogi Martinie',1,'Oświęcim',2018,202,3,20.50,9788378897507,4,'drogi_martinie.jpg','Justyce McAllister jest jednym z najlepszych uczniów w roczniku i planuje studia na renomowanym uniwersytecie – ale dla policjanta, który właśnie zakuł go w kajdanki, nie ma to żadnego znaczenia. Choć Justyce opuścił niebezpieczną dzielnicę, w której się wychował, nie może uciec od szyderstw dawnych kolegów i drwin uczniów z nowej szkoły. Pomocy szuka w naukach Martina Luthera Kinga. Ale czy są wciąż aktualne? Żeby się przekonać, Justyce zaczyna pisać do niego listy. Pewnego dnia wybiera się na przejażdżkę ze swoim najlepszym przyjacielem Mannym. Opuszczają szyby, podkręcają muzykę… na tyle głośno, że wywołują furię u jadącego obok białego gliniarza po służbie.'),(3,'Shirley Jackson','Nawiedzony dom na wzgórzu',1,'Zakrzewo',2018,302,2,20.00,9788376746739,6,'dom_na_wzgorzu.jpg','Do starego, mrocznego i owianego złą sławą domu na wzgórzu przybywają cztery osoby: doktor Montague – znawca okultyzmu, szukający żelaznych dowodów na istnienie zjawisk paranormalnych, jego śliczna asystentka, Eleanor – młoda kobieta posiadająca sporą wiedzę na temat duchów, a także Luke – przyszły spadkobierca rezydencji. Z początku wydaje się, że będą mieć do czynienia jedynie z niewytłumaczalnymi odgłosami i zamykającymi się samoistnie drzwiami. Jednak tak naprawdę mroczny i tajemniczy dom cały czas gromadzi siły, by wybrać spośród śmiałków swoją ofiarę.'),(4,'Michael Jackson ','Tyskie vademecum piwa ',1,'Warszawa',2007,88,6,24.00,9878363960964,7,'tyskie.jpg','Dlaczego w angielskim pubie nawet z najmocniejszą głową nie dotrwasz do północy? W którym z niemieckich miast jest najwięcej browarów? Czy Irlandczyk wypije piwo przez słomkę? Gdzie w Polsce rośnie najlepszy chmiel? I czy na pewno piwo robi się z chmielu? Międzynarodowa kultura piwa jest fascynująca, a Tyskie od lat stanowi jej nieodłączny element.');
/*!40000 ALTER TABLE `książka` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `osoba`
--

DROP TABLE IF EXISTS `osoba`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `osoba` (
  `idOsoba` int(11) NOT NULL,
  `imie` varchar(50) NOT NULL,
  `nazwisko` varchar(50) NOT NULL,
  `wiek` int(11) NOT NULL,
  PRIMARY KEY (`idOsoba`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `osoba`
--

LOCK TABLES `osoba` WRITE;
/*!40000 ALTER TABLE `osoba` DISABLE KEYS */;
INSERT INTO `osoba` VALUES (1,'Wojtek','Janus',22),(2,'Janina','Pawełek',68),(3,'wojtek','janus',22),(4,'Jan','Kowalski',30),(5,'Tom','Odell',29),(6,'Jola','Olczak',20),(7,'Jan','Kowalski',21);
/*!40000 ALTER TABLE `osoba` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recenzja`
--

DROP TABLE IF EXISTS `recenzja`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `recenzja` (
  `idRecenzja` int(11) NOT NULL,
  `autor` varchar(50) NOT NULL,
  `treść` text,
  `ocena` int(11) DEFAULT NULL,
  `idKsiążka` int(11) NOT NULL,
  PRIMARY KEY (`idRecenzja`),
  KEY `idKsiążka` (`idKsiążka`),
  CONSTRAINT `recenzja_ibfk_1` FOREIGN KEY (`idKsiążka`) REFERENCES `książka` (`idksiążka`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recenzja`
--

LOCK TABLES `recenzja` WRITE;
/*!40000 ALTER TABLE `recenzja` DISABLE KEYS */;
/*!40000 ALTER TABLE `recenzja` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testuser`
--

DROP TABLE IF EXISTS `testuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `testuser` (
  `idtestuser` int(11) NOT NULL,
  `imie` varchar(45) DEFAULT NULL,
  `nazwisko` varchar(45) DEFAULT NULL,
  `wiek` int(11) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `hasło` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idtestuser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testuser`
--

LOCK TABLES `testuser` WRITE;
/*!40000 ALTER TABLE `testuser` DISABLE KEYS */;
INSERT INTO `testuser` VALUES (1,'wojtek','janus',22,'wotus','abcd');
/*!40000 ALTER TABLE `testuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `użytkownik`
--

DROP TABLE IF EXISTS `użytkownik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `użytkownik` (
  `idOsoba` int(11) NOT NULL,
  `alias` varchar(50) DEFAULT NULL,
  `hasło` varchar(90) DEFAULT NULL,
  PRIMARY KEY (`idOsoba`),
  CONSTRAINT `użytkownik_ibfk_1` FOREIGN KEY (`idOsoba`) REFERENCES `osoba` (`idosoba`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `użytkownik`
--

LOCK TABLES `użytkownik` WRITE;
/*!40000 ALTER TABLE `użytkownik` DISABLE KEYS */;
INSERT INTO `użytkownik` VALUES (1,'wojtus','abcd'),(2,'lib1','$2b$10$lTsSWQ74q2yHNAJeFRXyvOZp7tLC52CSt3Bh7.4V/b2BJSoRrtxGu'),(3,'wojteczek','$2b$10$ECzzTgweF8yaUVvHN9jsLuq5wZdyv..nQbSF5HIrNkFyk/zMKoZVO'),(4,'janek','$2b$10$TK21qedlaPU/VPq5YH95Cekbf/ZvV5woY7MUIlMRNHP3CGmX0vW3e'),(5,'tomek','$2b$10$26wcZrh48Gp0QFPbRzM0g.H14tznbVbkbDIrdNl1Cro5vlrfXRzBC'),(6,'jolusia','$2b$10$vowPNI1rN.yBvO0exlF5DerC1ibtU5CH6wLmrTs.OYWMiOpSbKD7i'),(7,'jan','$2b$10$SejmU4/lhHXFGOS/sCCIeeJgAXnzKV7AnIrMLWsOXCB13XWDJQY.q');
/*!40000 ALTER TABLE `użytkownik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wydawnictwo`
--

DROP TABLE IF EXISTS `wydawnictwo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `wydawnictwo` (
  `idWydawnictwo` int(11) NOT NULL,
  `nazwa` varchar(50) DEFAULT NULL,
  `lokalizacja` varchar(50) NOT NULL,
  PRIMARY KEY (`idWydawnictwo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wydawnictwo`
--

LOCK TABLES `wydawnictwo` WRITE;
/*!40000 ALTER TABLE `wydawnictwo` DISABLE KEYS */;
INSERT INTO `wydawnictwo` VALUES (1,'Foksal','Warszawa'),(2,'Uroboros','Warszawa'),(3,'SQN','Kraków'),(4,'nieZwykłe','Oświęcim'),(5,'Alegoria','Warszawa'),(6,'Republika','Zakrzewo'),(7,'MUZA','Warszawa');
/*!40000 ALTER TABLE `wydawnictwo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wypożyczenie`
--

DROP TABLE IF EXISTS `wypożyczenie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `wypożyczenie` (
  `idOsoba` int(11) NOT NULL,
  `idWypożyczenie` int(11) NOT NULL,
  `idEgzemplarz` int(11) NOT NULL,
  `idKsiążka` int(11) NOT NULL,
  `data_zwrotu` date NOT NULL,
  PRIMARY KEY (`idOsoba`,`idWypożyczenie`),
  KEY `idEgzemplarz` (`idEgzemplarz`),
  KEY `idKsiążka` (`idKsiążka`),
  CONSTRAINT `wypożyczenie_ibfk_1` FOREIGN KEY (`idOsoba`) REFERENCES `użytkownik` (`idosoba`),
  CONSTRAINT `wypożyczenie_ibfk_2` FOREIGN KEY (`idEgzemplarz`) REFERENCES `egzemplarz` (`idegzemplarz`),
  CONSTRAINT `wypożyczenie_ibfk_3` FOREIGN KEY (`idKsiążka`) REFERENCES `egzemplarz` (`idegzemplarz`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wypożyczenie`
--

LOCK TABLES `wypożyczenie` WRITE;
/*!40000 ALTER TABLE `wypożyczenie` DISABLE KEYS */;
INSERT INTO `wypożyczenie` VALUES (7,1,1,1,'2019-01-23');
/*!40000 ALTER TABLE `wypożyczenie` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`wojtek`@`%`*/ /*!50003 TRIGGER `ustaw_dostępność` BEFORE INSERT ON `wypożyczenie` FOR EACH ROW update egzemplarz set dostępność=0 where idEgzemplarz = new.idEgzemplarz and idKsiążka = new.idKsiążka */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`wojtek`@`%`*/ /*!50003 TRIGGER `ustaw_dostępność_znów` AFTER DELETE ON `wypożyczenie` FOR EACH ROW update egzemplarz set dostępność = 1 where idEgzemplarz = old.idEgzemplarz and idKsiążka = old.idKsiążka */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Dumping events for database 'tinschema'
--

--
-- Dumping routines for database 'tinschema'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-20 15:33:15
