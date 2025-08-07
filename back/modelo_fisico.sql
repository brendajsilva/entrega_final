-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: compras_db
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `compras`
--

DROP TABLE IF EXISTS `compras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compras` (
  `idCompra` int NOT NULL AUTO_INCREMENT,
  `idProduto` int NOT NULL,
  `idUsuario` int NOT NULL,
  `quantidade` int NOT NULL,
  `dataCompra` datetime NOT NULL,
  `precoUnitario` float NOT NULL,
  `descontoAplicado` float NOT NULL,
  `precoFinal` float NOT NULL,
  `formaPagamento` varchar(20) NOT NULL,
  `status` varchar(20) NOT NULL,
  `produtoIdProduto` int DEFAULT NULL,
  `usuarioIdUsuario` int DEFAULT NULL,
  `produtoCompraIdProduto` int DEFAULT NULL,
  `usuarioCompraIdUsuario` int DEFAULT NULL,
  PRIMARY KEY (`idCompra`,`idProduto`,`idUsuario`),
  KEY `idProduto` (`idProduto`),
  KEY `idUsuario` (`idUsuario`),
  KEY `produtoIdProduto` (`produtoIdProduto`),
  KEY `usuarioIdUsuario` (`usuarioIdUsuario`),
  KEY `produtoCompraIdProduto` (`produtoCompraIdProduto`),
  KEY `usuarioCompraIdUsuario` (`usuarioCompraIdUsuario`),
  CONSTRAINT `compras_ibfk_1` FOREIGN KEY (`idProduto`) REFERENCES `produtos` (`idProduto`),
  CONSTRAINT `compras_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`),
  CONSTRAINT `compras_ibfk_3` FOREIGN KEY (`produtoIdProduto`) REFERENCES `produtos` (`idProduto`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `compras_ibfk_4` FOREIGN KEY (`usuarioIdUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `compras_ibfk_5` FOREIGN KEY (`produtoCompraIdProduto`) REFERENCES `produtos` (`idProduto`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `compras_ibfk_6` FOREIGN KEY (`usuarioCompraIdUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compras`
--

LOCK TABLES `compras` WRITE;
/*!40000 ALTER TABLE `compras` DISABLE KEYS */;
/*!40000 ALTER TABLE `compras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos` (
  `idProduto` int NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `description` varchar(30) NOT NULL,
  `category` varchar(30) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `discountPercentage` int NOT NULL,
  `stock` int NOT NULL,
  `brand` varchar(30) NOT NULL,
  `thumbnail` varchar(255) NOT NULL,
  PRIMARY KEY (`idProduto`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES (3,'Luva','Luvas com Pelagem Interna','Vestuário',25.00,5,10,'Luv','https://produto.mercadolivre.com.br/MLB-4076287677-luva-feminina-touch-termica-forrada-inverno-frio-intenso'),(4,'Luva','Luvas com Pelagem Interna','Vestuário',20.00,5,15,'Luv','https://www.fastepis.com.br/inverno/luva-adulto/luva-unissex-acrilico-colorida'),(5,'Luva','Luva para Construção','Vestuário',50.00,9,105,'Luv','https://www.fastepis.com.br/inverno/luva-adulto/luva-unissex-acrilico-colorida');
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `age` int NOT NULL,
  `email` varchar(30) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `address` varchar(30) NOT NULL,
  `city` varchar(30) NOT NULL,
  `state` varchar(30) NOT NULL,
  `birthDate` datetime NOT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (3,'João','Victor',33,'joao@gmail.com','47984065226','rua 650','Porto Belo','SC','1989-09-28 00:00:00'),(4,'PRISCILA','DE SOUZA',35,'prisciladsouza578@gmail.com','47996414038','Rua Francisca Pasarelli, 38','PORTO BELO','SC','1989-09-13 00:00:00'),(5,'João','Victor',17,'victor@gmail.com','47984065226','rua 650','Porto Belo','SC','2008-09-06 00:00:00'),(6,'José','Rocha',18,'rocha@gmail.com','47996414038','Rua 800, 159','Itapema','SC','2007-08-17 00:00:00'),(7,'Jose','Rocha',17,'jose@gmail.com','47996414038','Rua 800, 159','Itapema','SC','2008-06-01 00:00:00');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-07  8:19:27
