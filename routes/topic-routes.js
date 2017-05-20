var db = require("../models");

module.exports = function(app) {

	app.get("/api/topics", function(req, res) {
    db.Topic.findAll({}).then(function(dbTopics) {
      res.json(dbTopics);
    });
  });


 app.post("/api/topics", function(req, res) {
    db.Topic.create(req.body).then(function(dbTopics) {
      res.json(dbTopics);
    });
  });

};

