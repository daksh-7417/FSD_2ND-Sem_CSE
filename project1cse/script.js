/* =========================
   SEARCH BAR FUNCTIONALITY
========================= */

function initSearch() {
    const searchInputs = document.querySelectorAll(".search-bar input");
    const searchButtons = document.querySelectorAll(".search-bar button");

    searchInputs.forEach((input, index) => {
        
        // Search on input event
        input.addEventListener("input", () => {
            performSearch(input.value);
        });
        
        // Search on button click
        if (searchButtons[index]) {
            searchButtons[index].addEventListener("click", () => {
                performSearch(input.value);
            });
        }
        
        // Search on Enter key
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                performSearch(input.value);
            }
        });
    });
}

// Initialize search when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSearch);
} else {
    initSearch();
}

// Also ensure search is initialized when page fully loads
window.addEventListener("load", initSearch);

function performSearch(searchTerm) {
    // Try products-grid-page first (products.html), then products-grid (other pages)
    let productsGrid = document.querySelector(".products-grid-page");
    
    if (!productsGrid) {
        productsGrid = document.querySelector(".products-grid");
    }
    
    // If no products grid on this page, don't proceed
    if (!productsGrid) {
        return;
    }
    
    const productCards = productsGrid.querySelectorAll(".product-card");
    let matchCount = 0;
    
    searchTerm = searchTerm.toLowerCase().trim();
    
    if (searchTerm === "") {
        // Show all products if search is empty
        productCards.forEach(card => {
            card.style.display = "block";
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
        });
        updateProductCount(productCards.length);
        
        // Hide no results message
        const noResultsMsg = productsGrid.querySelector(".no-results-message");
        if (noResultsMsg) {
            noResultsMsg.remove();
        }
        return;
    }
    
    // Perform search
    productCards.forEach(card => {
        const productName = card.querySelector("h3") ? card.querySelector("h3").innerText.toLowerCase() : "";
        const productCategory = card.querySelector(".product-category") ? card.querySelector(".product-category").innerText.toLowerCase() : "";
        const productPrice = card.querySelector(".price-section h4") ? card.querySelector(".price-section h4").innerText.toLowerCase() : "";
        
        // Check if any field matches the search term
        const isMatch = productName.includes(searchTerm) || 
                       productCategory.includes(searchTerm) || 
                       productPrice.includes(searchTerm);
        
        if (isMatch) {
            card.style.display = "block";
            card.style.opacity = "1";
            card.style.transition = "all 0.3s ease-in";
            card.style.transform = "scale(1)";
            matchCount++;
        } else {
            card.style.display = "none";
        }
    });
    
    // Update product count
    updateProductCount(matchCount);
    
    // Show "no results" message if no products found
    let noResultsMsg = productsGrid.querySelector(".no-results-message");
    
    if (matchCount === 0) {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement("div");
            noResultsMsg.className = "no-results-message";
            noResultsMsg.innerHTML = `
                <div style="padding: 40px; text-align: center; grid-column: 1/-1;">
                    <i class="fa-solid fa-magnifying-glass" style="font-size: 48px; color: #ccc; margin-bottom: 20px;"></i>
                    <p style="font-size: 18px; color: #666;">No products found for "<strong>${searchTerm}</strong>"</p>
                    <p style="color: #999; margin-top: 10px;">Try searching with different keywords</p>
                </div>
            `;
            productsGrid.appendChild(noResultsMsg);
        } else {
            noResultsMsg.style.display = "block";
        }
    } else {
        if (noResultsMsg) {
            noResultsMsg.style.display = "none";
        }
    }
}

function updateProductCount(count) {
    const topbar = document.querySelector(".products-topbar h2");
    if (topbar) {
        topbar.innerText = `Showing ${count} Product${count !== 1 ? 's' : ''}`;
    }
}

/* =========================
   NAVBAR SHADOW ON SCROLL
========================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 20){

        navbar.style.boxShadow =
        "0 10px 30px rgba(0,0,0,0.08)";

    }

    else{

        navbar.style.boxShadow =
        "0 2px 20px rgba(0,0,0,0.05)";

    }

});

/* =========================
   TOAST NOTIFICATION
========================= */

