const request = require("supertest");
const { expect } = require("chai");
const dotenv = require("dotenv");

const server = require("../server");

dotenv.config();

// Tempory user for testing
const tempUser = {
  username: "testUser",
  password: "Password",
};

// Tempory discussion for testing
const tempDiscussion = {
  username: "testUser",
  title: "test",
  content: "This is a test discussion",
};

// Defines token variable for use later
let tempToken;

let discID;

// Sets timeout for each test
before(function (done) {
  this.timeout(3000);
  setTimeout(done, 2000);
});

describe("POST /users", () => {
  // Sends request with valid new user credentials
  it("should register new user", (done) => {
    request(server)
      .post("/users")
      .send(tempUser)
      .expect(200)
      .then((res) => {
        expect(res.body).to.contain.property("token");
        done();
      })
      .catch((err) => done(err));
  });

  // Sends request with invalid existing username
  it("shouldn't accept existing username", (done) => {
    request(server)
      .post("/users")
      .send(tempUser)
      .expect(400)
      .then((res) => {
        expect(res.text).to.be.eql("Username already in use");
        done();
      })
      .catch((err) => done(err));
  });
});

describe("POST /auth", () => {
  // Sends request with correct login credentials
  it("should accept correct credentials", (done) => {
    request(server)
      .post("/auth")
      .send(tempUser)
      .expect(200)
      .then((res) => {
        expect(res.body).to.contain.property("token");
        tempToken = res.body.token;
        done();
      })
      .catch((err) => done(err));
  });

  // Sends request with invalid password
  it("shouldn't accept invalid password", (done) => {
    tempUser.password = "wrongpassword";
    request(server)
      .post("/auth")
      .send(tempUser)
      .expect(400)
      .then((res) => {
        expect(res.text).to.be.eql("Login failed");
        done();
      })
      .catch((err) => done(err));
  });

  // Sends request with non-exisitng invalid username
  it("shouldn't accept non-exisiting username", (done) => {
    tempUser.username = "asdfgh";
    request(server)
      .post("/auth")
      .send(tempUser)
      .expect(404)
      .then((res) => {
        expect(res.text).to.be.eql("Username not found");
        done();
      })
      .catch((err) => done(err));
  });
});

describe("POST /discs", () => {
  // Sends request for a valid new discussion
  it("should post a new discussion", (done) => {
    request(server)
      .post("/discs")
      .set({
        "x-auth-token": tempToken,
      })
      .send(tempDiscussion)
      .expect(200)
      .then((res) => {
        discID = res.text.replace(/"/g, "");
        expect(res.status).to.be.eql(200);
        done();
      })
      .catch((err) => done(err));
  });
});

describe("GET /discs", () => {
  // Sends request to get all discussions with a valid token
  it("should get all discussions", (done) => {
    request(server)
      .get("/discs")
      .set({
        "x-auth-token": tempToken,
      })
      .expect(200)
      .then((res) => {
        expect(res.status).to.be.eql(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  // Sends request to get all discussions without a token
  it("shouldn't get all discussions without token", (done) => {
    request(server)
      .get("/discs")
      .expect(401)
      .then((res) => {
        expect(res.status).to.be.eql(401);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("DELETE /discs", () => {
  // Sends a request with valid delete permissions
  it("should delete discussion", (done) => {
    request(server)
      .delete("/discs")
      .set({
        "x-auth-token": tempToken,
      })
      .query({ id: discID })
      .expect(200)
      .then((res) => {
        expect(res.text).to.be.eql("Discussion removed");
        done();
      })
      .catch((err) => done(err));
  });
});

// Deletes tempory user after the tests
after(async () => {
  try {
    await User.deleteOne({ username: "testUser" });
  } catch (err) {
    console.error(err);
  }
});
