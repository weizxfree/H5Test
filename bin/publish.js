var exec = require("child-exec")
var path = require("path")

// publish
var remote_path = "root@123.207.154.201:/current_version/"
var command = "scp -r " + path.resolve(__dirname + "/../output/* ") + remote_path

exec(command)