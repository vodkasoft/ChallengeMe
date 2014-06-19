var BASE_URL = 'http://challengeme.vodkasoft.com';

function BackendAccess() {
  this.backendToken = localStorage.getItem('backendToken');
}

BackendAccess.prototype.login = function (accessToken, credentials, callback) {
  var backendAccess = this;
  var authenticationHeader = credentials.clientId + ':' + credentials.clientSecret;
  $.ajax({
    type: 'POST',
    url: BASE_URL + '/login/access_token',
    contentType: 'application/json',
    data: JSON.stringify({token: accessToken}),
    dataType: 'json',
    headers: {
      Authorization: 'Basic ' + authenticationHeader
    }
  }).done(function (response) {
    if (response.error) {
      return callback(new Error(response.error.message));
    }
    backendAccess.backendToken = response.token;
    localStorage.setItem('backendToken', response.token);
    return callback(null, response.token);
  });
};

// [id], callback
BackendAccess.prototype.getProfile = function () {
  if (!this.backendToken) {
    return callback(new Error('Not logged in'));
  }
  if (arguments.length === 0) {
    return callback(new Error('No callback function provided'));
  }
  var id, callback;
  if (arguments.length > 1) {
    id = arguments[0];
    callback = arguments[1];
  } else {
    id = 'me';
    callback = arguments[0];
  }
  $.ajax({
    type: 'GET',
    url: BASE_URL + '/users/' + id + '/profile',
    dataType: 'json',
    headers: {
      Authorization: 'Bearer ' + this.backendToken
    }
  }).done(function (response) {
    if (response.error) {
      return callback(new Error(response.error.message));
    }
    return callback(null, response.user);
  });
};

// [limit], callback
BackendAccess.prototype.getReceivedChallenges = function () {
  if (!this.backendToken) {
    return callback(new Error('Not logged in'));
  }
  if (arguments.length === 0) {
    return callback(new Error('No callback function provided'));
  }
  var queryData, callback;
  if (arguments.length > 1) {
    queryData = {limit: arguments[0]};
    callback = arguments[1];
  } else {
    queryData = {};
    callback = arguments[0];
  }
  $.ajax({
    type: 'GET',
    url: BASE_URL + '/users/me/challenges/received',
    data: queryData,
    dataType: 'json',
    headers: {
      Authorization: 'Bearer ' + this.backendToken
    }
  }).done(function (response) {
    if (response.error) {
      return callback(new Error(response.error.message));
    }
    return callback(null, response.challenges);
  });
};

// [limit], callback
BackendAccess.prototype.getSentChallenges = function () {
  if (!this.backendToken) {
    return callback(new Error('Not logged in'));
  }
  if (arguments.length === 0) {
    return callback(new Error('No callback function provided'));
  }
  var queryData, callback;
  if (arguments.length > 1) {
    queryData = {limit: arguments[0]};
    callback = arguments[1];
  } else {
    queryData = {};
    callback = arguments[0];
  }
  $.ajax({
    type: 'GET',
    url: BASE_URL + '/users/me/challenges/sent',
    data: queryData,
    dataType: 'json',
    headers: {
      Authorization: 'Bearer ' + this.backendToken
    }
  }).done(function (response) {
    if (response.error) {
      return callback(new Error(response.error.message));
    }
    return callback(null, response.challenges);
  });
};

BackendAccess.prototype.createChallenge = function (challengeData, callback) {
  if (!this.backendToken) {
    return callback(new Error('Not logged in'));
  }
  $.ajax({
    type: 'POST',
    url: BASE_URL + '/challenges',
    contentType: 'application/json',
    data: JSON.stringify({challenge: challengeData}),
    dataType: 'json',
    headers: {
      Authorization: 'Bearer ' + this.backendToken
    }
  }).done(function (response) {
    if (response.error) {
      return callback(new Error(response.error.message));
    }
    return callback(null, response.challenges);
  });
};

BackendAccess.prototype.getChallenge = function (id, callback) {
  if (!this.backendToken) {
    return callback(new Error('Not logged in'));
  }
  $.ajax({
    type: 'GET',
    url: BASE_URL + '/challenges/' + id,
    dataType: 'json',
    headers: {
      Authorization: 'Bearer ' + this.backendToken
    }
  }).done(function (response) {
    if (response.error) {
      return callback(new Error(response.error.message));
    }
    return callback(null, response.challenges);
  });
};

function markChallenge(id, state, callback) {
  if (!this.backendToken) {
    return callback(new Error('Not logged in'));
  }
  $.ajax({
    type: 'POST',
    url: BASE_URL + '/challenges/' + id + '/state',
    contentType: 'application/json',
    data: JSON.stringify({state: state}),
    dataType: 'json',
    headers: {
      Authorization: 'Bearer ' + this.backendToken
    }
  }).done(function (response) {
    if (response.error) {
      return callback(new Error(response.error.message));
    }
    return callback(null);
  });
}

BackendAccess.prototype.markChallengeAsWon = function (id, callback) {
  this.markChallenge(id, 'Won', callback);
};

BackendAccess.prototype.markChallengeAsLost = function (id, callback) {
  this.markChallenge(id, 'Lost', callback);
};
