# Pulumi gcloud k8s

Create a kubernetes cluster on gcloud then deploy an app on that cluster using [pulumi](https://www.pulumi.com/).

Based on following docs:

- [pulumi GKE template](https://www.pulumi.com/templates/kubernetes/gcp/)
- [pulumi kubernetes get started](https://www.pulumi.com/docs/get-started/kubernetes/)
- [access a kubernetes cluster using a pulumi provider](https://www.pulumi.com/registry/packages/kubernetes/how-to-guides/gke/#access-the-kubernetes-cluster-using-pulumi-providers)

## Setup

- [ ] gcloud and pulumi CLIs (I install them with [asdf](https://asdf-vm.com/), namely [asdf-pulumi](https://github.com/canha/asdf-pulumi), [asdf-gcloud](https://github.com/jthegedus/asdf-gcloud))
- [ ] gcloud setup: need to set project and default application credentials, and enable some apis

  ```shell
  gcloud auth application-default login
  gcloud config set account <mail address>
  gcloud projects create --name <project name>
  # SET BILLING FOR PROJECT
  # with UI console or
  # gcloud alpha billing accounts projects link PROJECT_ID (--account-id=ACCOUNT_ID | --billing-account=ACCOUNT_ID)
  gcloud config set project <project id>

  gcloud services enable bigquery-json.googleapis.com
  gcloud services enable container.googleapis.com
  gcloud services enable compute.googleapis.com

  # configure docker with gcloud
  gcloud auth configure-docker

  # configure bigquery access
  # https://codelabs.developers.google.com/codelabs/cloud-bigquery-nodejs#3
  gcloud iam service-accounts create my-bigquery-sa --display-name "my bigquery service account"
  gcloud iam service-accounts keys create ~/key.json --iam-account  my-bigquery-sa@${GOOGLE_CLOUD_PROJECT}.iam.gserviceaccount.com
  gcloud projects add-iam-policy-binding ${GOOGLE_CLOUD_PROJECT} --member "serviceAccount:my-bigquery-sa@${GOOGLE_CLOUD_PROJECT}.iam.gserviceaccount.com" --role "roles/bigquery.user"
  # key.json is used as GOOGLE_APPLICATION_CREDENTIALS secret
  ```

- [ ] install helm

  ```shell
  # in google cloud web console
  curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
  chmod 700 get_helm.sh
  ./get_helm.sh

  # https://kubernetes.github.io/ingress-nginx/deploy/#quick-start
  helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx --create-namespace
  ```

- [ ] set `project` pulumi gcp config values
  ```shell
  pulumi config set gcp:project $(gcloud config get core/project)
  ```

## Deploy

Takes around 20 minutes to deploy the first time.

```shell
pulumi up
```

## Kubeconfig

A pulumi provider is created for our newly created k8s cluster by passing the kubeconfig to it.  
So theoretically, no need to export kubeconfig locally unless you want to use kubectl directly. In this case you can export kubeconfig locally:
To export kubeconfig nonetheless, run:

```shell
pulumi stack output --show-secrets kubeconfig > .kubeconfig
```

Then make sure this file is part of your `$KUBECONFIG` because pulumi looks for a `kubeconfig` file at the location defined by `$KUBECONFIG` first.  
Ex:

```
export KUBECONFIG=$KUBECONFIG:.kubeconfig
```

## Access/Test the app

```shell
curl $(pulumi stack output ip)
```
