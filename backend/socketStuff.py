import asyncio
import os
import websockets
import random
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
    else:
        print(message)
 
# Command to start the server
def start_server():
    global server 
    if server:
        print("Giving the server CPR")
        restart_heartbeat() #starts the heartbeat
        print("Returning the server...")
        return server
    else:
        # TODO: Look into the asyncio stuff, looks to me that bcs of how this is setup, the stdio buffs never get flushed, so js can't tell its running :P add a new thread for this maybe or something idk 🤷 and well tbh if the WS is only used for a heartbeat and not actually used for proper comms, seems rather pointless, using child_process.spawn it should spawn as a child to the main process thus when parent is closed, child is too.
        print("Starting the python socket...")
        port = random.randrange(49152, 65535) # These are registered as Ephemeral Ports, so should be safe, and with such a large range - I ain't gonna do any safety checks :P
        server = websockets.serve(handler, "localhost", port)
        print(f"RUNNING ON PORT:{port}")
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
    