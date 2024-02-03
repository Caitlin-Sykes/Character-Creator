import json
class json_parser:
    def __init__(self):
        self.game_data = self.get_json()

    # Gets the json file and stores it in g
    def get_json(self):
        with open('.\\assets\\games_info.json', 'r') as file:
            game_data = json.load(file)

            if not isinstance(game_data, dict):
                game_data = {}
            return game_data

# Instance of json parser
jp_inst = json_parser()