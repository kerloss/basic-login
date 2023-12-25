var signInEmail = document.getElementById('emailSignIn');
var signInPass = document.getElementById('passwordSignIn');
var signUpName = document.getElementById('nameSignUp');
var signUpEmail = document.getElementById('emailSignUp');
var signUpPass = document.getElementById('passwordSignUp');

var signUpArray = [];

/**localstorage when refresh to get data that saved */
if (localStorage.getItem('signup')) {
    signUpArray = JSON.parse(localStorage.getItem('signup'))
};

/////////say welcome at home page when success login/////////
var user = JSON.parse(localStorage.getItem('username'))
if (user) {
    document.getElementById('username').innerHTML = "Welcome " + user;
}

////////logout/////////

function logout() {
    localStorage.removeItem('username')
};

//---------------login--------------

/**function to check if login empty or not */
function isLoginEmpty() {
    if (signInEmail.value == "" || signInPass.value == "") {
        return true;
    } else {
        return false;
    }
};

function login() {
    ///// alert to fill inputs
    if (isLoginEmpty() == true) {
        // document.getElementById('alert').innerHTML = `<span class="alert alert-danger py-1">All inputs is required</span>`
        document.getElementById('emptyEmailSigninAlert').style.display = 'block';
        document.getElementById('emptyPassSigninAlert').style.display = 'block';
        document.getElementById('validEmailSigninAlert').style.display = 'none';
        document.getElementById('ValidPassSigninAlert').style.display = 'none';
        return true;
    } else if (regexOfEmailSignin() == false) {
        document.getElementById('emptyEmailSigninAlert').style.display = 'none';
        document.getElementById('emptyPassSigninAlert').style.display = 'none';
        document.getElementById('validEmailSigninAlert').style.display = 'block';
        document.getElementById('ValidPassSigninAlert').style.display = 'none';
        return false;
    } else if (regexOfPasswordSignin() == false) {
        document.getElementById('emptyEmailSigninAlert').style.display = 'none';
        document.getElementById('emptyPassSigninAlert').style.display = 'none';
        document.getElementById('validEmailSigninAlert').style.display = 'none';
        document.getElementById('ValidPassSigninAlert').style.display = 'block';
        return false;
    }
    regexOfEmailSignin();
    regexOfPasswordSignin();
    validUserName();
};

/**function to check if email and pass is valid or not to login */
var arr = [];
function validUserName() {
    for (let i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == signInEmail.value.toLowerCase() && signUpArray[i].password.toLowerCase() == signInPass.value.toLowerCase()) {
            var name = arr.push(signUpArray[i].name);
            localStorage.setItem('username', JSON.stringify(arr));
            window.location.href = "./html/welcomepage.html"
            // location.replace("./welcomepage.html")
            // location.assign("./welcomepage.html")
            document.getElementById('validEmailSigninAlert').style.display = 'none';
            document.getElementById('ValidPassSigninAlert').style.display = 'none';
            break;
        } else {
            document.getElementById('alert').innerHTML = `<span class="alert alert-danger py-1">incorrect email or password</span>`;
        }
    }
};

/////// 2 function to check the validation///////

/**function to check the regex of email */
function regexOfEmailSignin() {
    var patternEmail = /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (patternEmail.test(signInEmail.value)) {
        return true;
    } else {
        return false;
    }
};

function regexOfPasswordSignin() {
    var patternPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    if (patternPassword.test(signInPass.value)) {
        return true;
    } else {
        return false;
    }
};


//---------------signup--------------

/**check if input is empty or not to give alert that must enter data */
function isSignupEmpty() {
    if (signUpName.value == "" || signUpEmail.value == "" || signUpPass.value == "") {
        return true;
    } else {
        return false
    }
};


