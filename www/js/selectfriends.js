/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

 var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
        this.loadFriends();
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

    // Facebook Login
    //
    // Login or auto sign-up using native Facebook integration.
    loadFriends: function (){
        var container = $('#FriendsToSelectTable');
        facebook.getFriends(
            function onSuccess(friends) {

                var container = $('#FriendsToSelectTable');

                for (var i = 0; i < friends.length; i++) {

/*
        <tr>
          <td style="width:30%;">
            <img id="FriendPhoto" src="img/jho.jpg" class="UserPhoto">
          </td>
          <td style="padding-left:5%;">
            <span>Jhoel Salas</span>
          </td>
          <td>
            <input type="checkbox"></td>
          </td>
        </tr>

*/

                    var object = {
                        name: friends[i].get('name'),
                    };

                    localStorage.setItem(friends[i].id, JSON.stringify(object));

                    var root = $('<tr></tr>');
                    root.click(app.onFigureDivClick(figures[i].id));

                    // Friend picture
                    var friendPhotoCol = $('<td></td>');
                    friendPhotoCol.addClass('friend-photo-td');

                    var profilePictureURL = 'https://graph.facebook.com/';
                    profilePictureURL +=    friends[i].id + '/picture?';
                    profilePictureURL +=    'heigth=200&width=200';

                    var friendIMG = $('<img>');
                    friendIMG.addClass('UserPhoto');
                    friendIMG.addAttr('id', 'FriendPhoto');
                    friendIMG.addAttr('src', profilePictureURL);

                    friendPhotoCol.append(friendIMG);

                    // Friend name
                    var friendNameCol = $('<td></td>');
                    friendName.addClass('friend-name-td');

                    var friendName = $('<span></span>');
                    friendName.text(friends[i].name);

                    friendNameCol.append(friendName);

                    root.append(friendPhotoCol);
                    root.append(friendNameCol);

                    container.append(root);

                }

            }
        );

    },

    getSelectedFriends: function (pMother){
        var selectedFriends = pMother.getElementsByTagName("input");
        var friendIds = [];
        for(var i = 0; i < checkboxes.length; i++){
            if(checkboxes[i].checked){
                friendIds.push(checkboxes[i].value);
            }
        }
        return friendIds;
    },

    sendChallenge: function () {
        var challenge = JSON.parse(localStorage.challengeToBeSent);
        challenge.recipients = this.getSelectedFriends();
        alert(JSON.stringify(challenge));
        var backendAccesor = new BackendAccess();
        backendAccesor.createChallenge(challenge,
            function onResponse(error, challengeIds){
                if (error) {
                    return alert(error.message);
                }
            }
        );
    }

};

// To be executed
app.initialize();

