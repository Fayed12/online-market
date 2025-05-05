let url = "http://localhost:3000/product";
axios.get(url)
    .then(response => {
        if (response.status === 200) {
            const responseData = response.data;
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let clickCounter = JSON.parse(localStorage.getItem("clickCounter")) || [];

            for (let i = 0; i < responseData.length; i++) {
                let box = document.createElement("div");
                box.className = "box";

                // Create image box
                let imagebox = document.createElement("div");
                let image = document.createElement("img");
                imagebox.className = "image";
                image.src = responseData[i].image;
                image.alt = "product image";
                imagebox.append(image);
                box.append(imagebox);

                // Create box-content 
                let boxcontent = document.createElement("div");
                boxcontent.classList = "box-content";

                // Set product details
                let productName = document.createElement("h4");
                let ProductDiscription = document.createElement("p");
                let divcontainer = document.createElement("div");
                divcontainer.append(productName);
                divcontainer.append(ProductDiscription);
                boxcontent.append(divcontainer);

                // Set price content
                let priceContent = document.createElement("div");
                priceContent.className = "price";
                let price = document.createElement("span");
                priceContent.append(price);

                // Set button
                let btn = document.createElement("button");
                btn.id = `addcart${i}`;
                btn.textContent = "Add to Cart";
                priceContent.append(btn);
                boxcontent.append(priceContent);
                box.append(boxcontent);

                // Set values
                productName.textContent = responseData[i].title;
                ProductDiscription.textContent = responseData[i].discription;
                price.textContent = responseData[i].price;
                document.getElementById("item-content").append(box);

                // Add cart to local storage
                let addbutton = document.getElementById(`addcart${i}`);
                addbutton.addEventListener("click", () => {
                    let cart = JSON.parse(localStorage.getItem("cart")) || [];
                    let clickCounter = JSON.parse(localStorage.getItem("clickCounter")) || {};

                    let exists = cart.some(item => item.id === i + 1);
                    if (!exists) {
                        cart.push({ "id": i + 1, "price": responseData[i].price.slice(1) });
                        localStorage.setItem("cart", JSON.stringify(cart));
                    }

                    // Properly store click count as an object
                    clickCounter[i + 1] = (clickCounter[i + 1] || 0) + 1;
                    localStorage.setItem("clickCounter", JSON.stringify(clickCounter));
                    // Update cart counter dynamically
                    updateCartCounter();
                });
            }

            // Update cart counter on page load
            updateCartCounter();
        }
    });

// Function to maintain cart counter on reload
function updateCartCounter() {
    let result = JSON.parse(localStorage.getItem("cart")) || [];
    let cartcontainer = document.getElementById("cartcontainer");
    cartcontainer.classList.add("cartcounter");
    document.querySelector(".cartcounter").setAttribute("data-counter", result.length);
}

// Menu functionality
let menuopen = document.getElementById("open");
let menuclose = document.getElementById("colse");
let controlmenu = document.getElementById("controlmenu");
let bodycolor = document.getElementById("bodycolor");

menuopen.addEventListener("click", () => {
    controlmenu.style.left = "0px";
    bodycolor.style.display = "block";
});

menuclose.addEventListener("click", () => {
    controlmenu.style.left = "-300px";
    bodycolor.style.display = "none";
});

// Move to cart 
let cartIcon = document.getElementById("cart");
cartIcon.addEventListener("click", () => {
    location.replace("/cart.html");
});

// ==============================================================================================================

// end of code only update 