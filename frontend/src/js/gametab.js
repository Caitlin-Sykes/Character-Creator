const game_tab = document.getElementById('game_tab'); //get button element
const game_container = document.getElementById('container_info');

//Function called when game is clicked
function onGameClick() {
    game_container.innerHTML = "<div>mwahaha this was added using a button</div>"
}

// Add a click listener to the button
game_tab.addEventListener('click', onGameClick);