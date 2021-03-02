## Init
* kubectl apply -f platform/namespace.yaml
* kubectl apply -f platform/rabbitmq.yaml
* kubectl apply -f platform/redis.yaml

## Create static address
* gcloud compute addresses create oih-dev-ingress --global

## DB setup
* Create Mongo Cluster
* Get Mongo url convert into base64

## Iam
#### Create secrcts
```
apiVersion: v1
kind: Secret
metadata:
  name: iam
  namespace: oih-dev-ns
type: Opaque
data:
  mongourl: 'bW9uZ29kYjovL21vbmdvZGItc2VydmljZS5vaWgtZGV2LW5zLnN2Yy5jbHVzdGVyLmxvY2FsL2lhbQ=='
  jwtsecret: 'c29tZXN0cmluZw=='
  cookiesecret: 'c29tZXN0cmluZw=='
  admin_password: 'c29tZXN0cmluZw=='
  serviceacc_password: 'c29tZXN0cmluZw=='
  oidc_client_secret: 'c29tZXN0cmluZw=='
```
##### All those are base64 encoded

#### IAM keystore
* go to services\iam dir
* run  
```node -e "require('./src/util/keystore').generateFile()"```
* create secret for keystore
```
kubectl -n oih-dev-ns create secret generic oidc-certs --from-file=keystore.json='keystore.json'
```

## Login IAM
* url ```<ingress_address>/login :POST```
* request
```
{
  "username": "admin@openintegrationhub.com",
  "password": "somestring" //'somestring' this is encoded in my secret fil 'admin_password' 
}
```
