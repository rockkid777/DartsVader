

module.exports = function(app, io, game){

    var reset = function (){
        return {
            players: [
                {name: "Pl #1", score: 301, rounds: []},
                {name: "Pl #2", score: 301, rounds: []}
                ],
            info: "",
            currentPlayer: 0
        };
    };

    var modifierToString = function(modifier){
        switch(modifier) {
            case "0":
                return "";
            case "1":
                return "";
            case "2":
                return "d";
            case "3":
                return "t";
        }
    };

    var currentScore = 0;
    var currentRound = 0;
    var throwNum = 0;

    app.get('/cam', function (req, res) {

        if (game.players[0].rounds.length == 0 && game.players[1].rounds.length == 0) {
           currentRound = 0;
           throwNum = 0;
        }

        if ( req.query.handsVisible && currentScore > 0){
            game.info = JSON.stringify("Kezeket érzékeltem.");
            game.players[game.currentPlayer].score -= currentScore;
            currentScore = 0;


            if (game.currentPlayer == 1) currentRound++;
            throwNum = 0;
            game.currentPlayer = ( game.currentPlayer == 1 ) ? 0 : 1;
        }

        if ( req.query.num && req.query.modifier ){
            currentScore += req.query.num * req.query.modifier;

            var rounds = game.players[game.currentPlayer].rounds;

            if (throwNum == 0 || rounds == "undefined" || rounds.length == 0) {
                rounds[currentRound] = req.query.num + modifierToString(req.query.modifier);
            } else {
                rounds[currentRound] += " " + req.query.num + modifierToString(req.query.modifier);
            }
            game.info = JSON.stringify(modifierToString(req.query.modifier) + " " + req.query.num );


            throwNum++;
            if (throwNum == 3 || game.players[game.currentPlayer].score - currentScore < 0) {
                if (game.players[game.currentPlayer].score - currentScore < 0) {
                    rounds[currentRound] = "Tul sok";
                } else {
                    game.players[game.currentPlayer].score -= currentScore;
                }
                if (game.currentPlayer == 1) currentRound++;
                throwNum = 0;
                game.currentPlayer = ( game.currentPlayer == 1 ) ? 0 : 1;
                currentScore = 0;
            }
        }

        io.emit('update', game);
        res.status(200).send(game);
    });

    app.get('/Cam/reset', function (req, res) {
        game = reset();
        io.emit('update', game);
        res.status(200).send(game);
    });

    game = reset();

}

