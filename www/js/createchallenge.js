var app = {

    // Application Constructor
    initialize: function () {
        this.bindEvents();
        $('#img-shake').click(this.onNewShakeClick);
        $('#img-riddle').click(this.onNewRiddleClick);
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function () {

    },

    confirmClose: function (){
        // TODO
    },

    onNewRiddleClick: function (){
        window.location.href = 'createriddle.html';
    },

    onNewShakeClick: function (){
        window.location.href = 'createshake.html';
    },

};

// To be executed
app.initialize();

