export default {
  apps: [{
    name: 'status-webhook-handler',
    script: './dist/app.js',
    env: {
      NODE_ENV: 'production',
      PORT: 3011
    }
  }]
}