var app = {

    // Application Constructor
    initialize: function () {
        this.bindEvents();
        this.drawReceivedChart();
        this.drawSentChart();
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
        if(confirm("Are you sure you want to quit?")){
            window.location.replace("received.html");
        }
    },

    drawReceivedChart:  function (){
        var doughnutData = [
        {
            value: 14,
            color:"#92d050"
        },
        {
            value : 4,
            color : "#ed2024"
        },
        {
            value : 2,
            color : "#2e75b6"
        }];
        var myDoughnut = new Chart(document.getElementById("ReceivedCanvas").getContext("2d")).Doughnut(doughnutData);
    },

    drawSentChart: function (){
        var doughnutData = [
        {
            value: 5,
            color:"#92d050"
        },
        {
            value : 1,
            color : "#ed2024"
        },
        {
            value : 2,
            color : "#2e75b6"
        }];
        var myDoughnut = new Chart(document.getElementById("SentCanvas").getContext("2d")).Doughnut(doughnutData);
    }

};

// To be executed
app.initialize();

// Testing
//facebook.updateScore(100);
facebook.getFriends();
//facebook.getScores();
