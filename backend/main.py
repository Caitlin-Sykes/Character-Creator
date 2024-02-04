from flask import Flask, request #imports flask
# from flask_cors import CORS #imports cross origin request
import generation as gen

main = Flask(__name__) #main flask instance

# CORS(main)


@main.route('/')
def landing_page():
    return "hello this is the main page. nice to meet you."

# Gets all specific games
@main.route('/supported_games',  methods=['GET'])
def get_supported_games():
    return gen.get_games_from_json()

#Gets the data for the specific game that is in the drop down
@main.route('/specific_games',  methods=['GET'])
def get_specific_games():
    return gen.generate_random_race()


@main.route("/path", methods=['GET', 'POST'])
def view():
    name = request.form.get('name')
    print(name)
    match(name):
        case "Baldur's Gate 3":
            return "assets/images/bg3.png"
        case _:
            return "lol."
    ...
#Run flask    
if __name__ == '__main__':
    main.run(debug=True, port=8028)

