const chai = require('chai')
const chaiHttp = require('chai-http')
const mocha = require('mocha')
const server = require('../../app.js')

let token;

const movieGetid = '5f54f41bf664883cdcdf0065'

chai.use(chaiHttp)

describe('Movie Test 1', ()=> {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({nickname: "flyingDutchman", password: "123456"})
            .end((err, res) => {
                token = res.body.token
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

    describe('psot movie',()=>{
        it('should /POST film', function (done) {
            const movie ={
                title:'test',
                director_id:'5f4417e1c3202629a8796992',
                category:'test_cat',
                country:'test_country',
                year:1111,
                imdb_Score:11,
            };
            chai.request(server)
                .post('/api/movie')
                .send(movie)
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_Score');
                    res.body.should.have.property('date');
                    done()
                })
        });
    })

    describe('/GET :director_id movie', ()=>{
        it('verilen id ile film getirir', function (done) {
            chai.request(server)
                .get('/api/movie/'+movieGetid)
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('title',)
                    res.body.should.have.property('director_id')
                    res.body.should.have.property('category')
                    res.body.should.have.property('country')
                    res.body.should.have.property('year')
                    res.body.should.have.property('date')
                    done();
                })
        });
    })

    describe('put movie',()=>{
        it('film günceller', function (done) {
            const movie ={
                title:'putdeneme',
                director_id:'5f4417e1c3202629a8796992',
                category:'putdeneme',
                country:'putdeneme',
                year:999,
                imdb_Score:19,
            };
            chai.request(server)
                .put('/api/movie/'+movieGetid)
                .send(movie)
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title').eql(movie.title);
                    res.body.should.have.property('director_id').eql(movie.director_id);
                    res.body.should.have.property('category').eql(movie.category);
                    res.body.should.have.property('country').eql(movie.country);
                    res.body.should.have.property('year').eql(movie.year);
                    res.body.should.have.property('imdb_Score').eql(movie.imdb_Score);
                    res.body.should.have.property('date');
                    done()
                })
        });
    })
})