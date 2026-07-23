# HockeyContainer - Nginx Web Server

A containerized hockey game web application using UBI10 and nginx.

## Overview

This directory contains a Containerfile that builds a simple nginx web server serving a hockey game HTML page. The container uses Red Hat Universal Base Image 10 (UBI10) as the base.

## Files

- **Containerfile** - Docker/Podman build configuration

## Prerequisites

- Podman or Docker installed
- Red Hat account with access to UBI10 containers (or use UBI8 as fallback)
- `hockey_gamepad_realrink_propertiming.html` file in the same directory when building

## Quick Start

### 1. Build the Container

```bash
# Authenticate with Red Hat registry
podman login registry.access.redhat.com

# Build the image (ensure hockey_gamepad_realrink_propertiming.html is in current dir)
podman build -t hockey-nginx .
```

**Note**: If you don't have UBI10 access, edit the Containerfile and change the FROM line to:
```dockerfile
FROM registry.access.redhat.com/ubi8/ubi
```

### 2. Run the Container

```bash
# Start the container (port 8080 on host -> port 80 in container)
podman run -d -p 8080:80 --name hockey-web hockey-nginx

# Test it
curl http://localhost:8080

# Or open in browser: http://localhost:8080
```

### 3. Stop and Clean Up

```bash
# Stop the container
podman stop hockey-web

# Remove the container
podman rm hockey-web

# Remove the image
podman rmi hockey-nginx
```

## Troubleshooting

### Can't pull UBI10 image
- **Solution**: Use UBI8 instead. Edit the Containerfile and change `FROM registry.access.redhat.com/ubi10/ubi` to `FROM registry.access.redhat.com/ubi8/ubi`

### Port 8080 already in use
- **Solution**: Change the port mapping: `podman run -d -p 8081:80 --name hockey-web hockey-nginx`

### Container exits immediately
- **Solution**: Check logs: `podman logs hockey-web`
- This usually means nginx failed to start. Verify the HTML file exists and is readable.

### 403 Forbidden error
- **Solution**: Ensure nginx has read access to the HTML file.

## Technical Details

- **Base Image**: UBI10 (Red Hat Universal Base Image 10)
- **Web Server**: nginx (installed via dnf)
- **Port**: 80 (inside container), typically mapped to 8080 on host
- **Document Root**: /usr/share/nginx/html/
- **Entrypoint**: nginx running in foreground mode

## Why This Works

The original Containerfile used `registry.access.redhat.com/ubi10/nginx-126` which is a **Source-to-Image (STI) builder image**, not a runtime nginx container. Builder images are designed to build applications, not run as persistent services.

This corrected Containerfile:
1. Uses the UBI10 base OS image
2. Explicitly installs nginx runtime
3. Copies the HTML file to the correct location
4. Runs nginx in foreground mode (required for containers)

## License

This project uses Red Hat UBI images which are freely redistributable.
