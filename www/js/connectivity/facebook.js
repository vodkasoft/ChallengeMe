if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
if (typeof CDV == 'undefined') alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');



var friendIDs = [];
var fdata;
var fbUser;

var facebook = {

    // Application Constructor
    initialize: function () {
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
        this.bindEvents();
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
        try {
            FB.init({ appId: '251768321695793', nativeInterface: CDV.FB, useCachedDialogs: false });
            alert('Facebook ready!');
        } catch (e) {
            alert(e);
        }
    },

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
                localStorage.setItem('playerName', response.first_name);
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
                        localStorage.setItem('fbAccessToken', access_token);
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
    },

    getPlayerData: function (callback) {
        var accessToken = localStorage.getItem('fbAccessToken');
        //var appId = localStorage.getItem('appId');
        var path = '/me/scores';
        var method = 'get';
        var params = {
                       "access_token" : accessToken
                     };

        FB.api(path, method, params, function (response) {
            if (response.error) {
                alert(JSON.stringify(response.error));
            } else {
                //alert('WORKED :) ' + JSON.stringify(response));
                var data = response.data[0];
                alert('Player name:' + data.user.name +  '\nScore: ' + data.score);
                localStorage.setItem('playerName', data.user.name);
                localStorage.setItem('playerScore', data.score);
                callback();
            }
        });
    },

    updateScore: function (newScore) {
        var accessToken = localStorage.getItem('fbAccessToken');
        var path = '/me/scores';
        var method = 'post';
        var params = {
                       "score" : newScore,
                       "access_token" : accessToken
                     };

        FB.api(path, method, params,
            function (response) {
                if (response.error) {
                    alert(JSON.stringify(response.error));
                } else {
                    if (response){
                        localStorage.setItem('playerScore', newScore);
                        alert('Update successful!');
                    } else {
                        alert('Update couldn\'t be completed.');
                    }
                }
            }
            );
    },

    getScores: function (callback) {
        var accessToken = localStorage.getItem('fbAccessToken');
        var appId = localStorage.getItem('appId');
        var path = '/' + appId + '/scores';
        var method = 'get';
        var params = {
                       "access_token" : accessToken
                     };

        FB.api(path, method, params, function (response) {
            if (response.error) {
                alert(JSON.stringify(response.error));
            } else {
                alert('Scores: ' + JSON.stringify(response));
                if (callback) {
                    callback(response.data);
                }
            }
        });
    },

    getFriends: function (callback) {
        var path = '/me/friends';
        FB.api(path, { fields: 'id' },  function(response) {
            if (response.error) {
                alert(JSON.stringify(response.error));
            } else {
                console.log(JSON.stringify(response));
                if (callback) {
                    callback(response.data);
                }
           }
        });

    }




};

// To be executed
facebook.initialize();
