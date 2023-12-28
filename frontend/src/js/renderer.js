
let test = "supported_games"
async function makePostRequest(test) {
    axios.post('http://127.0.0.1:80/supported_games', test)
 .then(function (response) {
        console.log('It says: ', response.data);
    })
            .catch(function (error) {
                console.log(error);
            });
}