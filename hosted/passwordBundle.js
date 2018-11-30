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

var handleChange = function handleChange(e) {
  e.preventDefault();
    
  if ($("#oldPass").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
    handleError("All fields are required!");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("Passwords do not match!");
    return false;
  }

  sendAjax('PUT', $("#changePassForm").attr("action"), $("#changePassForm").serialize(), 
    ReactDOM.render(React.createElement(SuccessWindow, null), document.querySelector('#content')));

  return false;
};


var PasswordChangePage = function PasswordChangePage(props) {
  return React.createElement(
    "form",
    { id: "changePassForm",
      name: "changePassForm",
      onSubmit: handleChange,
      action: "/changePassword",
      method: "PUT",
      className: "mainForm"
    },
    React.createElement(
      "div",
      { className: "form-group row" },
      React.createElement("label", { htmlFor: "oldPass" }, "Current Password: "),
      React.createElement("input", { className: "form-control", id: "oldPass", type: "password", name: "oldPass", placeholder: "Old Password" })
    ),
    React.createElement(
      "div",
      { className: "form-group row" },
      React.createElement("label", { htmlFor: "pass" }, "New Password: "),
      React.createElement("input", { className: "form-control", id: "pass", type: "password", name: "pass", placeholder: "New Password" })
    ),
    React.createElement(
      "div",
      { className: "form-group row" },
      React.createElement("label", { htmlFor: "pass2" }, "Confirm New Password: "),
      React.createElement("input", { className: "form-control", id: "pass2", type: "password", name: "pass2", placeholder: "Confirm Password" })
    ),
    React.createElement("input", { type: "hidden", id: "token", name: "_csrf", value: props.csrf }),
    React.createElement("button", { className: "btn btn-primary", type: "submit" }, "Change Password")
  );
};

var SuccessWindow = function SuccessWindow() {
  return React.createElement(
    "div",
    { class: "center-align" },
    React.createElement(
      "p",
      null,
      "Password change successful!!"
    )
  );
};

var setup = function setup(csrf) {
  ReactDOM.render(React.createElement(PasswordChangePage, { csrf: csrf }), document.querySelector("#content"));
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
