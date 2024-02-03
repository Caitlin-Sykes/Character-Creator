//A function to handle clicking on a tab
function tab_click(event) {
    let currentTab = event.getAttribute("id"); //gets the attribute of the thing calling the func
    let neighbourTabs = event.getElementsByClassName("tab");
   
   
    //For every neighbour tab, add "checked" - DaisyUI's "active"
    neighbourTabs.forEach((tab) => {
        // Probs should check you dont add it twice
        if (tab.getAttribute("id") === currentTab) {
            tab.setAttribute("checked");
        }
            
        else {
            tab.removeAttribute("checked");
        }       
    });
}

//On the DOM load, runs the commands
document.addEventListener("DOMContentLoaded", function () {
    //Sets initial tab to A and gets all tabs with class name tab
    // let currentTab = "tabA"
    let tabs = Array.from(document.getElementsByClassName("tab"));

    //For every tab in tabs, add event listener
    tabs.forEach((tab) => {
      tab.addEventListener("click", tab_click);

    });
});