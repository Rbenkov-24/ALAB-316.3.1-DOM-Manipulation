//=====================Part 1================================
let mainEL = document.querySelector("main");
mainEL.style.backgroundColor = "var(--main-bg)";
mainEL.innerHTML = "<h1>DOM Manipulation</h1>";
mainEL.classList.add("flex-ctr");

//=====================Part 2================================
let topMenuEl = document.getElementById("top-menu");
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
topMenuEl.classList.add("flex-around");

//=====================Part 3================================

// Menu data structure
/*var menuLinks = [
  { text: "about", href: "/about" },
  { text: "catalog", href: "/catalog" },
  { text: "orders", href: "/orders" },
  { text: "account", href: "/account" },
];*/

//updated menu
var menuLinks = [
  { text: "about", href: "/about" },
  {
    text: "catalog",
    href: "#",
    subLinks: [
      { text: "all", href: "/catalog/all" },
      { text: "top selling", href: "/catalog/top" },
      { text: "search", href: "/catalog/search" },
    ],
  },
  {
    text: "orders",
    href: "#",
    subLinks: [
      { text: "new", href: "/orders/new" },
      { text: "pending", href: "/orders/pending" },
      { text: "history", href: "/orders/history" },
    ],
  },
  {
    text: "account",
    href: "#",
    subLinks: [
      { text: "profile", href: "/account/profile" },
      { text: "sign out", href: "/account/signout" },
    ],
  },
];

// adding menu links to the top menu
/*
  menuLinks.forEach(link=>){
  const a= document.createElement('a')}
  */ 

menuLinks.forEach(function (link) {
  var a = document.createElement("a");
  a.setAttribute("href", link.href);
  a.textContent = link.text;
  topMenuEl.appendChild(a);
});

//select nav id and store it in variable
const subMenuEl = document.querySelector("#sub-menu");

//set the height
subMenuEl.style.height = '100%';

//set the background color
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";

//add the flex-around class to center its children
/* subMenuEl.classList.add('flex-around')*/ //OR
subMenuEl.setAttribute("class", "flex-around");

//set the position to absolute
subMenuEl.style.position = "absolute";

//set the top property
subMenuEl.style.top = '0';

//select the nav id=top-menu
//const topMenuEl = document.querySelector("#top-menu");

//select all a elements inside the topMenuEl
const topMenuLinks = topMenuEl.querySelectorAll("a");

//add an event listener to topMenuEl
//(e) or (event) the same
topMenuEl.addEventListener("click",function (e) {
    e.preventDefault(); //to prevent the default behavior of 'a' links

    const clickedEl = e.target;
    if (clickedEl.tagName !== "A") return;

    console.log(clickedEl.textContent);

    //toggle the active class on the clicked element
    if (!clickedEl.classList.contains("active")) {
      //remove all acrtive class fro all top menu links
      topMenuLinks.forEach((link) => link.classList.remove("active"));
      //add the active class to the clicked link
      clickedEl.classList.add("active");
    } else {
      //if the clicked link was already active remove the active class
      clickedEl.classList.remove("active");
    }

    //find the link object in the menulinks array that matches the clicked a
    const linkObj = menuLinks.find(
      (link) => link.text === clickedEl.textContent
    );

    //if theb cklicked ink has sublinks build the submenu
    if (linkObj && linkObj.subLinks) {
      buildSubmenu(linkObj.subLinks);
      //show the submenu by setting its top property to 100%
      subMenuEl.style.top = "100%";
    } else {
      //hide the submenu if there are no sublinks
      subMenuEl.style.top = "0";
    }
  });

//add an event listener that will handle clicks on its children
subMenuEl.addEventListener('click', function(e) {
    e.preventDefault();

    const clickedEl = e.target;
    if (clickedEl.tagName !== 'A') return;

    //log the content
    console.log(clickedEl.textContent);

    //update the h1 
    mainEL.innerHTML = `<h1>${clickedEl.textContent}</h1>`;

    //hide the sub menu 
    subMenuEl.style.top = '0';

    //remove the active class 
    topMenuLinks.forEach((link) => link.classList.remove('active'))
});

function buildSubmenu(subLinks){

    subMenuEl.innerHTML = '';

    subLinks.forEach(function (subLink) {
        var a = document.createElement ('a');
        a.setAttribute('href', subLink.href);
        a.textContent = subLink.text;
        subMenuEl.appendChild(a);
    });
}

