var app = {

    // Application Constructor
    initialize: function () {
        this.bindEvents();
        $('#ShakeItButton').click(this.onStartChallengeClick);

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

    onChallengeSnapshotCaptured: function (watchedAcceleration) {
        alert('Jhoelito :) :)');
        var challenge = {
            recipients : [], // Strings array
            data : '', // String
            solution : JSON.stringify(watchedAcceleration), // String
            type : 'shake' // String
        };
        localStorage.setItem('challengeToBeSend', JSON.stringify(challenge));
        alert('Challenged saved on LS: ' + JSON.stringify(challenge));
        window.location = 'selectfriends.html';
        // TODO: Open send challenges view
    },

    onStartChallengeClick: function (){
        alert(app.onChallengeSnapshotCaptured);
        shake.startWatchingChallengeSnapshot(app.onChallengeSnapshotCaptured);
    }

};

// To be executed
app.initialize();

