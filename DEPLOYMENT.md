# Deployment Guide for DigitalOcean

This guide explains how to set up the GitHub Actions workflow to automatically deploy your application to a DigitalOcean droplet.

## Prerequisites

1. A DigitalOcean account with a droplet already created
2. SSH access to your droplet
3. A GitHub repository for your project

## Setting Up GitHub Secrets

For the GitHub Actions workflow to securely connect to your DigitalOcean droplet, you need to set up the following secrets in your GitHub repository:

1. Go to your GitHub repository
2. Click on "Settings" > "Secrets and variables" > "Actions"
3. Add the following secrets:

### SSH_PRIVATE_KEY

This is your private SSH key that will be used to connect to the DigitalOcean droplet.

To generate a new SSH key pair (if you don't already have one):

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

Then add the public key to your DigitalOcean droplet's authorized_keys file:

```bash
cat ~/.ssh/id_ed25519.pub | ssh user@your-droplet-ip "cat >> ~/.ssh/authorized_keys"
```

Add the content of your private key file (`~/.ssh/id_ed25519`) as the `SSH_PRIVATE_KEY` secret.

### SSH_KNOWN_HOSTS

This contains the SSH fingerprint of your DigitalOcean droplet to prevent man-in-the-middle attacks.

To get this value, run:

```bash
ssh-keyscan -H your-droplet-ip
```

Add the output as the `SSH_KNOWN_HOSTS` secret.

### SSH_HOST

This is the IP address of your DigitalOcean droplet.

### SSH_USER

This is the username you use to SSH into your DigitalOcean droplet (often 'root' or a custom user).

## Server Setup

Ensure your DigitalOcean droplet has the necessary software installed:

1. Node.js (same version as your development environment)
2. Nginx or Apache (to serve your static files)

### Nginx Configuration Example

If you're using Nginx, here's a basic configuration for serving a React application:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Save this to `/etc/nginx/sites-available/default` and restart Nginx:

```bash
sudo systemctl restart nginx
```

## Workflow Customization

You may need to customize the `.github/workflows/deploy.yml` file based on your specific requirements:

1. Adjust the Node.js version
2. Modify the build command if needed
3. Change the deployment directory on your server

## Troubleshooting

If you encounter issues with the deployment:

1. Check the GitHub Actions logs for error messages
2. Verify that all secrets are correctly set
3. Ensure your SSH key has the correct permissions on the server
4. Check server logs: `sudo journalctl -u nginx` or `sudo journalctl -u apache2` 