function showToast(message){

    const toast = document.createElement("div");

    toast.classList.add("toast");

    toast.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        ${message}
    `;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    },100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        },300);

    },2500);

}

/* =========================
   CART MANAGEMENT
========================= */

function getCart() {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = getCart();
    const cartCount = document.querySelector(".cart-count");
    if (cartCount) {
        cartCount.innerText = cart.length;
    }
}

function addToCart(product) {
    const cart = getCart();
    
    // Check if product already exists in cart
    const existingProduct = cart.find(item => item.id === product.id);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    
    saveCart(cart);
}

/* =========================
   ADD TO CART
========================= */

const addCartButtons =
document.querySelectorAll(".add-cart-btn");

addCartButtons.forEach(button => {

    button.addEventListener("click", () => {
        
        // Get product card and extract data
        const productCard = button.closest(".product-card");
        const productName = productCard.querySelector("h3").innerText;
        const productPrice = productCard.querySelector(".price-section h4").innerText;
        const productImage = productCard.querySelector(".product-image img").src;
        const productCategory = productCard.querySelector(".product-category").innerText;
        
        // Generate unique ID based on product name
        const productId = productName.toLowerCase().replace(/\s+/g, "-");
        
        // Create product object
        const product = {
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            category: productCategory
        };
        
        // Add to cart
        addToCart(product);

        showToast("Product added to cart");

        button.innerHTML =
        `<i class="fa-solid fa-check"></i> Added`;

        button.style.background =
        "#10b981";

        setTimeout(() => {

            button.innerHTML =
            "Add to Cart";

            button.style.background =
            "linear-gradient(135deg,#7c3aed,#2563eb)";

        },2000);

    });

});

// Update cart count on page load
updateCartCount();

/* =========================
   ADD TO CART - PRODUCT DETAILS PAGE
========================= */

const addToCartLargeBtn = document.querySelector(".add-to-cart-large");

if(addToCartLargeBtn){
    
    addToCartLargeBtn.addEventListener("click", () => {
        
        // Get product details
        const productName = document.querySelector(".product-details h1").innerText;
        const productPrice = document.querySelector(".product-price h2").innerText;
        const productImage = document.querySelector(".main-product-image img").src;
        const productBrand = document.querySelector(".product-brand").innerText;
        
        // Get quantity
        const quantityElement = document.querySelector(".quantity-box span");
        const quantity = parseInt(quantityElement.innerText);
        
        // Generate unique ID based on product name
        const productId = productName.toLowerCase().replace(/\s+/g, "-");
        
        // Create product object
        const product = {
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            category: productBrand
        };
        
        // Add quantity to cart
        product.quantity = quantity;
        
        // Get existing cart and check if product exists
        const cart = getCart();
        const existingProduct = cart.find(item => item.id === product.id);
        
        if(existingProduct){
            existingProduct.quantity += quantity;
        } else {
            cart.push(product);
        }
        
        saveCart(cart);
        
        showToast("Product added to cart");
        
        addToCartLargeBtn.innerHTML =
        `<i class="fa-solid fa-check"></i> Added`;
        
        addToCartLargeBtn.style.background =
        "#10b981";
        
        setTimeout(() => {
            
            addToCartLargeBtn.innerHTML =
            `<i class="fa-solid fa-cart-shopping"></i>
             Add to Cart`;
            
            addToCartLargeBtn.style.background =
            "linear-gradient(135deg,#7c3aed,#2563eb)";
            
        },2000);
        
    });
    
}

/* =========================
   WISHLIST BUTTONS
========================= */

const wishlistButtons =
document.querySelectorAll(".wishlist-btn");

wishlistButtons.forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("active");

        if(button.classList.contains("active")){

            button.innerHTML =
            `<i class="fa-solid fa-heart"></i>`;

            showToast("Added to wishlist");

        }

        else{

            button.innerHTML =
            `<i class="fa-regular fa-heart"></i>`;

        }

    });

});

/* =========================
   PRODUCT GALLERY SWITCH
========================= */

const thumbnails =
document.querySelectorAll(".thumbnail-images img");

const mainImage =
document.querySelector(".main-product-image img");

thumbnails.forEach(image => {

    image.addEventListener("click", () => {

        mainImage.src = image.src;

        thumbnails.forEach(img => {

            img.classList.remove("active-thumb");

        });

        image.classList.add("active-thumb");

    });

});

/* =========================
   COLOR OPTIONS
========================= */

const colors =
document.querySelectorAll(".color");

colors.forEach(color => {

    color.addEventListener("click", () => {

        colors.forEach(c => {

            c.classList.remove("active");

        });

        color.classList.add("active");

    });

});

/* =========================
   STORAGE OPTIONS
========================= */

const storageButtons =
document.querySelectorAll(".storage-buttons button");

storageButtons.forEach(button => {

    button.addEventListener("click", () => {

        storageButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

    });

});

/* =========================
   QUANTITY CONTROLLER
========================= */

const quantityBoxes =
document.querySelectorAll(".quantity-box");

quantityBoxes.forEach(box => {

    const minusBtn =
    box.querySelectorAll("button")[0];

    const plusBtn =
    box.querySelectorAll("button")[1];

    const quantity =
    box.querySelector("span");

    let count = 1;

    plusBtn.addEventListener("click", () => {

        count++;

        quantity.innerText = count;

    });

    minusBtn.addEventListener("click", () => {

        if(count > 1){

            count--;

            quantity.innerText = count;

        }

    });

});

/* =========================
   CART QUANTITY
========================= */

const cartControllers =
document.querySelectorAll(".quantity-controller");

cartControllers.forEach(controller => {

    const minus =
    controller.querySelectorAll("button")[0];

    const plus =
    controller.querySelectorAll("button")[1];

    const value =
    controller.querySelector("span");

    let quantity = 1;

    plus.addEventListener("click", () => {

        quantity++;

        value.innerText = quantity;

    });

    minus.addEventListener("click", () => {

        if(quantity > 1){

            quantity--;

            value.innerText = quantity;

        }

    });

});

/* =========================
   LOAD CART ITEMS DYNAMICALLY
========================= */

function loadCartItems() {
    const cart = getCart();
    const cartContainer = document.querySelector(".cart-items-container");
    
    if (!cartContainer) return;
    
    // Clear existing items (only on cart page)
    cartContainer.innerHTML = "";
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div style="padding: 40px; text-align: center;">
                <i class="fa-solid fa-cart-shopping" style="font-size: 48px; color: #ccc; margin-bottom: 20px;"></i>
                <p style="font-size: 18px; color: #666;">Your cart is empty</p>
                <p style="color: #999; margin-top: 10px;">
                    <a href="products.html" style="color: #7c3aed; text-decoration: none;">Continue Shopping</a>
                </p>
            </div>
        `;
        return;
    }
    
    cart.forEach(product => {
        const cartItemHTML = `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="cart-item-details">
                    <p class="cart-category">
                        ${product.category}
                    </p>
                    <h2>
                        ${product.name}
                    </h2>
                    <p class="stock-status">
                        <i class="fa-solid fa-circle-check"></i>
                        In Stock
                    </p>
                    <div class="cart-actions">
                        <div class="quantity-controller">
                            <button class="qty-minus">-</button>
                            <span>${product.quantity}</span>
                            <button class="qty-plus">+</button>
                        </div>
                        <button class="remove-btn">
                            <i class="fa-solid fa-trash"></i>
                            Remove
                        </button>
                    </div>
                </div>
                <div class="cart-item-price">
                    <h3>${product.price}</h3>
                </div>
            </div>
        `;
        
        cartContainer.innerHTML += cartItemHTML;
    });
    
    // Attach event listeners to newly created buttons
    attachCartEventListeners();
}

