# Deployment Guide for DigitalOcean

This guide explains how to set up the GitHub Actions workflow to automatically deploy your application to a DigitalOcean droplet using the DigitalOcean API.

## Prerequisites

1. A DigitalOcean account with a droplet or App Platform app already created
2. A DigitalOcean Spaces bucket for storing your build files (optional)
3. A GitHub repository for your project

## Setting Up GitHub Environments and Secrets

The workflow uses GitHub Environments to manage deployment secrets securely. Here's how to set it up:

### Creating an Environment

1. Go to your GitHub repository
2. Click on "Settings" > "Environments"
3. Click "New environment"
4. Name it "production" (to match the environment specified in the workflow)
5. (Optional) Configure environment protection rules and deployment approvals

### Adding Secrets to the Environment

After creating the environment, add the following secrets:

1. Click on the environment name
2. Click "Add secret" for each of these secrets:

### DIGITALOCEAN_ACCESS_TOKEN

This is your DigitalOcean Personal Access Token that will be used to authenticate with the DigitalOcean API.

To generate a new token:
1. Go to the DigitalOcean Control Panel
2. Click on "API" in the left sidebar
3. Click on "Generate New Token"
4. Give it a name like "GitHub Actions"
5. Make sure to select both read and write scopes
6. Copy the token and add it as the `DIGITALOCEAN_ACCESS_TOKEN` secret

### APP_ID

This is the ID of your DigitalOcean App Platform application.

To find your App ID:
1. Go to the DigitalOcean Control Panel
2. Navigate to the App Platform section
3. Select your app
4. The App ID is in the URL: `https://cloud.digitalocean.com/apps/[APP_ID]`

### For Spaces Storage (Optional)

If you're using DigitalOcean Spaces to store your build files, you'll need these additional secrets:

### SPACE_NAME

The name of your DigitalOcean Space.

### SPACE_ACCESS_KEY and SPACE_SECRET_KEY

Your Spaces access keys. To generate these:
1. Go to the DigitalOcean Control Panel
2. Click on "API" in the left sidebar
3. Scroll down to "Spaces access keys"
4. Generate a new key pair

### SPACE_REGION

The region where your Space is located (e.g., `nyc3`, `sfo2`, etc.).

## Benefits of Using Environments

Using GitHub Environments provides several advantages:

1. **Environment-specific secrets**: Keep production credentials separate from development or staging
2. **Required reviewers**: Optionally require specific people to approve deployments
3. **Wait timer**: Add a delay before deployments to give time for review
4. **Deployment branches**: Restrict which branches can deploy to specific environments

## Server Setup

If you're using the DigitalOcean App Platform, most of the server setup is handled automatically. However, you may need to configure:

1. Environment variables in the App Platform settings
2. Build commands and run commands
3. Static site settings if you're deploying a frontend application

## Alternative Deployment Methods

If you're not using the App Platform and want to deploy directly to a droplet, you can use:

1. **DigitalOcean Container Registry**: Push your application as a Docker container
2. **Custom deployment scripts**: Use the DigitalOcean API to run commands on your droplet

## Workflow Customization

You may need to customize the `.github/workflows/deploy.yml` file based on your specific requirements:

1. Adjust the Node.js version
2. Modify the build command if needed
3. Change the deployment method based on your DigitalOcean setup
4. Add different environments (staging, development, etc.)

## Troubleshooting

If you encounter issues with the deployment:

1. Check the GitHub Actions logs for error messages
2. Verify that all secrets are correctly set
3. Check the DigitalOcean App Platform logs
4. Ensure your DigitalOcean access token has the correct permissions 