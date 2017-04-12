// import "mocha";
// import { IUser } from "../interfaces/user.interface";
// import { IUserModel } from "../models/user.model";
// import { userSchema } from "../schemas/user.schema";

// //use q promises
// global.Promise = require("q").Promise;

// //import mongoose
// import mongoose = require("mongoose");

// //use q library for mongoose promise
// mongoose.Promise = global.Promise;

// //connect to mongoose and create model
// const MONGODB_CONNECTION: string = "mongodb://localhost:27017/heros";
// let connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);
// var User: IUserModel =<IUserModel> connection.model("users", userSchema);

// //require chai and use should() assertions
// let chai = require("chai");
// chai.should();

// describe("User", function() {

//   describe("create()", function () {
//     it("should create a new User", function () {
//       //user object
//       let user: IUser = {
//         profile : {
//           email: "foo@bar.com",
//           userName: "Vishal"
//         }
//       };

//       //create user and return promise
//       return new User(user).save().then(result => {
//         //verify _id property exists
//         result._id.should.exist;

//         //verify email
//         result.email.should.equal(user.email);

//         //verify firstName
//         result.firstName.should.equal(user.firstName);

//         //verify lastName
//         result.lastName.should.equal(user.lastName);
//       })
//     });
//   });
// });