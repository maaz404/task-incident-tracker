#!/bin/bash

# Unix/Linux/Mac script to generate secure secrets

echo "Running secret generator..."
node scripts/generate-secrets.js

echo
echo "To run this script:"
echo "  npm run generate-secrets"
