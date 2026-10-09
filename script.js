// Add product to cart
function addToCart(productName, price) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let existingProduct = cart.find(
        product => product.name === productName
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert(productName + " added to cart!");
}


// Buy Now
function buyNow(productName, price) {

    let cart = [];

    cart.push({
        name: productName,
        price: price,
        quantity: 1
    });

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    window.location.href = "checkout.html";
}


// Display Cart
function displayCart() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let cartItems =
        document.getElementById("cartItems");

    let cartTotal =
        document.getElementById("cartTotal");

    if (!cartItems) {
        return;
    }


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<h3>Your Cart is Empty</h3>";

        cartTotal.innerText = "0";

        return;
    }


    cartItems.innerHTML = "";

    let total = 0;


    cart.forEach((product, index) => {

        let subtotal =
            product.price * product.quantity;

        total = total + subtotal;


        cartItems.innerHTML += `

            <div>

                <h3>${product.name}</h3>

                <p>Price: ₹${product.price}</p>

                <p>
                    Quantity:

                    <button
                        onclick="decreaseQuantity(${index})">
                        -
                    </button>

                    ${product.quantity}

                    <button
                        onclick="increaseQuantity(${index})">
                        +
                    </button>
                </p>

                <p>
                    Subtotal: ₹${subtotal}
                </p>

                <button
                    onclick="removeProduct(${index})">
                    Remove
                </button>

                <hr>

            </div>

        `;

    });


    cartTotal.innerText = total;

}


// Increase Quantity
function increaseQuantity(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity++;

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();

}


// Decrease Quantity
function decreaseQuantity(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();

}


// Remove Product
function removeProduct(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();

}


// Display Checkout Total
function displayCheckoutTotal() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;


    cart.forEach(product => {

        total =
            total +
            (product.price * product.quantity);

    });


    let checkoutTotal =
        document.getElementById("checkoutTotal");

    if (checkoutTotal) {

        checkoutTotal.innerText = total;

    }

}


// Place Order
function placeOrder(event) {

    event.preventDefault();

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    alert("Order placed successfully!");

    localStorage.removeItem("cart");

    window.location.href = "index.html";

}


// Search Products
function searchProducts() {

    let search =
        document.getElementById("searchBox")
        .value.toLowerCase();

    let products =
        document.querySelectorAll(".product");


    products.forEach(product => {

        let name =
            product.innerText.toLowerCase();

        if (name.includes(search)) {

            product.style.display =
                "inline-block";

        } else {

            product.style.display =
                "none";

        }

    });

}


// Filter Products
function filterProducts() {

    let category =
        document.getElementById("categoryFilter")
        .value;

    let products =
        document.querySelectorAll(".product");


    products.forEach(product => {

        if (
            category === "all" ||
            product.classList.contains(category)
        ) {

            product.style.display =
                "inline-block";

        } else {

            product.style.display =
                "none";

        }

    });

}


// Run functions when page loads
displayCart();

displayCheckoutTotal();
// Add to Wishlist
function addToWishlist(productName, price) {

    let wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

    let existingProduct = wishlist.find(
        product => product.name === productName
    );

    if (!existingProduct) {

        wishlist.push({
            name: productName,
            price: price
        });

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        alert(productName + " added to wishlist!");

    } else {

        alert("Product already in wishlist!");

    }
}


// Display Wishlist
function displayWishlist() {

    let wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

    let wishlistItems =
        document.getElementById("wishlistItems");

    if (!wishlistItems) {
        return;
    }


    if (wishlist.length === 0) {

        wishlistItems.innerHTML =
            "<h3>Your Wishlist is Empty ❤️</h3>";

        return;
    }


    wishlistItems.innerHTML = "";


    wishlist.forEach((product, index) => {

        wishlistItems.innerHTML += `

            <div>

                <h3>${product.name}</h3>

                <p>Price: ₹${product.price}</p>

                <button
                    onclick="addToCart('${product.name}', ${product.price})">
                    Add to Cart
                </button>

                <button
                    onclick="removeFromWishlist(${index})">
                    Remove
                </button>

                <hr>

            </div>

        `;

    });

}


// Remove from Wishlist
function removeFromWishlist(index) {

    let wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

    wishlist.splice(index, 1);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    displayWishlist();

}


displayWishlist();