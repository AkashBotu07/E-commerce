document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('registerform');
    const logbtn = document.getElementById('btnlogin')
    logbtn.addEventListener("click",async (e)=>{
        e.preventDefault();
        const name=document.getElementById("Name")
        const email=document.getElementById("Email")
        const password=document.getElementById("Password")
        const street=document.getElementById("Street")
        const apartment=document.getElementById("apartment")
        const city=document.getElementById("city")
        const zip=document.getElementById("zip")
        const country=document.getElementById("country")
        const phone=document.getElementById("phone")
        const requestData = {
            name: name.value,
            email: email.value,
            password: password.value,
            street:street.value,
            apartment:apartment.value,
            city: city.value,
            zip: zip.value,
            country: country.value,
            phone: phone.value
          };
          try {
            const response = await fetch('http://localhost:3000/users/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestData),
            });
      
            if (response.ok) {
              const data = await response.json();
              // Handle successful login, e.g., save token to local storage, redirect, etc.
              console.log('Login successful:', data);
              // Example: Redirect to a new page after successful login
              window.location.href = '../login.html';
            } else {
              const errorMessage = await response.text();
              // Handle login error, show error message to the user, etc.
              console.error('Login failed:', errorMessage);
            }
          } catch (error) {
            // Handle network errors or exceptions
            console.error('Login error:', error);
          }
    })
});