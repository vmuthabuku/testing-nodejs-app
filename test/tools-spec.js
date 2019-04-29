const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
let should = require('chai').should();
let expect = require('chai').expect
let mongoose = require("mongoose");
let Todos = require('../models.js/todo').Todo
let app = require('../server');
const config = require("../config/testDb").get(process.env.NODE_ENV)

mongoose.Promise = global.Promise
mongoose.connect(config.DATABASE, { useNewUrlParser: true })


describe('Books', () => {
    beforeEach((done) => {
        Todos.remove({}, (err) => { 
           done();           
        });        
    });

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
              should.exist(res.body);
              expect(todos).to.have.property('title')
              expect(todos).to.have.property('todo')
              done();

          })
      });
      describe('/PUT /api/todoUpdate ', () => {
        it('it should UPDATE a todo given the id', (done) => {
            let todo = new Todos({title:"Test Update Me", todo:"try out updating an app"})
            todo.save((err, todos) => {
                  chai.request(app)
                  .put(`/api/todoUpdate?=${todo.id}`)
                  .send({title:"Test Me", todo:"try out updating me"})
                  .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        res.body.should.have.property('Success').eql(true);
                        
                    done();
                  });
            });
        });
    });
    describe('/DELETE /api/todoDelete', () => {
        it('it should DELETE a todo given the id', (done) => {
            let todo = new Todos({title:"Test Update Me", todo:"try out updating an app"})
            todo.save((err, todo) => {
                  chai.request(app)
                  .delete(`/api/todoDelete?=${todo.id}`)
                  .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('Success').eql(true);
                    done();
                  });
            });
        });
    })

  });
})
})