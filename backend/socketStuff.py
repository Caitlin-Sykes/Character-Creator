import asyncio
import os
import websockets
from threading import Timer

server = None # server init
HEARTBEAT_TIMEOUT = 360 #Timeout for heartbeat (six mins)
heartbeat = None #heartbeat timer 

# create handler for each connection
async def handler(websocket, path):
    message = await websocket.recv()
    if message == "kill":
        print("Killing the server...")
        await websocket.close() #closes websocket.
        death()
    elif message == "CPR":
        print("You're alive for a little bit longer.")
        restart_heartbeat()
 
# Command to start the server
def start_server():
    global server 
    if server:
        print("Giving the server CPR")
        restart_heartbeat() #starts the heartbeat
        print("Returning the server...")
        return server
    else:
        print("Starting the server...")
        server = websockets.serve(handler, "localhost", 3000)
        asyncio.get_event_loop().run_until_complete(server)
        asyncio.get_event_loop().run_forever()


#Function to restart the heartbeat
#Calls "death" function if timeframe [HEARTBEAT_TIMEOUT] has passed.
def restart_heartbeat():
    global heartbeat
    heartbeat = Timer(HEARTBEAT_TIMEOUT, death)
    heartbeat.start()
  
# Flask and Server flatline
# (They die.)  
def death():
    asyncio.get_event_loop().stop()
    os._exit(0)
    