function attachCartEventListeners() {
    // Remove buttons
    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", () => {
            const cartItem = button.closest(".cart-item");
            const productName = cartItem.querySelector("h2").innerText;
            
            // Remove from localStorage
            let cart = getCart();
            cart = cart.filter(item => item.name !== productName);
            saveCart(cart);
            
            // Remove from UI
            cartItem.style.opacity = "0";
            cartItem.style.transform = "translateX(100px)";
            
            setTimeout(() => {
                cartItem.remove();
                showToast("Item removed from cart");
                
                // Reload if cart is now empty
                if (cart.length === 0) {
                    loadCartItems();
                }
            }, 400);
        });
    });
    
    // Quantity increase buttons
    document.querySelectorAll(".qty-plus").forEach(button => {
        button.addEventListener("click", () => {
            const quantitySpan = button.parentElement.querySelector("span");
            const cartItem = button.closest(".cart-item");
            const productName = cartItem.querySelector("h2").innerText;
            
            let quantity = parseInt(quantitySpan.innerText);
            quantity++;
            quantitySpan.innerText = quantity;
            
            // Update localStorage
            let cart = getCart();
            const product = cart.find(item => item.name === productName);
            if (product) {
                product.quantity = quantity;
                saveCart(cart);
            }
        });
    });
    
    // Quantity decrease buttons
    document.querySelectorAll(".qty-minus").forEach(button => {
        button.addEventListener("click", () => {
            const quantitySpan = button.parentElement.querySelector("span");
            const cartItem = button.closest(".cart-item");
            const productName = cartItem.querySelector("h2").innerText;
            
            let quantity = parseInt(quantitySpan.innerText);
            if (quantity > 1) {
                quantity--;
                quantitySpan.innerText = quantity;
                
                // Update localStorage
                let cart = getCart();
                const product = cart.find(item => item.name === productName);
                if (product) {
                    product.quantity = quantity;
                    saveCart(cart);
                }
            }
        });
    });
}

