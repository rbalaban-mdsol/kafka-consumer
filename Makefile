ECR_TAG=245522776103.dkr.ecr.us-east-1.amazonaws.com/meds_connected_devices_kafka_consumer
CONTAINER_TAG_NUMBER=0.0.4

login_ecr:
	aws ecr get-login-password --region us-east-1 --profile dev | docker login --username AWS --password-stdin 245522776103.dkr.ecr.us-east-1.amazonaws.com

build_ecr:
	export DOCKER_DEFAULT_PLATFORM=linux/amd64 && export BUILDKIT_PROGRESS=plain && time docker build -t ${ECR_TAG}:${CONTAINER_TAG_NUMBER} . --no-cache

run_ecr:
	docker run ${ECR_TAG}:${CONTAINER_TAG_NUMBER}

push_ecr:
	docker push ${ECR_TAG}:${CONTAINER_TAG_NUMBER}
 
build_for_ecr: login_ecr build_ecr push_ecr