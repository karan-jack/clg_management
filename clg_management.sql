-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: college_management
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `academic_record_details`
--

DROP TABLE IF EXISTS `academic_record_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `academic_record_details` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `academic_record_id` bigint NOT NULL,
  `subject_id` bigint NOT NULL,
  `marks_obtained` decimal(5,2) NOT NULL,
  `maximum_marks` decimal(5,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_record_details_record` (`academic_record_id`),
  KEY `fk_record_details_subject` (`subject_id`),
  CONSTRAINT `fk_record_details_record` FOREIGN KEY (`academic_record_id`) REFERENCES `academic_records` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_record_details_subject` FOREIGN KEY (`subject_id`) REFERENCES `academic_subjects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `academic_record_details`
--

LOCK TABLES `academic_record_details` WRITE;
/*!40000 ALTER TABLE `academic_record_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `academic_record_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `academic_records`
--

DROP TABLE IF EXISTS `academic_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `academic_records` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `student_id` bigint NOT NULL,
  `batch_id` bigint NOT NULL,
  `semester` int NOT NULL,
  `total_marks` decimal(10,2) NOT NULL,
  `percentage` decimal(5,2) NOT NULL,
  `cgpa` decimal(4,2) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_academic_records_student` (`student_id`),
  KEY `fk_academic_records_batch` (`batch_id`),
  CONSTRAINT `fk_academic_records_batch` FOREIGN KEY (`batch_id`) REFERENCES `batches` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_academic_records_student` FOREIGN KEY (`student_id`) REFERENCES `student_master` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `academic_records`
--

LOCK TABLES `academic_records` WRITE;
/*!40000 ALTER TABLE `academic_records` DISABLE KEYS */;
/*!40000 ALTER TABLE `academic_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `academic_subjects`
--

DROP TABLE IF EXISTS `academic_subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `academic_subjects` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `subject_code` varchar(20) NOT NULL,
  `subject_name` varchar(100) NOT NULL,
  `department` varchar(100) NOT NULL,
  `semester` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `subject_code` (`subject_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `academic_subjects`
--

LOCK TABLES `academic_subjects` WRITE;
/*!40000 ALTER TABLE `academic_subjects` DISABLE KEYS */;
/*!40000 ALTER TABLE `academic_subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `achievements`
--

DROP TABLE IF EXISTS `achievements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `achievements` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `student_id` bigint NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `achievement_date` date NOT NULL,
  `supporting_file` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_achievement_student` (`student_id`),
  CONSTRAINT `fk_achievement_student` FOREIGN KEY (`student_id`) REFERENCES `student_master` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `achievements`
--

LOCK TABLES `achievements` WRITE;
/*!40000 ALTER TABLE `achievements` DISABLE KEYS */;
/*!40000 ALTER TABLE `achievements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ai_generations`
--

DROP TABLE IF EXISTS `ai_generations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ai_generations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `professor_id` bigint NOT NULL,
  `content_type` enum('Quiz','Assignment','Summary','Question Bank') NOT NULL,
  `prompt` longtext NOT NULL,
  `generated_content` longtext NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_ai_generation_professor` (`professor_id`),
  CONSTRAINT `fk_ai_generation_professor` FOREIGN KEY (`professor_id`) REFERENCES `professor_profiles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ai_generations`
--

LOCK TABLES `ai_generations` WRITE;
/*!40000 ALTER TABLE `ai_generations` DISABLE KEYS */;
/*!40000 ALTER TABLE `ai_generations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `badges`
--

DROP TABLE IF EXISTS `badges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `badges` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `icon_url` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `badges`
--

LOCK TABLES `badges` WRITE;
/*!40000 ALTER TABLE `badges` DISABLE KEYS */;
INSERT INTO `badges` VALUES (1,'HeadGirl','queeen','zz',NULL,NULL);
/*!40000 ALTER TABLE `badges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `batches`
--

DROP TABLE IF EXISTS `batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `batches` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `batch_name` varchar(20) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `batch_name` (`batch_name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `batches`
--

LOCK TABLES `batches` WRITE;
/*!40000 ALTER TABLE `batches` DISABLE KEYS */;
INSERT INTO `batches` VALUES (1,'2022-2026','2026-06-23 13:28:36');
/*!40000 ALTER TABLE `batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certificates`
--

DROP TABLE IF EXISTS `certificates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certificates` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `student_id` bigint NOT NULL,
  `title` varchar(255) NOT NULL,
  `organization` varchar(255) NOT NULL,
  `issue_date` date NOT NULL,
  `certificate_file` varchar(500) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_certificate_student` (`student_id`),
  CONSTRAINT `fk_certificate_student` FOREIGN KEY (`student_id`) REFERENCES `student_master` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificates`
--

LOCK TABLES `certificates` WRITE;
/*!40000 ALTER TABLE `certificates` DISABLE KEYS */;
/*!40000 ALTER TABLE `certificates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chatbot_documents`
--

DROP TABLE IF EXISTS `chatbot_documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chatbot_documents` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `course_id` bigint NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_url` varchar(500) NOT NULL,
  `uploaded_by` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_chatbot_document_course` (`course_id`),
  KEY `fk_chatbot_document_user` (`uploaded_by`),
  CONSTRAINT `fk_chatbot_document_course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_chatbot_document_user` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chatbot_documents`
--

LOCK TABLES `chatbot_documents` WRITE;
/*!40000 ALTER TABLE `chatbot_documents` DISABLE KEYS */;
/*!40000 ALTER TABLE `chatbot_documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coding_challenges`
--

DROP TABLE IF EXISTS `coding_challenges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coding_challenges` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `task_id` bigint DEFAULT NULL,
  `problem_statement` text,
  `difficulty` enum('locked','unlocked','completed') DEFAULT NULL,
  `starter_code` text,
  `expected_output` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coding_challenges`
--

LOCK TABLES `coding_challenges` WRITE;
/*!40000 ALTER TABLE `coding_challenges` DISABLE KEYS */;
/*!40000 ALTER TABLE `coding_challenges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_categories`
--

DROP TABLE IF EXISTS `course_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_categories` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_categories`
--

LOCK TABLES `course_categories` WRITE;
/*!40000 ALTER TABLE `course_categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_professors`
--

DROP TABLE IF EXISTS `course_professors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_professors` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `course_id` bigint NOT NULL,
  `professor_id` bigint NOT NULL,
  `assigned_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_course_professors_course` (`course_id`),
  KEY `fk_course_professors_professor` (`professor_id`),
  CONSTRAINT `fk_course_professors_course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_course_professors_professor` FOREIGN KEY (`professor_id`) REFERENCES `professor_profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_professors`
--

LOCK TABLES `course_professors` WRITE;
/*!40000 ALTER TABLE `course_professors` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_professors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `category_id` bigint DEFAULT NULL,
  `difficulty` varchar(50) DEFAULT NULL,
  `thumbnail_url` varchar(500) DEFAULT NULL,
  `estimated_hours` int DEFAULT NULL,
  `status` enum('locked','unlocked','completed') DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_courses_category` (`category_id`),
  CONSTRAINT `fk_courses_category` FOREIGN KEY (`category_id`) REFERENCES `course_categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enrollments`
--

DROP TABLE IF EXISTS `enrollments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enrollments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `student_id` bigint NOT NULL,
  `course_id` bigint NOT NULL,
  `enrolled_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_enrollment_student` (`student_id`),
  KEY `fk_enrollment_course` (`course_id`),
  CONSTRAINT `fk_enrollment_course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_enrollment_student` FOREIGN KEY (`student_id`) REFERENCES `student_master` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enrollments`
--

LOCK TABLES `enrollments` WRITE;
/*!40000 ALTER TABLE `enrollments` DISABLE KEYS */;
/*!40000 ALTER TABLE `enrollments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `learning_paths`
--

DROP TABLE IF EXISTS `learning_paths`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `learning_paths` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `thumbnail` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `learning_paths`
--

LOCK TABLES `learning_paths` WRITE;
/*!40000 ALTER TABLE `learning_paths` DISABLE KEYS */;
/*!40000 ALTER TABLE `learning_paths` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modules`
--

DROP TABLE IF EXISTS `modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modules` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `course_id` bigint NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `sequence_order` int NOT NULL,
  `xp_reward` int DEFAULT '0',
  `estimated_time` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_modules_course` (`course_id`),
  CONSTRAINT `fk_modules_course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modules`
--

LOCK TABLES `modules` WRITE;
/*!40000 ALTER TABLE `modules` DISABLE KEYS */;
/*!40000 ALTER TABLE `modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `path_courses`
--

DROP TABLE IF EXISTS `path_courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `path_courses` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `path_id` bigint NOT NULL,
  `course_id` bigint NOT NULL,
  `sequence_order` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_path_course_path` (`path_id`),
  KEY `fk_path_course_course` (`course_id`),
  CONSTRAINT `fk_path_course_course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_path_course_path` FOREIGN KEY (`path_id`) REFERENCES `learning_paths` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `path_courses`
--

LOCK TABLES `path_courses` WRITE;
/*!40000 ALTER TABLE `path_courses` DISABLE KEYS */;
/*!40000 ALTER TABLE `path_courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professor_master`
--

DROP TABLE IF EXISTS `professor_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professor_master` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `employee_id` varchar(45) NOT NULL,
  `name` varchar(255) NOT NULL,
  `designation` varchar(100) NOT NULL,
  `department` varchar(100) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `employee_id_UNIQUE` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professor_master`
--

LOCK TABLES `professor_master` WRITE;
/*!40000 ALTER TABLE `professor_master` DISABLE KEYS */;
INSERT INTO `professor_master` VALUES (1,19,'PROF101','Dr. John Doe','Head of Department','CSE','2026-07-04 17:26:26','2026-07-05 08:53:51'),(2,11,'PROF102','Dr. Jane Smith','Assistant Professor','ECE','2026-07-04 17:26:26','2026-07-04 20:53:37');
/*!40000 ALTER TABLE `professor_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professor_profiles`
--

DROP TABLE IF EXISTS `professor_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professor_profiles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `employee_id` varchar(20) NOT NULL,
  `department` varchar(50) NOT NULL,
  `designation` varchar(100) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `employee_id` (`employee_id`),
  KEY `fk_professor_user` (`user_id`),
  CONSTRAINT `fk_professor_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professor_profiles`
--

LOCK TABLES `professor_profiles` WRITE;
/*!40000 ALTER TABLE `professor_profiles` DISABLE KEYS */;
INSERT INTO `professor_profiles` VALUES (1,11,'PROF102','ECE','Assistant Professor','2026-07-04 17:28:37',''),(2,19,'PROF101','CSE','Head of Department','2026-07-05 08:53:51','Dr. John Doe');
/*!40000 ALTER TABLE `professor_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publications`
--

DROP TABLE IF EXISTS `publications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publications` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `student_id` bigint NOT NULL,
  `paper_title` varchar(500) NOT NULL,
  `journal_name` varchar(255) NOT NULL,
  `publication_date` date NOT NULL,
  `doi_link` varchar(500) DEFAULT NULL,
  `pdf_file` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_publication_student` (`student_id`),
  CONSTRAINT `fk_publication_student` FOREIGN KEY (`student_id`) REFERENCES `student_master` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publications`
--

LOCK TABLES `publications` WRITE;
/*!40000 ALTER TABLE `publications` DISABLE KEYS */;
/*!40000 ALTER TABLE `publications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_questions`
--

DROP TABLE IF EXISTS `quiz_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz_questions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quiz_id` bigint NOT NULL,
  `question` text NOT NULL,
  `option_a` text NOT NULL,
  `option_b` text NOT NULL,
  `option_c` text NOT NULL,
  `option_d` text NOT NULL,
  `correct_answer` varchar(1) NOT NULL,
  `difficulty` enum('beginner','moderate') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `quiz_id` (`quiz_id`),
  CONSTRAINT `quiz_questions_ibfk_1` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_questions`
--

LOCK TABLES `quiz_questions` WRITE;
/*!40000 ALTER TABLE `quiz_questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `quiz_questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quizzes`
--

DROP TABLE IF EXISTS `quizzes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quizzes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `task_id` bigint NOT NULL,
  `total_marks` int NOT NULL,
  `pass_percentage` int NOT NULL,
  `time_limit` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `task_id` (`task_id`),
  CONSTRAINT `quizzes_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quizzes`
--

LOCK TABLES `quizzes` WRITE;
/*!40000 ALTER TABLE `quizzes` DISABLE KEYS */;
/*!40000 ALTER TABLE `quizzes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resources`
--

DROP TABLE IF EXISTS `resources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resources` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `module_id` bigint NOT NULL,
  `title` varchar(255) NOT NULL,
  `file_url` varchar(500) NOT NULL,
  `resource_type` enum('PDF','PPT','Video','Document','Link') NOT NULL,
  `uploaded_by` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `module_id` (`module_id`),
  CONSTRAINT `resources_ibfk_1` FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resources`
--

LOCK TABLES `resources` WRITE;
/*!40000 ALTER TABLE `resources` DISABLE KEYS */;
/*!40000 ALTER TABLE `resources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) NOT NULL,
  `rolescol` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin',NULL,NULL,NULL),(2,'professor',NULL,NULL,NULL),(3,'student',NULL,NULL,NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_badges`
--

DROP TABLE IF EXISTS `student_badges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_badges` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `student_id` bigint NOT NULL,
  `badge_id` bigint NOT NULL,
  `earned_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `badge_id` (`badge_id`),
  CONSTRAINT `student_badges_ibfk_1` FOREIGN KEY (`badge_id`) REFERENCES `badges` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_badges`
--

LOCK TABLES `student_badges` WRITE;
/*!40000 ALTER TABLE `student_badges` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_badges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_master`
--

DROP TABLE IF EXISTS `student_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_master` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `college_id` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `department` varchar(50) NOT NULL,
  `semester` int NOT NULL,
  `section` varchar(10) NOT NULL,
  `batch_id` bigint DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `college_id` (`college_id`),
  KEY `fk_student_batch` (`batch_id`),
  CONSTRAINT `fk_student_batch` FOREIGN KEY (`batch_id`) REFERENCES `batches` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_master`
--

LOCK TABLES `student_master` WRITE;
/*!40000 ALTER TABLE `student_master` DISABLE KEYS */;
INSERT INTO `student_master` VALUES (1,'22ECE101','Karan Jack','ECE',7,'A',NULL,'2026-06-23 04:14:55',NULL),(7,'22ECE102','Rahul Sharma','ECE',7,'A',NULL,'2026-07-04 13:35:57','2026-07-04 13:35:57'),(8,'22CSE101','Amit Kumar','CSE',7,'B',NULL,'2026-07-04 13:35:57','2026-07-04 13:35:57'),(9,'22CSE102','Priya Singh','CSE',7,'B',NULL,'2026-07-04 13:35:57','2026-07-04 13:35:57'),(10,'22ME101','Arjun Das','ME',7,'A',NULL,'2026-07-04 13:35:57','2026-07-04 13:35:57');
/*!40000 ALTER TABLE `student_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_profiles`
--

DROP TABLE IF EXISTS `student_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_profiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `student_master_id` bigint NOT NULL,
  `college_id` varchar(20) DEFAULT NULL,
  `department` varchar(50) DEFAULT NULL,
  `semester` int DEFAULT NULL,
  `section` varchar(10) DEFAULT NULL,
  `batch_id` bigint DEFAULT NULL,
  `total_xp` int DEFAULT '0',
  `current_level` int DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `student_master_id` (`student_master_id`),
  KEY `batch_id` (`batch_id`),
  CONSTRAINT `student_profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `student_profiles_ibfk_2` FOREIGN KEY (`student_master_id`) REFERENCES `student_master` (`id`),
  CONSTRAINT `student_profiles_ibfk_3` FOREIGN KEY (`batch_id`) REFERENCES `batches` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_profiles`
--

LOCK TABLES `student_profiles` WRITE;
/*!40000 ALTER TABLE `student_profiles` DISABLE KEYS */;
INSERT INTO `student_profiles` VALUES (1,1,1,'22ECE101','ECE',7,'A',1,300,6,NULL,NULL);
/*!40000 ALTER TABLE `student_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_progress`
--

DROP TABLE IF EXISTS `student_progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_progress` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `student_id` bigint DEFAULT NULL,
  `module_id` bigint DEFAULT NULL,
  `status` enum('locked','unlocked','completed') DEFAULT NULL,
  `completion_percentage` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_progress`
--

LOCK TABLES `student_progress` WRITE;
/*!40000 ALTER TABLE `student_progress` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_progress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submissions`
--

DROP TABLE IF EXISTS `submissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `student_id` bigint NOT NULL,
  `task_id` bigint NOT NULL,
  `score` decimal(5,2) DEFAULT NULL,
  `status` varchar(50) NOT NULL,
  `submitted_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_submissions_student` (`student_id`),
  CONSTRAINT `fk_submissions_student` FOREIGN KEY (`student_id`) REFERENCES `student_master` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submissions`
--

LOCK TABLES `submissions` WRITE;
/*!40000 ALTER TABLE `submissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `submissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `module_id` bigint NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `task_type` enum('Quiz','Assignment','Coding Challenge','Project','Capstone') NOT NULL,
  `xp_reward` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `module_id` (`module_id`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_users_role` (`role_id`),
  CONSTRAINT `fk_users_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'karan@gmail.com','$2b$10$CXze7wkpRE.UTI0tzl//1.3cS6QHLfz5hWCGiI3iCHiSSF7RAt2UO',3,1,'2026-06-23 07:24:41','2026-06-23 07:24:41'),(2,'karanjack@gmail.com','$2b$10$hzeD6Bslpm040.hIIiunKO7LQ9qhDsktU.TMLVZBE3GDi7rcrGfH.',3,1,'2026-06-23 07:45:20','2026-06-23 07:45:20'),(3,'karanjak@gmail.com','$2b$10$ClEaZCiNtGEXmt7I6ZcjkeuGdyVF46DqUWGcfANQa.qd3yUNSkOBe',3,1,'2026-06-23 08:02:02','2026-06-23 08:02:02'),(4,'karanjackk@gmail.com','$2b$10$4i7GNSrc0YRwflQWalMeveF0JrwlnT7IzlHYNOQfveAhWmkuN6C4K',3,1,'2026-06-25 15:03:25','2026-06-25 15:03:25'),(5,'admin@college.com','$2b$10$z/Z8vo7nvVRyLoT7DUjTtuRmWb.6Gh4yxOhPTDcrQLNZN30y4Dl4m',1,1,'2026-07-04 13:26:38','2026-07-04 13:26:38'),(10,'prof1@college.com','$2b$10$mQ.K0KOfnW/nxERl5oaWs.W1Js2e7NqfW5gBoDgZ7jqyyCI6RKiCq',2,1,'2026-07-04 17:26:43','2026-07-04 17:26:43'),(11,'prof2@college.com','$2b$10$hSHTvoVgykMZId6mHYn9vOIRMw3rWjcm6o0kRrYvmhGRMaxdqxZ8e',2,1,'2026-07-04 17:28:37','2026-07-04 17:28:37'),(14,'student@college.com','$2b$10$Qr.QX3ZTJ5dpluflMEerbuDu29vqEb.qs4ORz2JzJE3D7inItquhy',3,1,'2026-07-05 07:58:33','2026-07-05 07:58:33'),(15,'professor@college.com','$2b$10$c9e/oB5cbwLrzxud.49gZOCClH19rTpRq3KB7XO2a2Zwt72Mekevq',2,1,'2026-07-05 07:58:33','2026-07-05 07:58:33'),(16,'student2@college.com','$2b$10$bEM5zU9u291P1jp5M2q0iOhfq77189EVAaWVtdJjvglFdLxzCcYYC',3,1,'2026-07-05 08:52:00','2026-07-05 08:52:00'),(17,'professor2@college.com','$2b$10$jy7iVHPdEZ5SYelZdkrpp.FrD.GJC7KeVzzs5fW4dqUQIv5/2ohKq',2,1,'2026-07-05 08:52:00','2026-07-05 08:52:00'),(18,'student3@college.com','$2b$10$75/1o4EmPyfGFL/U.t7NoelFH6k0POqsEFxXzGYkiLaZ3pa/yUjrm',3,1,'2026-07-05 08:53:51','2026-07-05 08:53:51'),(19,'professor3@college.com','$2b$10$eZzOnLJz11KNRMJ210XMuefQ53mlBgi58KEADh5PkOnm3JETLZgaK',2,1,'2026-07-05 08:53:51','2026-07-05 08:53:51'),(20,'student4@college.com','$2b$10$CarY9y85O/jXHWeEBmvY7uK3pmgPZ1oAeQrNEydSP6AAXW0K1OExq',3,1,'2026-07-05 08:54:38','2026-07-05 08:54:38'),(21,'student5@college.com','$2b$10$EXiIwxncPhblmqzULVnN8ubVuty9r423gLl1oWQtM0gtJBMlOETy.',3,1,'2026-07-05 08:56:17','2026-07-05 08:56:17'),(22,'professor5@college.com','$2b$10$yjVjW8MqkVyVcjZmL/0TSOTkzAJ1.2uBt2sUtQZv7LT5lu5GedV8.',2,1,'2026-07-05 08:56:17','2026-07-05 08:56:17');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `xp_logs`
--

DROP TABLE IF EXISTS `xp_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `xp_logs` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `student_id` bigint NOT NULL,
  `xp_points` int NOT NULL,
  `source` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_xp_logs_student` (`student_id`),
  CONSTRAINT `fk_xp_logs_student` FOREIGN KEY (`student_id`) REFERENCES `student_master` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xp_logs`
--

LOCK TABLES `xp_logs` WRITE;
/*!40000 ALTER TABLE `xp_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `xp_logs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-05 15:55:56
