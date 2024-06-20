// // JavaScript to fetch product data from the backend API


// const productId = 'your_product_id'; // Replace this with the actual product ID

// fetch(`your_backend_url/products/${productId}`)
//   .then(response => response.json())
//   .then(data => {
//     // Update HTML elements with product data
//     document.getElementById('productName').innerText = data.name;
//     document.getElementById('productDescription').innerText = data.description;
//     document.getElementById('productImage').src = data.image;
//     document.getElementById('productBrand').innerText = data.brand;
//     document.getElementById('productPrice').innerText = `Price: $${data.price}`;
//     document.getElementById('productCategory').innerText = `Category: ${data.category}`;
//     document.getElementById('productQuantity').innerText = `Available Quantity: ${data.quantity}`;
//   })
//   .catch(error => {
//     console.error('Error fetching product data:', error);
//   });


// script.js
// document.addEventListener('DOMContentLoaded', function() {
//     // Fetch product details from MongoDB via an API endpoint
//     fetch('http://localhost:3000/products')
//       .then(response => response.json())
//       .then(products => {
//         // Extract and display product details
//         const product = products[0]; // Assuming you're fetching a single product here
        
//         const productDetails = document.querySelector('.product-details');
//         productDetails.innerHTML = `
//           <h2>${product.name}</h2>
//           <p>${product.description}</p>
//           <p>${product.richDescription}</p>
//           <img src="${product.image}" alt="${product.name}">
//           <p>Brand: ${product.brand}</p>
//           <p>Price: $${product.price}</p>
//           <p>Category: ${product.category}</p>
//           <p>Quantity: ${product.quantity}</p>
//         `;
        
//         // Add to cart functionality
//         const addToCartBtn = document.getElementById('addToCartBtn');
//         addToCartBtn.addEventListener('click', () => {
//           // Logic to add the product to the cart (could involve sending data to the server)
//           // Implement this according to your cart functionality
//         });
//       })
//       .catch(error => console.log(error));
//   });
  




// Assuming you have a function to fetch product data from MongoDB
function fetchProductData() {
    // Perform a fetch request or use AJAX to get data from MongoDB
    // This could be done using a library like Axios or Fetch API
    // Replace this with your actual fetch logic
    return fetch('http://localhost:3000/products/')
      .then(response => response.json())
      .then(data => data); // Assuming the fetched data is an array of products
  }
  
  // Function to generate product cards based on fetched data
  async function generateProductCards() {
    const products = await fetchProductData();
  
    const productsContainer = document.getElementById('products-container');
  
    products.forEach(product => {
      const cardDiv = document.createElement('div');
      cardDiv.classList.add('col-lg-3', 'col-md-6', 'col-sm-6', 'col-xs-12', 'py-5');
      cardDiv.innerHTML = `
        <div class="card box-shadow">
          <img class="card-img" src="${product.imageurl}" class="card-img-top" height="400px" width="400px" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <h5>Price: &#8377;${product.price}</h5>
            <button onclick="addToCart('${product.name}', ${product.price}, '${product.imageurl}')">Add to cart</button>
          </div>
        </div>
      `;
      productsContainer.appendChild(cardDiv);
    });
  }
  
  // Call the function to generate product cards when the page loads
  window.onload = generateProductCards;
  