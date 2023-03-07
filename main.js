const { app, BrowserWindow, Menu, shell, ipcMain } = require('electron')
const path = require('path')
const mysql = require('mysql2')
// //////////////creating menu ///////////////////////////////////////////
const maleriaMenu = [
  // {
  //   label: 'About Malaria App',
  //   click: async () => {
  //   }
  // }, 
  // {
  //   role: 'quit'
  // }
]
const menu = Menu.buildFromTemplate(maleriaMenu)
Menu.setApplicationMenu(menu)
function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 600,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      preload: path.join(__dirname, '/pages/pagesPreload.js'),
    }
  })
  ipcMain.on('set-massg', (event, data) => {
    mySqliFunc(data)
  })
  ipcMain.on('get-historys', (event, data) => {
    history().then(data => {
      win.webContents.send('send-history', data)
    })
  })
  win.loadFile('index.html')
  win.once("ready-to-show", () => win.show())
}
app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
}).catch(err => console.log(err))
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

function history() {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'malariapredictionapp',
      password: ''
    })

    connection.query(
      'SELECT * FROM `malariapredictiontable`',
      function (err, results) {
        if (err) {
          console.log(err)
          reject(err)
          return
        }

        resolve(results)
        connection.end(err => {
          if (err)
            console.log(err)
        })
      }
    )
  })
}

function mySqliFunc(data) {
  try {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'malariapredictionapp',
      password: ''
    })
    console.log(`Your Rated with ${data[0]}, and ${data[1]}`)
    connection.query(
      'INSERT INTO malariapredictiontable(score, message) VALUES(?, ?)',
      [data[0], data[1]],
      function (err, results) {
      }
    )
    connection.end(err => {
      if (err) console.log(err)
    })
    return true
  } catch (err) {
    console.log(err.message)
    return false
  }
}
