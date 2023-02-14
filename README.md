<h2 align="center">
    🔊 KafkaJS Consumer
</h2>

For quick testing of Kafka, point the consumer to the correct `Broker` and `Topic` and listen to the incoming messages. Can be run locally or deployed to kubernetes.

#### Prerequisites

- NodeJS
- Kubectl
- AWS CLI

```shell
# Run the Server
npm run start
```

#### Deploying to Kubernetes

- Be logged in to teh correct AWS Account
    - Verify using `aws sts get-caller-identity`
- Change the tag version in Makefile,
    - Tags need to be unique
- `make login_ecr`
- `make build_for_ecr`
