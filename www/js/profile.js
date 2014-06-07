(function($) {
    $(document).ready(function() {
      $.slidebars();
  });
}) (jQuery);


try{
    var fbToken = localStorage.getItem('fbToken');
    var profilePictureURL = 'https://graph.facebook.com/me/picture?';
    profilePictureURL +=    'heigth=200&width=200';
    profilePictureURL +=    '&access_token=' + fbToken;

    $('.UserPhoto').attr('src', profilePictureURL);
    $('#UserProfileName').text(localStorage.fbUserName);
    $('#UserNameText').text(localStorage.fbUserName);
} catch (e){
    alert('profile.js: Error: ' + e.message);
}
