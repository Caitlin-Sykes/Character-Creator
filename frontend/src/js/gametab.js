const game_container = document.getElementById('container_info');


//Sets up the game selection
async function setUpGameSelect() {

    //Gets the game dropdown box & fetches data from the end point
    let dropdown = document.getElementById('container_game_dropdown');
    let game_data = await fetchData("http://127.0.0.1:5000/supported_games");

    // Add options based on the fetched data
    if (game_data != null || game_data != undefined) {
        //For each game in the array that was fetched, creates an item in the dropdown
        game_data.forEach((game) => {
            const option = document.createElement("option");
            option.value = game;
            option.textContent = game;
            dropdown.appendChild(option);
        });

    //Appends to the container
    if (game_container != null && dropdown != null) {
        // Assuming game_container is defined somewhere in your code
        game_container.appendChild(dropdown);
    }
    }
}

// Gets data from the fed in url and returns it as an array
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function sendGame(event) {
    //Get the container_game_dropdown
    var dropdown = document.getElementById("container_game_dropdown");

    // Get the selected option
    var selectedOption = dropdown.options[dropdown.selectedIndex];

    // Get the value of the selected option
    var selectedValue = selectedOption.value;

    //Sends a request to the backend
   
}

//On the DOM load, runs the commands
document.addEventListener("DOMContentLoaded", function (arg) {
    setUpGameSelect();

    //Gets drop down
    let game_drop_down = document.getElementById("submitGame")

    //For every tab in tabs, add event listener
    game_drop_down.addEventListener("click", sendGame);
});