
const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server.js');
const {Todo} = require('./../models/todo.js');


/* beforeEach is required as in our test cases we expect the database collection 'todos' to be length = 1
*  This is not true as we already have a few documents (rows)
*  So before running each test case we empty our collection by calling the method below
* */

 beforeEach((done) => {
     Todo.remove({}).then(() => done()); // .remove({}) removes all docs
 });

describe('POST /todos', () => {
    it('should create a new Todo', (done) => {
        var text = 'TEST todo text';

        request(app)
            .post('/todos')
            .send({text}) //
            .expect(200)  // Assertion: Expect status to be 200
            .expect((res) => {
                expect(res.body.text).toBe(text); // Expect the response sent back to client to be equal to 'text'
            })
            .end((err,res) => {
                if(err){
                    return done(err); // Handle err: if status !200 or text is diff from one we sent; print error to screen,
                                      // return causes function execution to stop
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(1); //We only sent 1 item 'text;
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('Should not create Todo with invalid body data', (done) => {

        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err,res) => {
               if(err){
                   return done(err);
               }

               Todo.find().then((todos) => {
                   expect(todos.length).toBe(0); // beforeEach should clear the db before this testCase
                   done();
                }).catch((e) => done(e));
            });
    });
});  // Setup scripts inside package.json to set the tests on