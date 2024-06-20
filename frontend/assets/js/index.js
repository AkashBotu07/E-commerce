const logbtn= document.getElementById('login-out')
function getSession() {
    const session = localStorage.getItem('session');
    const sessionData = JSON.parse(session);
    if (!session) {
        logbtn.innerText="Login"
    }else{
        if(sessionData.isAlerted==1){
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
                icon: 'success',
                title: 'Signed in successfully'
              })
              sessionData.isAlerted=0;
              localStorage.setItem('session', JSON.stringify(sessionData));
        }
        

        logbtn.innerText="Logout"
    }
  }
  getSession()

logbtn.addEventListener("click",()=>{
    if(logbtn.innerText=="Login") window.location.href="./login.html";
    else{
        localStorage.removeItem("session");
        window.location.href="./login.html"
    }
})

// Assume this function fetches data from the backend API
async function fetchProducts() {
  try {
    const response = await fetch('http://localhost:3000/products/');
    const data = await response.json();
    return data; // Returns an array of product objects
  } catch (error) {
    console.error('Error fetching products:', error);
    return []; // Return an empty array in case of an error
  }
}

// Function to render product cards on the webpage
async function renderProducts() {
  const products = await fetchProducts();

  // Check if products exist and render them on the webpage
 

  if (products.length > 0) {
    const productCardRow = document.getElementById('product-card-row');
  
    products.forEach(product => {
      if (product.isFeatured) {
        const card = document.createElement('div');
        card.classList.add('col-lg-3', 'col-md-6', 'col-sm-6', 'col-xs-12','text-centre');
        // card.classList.add('col-lg-4', 'col-md-6', 'py-3', 'py-md-0', 'text-center');
        // Adjust grid classes as needed
  
        card.innerHTML = `
          <div class="card box-shadow m-2" style="width: 18rem;">
            <img class="card-img-top" src="${product.imageurl}" alt="${product.name}" height="300px" width="250px">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <h5>Price: &#8377;${product.price}</h5>
              <button onclick="addToCart('${product.name}', ${product.price}, '${product.imageurl}')">Add to cart</button>
            </div>
          </div>
        `;
        productCardRow.appendChild(card);
      }
    });
  } else {
    console.log('No products found.');
  }
  

// ...
    
}

// Call the function to render products when the page loads
window.onload = renderProducts;
