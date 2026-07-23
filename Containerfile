FROM registry.access.redhat.com/ubi10/ubi

# Install nginx
RUN dnf install -y nginx && dnf clean all

# Copy the hockey game HTML file as index.html to the nginx web root
COPY hockey_gamepad_realrink_propertiming.html /usr/share/nginx/html/index.html

# Expose port 80 (nginx default)
EXPOSE 80

# Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
