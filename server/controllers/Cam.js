

module.exports = function(app, io, game){

    app.get('/cam', function (req, res) {
        game.info = JSON.stringify(req.query);

        io.emit('update', game);
        res.status(200).send();
    });

}

