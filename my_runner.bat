kubectl apply -f .\services\component-orchestrator\k8s\config\configmap.yaml
kubectl apply -f .\services\component-orchestrator\k8s\config\secret.yaml
kubectl apply -f .\services\component-orchestrator\k8s\deployment\deployment.yaml
kubectl apply -f .\services\component-orchestrator\k8s\deployment\service.yaml

kubectl apply -f .\services\data-hub\k8s\config\configmap.yaml
kubectl apply -f .\services\data-hub\k8s\config\secret.yaml
kubectl apply -f .\services\data-hub\k8s\deployment\deployment.yaml
kubectl apply -f .\services\data-hub\k8s\deployment\service.yaml

kubectl apply -f .\services\dispatcher-service\k8s\config\configmap.yaml
kubectl apply -f .\services\dispatcher-service\k8s\config\secret.yaml
kubectl apply -f .\services\dispatcher-service\k8s\deployment\deployment.yaml
kubectl apply -f .\services\dispatcher-service\k8s\deployment\service.yaml

kubectl apply -f .\services\flow-repository\k8s\config\configmap.yaml
kubectl apply -f .\services\flow-repository\k8s\config\secret.yaml
kubectl apply -f .\services\flow-repository\k8s\deployment\deployment.yaml
kubectl apply -f .\services\flow-repository\k8s\deployment\service.yaml

kubectl apply -f .\services\meta-data-repository\k8s\config\configmap.yaml
kubectl apply -f .\services\meta-data-repository\k8s\config\secret.yaml
kubectl apply -f .\services\meta-data-repository\k8s\deployment\deployment.yaml
kubectl apply -f .\services\meta-data-repository\k8s\deployment\service.yaml

kubectl apply -f .\services\secret-service\k8s\config\configmap.yaml
kubectl apply -f .\services\secret-service\k8s\config\secret.yaml
kubectl apply -f .\services\secret-service\k8s\deployment\deployment.yaml
kubectl apply -f .\services\secret-service\k8s\deployment\service.yaml

kubectl apply -f .\services\snapshots-service\k8s\config\configmap.yaml
kubectl apply -f .\services\snapshots-service\k8s\config\secret.yaml
kubectl apply -f .\services\snapshots-service\k8s\deployment\deployment.yaml
kubectl apply -f .\services\snapshots-service\k8s\deployment\service.yaml

