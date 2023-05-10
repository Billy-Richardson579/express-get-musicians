// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const seedMusician = require("./seedData");

const mTest = [
    {
        "id": 1,
        "name": "Mick Jagger",
        "instrument": "Voice",
        "createdAt": "2023-05-10T14:35:02.725Z",
        "updatedAt": "2023-05-10T14:35:02.725Z",
        "bandId": null
    },
    {
        "id": 2,
        "name": "Drake",
        "instrument": "Voice",
        "createdAt": "2023-05-10T14:35:02.726Z",
        "updatedAt": "2023-05-10T14:35:02.726Z",
        "bandId": null
    },
    {
        "id": 3,
        "name": "Jimi Hendrix",
        "instrument": "Guitar",
        "createdAt": "2023-05-10T14:35:02.726Z",
        "updatedAt": "2023-05-10T14:35:02.726Z",
        "bandId": null
    }
]
describe('./musicians endpoint', () => {
    test("Testing Musicians endpoint", async () => {
        // Sends request to `/musicians` endpoint
        const response = await request(app).get("/musicians");
        const responseData = JSON.parse(response.text);
        expect(response.statusCode).toBe(200)
        expect(response.body[0]).toHaveProperty("id")
        expect(response.body[0]).toHaveProperty("name")

        // Write expect tests here
    })
    it('should create a new musician', async () => {
        const response = await request(app).post("/musicians/");
    
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Musician created successfully');
    
        // Store the created musician ID for further tests
        musicianId = response.body.musicianId;
      });
    
      // Test case for updating an existing musician
      it('should update an existing musician', async () => {
        const response = await request(app)
          .put(`/musicians/${musicianId}`)
          .send({ name: 'Jane Smith', instrument: 'Piano' });
    
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe(`Musician with ID ${musicianId} updated successfully`);
      });
    
      // Test case for deleting a musician
      it('should delete a musician', async () => {
        const response = await request(app).delete(`/musicians/${musicianId}`);
    
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe(`Musician with ID ${musicianId} deleted successfully`);
})
})