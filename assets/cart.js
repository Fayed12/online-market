let ContinueItem = document.getElementById("ContinueItem");
let checkout = document.getElementById("checkout");
ContinueItem.addEventListener("click", () => {
    location.replace("/product.html");
})
checkout.addEventListener("click", () => {
    location.replace("/checkout.html")
})

// get item from local storage to cart page
let result = JSON.parse(localStorage.getItem("cart")) || [];
let count = JSON.parse(localStorage.getItem("clickCounter")) || [];
console.log(count)
axios.get('http://localhost:3000/product')
    .then(response => {
        const responseData = response.data;
        for (let i = 0; i < result.length; i++) {
            let productbox = document.getElementById("cartbox");

            // Create box content
            let boxcontent = document.createElement("div");
            boxcontent.className = "box";
            boxcontent.style.display = "flex";

            // Counter and description container
            let divall = document.createElement("div");
            divall.className = "boxcontent";

            // Counter
            let counter = document.createElement("span");
            counter.className = "counterspan";
            let spancontainer = document.createElement("div");
            spancontainer.append(counter);
            spancontainer.className = "spancontainer";

            // Description
            let description = document.createElement("div");
            description.className = "description";
            let h4 = document.createElement("h4");
            description.append(h4);
            divall.append(spancontainer);
            divall.append(description);
            boxcontent.append(divall);

            // Paragraph for description
            let para = document.createElement("p");
            description.append(para);

            // Price span
            let price = document.createElement("span");
            description.append(price);

            // Create "Remove" button with a unique ID
            let remove = document.createElement("button");
            remove.id = `remove-${i}`;  // Assign unique ID for each button
            remove.textContent = "Remove";
            let buttoncontainer = document.createElement("div");
            buttoncontainer.className = "buttoncontainer";
            buttoncontainer.append(remove);
            boxcontent.append(buttoncontainer);

            // Append box to container
            productbox.append(boxcontent);

            // Set values
            counter.textContent = count[(result[i].id)];
            h4.textContent = responseData[(result[i].id) - 1].title;
            para.textContent = responseData[(result[i].id) - 1].discription;
            price.textContent = "$ " + Math.round(((result[i].price) * (count[(result[i].id)])));

            // **Remove item when button is clicked**
            remove.addEventListener("click", () => {
                // Remove item from cart and click counter
                result.splice(i, 1);
                // delete count[result[i]?.id];  // Ensure correct count removal
                localStorage.removeItem(count.i)
                // Update localStorage
                localStorage.setItem("cart", JSON.stringify(result));
                localStorage.setItem("clickCounter", JSON.stringify(count));

                // Reload page or dynamically update UI
                if (result.length == 0) {
                    localStorage.clear();
                }
                location.reload();
            });
        }
    });

// Function to maintain cart counter on reload
function updateCartCounter() {
    let result = JSON.parse(localStorage.getItem("cart")) || [];
    let cartcontainer = document.getElementById("cartcontainer");
    cartcontainer.classList.add("cartcounter");
    document.querySelector(".cartcounter").setAttribute("data-counter", result.length);
}

// ==============================================================================================================

// end of code only update 