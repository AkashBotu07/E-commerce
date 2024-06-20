document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const logbtn = document.getElementById('btnlogin');
  
  logbtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.getElementById("logemail").value;
    const password = document.getElementById("logpassword").value;
    const requestData = {
      email: email,
      password: password
    };

    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();

        // Assuming the response contains an `isAdmin` field
        if (data.isAdmin) {
          // Redirect to admin page
          setSession({ username: email, isAdmin: true,data });
          window.location.href = './admin.html';
        }else if(data.isSeller)
        {
          setSession({ username: email, isSeller: true,data });
          window.location.href = './sellerindex.html';
        }
         else {
          // Redirect to index page for non-admin users
          setSession({ username: email, isAdmin: false,data,isAlerted:1 });
          window.location.href = './index.html';
        }
      } else {
        const errorMessage = await response.text();
        // Handle login error, show error message to the user, etc.
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'error',
          title: `${errorMessage}`
        })
        console.error('Login failed:', errorMessage);
      }
    } catch (error) {
      // Handle network errors or exceptions
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'error',
        title: `${error}`
      })
      console.error('Login error:', error);
    }
  });

  function setSession(sessionData) {
    localStorage.setItem('session', JSON.stringify(sessionData));
    console.log('Session data set:', sessionData);
  }
});

