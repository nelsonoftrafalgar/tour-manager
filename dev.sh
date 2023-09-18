#!/bin/bash

# Start Docker Compose services in detached mode
docker-compose up -d

# Define the maximum time to wait for containers to start (in seconds)
MAX_WAIT_TIME=300  # Adjust this value as needed

# Wait for containers to start for a maximum of MAX_WAIT_TIME seconds
elapsed_time=0
while [ $elapsed_time -lt $MAX_WAIT_TIME ]; do
    RUNNING_CONTAINERS=$(docker ps --format "{{.Names}}")

    # Check if the 'postgres' and 'nestjs' containers are running
    if echo "$RUNNING_CONTAINERS" | grep -qE "postgres|nestjs"; then
        echo "Containers 'postgres' and 'nestjs' are running. Proceeding with database migration."
        break
    fi

    echo "Waiting for containers 'postgres' and 'nestjs' to start..."
    sleep 5
    elapsed_time=$((elapsed_time + 5))
done

# Check if the maximum wait time was exceeded
if [ $elapsed_time -ge $MAX_WAIT_TIME ]; then
    echo "Timed out waiting for containers 'postgres' and 'nestjs' to start. Exiting script."
    exit 1
fi

# Run Yarn command to migrate the database inside the 'nestjs' container
docker exec -it nestjs yarn db:migrate

# Check if the migration was successful before running the seed
if [ $? -eq 0 ]; then
    echo "Database migration successful. Proceeding with database seeding."
    # Run Yarn command to seed the database inside the 'nestjs' container
    docker exec -it nestjs yarn db:seed
else
    echo "Database migration failed. Skipping database seeding."
fi

# Exit the script
exit 0
