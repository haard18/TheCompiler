# Use a base image with Java, Python, and GCC installed
FROM ubuntu:latest

RUN apt-get update && apt-get install -y \
    openjdk-11-jdk \
    python3 \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app

# Copy entry point script into the container
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# The entry point script will determine the language and run the code
ENTRYPOINT ["/entrypoint.sh"]