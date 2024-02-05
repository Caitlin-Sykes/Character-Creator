import os
from threading import Timer
from flask import Flask, request #imports flask
import generation as gen

main = Flask(__name__) #main flask instance
HEARTBEAT_TIMEOUT = 360 #Timeout for heartbeat (six mins)
heartbeat = None


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
    global heartbeat
    
    if heartbeat:
        #Stops the timer
        heartbeat.cancel() 
    
    #Restarts the timer
    restart_heartbeat()
    return "Still alive."
  
    
#Kills just the flask server
@main.route("/kill", methods=['GET'])
def death():
    print("Killing the server...", flush=True)
    os._exit(0)

#Function to restart the heartbeat
#Calls "death" function if timeframe [HEARTBEAT_TIMEOUT] has passed.
def restart_heartbeat():
    global heartbeat
    heartbeat = Timer(HEARTBEAT_TIMEOUT, death)
    heartbeat.start()

#Run flask    
if __name__ == '__main__':
    restart_heartbeat()
    main.run(debug=True, port=8028)

