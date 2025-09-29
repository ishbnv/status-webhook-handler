module.exports = {
  apps: [{
    name: 'status-webhook-handler',
    script: 'dist/app.js',
    instances: 1,
    exec_mode: 'fork',
    
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    
    log_file: '/var/log/pm2/status-webhook-handler.log',
    out_file: '/var/log/pm2/status-webhook-handler-out.log',
    error_file: '/var/log/pm2/status-webhook-handler-error.log',
    time: true,
    
    watch: false,
    autorestart: true,
    max_memory_restart: '500M',
    
    min_uptime: '10s',
    max_restarts: 10,
    restart_delay: 4000,
    
    kill_timeout: 5000,
    
    health_check_grace_period: 3000
  }]
}