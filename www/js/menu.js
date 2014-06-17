var menu = {


    // Sidebar initializartion
    //
    // Sets up sidebar elements
    initialize: function (){
        var playerName = localStorage.playerName.split(' ')[0];
        var fbToken = localStorage.getItem('fbAccessToken');
        var profilePictureURL = 'https://graph.facebook.com/me/picture?';
        profilePictureURL +=    'heigth=200&width=200';
        profilePictureURL +=    '&access_token=' + fbToken;
        $('.UserPhoto').attr('src', profilePictureURL);
        $('#UserProfileName').text(playerName);
        $('#UserNameText').text(playerName);
        $('#ReceivedTextDiv').click(this.goToReceived);
        $('#UserIMG').click(this.goToProfile);
        $('#CreateButton').click(this.goToCreateChallenge);


        $(document).ready(function() {
          $.slidebars({
            hideControlClasses: true // true or false
          });
        });
    },

    // Go to received
    //
    // Sets window location for received view.
    goToReceived: function (){
        window.location.href = "received.html";
    },

    // Go to profile
    //
    // Sets window location for profile view.
    goToProfile: function (){
        window.location.href = "profile.html";
    },

    // Go to new challenge
    //
    // Sets window location for creating a new challenge.
    goToCreateChallenge: function (){
        window.location.href = 'createchallenge.html';
    }

};

// To be executed
menu.initialize();

