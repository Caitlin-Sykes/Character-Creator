import random
from flask import Flask, request #imports flask
import generation as gen
import socketStuff as sckt

main = Flask(__name__) #main flask instance
sckt.start_server()



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


#does nothin atm
@main.route("/path", methods=['GET', 'POST'])
def view():
    name = request.form.get('name')
    print(name)
    match(name):
        case "Baldur's Gate 3":
            return "assets/images/bg3.png"
        case _:
            return "lol."


#A function to check the heartbeat, called by the JS
@main.route("/check_heartbeat", methods=['GET'])
def check_heartbeat():
    
    if sckt.heartbeat:
        #Stops the timer
        sckt.heartbeat.cancel()
    
    #Restarts the timer
    sckt.restart_heartbeat()
    return "Still alive."
  

#Run flask    
if __name__ == '__main__':
    port = random.randrange(49152, 65535)
    print(f"Running flask on port {port}")
    main.run(debug=True, port=port)

