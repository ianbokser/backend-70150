import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Testing Users API', () => {
  it('GET /api/users - Debería obtener todos los usuarios', async () => {
    const res = await chai.request(app).get('/api/users');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });

  it('POST /api/users/register - Debería registrar un nuevo usuario', async () => {
    const newUser = {
      first_name: 'Juan',
      last_name: 'Pérez',
      email: `juan${Date.now()}@mail.com`,
      password: '123456',
      age: 25
    };

    const res = await chai.request(app).post('/api/users/register').send(newUser);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('message', 'Usuario creado exitosamente');
  });
});
