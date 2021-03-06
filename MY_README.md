# GCP Account
* quebicaws2021@gmail.com

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

### Create IAM token for other service. Eg: flow, component
###### Create service account user
* /api/v1/users
* request
```
{
  "username": "super1@serviceaccount.de",
  "firstname": "a",
  "lastname": "b",
  "role": "SERVICE_ACCOUNT",
  "status": "ACTIVE",
  "password": "asd",
  "permissions": [
    "all"
  ]
}
```
* get user id

###### Create iam token
* url /api/v1/tokens
* request
```
{
  "accountId": "PASTE SERVICE ACCOUNT ID HERE",
  "expiresIn": -1
}
```
* get return token. And convert it into base64
* then set that value into 'iamtoken' in services\{{service}}\k8s\config\secret.yml

##### Some changes in service config map
* Change ConfigMap INTROSPECT_ENDPOINT_BASIC: "http://iam:3099/api/v1/tokens/introspect"

## Access Component API
* Log in using serviceaccount user. Get Auth_token
* {{HOST}}/components
* header = Bearer + Auth_token


## My Custom Compoent
* https://github.com/openintegrationhub/contacts-adapter-template
* https://docs.elastic.io/guides/building-nodejs-component.html
* https://github.com/elasticio/code-component
```
{
  "distribution": {
    "type": "docker",
    "image": "quebicdocker/openintegrationhub-contacts-adapter-template-component:3"
  },
  "access": "public",
  "name": "Node.js code",
  "description": "Node.js code component that executes the provided code"
}
```

## My Flow
```
{
  "name": "Timer To Code Component Example",
  "description:": "This flow periodically triggers the flow and sends request to webhook.site",
  "graph": {
    "nodes": [
      {
        "id": "step_1",
        "componentId": "6042e3ee98d81f001b935397",
        "function": "executeTrigger",
        "fields": {
          "code": "function run(msg) {console.log('Calling trigger', msg); return {'message': 'HELLO1'};}"
        }
      },
	  {
        "id": "step_2",
        "componentId": "6042e3ee98d81f001b935397",
        "function": "execute",
        "fields": {
          "code": "function run(msg) {console.log('Calling action', msg);}"
        }
      }
    ],
    "edges": [
      {
        "source": "step_1",
        "target": "step_2"
      }
    ]
  },
  "cron": "*/2 * * * *"
}
```

## Inter Component Message communication
* Component need these MESSAGE_CRYPTO_IV: '9f43a0048b2e8c01', MESSAGE_CRYPTO_PASSWORD: 'asd'
* When Dispatch message form Component to another, message with encrypt.
* Add env value to that in QueueCreator.createQueuesForFlowNode method in component-orchestrator.