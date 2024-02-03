// //A function to handle clicking on a tab
// function tab_click(event) {
//     let currentTab = event.target.getAttribute("id"); //gets the attribute of clicked tab "checked"
//     let neighbourTabs = Array.from(document.getElementsByClassName("tab"));
   
//     //For every neighbour tab, add "checked" - DaisyUI's "active"
//     neighbourTabs.forEach((tab) => {
//         console.log(tab);
//         // Probs should check you dont add it twice
//         if (tab.getAttribute("id") === currentTab) {
//             tab.setAttribute("checked", "checked"); //it is just "checked" in the docs but the func takes two params
//             // tab.classList.add("RED");
//         }
            
//         else {
//             tab.removeAttribute("checked");
//             // tab.classList.remove("RED");

//         }       
//     });
// }

//On the DOM load, runs the commands
// document.addEventListener("DOMContentLoaded", function () {
//     //Sets initial tab to A and gets all tabs with class name tab
//     // let currentTab = "tabA"
//     let tabs = Array.from(document.getElementsByClassName("tab"));

//     //For every tab in tabs, add event listener
//     tabs.forEach((tab) => {
//       tab.addEventListener("click", tab_click);

//     });
// });

//code works but completely redundant