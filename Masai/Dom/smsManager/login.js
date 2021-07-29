const admins = [{
        username: "icarus",
        password: "icarus123",
    },
    {
        username: "zeus",
        password: "zeus123",
    },
    {
        username: "ares",
        password: "ares123",
    }
]

if (localStorage.getItem('admins') == null)
    localStorage.setItem('admins', JSON.stringify(admins));


function startLogin(e) {
    e.preventDefault();

    const form = document.getElementById("login");

    //STEP 1 : get the data
    const username = form.username.value;
    const password = form.password.value;


    //STEP 2 : validate the data

    const admins = JSON.parse(localStorage.getItem('admins'));
    for (var i = 0; i < admins.length; i++) {
        let u = admins[i].username;
        let p = admins[i].password;

        if (u == username && p == password) {
            window.location.href = 'home.html';
            break;
        }
    }
}