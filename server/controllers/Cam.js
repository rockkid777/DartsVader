

module.exports = function(app){

    app.get('/cam', function (req, res) {
        res.json(['Sanyi', 'Béla']);
    });

}

