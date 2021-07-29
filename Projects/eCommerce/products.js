    let products = document.getElementById("product-list");
    let arr = JSON.parse(localStorage.getItem("data"));
    products.innerHTML = "";


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
        button.innerHTML = "Add to cart";
        button.onclick = addToCart;

        div.append(image, h4, p, button);
        products.append(div);
    }

    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart == null)
        cart = [];

    function containsObject(arr, item) {
        for (var i = 0; i < arr.length; i++) {
            if (item == arr[i])
                return true;
        }
        return false;
    }

    function addToCart(e) {
        let index = e.target.id;
        if (containsObject(cart, arr[index])) {
            alert("Product already exists in cart");
        } else {
            cart.push(arr[index]);
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }

    //after refreshing page, the contains Object function doesn't work the first time and adds same item to cart.