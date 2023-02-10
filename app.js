// Check if the user is authenticated
if (sessionStorage.getItem('jwt')) {
    // If the user is authenticated, show the dashboard
    showDashboard();
  } else {
    // If the user is not authenticated, show the login screen
    showLogin();
  }
  
  // Show the login screen
  function showLogin() {
    // Load the login HTML
    $('#content').load('login.html', () => {
      const form = $('#login-form');
      const emailInput = $('#email');
      const passwordInput = $('#password');
      const errorMessage = $('#error-message');
  
      // Handle the submit event of the form
      form.submit(event => {
        event.preventDefault();
  
        // Get the email and password
        const email = emailInput.val();
        const password = passwordInput.val();
  
        // Validate the email and password
        if (!email || !password) {
          errorMessage.text('Please enter your email and password.').show();
          return;
        }
  
        // Send a request to the server to authenticate the user
        $.post('https://portal.cloudswitch.in/api/login', { email, password }, response => {
          if (response.error) {
            errorMessage.text(response.error).show();
            return;
          }
  
          // Store the JWT in the session storage
          sessionStorage.setItem('jwt', response.jwt);
  
          // Show the dashboard
          showDashboard();
        });
      });
    });
  }
  
  // Show the dashboard
  function showDashboard() {
    // Load the dashboard HTML
    $('#content').load('dashboard.html', () => {
      const usernameSpan = $('#username');
      const logoutButton = $('#logout-button');
  
      // Get the username from the JWT
      const jwt = sessionStorage.getItem('jwt');
      const username = JSON.parse(atob(jwt.split('.')[1])).username;
  
      // Display the username
      usernameSpan.text(username);
  
      // Handle the click event of the logout button
      logoutButton.click(() => {
        // Remove the JWT from the session storage
        sessionStorage.removeItem('jwt');
  
        // Show the login screen
        showLogin();
      });
    });
  }
  

// Show the profile screen
function showProfile() {
    // Load the profile HTML
    $('#content').load('profile.html', () => {
      const profileInfoList = $('#profile-info');
  
      // Get the JWT from the session storage
      const jwt = sessionStorage.getItem('jwt');
  
      // Send a request to the server to get the profile information
      $.ajax({
        url: '/api/profile',
        headers: {
          'Authorization': `Bearer ${jwt}`
        },
        success: response => {
          if (response.error) {
            console.error(response.error);
            return;
          }
  
          // Display the profile information
          Object.entries(response).forEach(([key, value]) => {
            profileInfoList.append(`<li><strong>${key}:</strong> ${value}</li>`);
          });
        }
      });
    });
  }
  
  