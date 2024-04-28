const request = require("supertest");

const PUBLIC_KEY = "4679c2055e33750e2e6d0d64bf6f93a4";
const PRIVATE_KEY = "7f67091245d18f5401026efc3624f0004fcf6681";

describe("Marvel API Characters", () => {
  it("/get a valid character", async () => {
    const timestamp = Date.now();
    const hash = require('crypto').createHash('md5').update(timestamp + PRIVATE_KEY + PUBLIC_KEY).digest('hex');
    
    const response = await request("https://gateway.marvel.com/v1/public")
      .get(`/characters`)
      .query({
        name: "Logan",
        apikey: PUBLIC_KEY,
        ts: timestamp,
        hash: hash
      });

    expect(response.status).toBe(200);
    expect(response.body.data.results.length).toBeGreaterThan(0);
    expect(response.body.data.results[0].name).toBe("Logan");
  });

  it("/get a invalid character", async () => {
    const timestamp = Date.now();
    const hash = require('crypto').createHash('md5').update(timestamp + PRIVATE_KEY + PUBLIC_KEY).digest('hex');
    
    const response = await request("https://gateway.marvel.com/v1/public")
      .get(`/characters`)
      .query({
        name: "Invalid Character Name",
        apikey: PUBLIC_KEY,
        ts: timestamp,
        hash: hash
      });

    expect(response.status).toBe(200);
    expect(response.body.data.results.length).toBe(0);
  });
});
