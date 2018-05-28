const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../src/server');
const mongoose = require('mongoose');

const LogsSchema = require('../src/schemas/logs')();

const request = supertest(app);

describe('Test route logs', () => {
  before(async () => {
    await LogsSchema.remove({});
  });

  after(async () => {
    await mongoose.disconnect();
  });

  describe('GET /',  () => {
    it('expects a 200 http status, and one log registry to be retrieved', (done) => {
      request.get('/logs')  
        .expect(502)
        .end((err, res) => {
          expect(res.body).to.be.an('Array');
          expect(res.body[0]).to.include.keys(['type', 'hit_at']);
          return done(err);
        });
    })
  });
});
