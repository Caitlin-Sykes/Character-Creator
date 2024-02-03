//A function to handle clicking on a tab
function tab_click(event) {
    let currentTab = event.target.getAttribute("id"); //gets the attribute of clicked tab "checked"
    let neighbourTabs = document.querySelectorAll("input.tab, div.tab-content");
   
    //For every neighbour tab, add tab-active
    neighbourTabs.forEach((tab) => {
        console.log(tab);
        // Probs should check you dont add it twice
        if (tab.getAttribute("id") === currentTab) {
            tab.classList.add("tab-active");
        }
            
        else {
            tab.classList.remove("tab-active");
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

