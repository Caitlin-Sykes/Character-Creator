//A function to handle clicking on a tab
function tab_click(event) {
    let currentTab = event.target.getAttribute("tab-id"); //gets the attribute of clicked tab "tab-id"
    let neighbourTabs = document.querySelectorAll("input.tab-id, div.content"); //gets input tabs and panel tabs
   
    //For every neighbour tab, add tab-active
    neighbourTabs.forEach((tab) => {

        // Probs should check you dont add it twice
        if (tab.getAttribute("tab-id") === currentTab) {
            tab.classList.add("tab-active");  
            tab.classList.remove("hidden");
        }
            
        else {
            console.log(tab);
            tab.classList.remove("tab-active");
            if (tab.classList.contains("content")) {
                tab.classList.add("hidden")
            }
        }       
    });
}

//On the DOM load, runs the commands
document.addEventListener("DOMContentLoaded", function () {
    //Gets all tabs with class name tab
    let tabs = Array.from(document.getElementsByClassName("tab"));

    //For every tab in tabs, add event listener
    tabs.forEach((tab) => {
      tab.addEventListener("click", tab_click);

    });
});

