async function getData(url) {
    let res = await fetch(url)
    let data = await res.json();
    return data.data;
}

function appendData(data, dataDiv) {
    dataDiv.innerHTML = "";
    let id = 0;
    data.forEach(({
        title
    }) => {
        let div = document.createElement("div");
        let h3 = document.createElement("h3");
        h3.innerHTML = title;
        div.append(h3);
        div.setAttribute("id", id);
        id++;
        div.addEventListener("click", (event) => {
            let obj = data[div.id];
            localStorage.setItem("obj", JSON.stringify(obj));
            window.location.href = "news.html"

        })
        dataDiv.append(div);
    })
}



export {
    getData,
    appendData
}