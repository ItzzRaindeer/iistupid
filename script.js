```javascript
/* =========================================================
   II STUPID — JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", () => {
            mobileMenu.classList.toggle("open");
        });

        mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("open");
            });
        });

    }


    /* =====================================================
       CART
       ===================================================== */

    const cartButton = document.getElementById("cartButton");
    const cartPanel = document.getElementById("cartPanel");
    const closeCart = document.getElementById("closeCart");

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    let cart = [];


    function openCart() {
        if (cartPanel) {
            cartPanel.classList.add("open");
        }
    }


    function closeCartPanel() {
        if (cartPanel) {
            cartPanel.classList.remove("open");
        }
    }


    if (cartButton) {
        cartButton.addEventListener("click", openCart);
    }


    if (closeCart) {
        closeCart.addEventListener("click", closeCartPanel);
    }


    function updateCart() {

        if (!cartItems || !cartCount || !cartTotal) {
            return;
        }

        cartCount.textContent = cart.length;


        if (cart.length === 0) {

            cartItems.innerHTML = `
                <p class="empty-cart">
                    Your cart is empty.
                </p>
            `;

            cartTotal.textContent = "$0.00";

            return;
        }


        let total = 0;


        cartItems.innerHTML = cart.map((item, index) => {

            total += item.price;

            return `
                <div class="cart-item">

                    <div>
                        <h4>${escapeHTML(item.name)}</h4>

                        <button
                            class="cart-remove"
                            data-index="${index}"
                        >
                            REMOVE
                        </button>
                    </div>

                    <span>
                        $${item.price.toFixed(2)}
                    </span>

                </div>
            `;

        }).join("");


        cartTotal.textContent = `$${total.toFixed(2)}`;


        document.querySelectorAll(".cart-remove").forEach(button => {

            button.addEventListener("click", () => {

                const index = Number(button.dataset.index);

                cart.splice(index, 1);

                updateCart();

            });

        });

    }


    /* =====================================================
       ADD TO CART
       ===================================================== */

    document.querySelectorAll(".product-button:not(.disabled)")
        .forEach(button => {

            button.addEventListener("click", () => {

                const name = button.dataset.product;
                const price = Number(button.dataset.price);


                cart.push({
                    name: name,
                    price: price
                });


                updateCart();


                button.textContent = "ADDED ✓";


                setTimeout(() => {
                    button.textContent = "ADD TO CART";
                }, 1200);


                openCart();

            });

        });


    /* =====================================================
       FAQ
       ===================================================== */

    document.querySelectorAll(".faq-question")
        .forEach(question => {

            question.addEventListener("click", () => {

                const item = question.closest(".faq-item");

                if (!item) {
                    return;
                }


                document.querySelectorAll(".faq-item")
                    .forEach(otherItem => {

                        if (otherItem !== item) {
                            otherItem.classList.remove("open");
                        }

                    });


                item.classList.toggle("open");

            });

        });


    /* =====================================================
       VIDEO MODAL
       ===================================================== */

    const playButton = document.getElementById("playButton");
    const videoModal = document.getElementById("videoModal");
    const closeVideo = document.getElementById("closeVideo");


    function openVideo() {

        if (videoModal) {
            videoModal.classList.add("open");

            document.body.style.overflow = "hidden";
        }

    }


    function closeVideoModal() {

        if (videoModal) {
            videoModal.classList.remove("open");

            document.body.style.overflow = "";
        }

    }


    if (playButton) {
        playButton.addEventListener("click", openVideo);
    }


    if (closeVideo) {
        closeVideo.addEventListener("click", closeVideoModal);
    }


    if (videoModal) {

        videoModal.addEventListener("click", event => {

            if (event.target === videoModal) {
                closeVideoModal();
            }

        });

    }


    /* =====================================================
       ESCAPE KEY
       ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key !== "Escape") {
            return;
        }


        closeCartPanel();
        closeVideoModal();


        if (mobileMenu) {
            mobileMenu.classList.remove("open");
        }

    });


    /* =====================================================
       CHECKOUT
       ===================================================== */

    const checkoutButton =
        document.querySelector(".checkout-button");


    if (checkoutButton) {

        checkoutButton.addEventListener("click", () => {

            if (cart.length === 0) {

                alert("Your cart is empty.");

                return;
            }


            alert(
                "Checkout is not connected yet."
            );

        });

    }


    /* =====================================================
       NAV ACTIVE STATE
       ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".nav-links a");


    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }


                navLinks.forEach(link => {
                    link.classList.remove("active");
                });


                const activeLink =
                    document.querySelector(
                        `.nav-links a[href="#${entry.target.id}"]`
                    );


                if (activeLink) {
                    activeLink.classList.add("active");
                }

            });

        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );


    sections.forEach(section => {
        observer.observe(section);
    });


    /* =====================================================
       SMOOTH NAVIGATION
       ===================================================== */

    document.querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const targetID =
                    link.getAttribute("href");


                if (
                    !targetID ||
                    targetID === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(targetID);


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });


    /* =====================================================
       SIMPLE REVEAL ANIMATION
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".product-card, .feature-card, .review-card, .faq-item"
    );


    revealElements.forEach(element => {

        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition =
            "opacity .6s ease, transform .6s ease";

    });


    const revealObserver =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }


                entry.target.style.opacity = "1";
                entry.target.style.transform =
                    "translateY(0)";


                revealObserver.unobserve(entry.target);

            });

        }, {
            threshold: 0.12
        });


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =====================================================
       ESCAPE HTML
       ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }


    /* =====================================================
       INITIALIZE
       ===================================================== */

    updateCart();

});
```
