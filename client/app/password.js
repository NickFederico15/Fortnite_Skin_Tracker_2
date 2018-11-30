// adds a skin
const handleChange = (e) => {
  e.preventDefault();
    
  if($("#oldPass").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
    handleError("All fields are required!");
    return false;
  }
    
  if($("#pass").val() !== $("#pass2").val()) {
    handleError("Passwords do not match!");
    return false;
  }

  sendAjax('PUT', $("#changePassForm").attr("action"), $("#changePassForm").serialize(), 
    ReactDOM.render(<SuccessWindow />, document.querySelector('#content')));
    
  return false;
};

const PasswordChangePage = (props) => {
  return (
    <form id="changePassForm" 
        name="changePassForm" 
        onSubmit={handleChange} 
        action="/changePassword" 
        method="PUT" 
        className="mainForm"
    >
      <div className="form-group row">
        <label htmlFor="oldPass">Current Password: </label>
        <input className="form-control" id="oldPass" type="password" name="oldPass" placeholder="Old Password"/>
      </div>
      <div className="form-group row">
        <label htmlFor="pass">New Password: </label>
        <input className="form-control" id="pass" type="password" name="pass" placeholder="New Password"/>
      </div>
      <div className="form-group row">
        <label htmlFor="pass2">Confirm New Password: </label>
        <input className="form-control" id="pass2" type="password" name="pass2" placeholder="Confirm Password"/>
      </div>
      <input type="hidden" id="token" name="_csrf" value={props.csrf}/>
      <button className="btn btn-primary" type="submit">Change Password</button>
    </form>
  );
};

const SuccessWindow = () =>{
  return(
    <div class="center-align">
        <p>Password change successful!!</p>
    </div>
  );
};

// sets up React render
const setup = function(csrf) {
  ReactDOM.render(
    <PasswordChangePage csrf={csrf} /> , document.querySelector("#content")
  );
};