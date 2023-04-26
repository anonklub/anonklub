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
  google auth application-default login
  google config set account <mail address>
  google project create --name <project name>
  google config set project <project id>

  gcloud services enable container.googleapis.com
  gcloud services enable compute.googleapis.com
  gcloud services enable compute.networks.create
  ```

- [ ] set `project` and `region` pulumi gcp config values
  ```shell
  pulumi config set gcp:project $(gcloud config get core/project)
  pulumi config set gcp:region <region>
  ```

## Deploy

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
