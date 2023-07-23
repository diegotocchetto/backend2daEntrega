const API_URL = "http://localhost:8080/api";
alert(productId)
function addToCart (productId) {
   
    
    const url = API_URL + "/carts/" + cartIdHtml + "/product/" + productId;
    const data = {};
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    fetch(url, options)
    .then((response) => response.json())
    .then((res) => {
        console.log(res);
        Swal.fire({
          title: 'Product added to cart',
          timer: 5000,
          icon: 'success'
      })
    })
    .catch((error) => {
        console.error("Error:", error);
        alert(JSON.stringify(error));
    });
}

function deleteProduct (productId) {
   
    
  const url = API_URL + "/carts/" + cartIdHtml + "/products/" + productId;
  const data = {};
  const options = {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
  };
  fetch(url, options)
  .then((response) => response.json())
  .then((res) => {
      Swal.fire({
        title: 'Product removed from cart',
        timer: 5000,
        icon: 'success'
    })
  })
  .catch((error) => {
      console.error("Error:", error);
      alert(JSON.stringify(error));
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