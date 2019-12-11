const express = require("express");
const cors = require("cors");
const app = express();
let path = require("path");

const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors());


app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Shifty526",
    database: "nfl_StatsDB"
  });

  
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  
  // Connect to the database
connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
});


app.get("/api/all-players", cors(), (req, res) => {
    var dbQuery = "SELECT * FROM SavedFantasyPlayers";

    connection.query(dbQuery, function(err, result) {
      if (err) throw err;
      console.log(result)
      res.json(result);
    });
});

app.post("/api/new-player", cors(), function(req, res) {
    console.log(req.body);
    var dbQuery = "INSERT INTO SavedFantasyPlayers (player_name, player_ID, player_position, player_team, player_weekly_DK_FP, player_weekly_FD_FP, player_weekly_YOO_FP, player_weekly_passingYards, player_weekly_passingTouchdowns, player_weekly_rushingYards, player_weekly_rushingTouchdowns, player_weekly_receivingYards, player_weekly_receivingTouchdowns, player_season_DK_FP, player_season_FD_FP, player_season_YOO_FP, player_season_passingYards, player_season_passingTouchdowns, player_season_rushingYards, player_season_rushingTouchdowns, player_season_receivingYards, player_season_receivingTouchdowns) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,? )";
  
     connection.query(dbQuery, [req.body.player_name, req.body.player_ID, req.body.player_position, req.body.player_team, req.body.player_weekly_DK_FP, req.body.player_weekly_FD_FP, req.body.player_weekly_YOO_FP, req.body.player_weekly_passingYards, req.body.player_weekly_passingTouchdowns, req.body.player_weekly_rushingYards, req.body.player_weekly_rushingTouchdowns, req.body.player_weekly_receivingYards, req.body.player_weekly_receivingTouchdowns, req.body.player_season_DK_FP, req.body.player_season_FD_FP, req.body.player_season_YOO_FP, req.body.player_season_passingYards, req.body.player_season_passingTouchdowns, req.body.player_season_rushingYards, req.body.player_season_rushingTouchdowns, req.body.player_season_receivingYards, req.body.player_season_receivingTouchdowns], function(err, result) {
       if (err) throw err;
       console.log("Note Successfully Saved!");
       res.end();
     });
});

app.post("/api/delete-player", cors(), function(req, res){
  console.log(req.body);
  var dbQuery = "DELETE FROM SavedFantasyPlayers WHERE id=(?)";
  connection.query(dbQuery, [req.body.id], function(err, result) {
    if (err) throw err;
    console.log("Player Successfully Deleted!");
    res.end();
  });
})
