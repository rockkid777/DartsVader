// var DartsVader = function(parentNode, io, host, port){
//     var host = host || 'http://localhost/socket';
//     var port = port || '80';
//
//     var escape = function(unsafe) {
//         return unsafe
//             .replace(/&/g, "&amp;")
//             .replace(/</g, "&lt;")
//             .replace(/>/g, "&gt;")
//             .replace(/"/g, "&quot;")
//             .replace(/'/g, "&#039;");
//     }
//
//     //TODO: do initializer for getting references for constant DOM nodes.
//     var drawPlayer = function(playerNumber, data) {
//         var playerNode = parentNode
//             .getElementsByClassName('p' + playerNumber)[0];
//         playerNode.getElementsByClassName('name')[0].innerHTML =
//             escape(data.name);
//         playerNode.getElementsByClassName('score')[0].innerHTML =
//             escape(data.score || '');
//         var roundsNode = playerNode.getElementsByClassName('rounds')[0];
//         roundsNode.innerHTML = '';
//         data.rounds.forEach(function(elem) {
//             var node = document.createElement('div');
//             node.classList = ['round'];
//             node.innerHTML = escape(elem);
//             roundsNode.appendChild(node);
//         });
//     };
//
//     var handleMessage = function(msg) {
//         msg.players.forEach(function(elem, ind) {
//             drawPlayer(ind + 1, elem);
//         });
//
//         var infoNode = parentNode.getElementsByClassName('info')[0];
//         infoNode.innerHTML = escape(msg.info || '');
//     };
//
//     var run = function() {
//         var socket = new io.connect(host + ":" + port);
//         socket.on('connect', function() {console.log('connected.');});
//         socket.on('update', handleMessage);
//     };
//
//     return {
//         run: run
//     };
// }


$( function() {

    var handleMessage = function(msg) {
        msg.players.forEach(function(elem, ind) {
            // console.log($('.p' + ind).find(''));
            $('.p' + ind).find('.name').html(elem.name);
            $('.p' + ind).find('.score').html(elem.score);

            $('.list-group').html('');

            elem.rounds.forEach(function(e, i){
                $('.p' + ind).find('.list-group')
                    .prepend('<li class="list-group-item text-center" style="word-spacing: 30px;"><h2 class="rounds">'+e+'</h2></li>');
            });
        });
        $('.info').html(msg.info);
    };

    var host = host || 'http://localhost';
    var port = port || '8080';
    var socket = new io.connect(host + ":" + port);
        socket.on('connect', function() {console.log('connected.');});
        socket.on('update', handleMessage);

} );