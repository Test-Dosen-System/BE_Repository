module.exports = {
  apps: [
    {
      name: 'tes-dosen-backend',
      script: './app.js',
      instances: 1, // Set to 'max' for utilizing all CPU cores in production
      exec_mode: 'fork', // Use 'cluster' if instances > 1
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
