// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const seedMusician = require("./seedData");


describe('./musicians endpoint', () => {
    test("Testing Musicians endpoint", async () => {
        // Sends request to `/bakedGoods` endpoint
        const response = await request(app).get("/musicians");
        const responseData = JSON.parse(response.text);
        expect(response.statusCode).toBe(200)
        expect(response.body[0]).toHaveProperty("id")
        expect(response.body[0]).toHaveProperty("name")

        // Write expect tests here
    })
})