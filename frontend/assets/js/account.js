document.addEventListener('DOMContentLoaded', () => {
    let img = document.getElementById("img")
    let email=document.getElementById("Email");
    let Location=document.getElementById("Location");
    let Phone=document.getElementById("Phone");
    let Address=document.getElementById("Address");
    let username=document.getElementById("username");
    const session = localStorage.getItem('session');
    const sessionData = JSON.parse(session);
    let finalAddress=`Address: ${sessionData.data.user.street} ,${sessionData.data.user.zip} , ${sessionData.data.user.apartment}`;
    let finalLocation=`Location: ${sessionData.data.user.city},${sessionData.data.user.country}`;
    img.src=`${sessionData.data.user.image}`
    email.innerText=`Email: ${sessionData.data.user.email}`;
    Location.innerText=finalLocation;
    Phone.innerText=`Phone: ${sessionData.data.user.phone}`;
    Address.innerText=finalAddress;
    username.innerText=`${sessionData.data.user.name}`;
});