function signup() {
    if (isSignupEmpty() == true) {
        // document.getElementById('alert').innerHTML = `<span class="alert alert-danger py-1">All inputs is required</span>`;
        document.getElementById('emptyNameAlert').style.display = 'block';
        document.getElementById('emptyEmailAlert').style.display = 'block';
        document.getElementById('emptyPassAlert').style.display = 'block';
        document.getElementById('validNameAlert').style.display = 'none';
        document.getElementById('validEmailAlert').style.display = 'none';
        document.getElementById('ValidPassAlert').style.display = 'none';
        return true;
    } else if (regexOfNameSignup() == false) {
        // document.getElementById('nameAlert').innerHTML = `<span class="alert alert-danger py-1">write valid name with first capital letter</span>`;
        document.getElementById('validNameAlert').style.display = 'block';
        document.getElementById('validEmailAlert').style.display = 'none';
        document.getElementById('ValidPassAlert').style.display = 'none';
        document.getElementById('emptyNameAlert').style.display = 'none';
        document.getElementById('emptyEmailAlert').style.display = 'none';
        document.getElementById('emptyPassAlert').style.display = 'none';
        return false;
    } else if (regexOfEmailSignup() == false) {
        // document.getElementById('emailAlert').innerHTML = `<span class="alert alert-danger py-1">write valid email like test@example.com</span>`;
        document.getElementById('validNameAlert').style.display = 'none';
        document.getElementById('validEmailAlert').style.display = 'block';
        document.getElementById('ValidPassAlert').style.display = 'none';
        document.getElementById('emptyNameAlert').style.display = 'none';
        document.getElementById('emptyEmailAlert').style.display = 'none';
        document.getElementById('emptyPassAlert').style.display = 'none';
        return false;
    } else if (regexOfPasswordSignup() == false) {
        // document.getElementById('passAlert').innerHTML = `<span class="alert alert-danger py-1">write valid password contain at least one capital letter and one number</span>`
        document.getElementById('validNameAlert').style.display = 'none';
        document.getElementById('validEmailAlert').style.display = 'none';
        document.getElementById('ValidPassAlert').style.display = 'block';
        document.getElementById('emptyNameAlert').style.display = 'none';
        document.getElementById('emptyEmailAlert').style.display = 'none';
        document.getElementById('emptyPassAlert').style.display = 'none';
        return false;
    }
    regexOfNameSignup();
    regexOfEmailSignup();
    regexOfPasswordSignup();
    addSignupObject();
    document.getElementById('ValidPassAlert').style.display = 'none';
};

/**store data in object at first time and at every time */
function addSignupObject() {
    var signup = {
        name: signUpName.value,
        email: signUpEmail.value,
        password: signUpPass.value
    }
    if (isEmailExist() == true) {
        document.getElementById('alert').innerHTML = `<span class="alert alert-danger py-1">The email already exist</span>`
        document.getElementById('validNameAlert').style.display = 'none';
        document.getElementById('validEmailAlert').style.display = 'none';
        document.getElementById('ValidPassAlert').style.display = 'none';
    } else {
        signUpArray.push(signup);
        localStorage.setItem('signup', JSON.stringify(signUpArray));
        document.getElementById('alert').innerHTML = `<span class="alert alert-success py-1">Success</span>`
        // window.location.href = "../index.html";  //optional to use
        clear();
    }
};

/**clear data after submit */
function clear() {
    signUpName.value = "";
    signUpEmail.value = "";
    signUpPass.value = "";
};

/**check if email is exist or not */
function isEmailExist() {
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == signUpEmail.value.toLowerCase()) {
            return true;
        }
    }
};

////////3 function to check the validation///////

/**function to check the regex of name */
function regexOfNameSignup() {
    var patternName = /^[A-Z][a-z0-9]{1,}$/;
    if (patternName.test(signUpName.value)) {
        return true;
    } else {
        return false;
    }
};

/**function to check the regex of email */
function regexOfEmailSignup() {
    var patternEmail = /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var result = patternEmail.test(signUpEmail.value);
    if (result) {
        // document.getElementById('emailAlert').innerHTML = `<span class="alert alert-success py-1">valid email</span>`;
        return true;
    } else {
        return false;
    }
};

/**function to check the regex of password */
function regexOfPasswordSignup() {
    var patternPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    if (patternPassword.test(signUpPass.value)) {
        return true;
    } else {
        return false;
    }
};