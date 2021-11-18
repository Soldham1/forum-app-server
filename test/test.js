const assert = require("assert");
const connectDB = require("../database/db");
const disconnectDB = require("../database/disconnect");
const User = require("../models/User");

describe("User database", function () {
  connectDB();
  it("Should save without error", function (done) {
    var user = new User({ username: "test123", password: "123456" });
    user.save().then(function () {
      assert(user.isNew === false);
      done();
    });
  });

  it("Should delete without error", function (done) {
    User.findOneAndRemove({ username: "test123" }).then(function () {
      User.findOne({ username: "test123" }).then(function (result) {
        assert(result === null);
        disconnectDB();
        done();
      });
    });
  });
});
