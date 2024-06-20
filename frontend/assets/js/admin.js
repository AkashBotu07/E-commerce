// Fetch counts for users
fetch('http://localhost:3000/users/get/count')
  .then(response => response.json())
  .then(userData => {
    const usersCount = userData.count; // Assuming the count is provided as 'count' property in the API response

    // Display the users count on the admin page
    document.getElementById('usersCount').innerText = `Total Users: ${usersCount}`;
  })
  .catch(error => {
    console.error('Error fetching user count:', error);
  });

// Fetch counts for products
fetch('http://localhost:3000/products/get/count')
  .then(response => response.json())
  .then(productData => {
    const productsCount = productData.count; // Assuming the count is provided as 'count' property in the API response

    // Display the products count on the admin page
    document.getElementById('productsCount').innerText = `Total Products: ${productsCount}`;
  })
  .catch(error => {
    console.error('Error fetching product count:', error);
  });

// Fetch counts for categories
fetch('http://localhost:3000/categories/get/count')
  .then(response => response.json())
  .then(categoryData => {
    const categoriesCount = categoryData.count; // Assuming the count is provided as 'count' property in the API response

    // Display the categories count on the admin page
    document.getElementById('categoriesCount').innerText = `Total Categories: ${categoriesCount}`;
  })
  .catch(error => {
    console.error('Error fetching category count:', error);
  });
