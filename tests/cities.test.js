const request = require('supertest');
const app = require('../src/app');
const { getDatabase } = require('../src/db/config');

describe('Cities API', () => {
    let db;

    beforeAll(async () => {
        db = await getDatabase();
    });

    describe('GET /api/cities', () => {
        beforeEach(async () => {
            // Insert test data
            await db.run(
                'INSERT INTO Cities (name, region, last_updated) VALUES (?, ?, ?)',
                ['Helsinki', 'Uusimaa', new Date().toISOString()]
            );
        });

        it('should return all cities', async () => {
            const response = await request(app)
                .get('/api/cities')
                .expect(200);

            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBe(1);
            expect(response.body[0].name).toBe('Helsinki');
        });
    });

    describe('GET /api/cities/:id', () => {
        let cityId;

        beforeEach(async () => {
            // Insert test data
            const result = await db.run(
                'INSERT INTO Cities (name, region, last_updated) VALUES (?, ?, ?)',
                ['Tampere', 'Pirkanmaa', new Date().toISOString()]
            );
            cityId = result.lastID;
        });

        it('should return a city by id', async () => {
            const response = await request(app)
                .get(`/api/cities/${cityId}`)
                .expect(200);

            expect(response.body.name).toBe('Tampere');
            expect(response.body.region).toBe('Pirkanmaa');
        });

        it('should return 404 for non-existent city', async () => {
            await request(app)
                .get('/api/cities/999999')
                .expect(404);
        });
    });

    describe('POST /api/cities', () => {
        it('should create a new city', async () => {
            const newCity = {
                name: 'Oulu',
                region: 'Northern Ostrobothnia'
            };

            const response = await request(app)
                .post('/api/cities')
                .send(newCity)
                .expect(201);

            expect(response.body.name).toBe(newCity.name);
            expect(response.body.region).toBe(newCity.region);
            expect(response.body.city_id).toBeDefined();
        });

        it('should return 400 when name is missing', async () => {
            await request(app)
                .post('/api/cities')
                .send({ region: 'Test Region' })
                .expect(400);
        });
    });

    describe('PUT /api/cities/:id', () => {
        let cityId;

        beforeEach(async () => {
            const result = await db.run(
                'INSERT INTO Cities (name, region, last_updated) VALUES (?, ?, ?)',
                ['Turku', 'Southwest Finland', new Date().toISOString()]
            );
            cityId = result.lastID;
        });

        it('should update an existing city', async () => {
            const updateData = {
                name: 'Updated Turku',
                region: 'Updated Region'
            };

            const response = await request(app)
                .put(`/api/cities/${cityId}`)
                .send(updateData)
                .expect(200);

            expect(response.body.name).toBe(updateData.name);
            expect(response.body.region).toBe(updateData.region);
        });
    });

    describe('DELETE /api/cities/:id', () => {
        let cityId;

        beforeEach(async () => {
            const result = await db.run(
                'INSERT INTO Cities (name, region, last_updated) VALUES (?, ?, ?)',
                ['Vaasa', 'Ostrobothnia', new Date().toISOString()]
            );
            cityId = result.lastID;
        });

        it('should delete a city', async () => {
            await request(app)
                .delete(`/api/cities/${cityId}`)
                .expect(204);

            // Verify city is deleted
            const city = await db.get('SELECT * FROM Cities WHERE city_id = ?', [cityId]);
            expect(city).toBeUndefined();
        });
    });
}); 