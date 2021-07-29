function slideshow() {
    const arr = ["https://www.knitinfotech.com/wp-content/uploads/2020/08/3-Types-of-web-development.jpg", "https://www.aigtechnologies.in/images/slides/web-development.jpg", "https://4.bp.blogspot.com/-JJhtiqddOEU/XBtb-RNtVjI/AAAAAAAAAB8/B9n9hLVJK6MoES0WVL1EHhaSqYsM9SECgCPcBGAYYCw/s1600/software%2Bdevelopment%2Bcompany%2Bin%2Bdelhi.png"]
    let div = document.getElementById("slideshow");
    let img = document.createElement('img');
    img.src = arr[0];
    div.append(img);
    let i = 0;

    setInterval(function () {
        if (i == 2)
            i = 0;

        i++;
        img.src = arr[i];
    }, 3000)

}

slideshow();

const students = [{
        name: 'Sushanth',
        attendence: 80,
        img: 'https://www.w3schools.com/howto/img_avatar.png'
    },
    {
        name: 'Babloo',
        attendence: 99,
        img: 'https://www.w3schools.com/howto/img_avatar.png'
    }, {
        name: 'Ace',
        attendence: 60,
        img: 'https://www.w3schools.com/howto/img_avatar.png'
    }, {
        name: 'Swathi',
        attendence: 77,
        img: 'https://www.w3schools.com/howto/img_avatar.png'
    }, {
        name: 'Varsha',
        attendence: 85,
        img: 'https://www.w3schools.com/howto/img_avatar.png'
    }, {
        name: 'Srinivas',
        attendence: 81,
        img: 'https://www.w3schools.com/howto/img_avatar.png'
    }
];


if (localStorage.getItem("students") == null)
    localStorage.setItem("students", JSON.stringify(students));

function showStudents(d) {
    let students = d;
    var div = document.getElementById("students");
    div.innerHTML = null;

    for (var i = 0; i < students.length; i++) {
        let main = document.createElement("div");
        main.classList.add("main");
        let p = document.createElement("p");
        let p2 = document.createElement("p");
        let img = document.createElement("img");
        p.innerHTML = "Name: " + students[i].name;
        p2.innerHTML = "Attendence: " + students[i].attendence;
        img.src = students[i].img;

        main.append(p, p2, img);
        div.append(main);

    }
}

showStudents(JSON.parse(localStorage.getItem('students'))); //first time calling showstudents with local storage online

function sortLH() {
    let students = JSON.parse(localStorage.getItem('students'));

    students = students.sort(function (a, b) {
        return a.attendence - b.attendence;
    })
    showStudents(students); //passing sorted students array
}

function sortHL() {
    let students = JSON.parse(localStorage.getItem('students'));

    students = students.sort(function (a, b) {
        return b.attendence - a.attendence;
    })
    showStudents(students); //passing sorted students array
}