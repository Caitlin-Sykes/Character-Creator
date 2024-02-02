from flask import jsonify
import json_parser as jp

# A function to get all the supported games from the json
def get_games_from_json():
    return list(jp.jp_inst.game_data.keys()) #returns the games in the json file

# A function to generate a random race
def generate_random_race():
    return jsonify(jp.jp_inst.game_data.get("Baldur's Gate 3"))