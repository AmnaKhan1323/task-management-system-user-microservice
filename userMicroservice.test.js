const request = require('supertest');
const app = require('./userMicroservice');

describe('User Microservice', () => {
  it('should add a user', async () => {
    const response = await request(app)
      .post('/addUser')
      .send({ username: 'test_user', email: 'test@example.com', type: 'default' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'User added successfully' });
  });

  it('should get user information', async () => {
    const response = await request(app).get('/getUser/test_user');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username', 'test_user');
  });

  it('should delete a user', async () => {
    const response = await request(app).delete('/deleteUser/test_user');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'User deleted successfully' });
  });

  it('should handle invalid input', async () => {
    const response = await request(app).post('/addUser').send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid input' });
  });

  it('should handle user not found', async () => {
    const response = await request(app).get('/getUser/nonexistent_user');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'User not found' });
  });
});
