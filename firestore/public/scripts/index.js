const blogList = document.querySelector('.blogs');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

// Set up the options to be displayed according to users authentication status
const setupUi = (user) =>{
    if(user){
        // toggle UI elements
        loggedInLinks.forEach(item => item.style.display ='block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else{
        // toggle UI elements
        loggedInLinks.forEach(item => item.style.display ='none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}

// get blogs from db and display
const setupBlogs = (data) => {
    if(data.length){
    let html = '';
    data.forEach(doc => {
        const guide = doc.data();
        const datalist = `
        <div class="single_sedebar">
                <div class="select_option">
                    <div class="select_option_list" style="background-color: #2577fd;color: white;">
                        ${guide.title} by author ${guide.user}</div>
                        <div class="select_option_dropdown">
                            ${guide.content}
                        </div>
                </div>
        </div>
        `;
        html += datalist;
        console.log(guide);
        
        
    });
    blogList.innerHTML = html;
}
else{
    blogList.innerHTML = '<h4>Login or Signup to view the blogs</h4>'
}
}