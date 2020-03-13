var exec = require("child-exec")
var path = require("path")

// mtest
var test_path = "root@123.206.67.202:/current_version/"
var command = "scp -r " + path.resolve(__dirname + "/../output/* ") + test_path

exec(command)