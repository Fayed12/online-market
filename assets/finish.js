
// get item from local storage to cart page
let result = JSON.parse(localStorage.getItem("cart")) || [];
let count = JSON.parse(localStorage.getItem("clickCounter")) || [];
console.log(count)
axios.get('http://localhost:3000/product')
    .then(response => {
        const responseData = response.data;
        for (let i = 0; i < result.length; i++) {
            let productbox = document.getElementById("productinfo");

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

            // Append box to container
            productbox.append(boxcontent);

            // Set values
            counter.textContent = count[(result[i].id)];
            h4.textContent = responseData[(result[i].id) - 1].title;
            para.textContent = responseData[(result[i].id) - 1].discription;
            price.textContent = "$ " + Math.round((((result[i].price) * (count[(result[i].id)]))));
        }
    });

// Move to all items by cancel button
document.getElementById("cancel").addEventListener("click", () => {
    location.replace("/product.html");
});

// Move to finish by continue button

// functions of input 
let fname = document.getElementById("fname");
let lname = document.getElementById("lname");
let Postal = document.getElementById("Postal");
// set default value to postal
Postal.value = "+2320"
let continuebtn = document.getElementById("continue");
continuebtn.addEventListener("click", (e) => {
    if (fname.value == "" || lname.value == "" || Postal.value == "") {
        e.preventDefault();
        alert("please fill the information")
    } else {
        window.open("/finish.html", "_self");
    }
})
// save fname value
fname.oninput = () => {
    sessionStorage.setItem("firstName", fname.value);
}
fname.value = sessionStorage.getItem("firstName");
// save lname value
lname.oninput = () => {
    sessionStorage.setItem("lastName", lname.value);
}
lname.value = sessionStorage.getItem("lastName");
// save Postal value
Postal.oninput = () => {
    sessionStorage.setItem("postal", Postal.value);
}
Postal.value = sessionStorage.getItem("postal");


// go to finish page and add reset