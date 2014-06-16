#!/bin/bash

# ----
# Text Colors and Messaging Functions

textReset=$(tput sgr0)
textRed=$(tput setaf 1)
textGreen=$(tput setaf 2)
textYellow=$(tput setaf 3)

message_info () {
  echo "$textGreen[project]$textReset $1"
}
message_warn () {
    echo "$textYellow[project]$textReset $1"
}
message_error () {
    echo "$textRed[project]$textReset $1"
}

# ----
# Make sure necessary directories exist, regardless of options.

if [[ ! -d "plugins" ]] ; then
    message_info "Creating 'plugins' directory..."
    mkdir plugins
fi

if [[ ! -d "platforms" ]] ; then
    message_info "Creating 'platforms' directory..."
    mkdir platforms
fi

# ----
# Build platforms
message_info "Building Android Platform..."
phonegap build android && phonegap build android
message_info "Building iOS Platform..."
phonegap build ios && phonegap build ios

# ----
# Add Plugins

message_info "Adding Device Motion Plugin..."
phonegap plugin add org.apache.cordova.device-motion

message_info "Adding Vibration Plugin..."
phonegap plugin add org.apache.cordova.vibration

message_info "Adding Facebook Connection..."
phonegap local plugin add https://github.com/phonegap-build/FacebookConnect.git


# ----
# Facebook Connection config

# Copy Facebook javascript files to www/js

message_info "Copying javascript files to 'www/js'..."
cp plugins/com.phonegap.plugins.facebookconnect/www/cdv-plugin-fb-connect.js www/connectivity/js
cp plugins/com.phonegap.plugins.facebookconnect/www/facebook-js-sdk.js www/connectivity/js

# NOTE: at plugins/com.phonegap.plugins.facebookconnect/plugin.xml replace
# APP_ID and APP_NAME with the values from your Facebook application.

# Create the necessary directories at Android source

if [[ ! -d "platforms/android/src/org/apache/cordova/facebook" ]] ; then
    message_info "Creating 'org.apache.cordova.facebook' directory..."
    mkdir -p platforms/android/src/org/apache/cordova/facebook
fi

# Copy java files to 'org.apache.cordova.facebook'

message_info "Copying java files to 'org.apache.cordova.facebook'..."
cp plugins/com.phonegap.plugins.facebookconnect/src/android/ConnectPlugin.java platforms/android/src/org/apache/cordova/facebook
cp plugins/com.phonegap.plugins.facebookconnect/src/android/facebook/DialogError.java platforms/android/src/org/apache/cordova/facebook/
cp plugins/com.phonegap.plugins.facebookconnect/src/android/facebook/Facebook.java platforms/android/src/org/apache/cordova/facebook/
cp plugins/com.phonegap.plugins.facebookconnect/src/android/facebook/FacebookError.java platforms/android/src/org/apache/cordova/facebook/
cp plugins/com.phonegap.plugins.facebookconnect/src/android/facebook/Util.java platforms/android/src/org/apache/cordova/facebook/
cp plugins/com.phonegap.plugins.facebookconnect/src/android/facebook/FbDialog.java platforms/android/src/org/apache/cordova/facebook/

message_info "Configuration finished."

