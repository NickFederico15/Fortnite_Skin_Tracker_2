// handles the user logging in
const handleLogin = (e) => {
  e.preventDefault();

  // checks if username and password are present
  if($("#user").val() == '' || $("#pass").val() == '') {
    M.toast({html: 'Username or Password is empty!', displayLength: 2500});
    return false;
  }

  console.log($("input[name=_csrf]").val());
    
  M.toast({html: 'Login Success!', displayLength: 2500});
   
  // sends request to login
  sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);

  return false;
};

// handles the user signing up
const handleSignup = (e) => {
  e.preventDefault();

  // checks if all fields are filled out
  if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
    M.toast({html: 'All fields are required!', displayLength: 2500});
    return false;
  }

  // makes sure both passords are the same
  if($("#pass").val() !== $("#pass2").val()) {
    M.toast({html: 'Passwords do not match!', displayLength: 2500});
    return false;
  }
    
  M.toast({html: 'Account Created!', displayLength: 2500});

  // sends request to create the account
  sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

  return false;
};

const LoginWindow = (props) => {
  return (
  <form id="loginForm" 
        name="loginForm" 
        onSubmit={handleLogin} 
        action="/login" 
        method="POST" 
        className="mainForm"
  >
    <label htmlFor="username">Username: </label>
    <input id="user" type="text" name="username" placeholder="username"/>
    <label htmlFor="pass">Password: </label>
    <input id="pass" type="password" name="pass" placeholder="password"/>
    <input type="hidden" name="_csrf" value={props.csrf}/>
    <input className="formSubmit" type="submit" value="Sign in"/>
  </form>
  );
};

const SignupWindow = (props) => {
  return (
    <form id="signupForm" 
          name="signupForm" 
          onSubmit={handleSignup} 
          action="/signup" 
          method="POST" 
          className="mainForm"
     >
      <label htmlFor="username">Username: </label>
      <input id="user" type="text" name="username" placeholder="username"/>
      <label htmlFor="pass">Password: </label>
      <input id="pass" type="password" name="pass" placeholder="password"/>
      <label htmlFor="pass2">Password: </label>
      <input id="pass2" type="password" name="pass2" placeholder="retype password"/>
      <input type="hidden" name="_csrf" value={props.csrf}/>
      <input className="formSubmit" type="submit" value="Sign Up"/>
    </form>
  );
};

const createLoginWindow = (csrf) => {
  ReactDOM.render(
    <LoginWindow csrf={csrf} />,
    document.querySelector("#content")
  );
};

const createSignupWindow = (csrf) => {
  ReactDOM.render(
    <SignupWindow csrf={csrf} />,
    document.querySelector("#content")
  );
};

// sets up event listeners for the signup and login buttons
const setup = (csrf) => {
  const loginButton = document.querySelector("#loginButton");
  const signupButton = document.querySelector("#signupButton");

  signupButton.addEventListener("click", (e) => {
    e.preventDefault();
    createSignupWindow(csrf);
    return false;
  });

  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    createLoginWindow(csrf);
    return false;
  });

  createLoginWindow(csrf);
};

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    setup(result.csrfToken);
  });
};

$(document).ready(function() {
  $('.collapsible').collapsible();
  getToken();
});
