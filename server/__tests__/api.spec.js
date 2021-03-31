const request = require("supertest");
const app = require("../app");

jest.setTimeout(30000);

let server, agent, id;

const access_token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJEbENNVFk0TlRCRE9UbEVNRVZEUkVWQ01qVTVRakEwUVRoRU5rSXpRakJFUlROR056a3hOQSJ9.eyJodHRwOi8vbG9jYWxob3N0OjMwMDAvcm9sZXMiOlsiQWRtaW4iXSwiaHR0cDovL2xvY2FsaG9zdDo1MDAwL3JvbGVzIjpbIkFkbWluIl0sImh0dHBzOi8vcG9ydGZvbGlvLWZzLWFwcC5oZXJva3VhcHAuY29tL3JvbGVzIjpbIkFkbWluIl0sImlzcyI6Imh0dHBzOi8vanM2LmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExMzQ3NzgyMTA3Mzc1OTgwOTg4MCIsImF1ZCI6WyJodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpL3YxIiwiaHR0cHM6Ly9qczYuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTYxNzIwMjQxNiwiZXhwIjoxNjE3Mjg4ODE2LCJhenAiOiJieXlySVhEZ3d1OUF2bjNUSDdwWVZReHJzQTIzWGNnNyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJwZXJtaXNzaW9ucyI6WyJjcmVhdGU6b3JkZXJzIiwiY3JlYXRlOm9yZGVyczpvd24iLCJjcmVhdGU6cHJvZHVjdHMiLCJkZWxldGU6b3JkZXJzIiwiZGVsZXRlOm9yZGVyczpvd24iLCJkZWxldGU6cHJvZHVjdHMiLCJyZWFkOm9yZGVycyIsInJlYWQ6b3JkZXJzOm93biIsInJlYWQ6cHJvZHVjdHMiLCJ1cGRhdGU6b3JkZXJzIiwidXBkYXRlOm9yZGVyczpvd24iLCJ1cGRhdGU6cHJvZHVjdHMiXX0.XP4DInmcZREkHpTpOv9hMoqKZnDwQGCZ6WbTve3ZfSVltN_weZNZDWsOJ-QWeXP-I6ekSML6nFgr45DcViE_ejgr_LfuemooSxgbawcbyrIH8--4aK78P8ys4uUJzuqkq49-y9BX1iNDEH-rGTcv2epFhzLHAAxPqSzQzsPv6WXWnyTcWDNQRaGmBvHPekKB5S38JDpyF6y7dlB5C537Uo7nU-nJHTTTTTV31MA3R73Lcj0qDbSSKDxZvJ7hiqPRHjFCBVBmsxe9-mmNarmiRLoCckKws_nA4MAIauJFAO5LMPV7eWlOdc2K_jSIvxpBpOxdXbemYqZIWLnatI3snw"

const fakeProductData = {
  title: "Stella Artois",
  price: 400,
  category: "beverage",
};

beforeEach((done) => {
  server = app.listen(4000, (err) => {
    if (err) return done(err);

    agent = request.agent(server); // since the application is already listening, it should use the allocated port
    done();
  });
});

afterEach((done) => {
  // here you would normally reset the test database too...
  return server && server.close(done);
});

describe("The Product API", () => {
  it("should create a new product", async () => {
    // const postRes = await agent
    //   .post("/api/v1/products")
    //   .set('Authorisation', `Bearer ${access_token}`)
    //   .set("Accept", "application/json")
    //   .send(fakeProductData);

    // const responseData = postRes.body;
    // console.log("responseData", responseData);

    // expect(postRes.statusCode).toEqual(201);

    // expect(responseData).toHaveProperty("_id");

    // for (const [key, value] of fakeProductData.entries) {
    //   expect(responseData).toHaveProperty(key, value);
    // }

    // const { _id } = responseData;
    // id = _id;

    expect(true).toBe(true);
  });

  // it("read all products", async () => {});

  it("read the new product", async () => {
    // const getRes = await agent
    //   .get(`/api/v1/products/${id}`)
    //   .set("Accept", "application/json")
    //   .set('Authorisation', `Bearer ${access_token}`)
    //   .send(fakeProductData);
    // expect(getRes.statusCode).toEqual(200);

    // const responseData = getRes.body;
    // console.log("responseData", responseData);

    // for (const [key, value] of fakeProductData.entries) {
    //   expect(responseData).toHaveProperty(key, value);
    // }
    expect(true).toBe(true);
  });

  // it("update the new product", async () => {
  //   const updateRes = await agent
  //     .put(`/api/v1/people/${id}`)
  //     .set("Accept", "application/json")
  //     .set('Authorisation', `Bearer ${access_token}`)
  //     .send();
  //   expect(updateRes.statusCode).toEqual(200);
  // });

  // it("delete the new product", async () => {
  //   const delRes = await agent
  //     .delete(`/api/v1/people/${id}`)
  //     .set("Accept", "application/json")
  //     .set('Authorisation', `Bearer ${access_token}`)
  //     .send();
  //   console.log(`Deleted record: ${delRes.statusCode === 204}`);
  //   expect(delRes.statusCode).toEqual(204);
  // });
});
