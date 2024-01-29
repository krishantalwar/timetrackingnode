module.exports = {
 "apps": [
    {
      "name": "app",
      "script": "app.js",
    //   "cwd": "/path/to/your/app",
    //   "instances": "max",
    //   "exec_mode": "cluster",
    //   "watch": true,
    //   "ignore_watch": ["node_modules", "logs"],
    //   "autorestart": true,
    //   "max_restarts": 10,
    //  "exec_interpreter": "node -r dotenv/config", // Add this line to use dotenv
      "env": {
        "NODE_ENV": "development",
        "PORT": 3000
      },
      "env_production": {
        "NODE_ENV": "production",
        "PORT": 80
      },

      "log_date_format": "YYYY-MM-DD HH:mm Z",
      "error_file": "error.log",
      "out_file": "out.log",
      "pid_file": "app.pid",
      "merge_logs": true,
      "log_type": "json"
    }
  ]
}