// Sets up electron stuff
const { app, BrowserWindow } = require('electron/main');
const path = require('path');


// Creates electron window
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })

    // Creates python process
    var python = require('child_process').spawn('py', ['./backend/main.py']);
    python.stdout.on('data', function (data) {
        console.log("data: ", data.toString('utf8'));
    });
    python.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`); // when error
    });

    //links to frontend page
    win.loadFile('frontend/index.html') 
    
}

// More random electron stuff
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        const { exec } = require('child_process');
        exec('taskkill / f / t / im app.exe', (err, stdout, stderr) => {
            if (err) {
                console.log(err)
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
        app.quit()
    }
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