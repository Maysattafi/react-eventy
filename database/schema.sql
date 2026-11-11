CREATE DATABASE IF NOT EXISTS eventy CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE eventy;

CREATE TABLE users (
  id_users INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'user'
);

CREATE TABLE events (
  id_event INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  date_event DATE NOT NULL,
  n_sale VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  category VARCHAR(100) DEFAULT NULL
);

CREATE TABLE event_registration (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  event_id INT NOT NULL,
  registration_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  motivation TEXT DEFAULT NULL,
  UNIQUE KEY unique_registration (user_id, event_id)
);

CREATE TABLE event_comments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  event_id INT NOT NULL,
  user_id INT NOT NULL,
  comment TEXT NOT NULL,
  rating INT DEFAULT NULL CHECK (rating BETWEEN 1 AND 5),
  comment_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events (id_event),
  FOREIGN KEY (user_id) REFERENCES users (id_users)
);