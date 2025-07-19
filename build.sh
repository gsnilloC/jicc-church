#!/bin/bash
set -e

echo "Installing dependencies..."
npm install --registry=https://registry.npmjs.org/

echo "Building the application..."
npm run build

echo "Build completed successfully!" 