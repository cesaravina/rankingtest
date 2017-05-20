var db = require("../models/");

module.exports = function(app) {




  app.get("/api/items", function(req, res) {
    db.Item.findAll({}).then(function(dbItem) {
      res.json(dbItem);
    });
  });

  app.post("/api/items", function(req, res) {
    db.Item.create(req.body).then(function(dbItem) {
      res.json(dbItem);
    });
  });


  app.post("/:id", function(req, res) {
    db.Item.create(req.body).then(function(dbItem) {
      // res.json(dbItem);
      res.redirect('/');
    });
  });


  app.get('/:id', function(req, res) {
    res.send(req.params.ids)
   });



  app.put('/api/items', function(req,res){

    db.Item.update({
        score: req.params.score-1
      },{
        where: {
            id: req.params.id
          }
        }).then(function(dbItem) {
res.json(dbItem)
    });
});

  app.put('/api/items', function(req,res){

    db.Item.update({
        score: req.params.score-1
      },{
        where: {
            id: req.params.id
          }
        }).then(function(dbItem) {
res.json(dbItem)
    });
});


}
