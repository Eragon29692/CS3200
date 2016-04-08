USE musicdb;

DELIMITER $$
DROP PROCEDURE IF EXISTS find_user_by_username $$
CREATE PROCEDURE find_user_by_username(IN uname VARCHAR(50))
BEGIN
	SELECT u.userid, u.firstname, u.lastname, u.password, u.email, u.roles, 
		GROUP_CONCAT(l.songid SEPARATOR ', ') AS songs
    FROM users u JOIN library l
    ON u.userid = l.userid
    WHERE username = uname;
END$$

DROP PROCEDURE IF EXISTS find_all_user $$
CREATE PROCEDURE find_all_user()
BEGIN
	SELECT u.userid, u.firstname, u.lastname, u.password, u.email, u.roles, 
		GROUP_CONCAT(l.songid SEPARATOR ', ') AS songs
    FROM users u JOIN library l
    ON u.userid = l.userid
    GROUP BY u.userid;
END$$

DROP PROCEDURE IF EXISTS create_user $$
CREATE PROCEDURE create_user(IN uid VARCHAR(50), fname VARCHAR(50), lname VARCHAR(50), 
								uname VARCHAR(50), pword VARCHAR(50), email VARCHAR(50), 
                                roles VARCHAR(50))
BEGIN
	INSERT INTO users(userid, firstname, lastname, username, password, email, roles)
    VALUES (uid, fname, lname, uname, pword, email, roles);
END$$

DROP PROCEDURE IF EXISTS delete_user_by_id $$
CREATE PROCEDURE delete_user_by_id(IN uid VARCHAR(50))
BEGIN
	DELETE FROM users WHERE userid = uid;
END$$

DROP PROCEDURE IF EXISTS update_user $$
CREATE PROCEDURE update_user(IN uid VARCHAR(50), fname VARCHAR(50), lname VARCHAR(50), 
								uname VARCHAR(50), pword VARCHAR(50), email VARCHAR(50), 
                                roles VARCHAR(50))
BEGIN
	UPDATE users
    SET firstname = fname, lastname = lname, username = uname, password = pword, email = email, roles = roles
    WHERE userid = uid;
END$$

DROP PROCEDURE IF EXISTS find_user_by_userid $$
CREATE PROCEDURE find_user_by_userid(IN uid VARCHAR(50))
BEGIN
	SELECT u.userid, u.firstname, u.lastname, u.password, u.email, u.roles, 
		GROUP_CONCAT(l.songid SEPARATOR ', ') AS songs
    FROM users u JOIN library l
    ON u.userid = l.userid
    WHERE u.userid = uid;
END$$

DROP PROCEDURE IF EXISTS delete_user_song $$
CREATE PROCEDURE delete_user_song(IN uid VARCHAR(50), sid VARCHAR(50))
BEGIN
	DELETE FROM library
    WHERE userid = uid AND songid = sid;
END$$

DROP PROCEDURE IF EXISTS add_user_song $$
CREATE PROCEDURE add_user_song(IN uid VARCHAR(50), sid VARCHAR(50))
BEGIN
	INSERT IGNORE INTO library(userid, songid)
    VALUES (uid, sid);
END$$

DELIMITER ;