"use strict";

// helper method to handle errors
var handleError = function handleError(message) {
  $("#errorMessage").text(message);
};

var redirect = function redirect(response) {
  window.location = response.redirect;
};

// ajax request
var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};

var AccountData = function AccountData(props) {
  return React.createElement(
    "div",
    { className: "accountData container center-align" }, 
    React.createElement("h4", null, "Skins Owned: ", props.skins.length)
  );
};

// loads the skins
var loadSkinsFromServer = function loadSkinsFromServer(csrf) {
  sendAjax('GET', '/getSkins', null, function (data) {
    ReactDOM.render(React.createElement(AccountData, { skins: data.skins, csrf: csrf }), document.querySelector("#content"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render(React.createElement(AccountData, { skins: [], csrf: csrf }), document.querySelector("#content"));

  loadSkinsFromServer();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
