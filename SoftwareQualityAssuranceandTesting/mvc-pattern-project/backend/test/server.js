const request = require('supertest');
const server = require('../server.js');
const express = require('express');
const { default: mongoose } = require('mongoose');

describe('Test the root path', () => {
    let app;

    beforeAll(() => {
        app = express();
        app.use('/', server);
    });

    afterAll(() => {
       mongoose.connection.close();
    });

    test('responds with json and status code 200 for the root endpoint', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual({ message: 'Welcome to the backend!' });
    });

   test('uses CORS middleware', async () => {
         const response = await request(app).get('/');
         expect(response.headers['access-control-allow-origin']).toBe('*');
    });

    test('parses JSON and urlencoded data requests', async () => {
        const response = await (await request(app).post('/').send({ message: 'Test Message' }))
                            .set('Content-Type', 'application/json')
        expect(response.statusCode).toBe(404);
    });

    describe('Database connection', () => {
        test('connects to MongoDB', async () => {
            const response = await request(app).get('/');
            expect(mongoose.connection.readyState).toBe(1);
        });
    });

    describe('Error handling', () => {
        test('returns 404 for non-existent endpoints', async () => {
            const response = await request(app).get('/non-existent');
            expect(response.statusCode).toBe(404);
        });

        test('returns 500 for server errors', async () => {
            app.get('/error', (req, res) => {
                throw new Error('Test error');
            });

            const response = await request(app).get('/error');
            expect(response.statusCode).toBe(500);
            expect(response.type).toBe('text/html');
            expect(response.text).toBe('Internal Server Error');
        });        
    });

    describe('User controller', () => {
        let user;

        beforeEach(() => {
            user = {
                username: 'testuser',
                password: 'testpassword',
                email: 'testemail@email.com'
            };

            app.post('/api/users', (req, res) => {
                res.json(user);
            }
        )});

        test('returns 200 for successful user creation', async () => {
            const response = await request(app).post('/api/users');
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('application/json');
            expect(response.body).toEqual(user);
        });

        test('returns 400 for unsuccessful user creation', async () => {
            app.post('/api/users', (req, res) => {
                res.status(400).json({ error: 'Test error' });
            });

            const response = await request(app).post('/api/users');
            expect(response.statusCode).toBe(400);
            expect(response.type).toBe('application/json');
            expect(response.body).toEqual({ error: 'Test error' });
        });

        test('returns 200 for successful user retrieval', async () => {
            const response = await request(app).get('/api/users');
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('application/json');
            expect(response.body).toEqual(user);
        });

        test('returns 400 for unsuccessful user retrieval', async () => {
            app.get('/api/users', (req, res) => {
                res.status(400).json({ error: 'Test error' });
            });

            const response = await request(app).get('/api/users');
            expect(response.statusCode).toBe(400);
            expect(response.type).toBe('application/json');
            expect(response.body).toEqual({ error: 'Test error' });
        });

        test('returns 200 for successful user update', async () => {
            const response = await request(app).put('/api/users');
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('application/json');
            expect(response.body).toEqual(user);
        }   );

        test('returns 400 for unsuccessful user update', async () => {
            app.put('/api/users', (req, res) => {
                res.status(400).json({ error: 'Test error' });
            });

            const response = await request(app).put('/api/users');
            expect(response.statusCode).toBe(400);
            expect(response.type).toBe('application/json');
            expect(response.body).toEqual({ error: 'Test error' });
        });

        test('returns 200 for successful user deletion', async () => {
            const response = await request(app).delete('/api/users');
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('application/json');
            expect(response.body).toEqual(user);
        });

        test('returns 400 for unsuccessful user deletion', async () => {
            app.delete('/api/users', (req, res) => {
                res.status(400).json({ error: 'Test error' });
            });

            const response = await request(app).delete('/api/users');
            expect(response.statusCode).toBe(400);
            expect(response.type).toBe('application/json');
            expect(response.body).toEqual({ error: 'Test error' });
        });

    });
});