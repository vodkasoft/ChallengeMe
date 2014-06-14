var menu = {


    // Sidebar initializartion
    //
    // Sets up sidebar elements
    initialize: function (){

        var fbToken = localStorage.getItem('fbAccessToken');
        var profilePictureURL = 'https://graph.facebook.com/me/picture?';
        profilePictureURL +=    'heigth=200&width=200';
        profilePictureURL +=    '&access_token=' + fbToken;
        $('.UserPhoto').attr('src', profilePictureURL);
        $('#UserProfileName').text(localStorage.playerName);
        $('#UserNameText').text(localStorage.playerName);
        $('#ReceivedTextDiv').click(this.goToReceived);
        $('#UserIMG').click(this.goToProfile);


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
    }

};

// To be executed
menu.initialize();

