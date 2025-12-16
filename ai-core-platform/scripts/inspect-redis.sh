#!/bin/bash

echo "=== All Redis Keys ==="
docker exec ai-core-platform-redis-1 redis-cli KEYS "*"

echo -e "\n=== API Keys ==="
# Get all keys and check if they look like API keys (64 character hex strings)
docker exec ai-core-platform-redis-1 redis-cli KEYS "*" | while read -r key; do
    if [[ $key =~ ^[0-9a-f]{64}$ ]]; then
        value=$(docker exec ai-core-platform-redis-1 redis-cli GET "$key")
        echo "Key: $key"
        echo "Value: $value"
        echo "---"
    fi
done

echo -e "\n=== Raw Interactions ==="
docker exec ai-core-platform-redis-1 redis-cli LRANGE interactions 0 4