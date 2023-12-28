const game_tab = document.getElementById('game_tab'); //get button element
const game_container = document.getElementById('container_info');

//Function called when game is clicked
function onGameClick() {
    // console.log("ping");
    // let url = `${host}/supported_games`;
    // console.log(process.env.HOST)

    fetch(url)
        .then((response) => response.json())
        .then((data) => {

            game_container.innerHTML = data;
            console.log(data);

        });
}


// Add a click listener to the button
game_tab.addEventListener('click', onGameClick);