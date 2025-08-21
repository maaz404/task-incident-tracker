#!/usr/bin/env node

/**
 * Secret Generator for Task Incident Tracker
 * Generates secure passwords and secrets for local development
 */

const crypto = require('crypto');

// Generate secure random string
function generateSecureSecret(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

// Generate password with special characters
function generatePassword(length = 24) {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const allChars = lowercase + uppercase + numbers + symbols;
  
  let password = '';
  
  // Ensure at least one character from each type
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];
  
  // Fill the rest randomly
  for (let i = 4; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  // Shuffle the password
  return password.split('').sort(() => 0.5 - Math.random()).join('');
}

console.log('🔐 Secure Secrets Generator for Task Incident Tracker');
console.log('=' .repeat(60));
console.log();

console.log('📋 Copy these values to your .env files:');
console.log();

console.log('# Database Credentials');
console.log(`MONGO_ROOT_USERNAME=admin`);
console.log(`MONGO_ROOT_PASSWORD=${generatePassword(32)}`);
console.log(`MONGO_APP_USERNAME=taskapp`);
console.log(`MONGO_APP_PASSWORD=${generatePassword(32)}`);
console.log();

console.log('# Application Secrets');
console.log(`JWT_SECRET=${generateSecureSecret(32)}`);
console.log();

console.log('# Database Configuration');
console.log('MONGO_DB_NAME=task_incident_tracker');
console.log('MONGO_PORT=27017');
console.log();

console.log('# Development URLs');
console.log('CORS_ORIGINS=http://localhost,http://localhost:3000');
console.log('REACT_APP_API_URL=http://localhost:5000/api');
console.log();

console.log('⚠️  Important Security Notes:');
console.log('- Save these credentials securely');
console.log('- Use different secrets for production');
console.log('- Never commit .env files to git');
console.log('- Rotate secrets regularly in production');
console.log();

console.log('📖 For detailed setup instructions, see SECURITY.md');