// Load cart items when page loads
window.addEventListener("load", loadCartItems);

/* =========================
   REMOVE CART ITEM
========================= */

const removeButtons =
document.querySelectorAll(".remove-btn");

removeButtons.forEach(button => {

    button.addEventListener("click", () => {

        const cartItem =
        button.closest(".cart-item");

        cartItem.style.opacity = "0";

        cartItem.style.transform =
        "translateX(100px)";

        setTimeout(() => {

            cartItem.remove();

        },400);

        showToast("Item removed from cart");

    });

});

/* =========================
   PAYMENT METHOD ACTIVE
========================= */

const paymentOptions =
document.querySelectorAll(".payment-option");

paymentOptions.forEach(option => {

    option.addEventListener("click", () => {

        paymentOptions.forEach(item => {

            item.classList.remove("active");

        });

        option.classList.add("active");

    });

});

/* =========================
   PLACE ORDER BUTTON
========================= */

const placeOrderBtn =
document.querySelector(".place-order-btn");

if(placeOrderBtn){

    placeOrderBtn.addEventListener("click", () => {

        placeOrderBtn.innerHTML =
        `<i class="fa-solid fa-circle-notch fa-spin"></i>
         Processing...`;

        setTimeout(() => {

            placeOrderBtn.innerHTML =
            `<i class="fa-solid fa-check"></i>
             Order Placed`;

            placeOrderBtn.style.background =
            "#10b981";

            showToast("Order placed successfully");

        },2500);

    });

}

/* =========================
   NEWSLETTER SUBSCRIBE
========================= */

const newsletterButton =
document.querySelector(".newsletter-box button");

if(newsletterButton){

    newsletterButton.addEventListener("click", () => {

        showToast("Subscribed successfully");

    });

}

/* =========================
   SEARCH BAR EFFECT
========================= */

const searchInput =
document.querySelector(".search-bar input");

if(searchInput){

    searchInput.addEventListener("focus", () => {

        searchInput.parentElement.style.boxShadow =
        "0 0 0 4px rgba(124,58,237,0.15)";

    });

    searchInput.addEventListener("blur", () => {

        searchInput.parentElement.style.boxShadow =
        "none";

    });

}

/* =========================
   BUTTON RIPPLE EFFECT
========================= */

const allButtons =
document.querySelectorAll("button");

allButtons.forEach(button => {

    button.addEventListener("click", function(e){

        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;

        let ripple =
        document.createElement("span");

        ripple.classList.add("ripple");

        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        },600);

    });

});

/* =========================
   PAGE LOAD ANIMATION
========================= */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

/* =========================
   SCROLL REVEAL ANIMATION
========================= */

const revealElements =
document.querySelectorAll(`
.product-card,
.service-card,
.order-card,
.checkout-card,
.cart-item
`);

const revealOnScroll = () => {

    const triggerBottom =
    window.innerHeight * 0.85;

    revealElements.forEach(element => {

        const top =
        element.getBoundingClientRect().top;

        if(top < triggerBottom){

            element.classList.add("show-reveal");

        }

    });

};

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

/* =========================
   SCROLL ORB EFFECT
========================= */

const orb =
document.querySelector(".bg-orb");

window.addEventListener("scroll", () => {

    const scrollY = window.scrollY;

    orb.style.transform = `
    translate(-50%,-50%)
    rotate(${scrollY * 0.15}deg)
    scale(${1 + scrollY * 0.0003})
    `;

});