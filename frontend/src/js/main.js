// Sets up electron stuff
const { app, BrowserWindow } = require('electron/main');
let WebSocket = require('ws')
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

// Function to establish WebSocket connection with retry
function establishWebSocketConnection() {
    const client = new WebSocket("ws://localhost:8080");

    client.on('open', () => {
        console.log('WebSocket connection established.');
        // Optionally, you can send initial data or perform other actions here
    });

    client.on('message', (message) => {
        console.log('Received message:', message);
        // Handle incoming messages from the WebSocket server
    });

    client.on('error', (error) => {
        console.error('WebSocket connection error:', error);
        // Retry establishing the connection after a delay
        setTimeout(establishWebSocketConnection, 2000); // Retry after 2 seconds
    });


    // Creates python process
    let python = require('child_process').spawn('python', ['./backend/main.py']);
    python.stdout.on('data', function (data) {
        console.log("data: ", data.toString('utf8'));
    });
    python.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`); // when error
    });

    //links to frontend page
    win.loadFile('frontend/index.html') 

}

//A function to open the websocket & ping it
function heartbeat() {

    //Opens websocket
    socket.onopen = function (e) {
        alert("Ah, ah, ah, ah, stayin alive.");
        socket.send("Ah, ah, ah, ah, stayin alive.");
    };
}

// Event listener when Electron app is ready
app.whenReady().then(() => {
    // Create Electron window
    createWindow();

    // Attempt to establish WebSocket connection
    establishWebSocketConnection();

    // Event listener when all windows are closed
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });


//On closey stuff
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// Runs flask server as a background process, hides it
backend = path.join(process.cwd(), 'dist/main.exe')
let execfile = require("child_process").execFile;
execfile(
    backend,
    {
        windowsHide: true,
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