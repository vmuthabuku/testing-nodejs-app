const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
let should = require('chai').should();
let expect = require('chai').expect
let mongoose = require("mongoose");
let Todos = require('../models.js/todo')
let app = require('../server');
const config = require("../config/testDb").get(process.env.NODE_ENV)

mongoose.Promise = global.Promise
mongoose.connect(config.DATABASE, { useNewUrlParser: true })



describe("Todos", () => {
  describe('/GET api/todos', () => {
      it('it should GET all the books', (done) => {
        chai.request(app)
            .get('/api/todos')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
              done();
            });
      });
      it('it should POST a book', (done) => {
          let todos = {
              title:"Test Me",
              todo:"try out testing an app"
          }
          chai.request(app)
          .post('/api/todos')
          .send(todos)
          .end((err,res) => {
              res.should.have.status(201);
              res.body.should.be.a('object')
              //should(err === null).be.null
              should.exist(res.body);
              expect(todos).to.have.property('title')
              expect(todos).to.have.property('todo')
              //res.body.todos.should.have.property('title')
              //res.body.todos.should.have.property('todo')
              done();

          })
      })
  });
})