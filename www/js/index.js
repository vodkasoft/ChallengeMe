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
        // Constants
        localStorage.setItem('appId','251768321695793');
        this.bindEvents();
        //window.location = 'profile.html';
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
        shake.startWatch(
            function onShake() {
                alert('SHAKE!!!');
                navigator.notification.vibrate(1000);
            }
            );
        alert('App ready :)');
    },

    // Facebook Login
    //
    // Login or auto sign-up using native Facebook integration.
    login: function (){
        facebook.login(
            function onLoginSuccess(){
                facebook.getPlayerData(
                    function onPlayerDataSuccess(){
                        window.location = 'profile.html';
                    }
                    );
            }
            );
    }
};

// Function declaration

// Logo
//
// Fades logo on app initialization.
function FadeLogo(){
    var clogo = document.getElementById('Logo');
    clogo.style.opacity = 50;
}

// To be executed
app.initialize();

function changeLoginImage(pID){
    var _FacebookImage = document.getElementById(pID);
    _FacebookImage.setAttribute("src","img/facebook_login_pressed.png");
}

function resetLoginImage(pID){
    var _FacebookImage = document.getElementById(pID);
    _FacebookImage.setAttribute("src","img/facebook_login.png");
}
