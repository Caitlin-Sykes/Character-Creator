import asyncio
import websockets
from threading import Timer

server = None # server init
HEARTBEAT_TIMEOUT = 360 #Timeout for heartbeat (six mins)
heartbeat = None #heartbeat timer 

# create handler for each connection
async def handler(websocket, path):
    data = await websocket.recv()
    reply = f"Data recieved as:  {data}!"
    await websocket.send(reply)
 
# Command to start the server
def start_server():
    print("Starting server...", flush=True)
    global server 
    if server:
        return server
    else:
        # restart_heartbeat() #starts the heartbeat
        server = websockets.serve(handler, "localhost", 8080)
        asyncio.get_event_loop().run_until_complete(server)
        asyncio.get_event_loop().run_forever()

#Function to restart the heartbeat
#Calls "death" function if timeframe [HEARTBEAT_TIMEOUT] has passed.
def restart_heartbeat():
    global heartbeat
    # heartbeat = Timer(HEARTBEAT_TIMEOUT)
    # heartbeat.start()
    
def death():
    print("Killing the server...", flush=True)
    asyncio.get_event_loop().stop()
    