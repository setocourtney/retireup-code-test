const supertest = require('supertest');
const express = require('express');
const routes = require("../routes");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost/sp500", { useNewUrlParser: true, useUnifiedTopology: true });

app.use(routes);

describe("Testing the SP500 Data API", () => {
    it("should return success", async () => {
        const response = await supertest(app).get('/api/sp500');
        expect(response.status).toBe(200);
    })

    it("should return data with year and totalReturn", async () => {
        const response = await supertest(app).get('/api/sp500');
        expect(response.body[0]).toHaveProperty('year');
        expect(response.body[0]).toHaveProperty('totalReturn');
    })
})