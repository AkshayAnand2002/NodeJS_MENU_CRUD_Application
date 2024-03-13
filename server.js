var fs = require("fs");
var os = require("os");
var user = os.userInfo();
console.log(user);
console.log(user.username);
fs.appendFile("ak.txt", "hello " + user.username + "!\n", () => {
  console.log("file is created");
});
const notes = require("./notes.js");
var age = notes.age;
var result = notes.addnos(age + 18, 10);
console.log(age);
console.log("result is:" + result);
var _ = require("lodash");
var data = ["person", "person", 1, 2, 1, 2, "name", "age", "2"];
var filter = _.uniq(data);
console.log(filter);
console.log(_.isString("prince"));
