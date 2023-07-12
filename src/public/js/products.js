function addToCart(productId) {
   
 //   cartId = '64938316e83c4003ad1730ab'; // ID del carrito harcodeado 
 window.location.href = 'http://localhost:8080/auth/login';
    console.log(productId);
    console.log (req.session.user)
    const  caridx=localStorage.getItem('cartId'); 
    fetch(`/api/carts/${cartId}/products/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      })
    })
    .then(response => {
      if (response.ok) {
        alert('Product added to cart');
      } else {
        throw new Error('Failed to add product to cart');
      }
    })
    .catch(error => {
      console.error(error);
    });
  }
  
  function getCookie(name) {
    const cookieString = document.cookie;
    console.log(cookieString);
    const cookies = cookieString.split(';');
  
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
  
    return null;
  }