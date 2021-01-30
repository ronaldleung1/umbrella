const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const firebase = require("firebase");
const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;
let a = "default";
var firebaseConfig = {
  apiKey: "AIzaSyCpmpvJf97k5ErAIGXsdWj179NI9SE-NSU",
  authDomain: "hackmcst-cd4ad.firebaseapp.com",
  databaseURL: "https://hackmcst-cd4ad-default-rtdb.firebaseio.com",
  projectId: "hackmcst-cd4ad",
  storageBucket: "hackmcst-cd4ad.appspot.com",
  messagingSenderId: "672039833363",
  appId: "1:672039833363:web:6f697c5da5abf22b9454e6",
  measurementId: "G-HH9GZYD1H6"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}
 
// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  // Answer API requests.
  app.get("/postit.json", (req, res)=>{
    a = firebase.database().ref("/")
    a.on("value", data=>{
      res.json(data);
    })    
  })
  app.get("/postPostIt", (req, res)=>{
    
    firebase.database().ref("/").push({value: req.query.value});

  })
  app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  });
}
