FROM amazon/dynamodb-local

# Switch to the root user
USER root

# Create a directory to store the DynamoDB data
RUN mkdir /home/dynamodblocal/data

# Give permission to the dynamodblocal user to access the data directory
RUN chown -R dynamodblocal /home/dynamodblocal/data

# Switch back to the non-root user
USER dynamodblocal

# Set environment variables for DynamoDB Local
ENV DYNAMODB_DATA_DIR /home/dynamodblocal/data

# Expose the DynamoDB Local port
EXPOSE 8000
