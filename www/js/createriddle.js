var app = {

    // Application Constructor
    initialize: function () {
        this.bindEvents();
        $('#SelectFriendsButton').click(this.onSelectFriendsClick);
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

    onSelectFriendsClick: function (watchedAcceleration) {


        var riddle = $('#RiddleToSolveInput').val();
        var solution = $('#InputAnswer').val();

        if (!riddle) alert('Error: No riddle.');
        if (!solution) alert('Error: No solution.');
        else {
            var challenge = {
                recipients : [], // Strings array
                data : riddle, // String
                solution : solution, // String
                type : 'riddle' // String
            };
            localStorage.setItem('challengeToBeSend', JSON.stringify(challenge));
            // TODO: Open send challenges view
        }

    }

};

// To be executed
app.initialize();

