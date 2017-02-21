CREATE TABLE if NOT EXISTS movies (
	movie_id INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(50),
	director VARCHAR(50),
	year INT
) DEFAULT CHARACTER SET = utf8;

CREATE TABLE if NOT EXISTS reviews (
	movie_id INT,
	review VARCHAR(255),
	FOREIGN KEY(movie_id) REFERENCES movies(movie_id)
) DEFAULT CHARACTER SET = utf8;

INSERT INTO movies VALUES (null, "스타워즈", "조지 루카스", 1977);
INSERT INTO movies VALUES (null, "아바타", "제임스 카메론", 2009);
INSERT INTO movies VALUES (null, "인터스텔라", "크리스토퍼 놀란", 2014);