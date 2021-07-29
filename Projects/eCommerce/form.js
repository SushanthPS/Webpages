let form = document.getElementById("product-form");

function addProduct(e) {
    e.preventDefault();
    let name = form.name.value;
    let price = form.price.value;
    let url = form.url.value;
    let flag = true;

    if (name == "" || price == "" || url == "") {
        alert("Invalid Inputs");
        flag = false;
    }

    if (flag) {
        let data = {
            name,
            price,
            url
        };

        let arr = JSON.parse(localStorage.getItem("data"));
        if (arr == null)
            arr = [];

        arr.push(data);

        localStorage.setItem("data", JSON.stringify(arr));

        alert("Product Added Successfully")
        form.name.value = "";
        form.price.value = "";
        form.url.value = "";

    }
}