# Set the base image to nginx official
FROM    nginx

# File Author / Maintainer
MAINTAINER Antonio Troina

# Copy custom configuration
COPY files/nginx.conf /etc/nginx/nginx.conf

# Add content; should point at distribution dir
COPY release /usr/share/nginx/html
