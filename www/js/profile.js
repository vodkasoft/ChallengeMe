(function($) {
    $(document).ready(function() {
      $.slidebars();
  });
}) (jQuery);

try{
    var fbToken = localStorage.getItem('fbToken');
    localStorage.removeItem('fbToken');
    var profilePictureURL = 'https://graph.facebook.com/me/picture?';
    profilePictureURL += 'heigth=200&width=200';
    profilePictureURL += '&access_token=' + fbToken;
    alert(profilePictureURL);
    $('.UserPhoto').attr('src', profilePictureURL);
    $('#UserProfileName').text(localStorage.fbUserName);
    $('#UserNameText').text(localStorage.fbUserName);
} catch (e){
    alert(e.message);
}
