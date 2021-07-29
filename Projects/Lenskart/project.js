  // function showSlides(slideIndex) {
  //   var i;
  //   var slides = document.getElementsByClassName("mySlides");

  //   for (i = 0; i < slides.length; i++) {
  //     slides[i].style.display = "none";

  //     slides[slideIndex - 1].style.display = "block";
  //   }

  //   //setInterval(showSlides, 2000);
  // }

  // setInterval(() => {
  //   showSlides(slideIndex);
  // }, 2000);

  // //showSlides(slideIndex);
  var i = 0; //here initially i am taking i value as zero because i am taking url from above array from its starting index which is zero.

  //here i am creating time interval for 2 seconds so that it will display each image in every 2 seconds.

  var arr_imgs = [
    "https://static1.lenskart.com/media/desktop/img/Nov20/25-Nov/UpdatedBanner1912360_16thJune21.jpg",
    "https://static1.lenskart.com/media/desktop/img/Monsoonweb.jpg",
    "https://static1.lenskart.com/media/desktop/img/Mar21/FlexAppeal_Desktop_12thMay21.png",
    "https://static1.lenskart.com/media/desktop/img/Nov20/25-Nov/14thMay_Eyeglasses_DesktopBanner_17thMay21.jpg",
  ];
  setInterval(() => {
    if (i < arr_imgs.length) {
      var imgBox = document.getElementById("slide-show-img-box");
      imgBox.innerHTML = "";
      var img = document.createElement("img");
      img.setAttribute("src", arr_imgs[i]);
      img.setAttribute("id", "slide-show-img");
      imgBox.append(img);
      i = i + 1;
    }

    if (i == 4) {
      i = 0;
    }
  }, 3000);
  ///////////////////////////////////

  ("use strict");

  productScroll();

  function productScroll() {
    let slider = document.getElementById("slider");
    let next = document.getElementsByClassName("pro-next");
    let prev = document.getElementsByClassName("pro-prev");
    let slide = document.getElementById("slide");
    let item = document.getElementById("slide");

    for (let i = 0; i < next.length; i++) {
      //refer elements by class name

      let position = 0; //slider postion

      prev[i].addEventListener("click", function () {
        //click previos button
        if ((position = 0)) {
          //avoid slide left beyond the first item
          position -= 1;
          translateX(position); //translate items
        }
      });

      next[i].addEventListener("click", function () {
        if (position >= 0 && position < hiddenItems()) {
          //avoid slide right beyond the last item
          position += 1;
          translateX(position); //translate items
        }
      });
    }

    function hiddenItems() {
      //get hidden items
      let items = getCount(item, false);
      let visibleItems = slider.offsetWidth / 210;
      return items - Math.ceil(visibleItems);
    }
  }

  function translateX(position) {
    //translate items
    slide.style.left = position * -210 + "px";
  }

  function getCount(parent, getChildrensChildren) {
    //count no of items
    let relevantChildren = 0;
    let children = parent.childNodes.length;
    for (let i = 0; i < children; i++) {
      if (parent.childNodes[i].nodeType != 4) {
        if (getChildrensChildren)
          relevantChildren += getCount(parent.childNodes[i], true);
        relevantChildren++;
      }
    }
    return relevantChildren;
  }

  ////////////////

  /// 3 iamge slideing start here
  let wrapper = document.getElementsByClassName("wrapper");
  let button = document.getElementById("click");
  let button2 = document.getElementById("click2");

  button.addEventListener("click", clicked);
  button2.addEventListener("click", clicked2);
  let scroll = 0;

  // wrapper[0].addEventListener("scroll", function (event) {
  //   scroll = wrapper[0].scrollLeft;
  // });

  function clicked() {
    scroll = scroll += 500;
    wrapper[0].scrollTo({
      left: scroll,
      behavior: "smooth",
    });
    scroll = wrapper[0].scrollLeft + 50;
    console.log(wrapper[0].scrollLeft);
  }

  function clicked2() {
    scroll = scroll -= 500;
    wrapper[0].scrollTo({
      left: scroll,
      behavior: "smooth",
    });
    scroll = wrapper[0].scrollLeft + 50;
    console.log(wrapper[0].scrollLeft);
  }