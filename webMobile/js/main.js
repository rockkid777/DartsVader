var host = "http://localhost:8080/";
var playerNameInputTemplate = '<div id="input-{idx}" class="form-group"><div class="input-group"><div class="input-group-addon">{num}</div><input type="text" class="form-control" placeholder="Név" value="{name}" /></div></div>';

function init() {
    $("#buttonSend").click(onSendButtonClick);
    getMobile();
}

function getMobile() {
   ajaxCall("mobile", "GET", null, 'json', onGetMobileSuccess, onGetMobileError);
}

function onGetMobileSuccess(data) {
    removePlayerInput();
    addPlayerInputs(data);
}

function onGetMobileError() {
    showError("Váratlan hiba történt!");
}

function onPutMobileSuccess(data) {
    showInfo("Minden faja");
}

function onPutMobileError() {
    showError("Váratlan hiba történt!");
}

function onSendButtonClick() {
    hideError();
    hideInfo();
    var data = [];
    var hasErrors = false;
    var inputs = $("#playerNames input");
    for (var i = 0; i < inputs.length; i++) {
        var value = $(inputs[i]).val();
        if (! value.length) {
            hasErrors = true;
            $('#input-' + i.toString()).addClass('has-error');
            showError("Nincs minden mező kitöltve!");
        } else {
            $('#input-' + i.toString()).removeClass('has-error');
        }
        data.push({name: value});
    }
    if (! hasErrors) {
        ajaxCall("mobile", "PUT", JSON.stringify({players: data}), 'text', onPutMobileSuccess, onPutMobileError);
    }
}

function ajaxCall(action, method, data, dataType, successCallback, errorCallback) {
    if (typeof action == "undefined") {
        alert("Action is not defined!");
        return;
    }
    if (typeof method == "undefined") {
        alert("Method is not defined!");
        return;
    }
    if (typeof dataType == "undefined") {
        alert("Datatype is not defined");
    }
    if (typeof successCallback == "undefined") {
        alert("Success callback method not defined!");
        return;
    }
    if (typeof errorCallback == "undefined") {
        alert("Error callback method not defined!");
        return;
    }
    $.ajax({
        type: method,
        url: host + action,
        dataType: dataType,
        data: data,
        success: successCallback,
        error: errorCallback,
        contentType: "application/json",
    });
}

function addPlayerInputs(data) {
    if (data.hasOwnProperty("players") && data.players.length) {
        var htmls = [];
        for (var i = 0; i < data.players.length; i++) {
            htmls.push(playerNameInputTemplate
                .replace("{name}", data.players[i].name)
                .replace("{num}", (i + 1).toString() + ".")
                .replace("{idx}", i.toString()));
        }
        $('#playerNames').html(htmls.join(""));
    }
}

function removePlayerInput() {
    $('#playerNames').children().remove();
}

function hideError() {
    var elem = $(".error-container");
    elem.addClass("hidden");
    elem.html("");
}

function hideInfo() {
    var elem = $(".info-container");
    elem.addClass("hidden");
    elem.html("");
}


function showError(msg) {
    var elem = $(".error-container");
    elem.removeClass("hidden");
    elem.html(msg);
}

function showInfo(msg) {
    var elem = $(".info-container");
    elem.removeClass("hidden");
    elem.html(msg);
}
