USE musicdb;

DELIMITER $$
DROP PROCEDURE IF EXISTS create_playlist $$
CREATE PROCEDURE create_playlist(IN in_id VARCHAR(50), IN in_uid VARCHAR(50), IN in_sid VARCHAR(50))
BEGIN
	INSERT INTO playlists(playlist_id, userid, songid)
    VALUES(in_id, in_uid, in_sid);
END $$

DROP PROCEDURE IF EXISTS find_all_playlist $$
CREATE PROCEDURE find_all_playlist()
BEGIN
	SELECT * FROM playlists;
END $$

DROP PROCEDURE IF EXISTS find_playlist_by_id $$
CREATE PROCEDURE find_playlist_by_id(IN id VARCHAR(50))
BEGIN
	SELECT * FROM playlists WHERE playlist_id = id;
END $$

DROP PROCEDURE IF EXISTS update_playlist $$
CREATE PROCEDURE update_playlist(IN id VARCHAR(50), IN sid VARCHAR(50), IN uid VARCHAR(50))
BEGIN
	UPDATE playlist
    SET songid = sid, userid = uid
    WHERE songid = id;
END $$

DROP PROCEDURE IF EXISTS delete_playlist $$
CREATE PROCEDURE delete_playlist(IN id VARCHAR(50))
BEGIN
	DELETE FROM playlists WHERE playlist_id = id;
END $$

DROP PROCEDURE IF EXISTS find_playlist_by_title $$
CREATE PROCEDURE find_playlist_by_title(IN in_title VARCHAR(50))
BEGIN
	SELECT * FROM playlists p JOIN songs s
    ON p.songid = s.songid
    WHERE s.title = in_title;
END $$

DROP PROCEDURE IF EXISTS find_user_playlist $$
CREATE PROCEDURE find_user_playlist(IN uid VARCHAR(50))
BEGIN
	SELECT * FROM playlists
    WHERE userid = uid;
END $$

DROP PROCEDURE IF EXISTS find_all_song_in_playlist $$
CREATE PROCEDURE find_all_song_in_playlist(IN pid VARCHAR(50))
BEGIN
	SELECT songid FROM playlists
    WHERE playlist_id = pid;
END $$

DROP PROCEDURE IF EXISTS delete_song_in_playlist $$
CREATE PROCEDURE delete_song_in_playlist(IN sid VARCHAR(50), IN pid VARCHAR(50))
BEGIN 
	DELETE FROM playlists
    WHERE playlist_id = pid AND songid = sid;
END $$

DROP PROCEDURE IF EXISTS add_song_in_playlist $$
CREATE PROCEDURE add_song_in_playlist(IN sid VARCHAR(50), IN pid VARCHAR(50))
BEGIN
	SET uid = (SELECT userid FROM playlists WHERE playlist_id = pid LIMIT 1);
    CALL create_playlist(pid, sid, uid); 
END $$
DELIMITER ;