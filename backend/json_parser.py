import json

# Gets the json file
def get_json():
    with open('.\\assets\\games_info.json', 'r') as file:
        return json.load(file)

# A function to get all the supported games from the json
def get_games_from_json():
    game_data = get_json() #gets json file as game_data
    return (list(game_data.keys())) #returns the games in the json file