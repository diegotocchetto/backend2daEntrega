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
    const cookies = cookieString.split(';');
  
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
  
    return null;
  }

  const purchaseCart = (cartId) => {
    //get cartId from fetch
    fetch(`/api/carts/${cartId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const products = data.payload.products;
        const formatProduct = products.map((product) => {
          return {
            id: product.id._id,
            quantity: product.quantity,
          };
        });

  
        fetch(`/api/carts/${cartId}/purchase`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formatProduct),
        })
          .then((res) => res.json())
          .then((data) => {
            const id = data.payload._id;
            setTimeout(() => {
              window.location.href = `/api/carts/purchase/${id}`;
            }, 3000);
            showMsg2(
              `Order in progress`,
              3000,
              '##0D6EFD'
            );
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };