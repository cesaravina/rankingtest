process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var sequelize = require("sequelize");

var server = require('../server.js');
var Item = require("../models/item.js");

var should = chai.should();
chai.use(chaiHttp);


describe('Item', function() {

  it('should list ALL items on /items GET', function(done) {
chai.request('http://localhost:8080')
      .get('/items')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('lastName');
        res.body[0].name.should.equal('Bat');
        res.body[0].lastName.should.equal('man');
        done();
      });
  });

  it('should list a SINGLE Item on /item/<id> GET', function(done) {
      var newItem = new Item({
        name: 'Super',
        lastName: 'man'
      });
      newItem.save(function(err, data) {
        chai.request(server)
          .get('/item/'+data.id)
          .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('_id');
            res.body.should.have.property('name');
            res.body.should.have.property('lastName');
            res.body.name.should.equal('Super');
            res.body.lastName.should.equal('man');
            res.body._id.should.equal(data.id);
            done();
          });
      });
  });

  it('should add a SINGLE Item on /Items POST', function(done) {
    chai.request(server)
      .post('/Items')
      .send({'name': 'Java', 'lastName': 'Script'})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('SUCCESS');
        res.body.SUCCESS.should.be.a('object');
        res.body.SUCCESS.should.have.property('name');
        res.body.SUCCESS.should.have.property('lastName');
        res.body.SUCCESS.should.have.property('_id');
        res.body.SUCCESS.name.should.equal('Java');
        res.body.SUCCESS.lastName.should.equal('Script');
        done();
      });
  });

  it('should update a SINGLE Item on /item/<id> PUT', function(done) {
    chai.request(server)
      .get('/items')
      .end(function(err, res){
        chai.request(server)
          .put('/item/'+res.body[0]._id)
          .send({'name': 'Spider'})
          .end(function(error, response){
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('UPDATED');
            response.body.UPDATED.should.be.a('object');
            response.body.UPDATED.should.have.property('name');
            response.body.UPDATED.should.have.property('_id');
            response.body.UPDATED.name.should.equal('Spider');
            done();
        });
      });
  });
});
module.exports = server
