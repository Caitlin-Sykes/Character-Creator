// Sets up electron stuff
const { app, BrowserWindow } = require('electron/main');
let WebSocket = require('ws')
let client; //defines websocket
let python;
const path = require('path');


// Creates electron window
function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile('frontend/index.html');

    // Close Electron window when app is closed
    win.on('closed', () => {
        win = null;
    });
}

// Function to establish WebSocket connection
function establishWebSocketConnection() {
    //Inits websocket if it doesn't exist
    if (!client || client.readyState !== WebSocket.OPEN) {
        createPythonServer()
        client = new WebSocket("ws://localhost:3000");
       

        client.on('open', () => {
            console.log('WebSocket connection established.');
            // Optionally, you can send initial data or perform other actions here
        });
    }

    client.on('message', (message) => {
        console.log('Received message:', message);
        // Handle incoming messages from the WebSocket server
    });

    client.on('error', (error) => {
        console.error('WebSocket connection error:', error);
        // Retry establishing the connection after a delay
        setTimeout(establishWebSocketConnection, 10000);
    });

    //links to frontend page
    win.loadFile('frontend/index.html')

}

//Detects keyboard interrupts
process.on('SIGINT', function () {
    console.log("The server is flatlining. The flask is broken. Electron is self-destructing.");
    killFlask();
    client.close();
    app.quit();
    process.exit(); // Exit the Node.js process
});

//Every five minutes send heartbeat
setInterval(heartbeat, 300000)

//Inits the WebSocket server
function createPythonServer() {
    console.log("Starting the python websocket...")
    // Creates python process
    let python = require('child_process').spawn('python', ['./backend/main.py']);
    python.stdout.on('data', function (data) {
        console.log("data: ", data.toString('utf8'));
    });
    python.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`); // when error
    });
}  


//A function to open the websocket & ping it
function heartbeat() {

    //Opens websocket
    client.onopen = function (e) {
        alert("Ah, ah, ah, ah, stayin alive.");
        client.send("CPR");
    };

    client.on('error', (error) => {
        console.error("Your cause of death is: ", error);
    })
}

// Function to send a "kill" message to the server
function killFlask() {
    console.log("Sending command to kill flask...")
    client.send('kill');
}

// Event listener when Electron app is ready
app.whenReady().then(() => {
    // Create Electron window
    createWindow();

    // Attempt to establish WebSocket connection
    establishWebSocketConnection();

    // Event listener when all windows are closed
    app.on('window-all-closed', () => {
        killFlask()
        client.close();
        app.quit()
    });

// Runs flask server as a background process, hides it
backend = path.join(process.cwd(), 'dist/main.exe')
let execfile = require("child_process").execFile;
execfile(
    backend,
    {
        windowsHide: true, //change to true
    },
    (err, stdout, stderr) => {
        if (err) {
            console.log(err);
        }
        if (stdout) {
            console.log(stdout);
        }
        if (stderr) {
            console.log(stderr);
        }
    }
)
})