
const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server.js');
const {Todo} = require('./../models/todo.js');

const todos = [{
    text: 'First Test todos'
}, {
    text: 'Second Test todos'
}];


/* beforeEach is required as in our test cases we expect the database collection 'todos' to be length = 1
*  This is not true as we already have a few documents (rows)
*  So before running each test case we empty our collection by calling the method below
* */

 // beforeEach((done) => {
 //     Todo.remove({}).then(() => done()); // .remove({}) removes all docs
 // });

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
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

                Todo.find({text}).then((todos) => { //When searching for todo with 'text' It is the first item with text: 'TEST todo text'
                                                    // and its length is 1.
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
                   expect(todos.length).toBe(2); // beforeEach should clear the db before this testCase
                   done();
                }).catch((e) => done(e));
            });
    });
});  // Setup scripts inside package.json to set the tests on

describe('GET /todos', () => {
 it('should get all todos', (done) => {

     request(app)
         .get('/todos')
         .expect(200)
         .expect((res) => {
             expect(res.body.todos.length).toBe(2);
         })
         .end((err,res) => {
             done(err);
         });
 });
});
