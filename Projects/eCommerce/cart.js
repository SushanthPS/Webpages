let cartDiv = document.getElementById("cart-list");
let arr = JSON.parse(localStorage.getItem("cart"));

let items = document.getElementById("items");
let price = document.getElementById("price");
let sum;
let discount = 0;

function showElements() {
    cartDiv.innerHTML = "";
    sum = 0;
    arr = JSON.parse(localStorage.getItem("cart"));
    for (var i = 0; i < arr.length; i++) {
        let div = document.createElement("div");
        div.setAttribute("class", "box");
        let image = document.createElement("img");
        let h4 = document.createElement("h4");
        let p = document.createElement("p");
        let button = document.createElement("button");
        button.setAttribute("id", i);

        image.src = arr[i].url;
        h4.innerHTML = arr[i].name;
        p.innerHTML = `&#x20B9 ${arr[i].price}`
        sum += Number(arr[i].price);
        button.innerHTML = "Remove";
        button.onclick = remove;

        div.append(image, h4, p, button);
        cartDiv.append(div);
    }
    discount = sum - Math.floor(30 / 100 * sum);
    items.innerHTML = `Total Items: ${arr.length}`
    price.innerHTML = `Total Price: &#x20B9 ${sum}`

}

showElements();

function remove(e) {
    var index = e.target.id;
    arr.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(arr));
    showElements();
}

let code = document.getElementById("promocode");
let text = document.getElementById("code");
let div = document.getElementById("counter");
let discountText = document.createElement("div");
let box = document.getElementById("counter");


function promo() {
    if (code.value == "masai30") {
        text.style.color = "green";
        text.innerHTML = "Promo Applied!";
        price.style.textDecoration = "line-through";
        discountText.innerHTML = `Promo Price: &#x20B9 ${discount}`
        div.append(discountText);
        box.style.height = "120px";

    } else {
        text.style.color = "red";
        text.innerHTML = "Invalid Code!";
    }

}

function abc() {
    window.location.href = "success.html";
}