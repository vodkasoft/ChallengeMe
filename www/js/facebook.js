if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
if (typeof CDV == 'undefined') alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');

FB.Event.subscribe('auth.login', function(response) {
  //alert('auth.login event');
});

FB.Event.subscribe('auth.logout', function(response) {
  //alert('auth.logout event');
});

FB.Event.subscribe('auth.sessionChange', function(response) {
  //alert('auth.sessionChange event');
});

FB.Event.subscribe('auth.statusChange', function(response) {
  //alert('auth.statusChange event');
});

/*function getSession() {
alert("session: " + JSON.stringify(FB.getSession()));
}
*/

var friendIDs = [];
var fdata;
var fbUser;
var facebook = {

  getLoginStatus: function() {
    FB.getLoginStatus(function(response) {
      if (response.status == 'connected') {
        alert('logged in');
      } else {
        alert('not logged in');
      }
    });
  },


  me: function(callback) {
    FB.api('/me',  function(response) {
      if (response.error) {
        alert(JSON.stringify(response.error));
      } else {
        alert('My name is:' + response.name);
        localStorage.setItem('fbUserName', response.first_name);
      }
      callback();

    });
  },

  logout: function() {
    FB.logout(function(response) {
      alert('logged out');
    });
  },

  login: function(callback) {
    FB.login(
      function(response) {
        if (response.authResponse) {

          var access_token = FB.getAuthResponse().accessToken;
          alert('Access Token = '+ access_token);

          try{
            localStorage.setItem('fbToken', access_token);
          } catch (e) {
            alert(e.message);
          }

          callback();
        } else {
          alert('not logged in');
        }
      },
      { scope: "email,public_profile,publish_actions" }
      );
  },


  facebookWallPost: function() {
    console.log('Debug 1');
    var params = {
      method: 'feed',
      name: 'Facebook Dialogs',
      link: 'https://developers.facebook.com/docs/reference/dialogs/',
      picture: 'http://fbrell.com/f8.jpg',
      caption: 'Reference Documentation',
      description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
    };
    console.log(params);
    FB.ui(params, function(obj) { console.log(obj);});
  },

  publishStoryFriend: function() {
    randNum = Math.floor ( Math.random() * friendIDs.length );

    var friendID = friendIDs[randNum];
    if (friendID === undefined){
      alert('please click the me button to get a list of friends first');
    }else{
      console.log("friend id: " + friendID );
      console.log('Opening a dialog for friendID: ', friendID);
      var params = {
        method: 'feed',
        to: friendID.toString(),
        name: 'Facebook Dialogs',
        link: 'https://developers.facebook.com/docs/reference/dialogs/',
        picture: 'http://fbrell.com/f8.jpg',
        caption: 'Reference Documentation',
        description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
      };
      FB.ui(params, function(obj) { console.log(obj);});
    }
  }

};
