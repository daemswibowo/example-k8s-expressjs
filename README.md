# kelinci-mq

kelinci belajar

## Quick Start

Get started developing...

```shell
# install deps
npm install

# run in development mode
npm run dev

# run tests
npm run test
```

---
# Try host with local Kubernetes
All `./k8s/*.yaml` files are generated with [kompose](https://kubernetes.io/docs/tasks/configure-pod-container/translate-compose-kubernetes/) that translate the `./docker-compose.yaml` file into kubernetes files.

- First you need to run and enable kubernetes from your local Docker Desktop preferences. See how [https://www.docker.com/blog/how-kubernetes-works-under-the-hood-with-docker-desktop/](https://www.docker.com/blog/how-kubernetes-works-under-the-hood-with-docker-desktop/).
- Build express js app image
  ```bash
  cp .env.example .env
  docker build -t kelinci-app .
  ```
- Apply all of our k8s pods & services file
  ```bash
  kubectl apply -f ./k8s/app-deployment.yaml,./k8s/app-service.yaml,./k8s/kelinci-mq-networkpolicy.yaml,./k8s/rabbitmq-claim0-persistentvolumeclaim.yaml,./k8s/rabbitmq-claim1-persistentvolumeclaim.yaml,./k8s/rabbitmq-deployment.yaml,./k8s/rabbitmq-service.yaml
  ```
  then you'll see the output like this:
  ```bash
  deployment.apps/app created
  service/app created
  networkpolicy.networking.k8s.io/kelinci-mq created
  persistentvolumeclaim/rabbitmq-claim0 created
  persistentvolumeclaim/rabbitmq-claim1 created
  deployment.apps/rabbitmq created
  service/rabbitmq created
  ```
Now our app already deployed on local kubernetes.
## Run app with port-forward
First you can see all the running pods list using `kubectl get pods` then you can do port-forward it with `kubectl port-forward YOUR_POD_NAME {YOUR_WANTED_PORT_TO_EXPOSE}:{APP_PORT}`.
For example you want to see `kelinci-app` and `rabbitmq` management hosted on port 3000 for app and 15672 for rabbitmq management dashboard, so you can run:
```bash
# assuming kelinci-app as a pod name
kubectl port-forward kelinci-app 3000:3000
# assuming rabbitmq management as a pod name
kubectl port-forward rabbitmq 15672:15672
```