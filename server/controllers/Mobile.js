

module.exports = function(app, io, game){

    app.get('/mobile', function (req, res) {
        res.json({players: game.players.map(function(elem) {
            return {name: elem.name};
        })});
    });

    app.put('/mobile', function (req, res) {
        if ( req.body.players ){
            req.body.players.forEach(function(elem, ind) {
                game.players[ind].name = elem.name;
            });
        }

        io.emit('update', game);
        res.status(200).send();
    });

}
