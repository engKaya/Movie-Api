const chai = require('chai')
const chaiHttp = require('chai-http')
const mocha = require('mocha')
const server = require('../../app.js')

let token;

chai.use(chaiHttp)

describe('Movie Test 1', ()=> {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({nickname: "flyingDutchman", password: "123456"})
            .end((err, res) => {
                token = res.body.token
                console.log(token)
                done()
            });

    })

    describe('get movies', () => {
        it('should bütün filmler gelmeli ', (done) => {
            chai.request(server)
                .get('/api/movies')
                .set("x-access-open",token)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    done();
                })
        });
    });
})