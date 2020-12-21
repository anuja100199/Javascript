// listen for auth status changes
auth.onAuthStateChanged(user => {
    if(user){
       // get data
        db.collection('blogs').onSnapshot(snapshot => {
            setupBlogs(snapshot.docs);
            setupUi(user);
        });
    }
    else{
        setupBlogs([]);
        setupUi();
    }
});

// create new blog
const setupVal = (user) => {
    var name   = user['email'].substring(0, user['email'].lastIndexOf("@"));
    const createForm = document.querySelector('#postForm');
    createForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    db.collection('blogs').add({
        title: createForm['title'].value,
        content: createForm['content'].value,
        user : name,
        userId: user.uid
    }).then(() => {
        // close form and reset form
        const postform = document.querySelector('#postForm');
        postform.style.dispay = 'none';
        createForm.reset();
    }).catch(err =>{
        console.log(err.message);
    })
});
}

// Filter by Title
const filterForm = document.querySelector('#filterForm');
filterForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const selectedOption = document.getElementById('setup').value;
    if(filterForm[selectedOption].value == "All"){
        db.collection('blogs').onSnapshot(snapshot => {
            setupBlogs(snapshot.docs);
            setupUi(user);
        });
    }
    else{
    db.collection('blogs').where("title","==",filterForm[selectedOption].value).onSnapshot(snapshot =>{
        if(snapshot.docs.length == 0){
            const blogList = document.querySelector('.blogs');
            blogList.innerHTML = "<h4>No blogs found with selected title</h4>"
        }
        else{
            setupBlogs(snapshot.docs);}
        
        });
    }
});


// Pass the user variable to create blog form to get username
auth.onAuthStateChanged(user => {
    if(user){
        setupVal(user);
    }
});

// signup
const signUpForm = document.querySelector('#signup-form');
signUpForm.addEventListener('submit',(e) =>{
    e.preventDefault();

    //get user info
    const email = signUpForm['signup-email'].value;
    const password = signUpForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        signUpForm.reset();
    }); // After signing up the user is logged in into the app
});

// logout
const logout= document.querySelector("#logout");
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() =>{
        console.log("Signned out");
    })
})

// Login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    // get user info
    const email = loginForm['email'].value;
    const password = loginForm['password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        // window.location.href = "signup.html";
        console.log(cred.user)
        loginForm.reset();
    });
});

// Google sign in
function googleLogin(){
    var provider = new firebase.auth.GoogleAuthProvider();
    //Login with popup window
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
      }).catch(function(error) {
        var errorMessage = error.message;
        alert(errorMessage)
        var email = error.email;
        var credential = error.credential;
      });
}

