

module.exports = function(app, io, Game){

    app.get('/mobile', function (req, res) {
        res.json({players: Game.players});
    });

    app.put('/mobile', function (req, res) {
        if ( req.body.players ){
            Game.players = req.body.players;
        }

        io.emit('update', Game.players);
        res.status(200).send();
    });

}

