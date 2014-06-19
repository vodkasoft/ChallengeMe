/*global facebook*/

var app = {

    // Application Constructor
    initialize: function () {
        this.bindEvents();
        $(this.loadChallenges);
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
        // $.slidebars();
    },

    confirmClose: function (){
        // TODO
    },

    loadChallenges:  function (){
        var backendAccesor = new BackendAccess();
        var challengeQuantity = 20;
        backendAccesor.getReceivedChallenges(
            challengeQuantity,
            function onResponse(error,challenges){
                if (error) {
                    return alert(error.message);
                }
                var container = $('<table></table>');
                for (var i = 0; i < challenges.length; i++) {
                    app.appendFriend(challenges[i], container);

                    //id
                    //sender
                    //state
                    //type
                }
                container.children().appendTo('#SearchResultsTable');
            }
        );
    },

    appendChallenge: function (challenge){

/*
        <div>
          <tr>
            <td style="width:30%;" rowspan="2">
              <img id="FriendPhoto" src="img/jho.jpg" class="UserPhoto">
            </td>
            <td style="padding-left:5%;">
              <span>Jhoel Salas</span>
            </td>
          </tr>
          <tr>
            <td style="padding-left:5%;">
              <span>Shake</span>
            </td>
          </tr>
        </div>



 */
        facebook.getChallengerName(challenge.sender,
            function onResponse (senderName) {
                var root = $('<div></div>');
                root.click(
                    function () {
                        localStorage.setItem('selectedChallenge', challenge.id);
                        window.location = 'solve' + challenge.type + '.html';
                    }
                );

                var challengerData = $('<tr></tr>');

                var challengerPhotoTD = $('<td></td>');
                challengerPhotoTD.addClass('challenger-photo-td');

                var challengerPhoto = $('<img>');
                challengerPhoto.addClass('UserPhoto');
                challengerPhoto.attr('src', '../img/'+ challenge.type + '_icon.png');

                challengerPhotoTD.append(challengerPhoto);
                challengerData.append(challengerPhotoTD);

                var challengerNameTD = $('<td></td>');
                challengerNameTD.addClass('challenger-name-td');

                var challengerName = $('<span></span>');
                challengerName.text(senderName);

                challengerNameTD.append(challengerName);
                challengerData.append(challengerNameTD);

                var challengeData = $('<tr></tr>');

                var challengeTypeTD = $('<td></td>');
                challengeTypeTD.addClass('challenge-type-td');

                var challengeType = $('<span></span>');
                challengeType.text(challenge.type);

                challengeTypeTD.append(challengeType);
                challengeData.append(challengeTypeTD);

                root.append(challengerData);
                root.append(challengeData);
            }
        );
    }


};

// To be executed
app.initialize();
