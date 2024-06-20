document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('selleritemsForm');
    const logbtn = document.getElementById('btnlogin')
    logbtn.addEventListener("click", async (e) => {
        e.preventDefault();
        const name = document.getElementById("itemName").value;
        const itemImageURLs = document.getElementById("itemImageURLs").files; // FileList object
        const itemBrand = document.getElementById("itemBrand").value;
        const itemPrice = document.getElementById("itemPrice").value;
        const itemQuantity = document.getElementById("itemQuantity").value;
        const itemDescription = document.getElementById("itemDescription").value;
        const requestData = {
            name: name,
            desription: itemDescription,
            imageurls: itemImageURLs,
            brand: itemBrand,
            price: itemPrice,
            quantity: itemQuantity
        };
        try {
            const response = await fetch('http://localhost:3000/seller/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                const data = await response.json();
                // Handle successful login, e.g., save token to local storage, redirect, etc.
                console.log('successful data send:', data);
                // Example: Redirect to a new page after successful login
                window.location.href = '../login.html';
            } else {
                const errorMessage = await response.text();
                // Handle login error, show error message to the user, etc.
                console.error('sending failed:', errorMessage);
            }
        } catch (error) {
            // Handle network errors or exceptions
            console.error(`the error is :${ error.message}`);
        }
    })
});