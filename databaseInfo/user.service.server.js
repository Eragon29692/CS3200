module.exports = function(app, mySQL) {

    var connection;

    app.post("/api/user", login);
    app.get("/api/user/:character", getTrackedCharacter);
    app.get("/api/user", getAllCharacter);
    app.get("/api/logout", logout);


    function login(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        connection = mySQL.createConnection({
            host     : 'localhost',
            port     : '3306',
            user     : username,
            password : password,
            database : 'starwarsfinal'
        });

        connection.connect(function(err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                res.json(null);
                return;
            }
            res.json("OK");
            console.log('connected as id ' + connection.threadId);
        });
    }

    function getTrackedCharacter(req, res) {
        var character_name = req.params.character;
        connection.query('Call track_character("' + character_name + '")', function(err, rows) {
            if (err) {
                res.json(null);
                return;
            }
            console.log(rows);
            res.json(rows[0]);
        });
    }

    function getAllCharacter(req, res) {
        connection.query('SELECT character_name FROM characters', function(err, rows) {
            if (err) {
                res.json(null);
                return;
            }
            //console.log(rows);
            var result = [];
            for (var i = 0; i < rows.length; i++) {
                result.push(rows[i].character_name);
            }
            //console.log(rows[0]);
            console.log(result);
            res.json(result);
        });
    }

    function logout(req, res) {
        console.log("logout");
        connection.end();
        res.json("logout");
    }
}