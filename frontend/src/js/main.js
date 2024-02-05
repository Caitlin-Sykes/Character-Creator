// Sets up electron stuff
const { app, BrowserWindow } = require('electron/main');
const path = require('path');
const HOST = "http://127.0.0.1:"
const PORT = "8028"


// Creates electron window
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
    })

    //TODO: maybe change this, bit unsafe.
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
function heartbeatAlive() {
    //Pings the endpoint
    fetch(`${HOST}${PORT}/check_heartbeat`, {
        method: "POST",
    })
        //Response for alive
        .then(response => {
            console.log('Thump. Thump. Thump. Still alive.');
        })
        //Response for error
        .catch(error => {
            console.error('** Flatline **', error);
        });
}

// Pings every 5 mins
setInterval(heartbeatAlive, 50000)

// More random electron stuff
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

//On closey stuff
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
    //Post request to kill server
    fetch(`${HOST}${PORT}/kill`, {
        method: "POST",
    });
})

// Runs flask server as a background process, hides it
backend = path.join(process.cwd(), 'dist/main.exe')
var execfile = require("child_process").execFile;
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