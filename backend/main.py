from flask import Flask #imports flask
import json_parser as jp

main = Flask(__name__) #main flask instance

@main.route('/supported_games')
def getSupportedGames():
    print(jp.get_games_from_json())
    return jp.get_games_from_json()
    
    
    
#Run flask    
if __name__ == '__main__':
    main.run()

