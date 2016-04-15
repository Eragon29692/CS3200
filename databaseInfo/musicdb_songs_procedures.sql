USE musicdb;

DELIMITER $$
DROP PROCEDURE IF EXISTS delete_song_by_id $$
CREATE PROCEDURE delete_song_by_id(IN sid VARCHAR(50))
BEGIN
	DELETE FROM songs
    WHERE songid = sid;
END$$

DROP PROCEDURE IF EXISTS find_all_song $$
CREATE PROCEDURE find_all_song()
BEGIN
	SELECT * FROM songs;
END$$

DROP PROCEDURE IF EXISTS find_song_by_id $$
CREATE PROCEDURE find_song_id(IN id VARCHAR(50))
BEGIN
	SELECT * FROM songs WHERE songid = id;
END $$

DROP PROCEDURE IF EXISTS create_song $$
CREATE PROCEDURE create_song(IN in_id VARCHAR(50), IN in_title VARCHAR(50),
							 IN in_artist VARCHAR(50), IN in_album VARCHAR(50), 
							 IN in_year VARCHAR(50))
BEGIN
	INSERT INTO songs(songid, title, artist, album, year)
    VALUES (in_id, in_title, in_artist, in_album, in_year);
END$$

DROP PROCEDURE IF EXISTS update_song_by_id $$
CREATE PROCEDURE update_song_by_id(IN in_id VARCHAR(50), IN in_title VARCHAR(50),
									 IN in_artist VARCHAR(50), IN in_album VARCHAR(50), 
									 IN in_year VARCHAR(50))
BEGIN
	UPDATE songs
    SET title = in_title, artist = in_artist, album = in_album, year = in_year
    WHERE songid = in_id;
END$$
DELIMITER ;