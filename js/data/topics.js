export const topicContent = {
    "linux-fundamentals": {
        overview:
            "Linux is the operating system that almost every Kubernetes node runs. Processes, filesystems, permissions, cgroups, and networking on Linux are the same primitives Kubernetes uses to isolate and run containers.",
        why:
            "Without Linux fundamentals, kubectl output and node failures look like magic. Understanding processes, logs, networking, and permissions makes cluster troubleshooting concrete.",
        keyPoints: [
            "Containers are isolated Linux processes, not lightweight VMs.",
            "Permissions, users, and capabilities affect what a container can do.",
            "systemd, journald, and kernel logs often explain node-level issues.",
            "cgroups and namespaces are the isolation building blocks Kubernetes relies on."
        ],
        example: `ps aux | head
ls -l /var/log
ip addr`
    },
    "networking-fundamentals": {
        overview:
            "Kubernetes networking is still IP addresses, ports, DNS, and routing — applied to a dynamic fleet of Pods. ClusterIP, kube-proxy, and Ingress only make sense if those basics are solid.",
        why:
            "Most production outages are networking: wrong port, DNS miss, firewall, or asymmetric routing. The same mental model applies inside a cluster.",
        keyPoints: [
            "Every service needs a reachable IP and a listening port.",
            "DNS maps names to addresses; Kubernetes CoreDNS does this for Services.",
            "NAT and load balancing hide changing backend IPs behind a stable front.",
            "Packet path: client → Service/Ingress → Pod IP → container port."
        ],
        example: `dig kubernetes.default.svc.cluster.local
curl -v http://10.96.0.1:443`
    },
    "container-fundamentals": {
        overview:
            "A container packages an application with its runtime dependencies and runs it as an isolated process. Images are immutable snapshots; registries distribute them.",
        why:
            "Kubernetes schedules containers, not VMs. If images, layers, and process models are unclear, Pod specs and CrashLoopBackOff will stay confusing.",
        keyPoints: [
            "An image is a filesystem plus a default command.",
            "A container is a running instance of an image.",
            "Containers share the host kernel and isolate with namespaces.",
            "Tag immutability and image pull policy affect what actually runs."
        ],
        example: `docker build -t web:1.0 .
docker run --rm -p 8080:8080 web:1.0`
    },
    "yaml-fundamentals": {
        overview:
            "YAML is the declarative format used for almost every Kubernetes object. Indentation defines structure; maps, lists, and scalars describe desired state.",
        why:
            "A single indent error can change a Deployment into an invalid object. Being fluent in YAML is how you read, review, and debug manifests.",
        keyPoints: [
            "Indentation is significant; tabs are invalid.",
            "Lists start with '-' and maps use 'key: value'.",
            "kubectl apply sends YAML to the API server as JSON.",
            "Use kubectl explain and dry-run to validate fields."
        ],
        example: `apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
    - name: nginx
      image: nginx:1.25`
    },
    "what-is-kubernetes": {
        overview:
            "Kubernetes is a platform for managing containerized workloads and services through declarative configuration and automation.",
        why:
            "Running a few containers manually is manageable. Managing hundreds across machines introduces scheduling, availability, scaling, networking, and update problems.",
        keyPoints: [
            "Kubernetes orchestrates containerized workloads.",
            "It uses a desired-state model.",
            "Controllers continuously reconcile actual state to desired state.",
            "It provides scheduling, networking, scaling, and self-healing."
        ],
        example: `kubectl get nodes
kubectl cluster-info`
    },
    "why-kubernetes": {
        overview:
            "Kubernetes exists to automate the operational work of running containers at scale: placement, restarts, rollouts, discovery, and scaling.",
        why:
            "Without orchestration, operators handle deployment, scheduling, service discovery, scaling, and recovery by hand.",
        keyPoints: [
            "Automated scheduling onto healthy nodes",
            "Self-healing when processes or nodes fail",
            "Declarative scaling of replicas",
            "Rolling updates with controlled rollbacks"
        ],
        example: `kubectl scale deployment web --replicas=5
kubectl rollout status deployment/web`
    },
    "kubernetes-architecture": {
        overview:
            "A cluster has a control plane (API server, etcd, scheduler, controllers) and worker nodes (kubelet, kube-proxy, container runtime).",
        why:
            "Separating cluster management from workload execution lets Kubernetes manage applications consistently regardless of node count.",
        keyPoints: [
            "The API server is the front door to cluster state.",
            "etcd stores the source of truth.",
            "The scheduler binds Pods to nodes.",
            "Kubelet makes the node match the Pod specs assigned to it."
        ],
        example: `kubectl get --raw /healthz
kubectl get componentstatuses`
    },
    "cluster-and-nodes": {
        overview:
            "A cluster is a set of nodes managed as one system. Control-plane nodes run cluster services; worker nodes run your Pods.",
        why:
            "Capacity, taints, and node health determine whether workloads can be scheduled. Node-level failures are a first-class operational concern.",
        keyPoints: [
            "Nodes report capacity and conditions (Ready, MemoryPressure).",
            "kubectl get nodes shows the scheduling surface.",
            "Cordon and drain prepare a node for maintenance.",
            "Lost nodes cause Pods to be rescheduled if they are managed by a controller."
        ],
        example: `kubectl get nodes -o wide
kubectl describe node`
    },
    "pods": {
        overview:
            "A Pod is the smallest deployable unit. It holds one or more containers that share network namespace, volumes, and lifecycle.",
        why:
            "Kubernetes places and heals Pods, not individual containers. Sidecars, shared volumes, and localhost networking all live at the Pod layer.",
        keyPoints: [
            "Each Pod gets its own IP inside the cluster network.",
            "Containers in a Pod share localhost and volumes.",
            "Pods are mortal; controllers recreate them.",
            "Probes decide readiness and liveness."
        ],
        example: `kubectl run nginx --image=nginx
kubectl get pods -o wide
kubectl describe pod nginx`
    },
    "namespaces": {
        overview:
            "Namespaces partition cluster objects by name. They are the usual boundary for teams, environments, and RBAC.",
        why:
            "Without namespaces, every object shares one global name. Isolation of config, quotas, and permissions starts here.",
        keyPoints: [
            "Names must be unique within a namespace, not across the cluster.",
            "Default, kube-system, and kube-public are built-in.",
            "ResourceQuotas and NetworkPolicies often target a namespace.",
            "kubectl -n selects the working namespace."
        ],
        example: `kubectl get ns
kubectl create namespace demo
kubectl get pods -n kube-system`
    },
    "labels-selectors": {
        overview:
            "Labels are key/value tags on objects. Selectors query those labels so Services, Deployments, and policies can target the right Pods.",
        why:
            "IPs and names change constantly. Labels are the stable identity Kubernetes uses to group workloads.",
        keyPoints: [
            "Labels belong on metadata, not as a substitute for names.",
            "Equality and set-based selectors are both supported.",
            "Services select Pods by labels.",
            "Keep labels small, consistent, and documented."
        ],
        example: `kubectl get pods --show-labels
kubectl get pods -l app=web`
    },
    "replicasets": {
        overview:
            "A ReplicaSet keeps a specified number of Pod replicas running. Deployments create and own ReplicaSets for you.",
        why:
            "If a Pod dies, something must replace it. ReplicaSets are that self-healing loop for identical copies.",
        keyPoints: [
            "spec.replicas is the desired count.",
            "The selector must match the Pod template labels.",
            "You rarely create ReplicaSets directly.",
            "Deployments use ReplicaSets to implement rollouts."
        ],
        example: `kubectl get rs
kubectl describe rs`
    },
    "deployments": {
        overview:
            "A Deployment manages stateless apps: desired replicas, rolling updates, pause, and rollback through ReplicaSets.",
        why:
            "Shipping a new image without a Deployment means deleting Pods by hand. Deployments make updates declarative and reversible.",
        keyPoints: [
            "RollingUpdate is the default strategy.",
            "maxUnavailable and maxSurge control blast radius.",
            "kubectl rollout undo restores a previous ReplicaSet.",
            "The template hash labels each generation of Pods."
        ],
        example: `kubectl create deployment web --image=nginx
kubectl set image deployment/web nginx=nginx:1.25
kubectl rollout status deployment/web`
    },
    "statefulsets": {
        overview:
            "StatefulSets give Pods stable names, ordered start/stop, and stable storage identity — required for databases and queues.",
        why:
            "Deployments treat replicas as interchangeable. Stateful systems need sticky identity and disk.",
        keyPoints: [
            "Pods are named app-0, app-1, … in order.",
            "Each replica can get its own PersistentVolumeClaim.",
            "Headless Services provide stable DNS per Pod.",
            "Updates can be RollingUpdate or OnDelete."
        ],
        example: `kubectl get statefulset
kubectl get pods -l app=redis`
    },
    "daemonsets": {
        overview:
            "A DaemonSet runs a copy of a Pod on every matching node — typical for logs, metrics agents, and CNI helpers.",
        why:
            "Some software must exist on each machine, not as a shared pool of replicas.",
        keyPoints: [
            "New nodes automatically get the DaemonSet Pod.",
            "Node selectors and tolerations limit where it runs.",
            "Updates roll node by node.",
            "Do not use Deployments for node-local agents."
        ],
        example: `kubectl get daemonset -A
kubectl describe ds -n kube-system`
    },
    "jobs-cronjobs": {
        overview:
            "Jobs run Pods until a task succeeds a given number of times. CronJobs create Jobs on a schedule.",
        why:
            "Batch work and periodic tasks should not run as forever-Deployments.",
        keyPoints: [
            "backoffLimit controls retries after failure.",
            "completions and parallelism define how work is split.",
            "CronJobs use a cron expression in spec.schedule.",
            "Failed Jobs leave Pods behind for debugging."
        ],
        example: `kubectl create job ping --image=busybox -- echo hello
kubectl get cronjobs`
    },
    "services": {
        overview:
            "A Service is a stable virtual IP and DNS name in front of a changing set of Pods selected by labels.",
        why:
            "Pod IPs die with the Pod. Clients need a contract that survives rescheduling.",
        keyPoints: [
            "kube-proxy programs forwarding rules to endpoints.",
            "EndpointSlices track ready Pod IPs.",
            "readinessGates and probes affect who receives traffic.",
            "ClusterIP is reachable only inside the cluster by default."
        ],
        example: `kubectl expose deployment web --port=80
kubectl get svc
kubectl get endpointslices`
    },
    "service-types": {
        overview:
            "ClusterIP, NodePort, LoadBalancer, and ExternalName expose Services in different scopes — internal, node, cloud LB, or DNS alias.",
        why:
            "Choosing the wrong type either hides your app or accidentally publishes it to the internet.",
        keyPoints: [
            "ClusterIP: default, in-cluster only.",
            "NodePort: opens a high port on every node.",
            "LoadBalancer: requests a cloud provider IP.",
            "ExternalName: CNAME to an external hostname."
        ],
        example: `kubectl get svc -o wide
kubectl expose deployment web --type=NodePort --port=80`
    },
    "cluster-dns": {
        overview:
            "CoreDNS serves names like my-svc.my-ns.svc.cluster.local so workloads find each other without hardcoded IPs.",
        why:
            "Service discovery is how microservices stay loosely coupled as Pods churn.",
        keyPoints: [
            "Pods use the cluster DNS via kubelet --cluster-dns.",
            "A Service named web in default is web.default.svc.cluster.local.",
            "Headless Services return Pod A records.",
            "ndots and search domains affect name resolution inside Pods."
        ],
        example: `kubectl get svc -n kube-system kube-dns
kubectl exec -it dnsutils -- nslookup kubernetes`
    },
    "ingress": {
        overview:
            "Ingress (and newer Gateway API) route HTTP/HTTPS from outside the cluster to Services based on host and path.",
        why:
            "NodePorts per app do not scale. A reverse proxy with TLS is the usual north-south entry.",
        keyPoints: [
            "An Ingress resource is useless without an Ingress controller.",
            "Host and path rules map to backend Services.",
            "TLS secrets terminate HTTPS on the controller.",
            "Annotations are controller-specific — treat them as vendor API."
        ],
        example: `kubectl get ingress
kubectl describe ingress`
    },
    "network-policies": {
        overview:
            "NetworkPolicies are firewall rules for Pods. By default all Pods can talk; policies restrict ingress and egress by labels, namespaces, and CIDRs.",
        why:
            "Flat cluster networking is convenient and dangerous. Policies implement least privilege on the east-west path.",
        keyPoints: [
            "A CNI plugin must enforce NetworkPolicy.",
            "Selecting a Pod with a policy that has no ingress rules can isolate it.",
            "Allow DNS (kube-system) or name resolution breaks.",
            "Start with explicit allow lists, then test with connectivity checks."
        ],
        example: `kubectl get networkpolicy -A
kubectl describe networkpolicy`
    },
    "configmaps": {
        overview:
            "ConfigMaps store non-secret configuration as keys that can be injected as env vars, files, or command arguments.",
        why:
            "Baking config into images forces rebuilds. ConfigMaps let the same image run in many environments.",
        keyPoints: [
            "Updates to mounted files can appear without a restart depending on mount type.",
            "Env var injection is fixed at container start.",
            "Size limits exist; do not store huge files.",
            "Keep secrets out of ConfigMaps."
        ],
        example: `kubectl create configmap app-config --from-literal=LOG_LEVEL=info
kubectl get configmap app-config -o yaml`
    },
    "secrets": {
        overview:
            "Secrets hold sensitive data (tokens, certs, passwords). They are base64-encoded in etcd by default — encryption at rest is a cluster setting, not automatic magic.",
        why:
            "Credentials in images and git history leak. Kubernetes Secrets plus RBAC and encryption at rest are the baseline.",
        keyPoints: [
            "Default encoding is not encryption.",
            "Mount as files when possible to avoid env dumps.",
            "RBAC should tightly limit who can get secrets.",
            "Rotate by creating a new Secret and rolling the workload."
        ],
        example: `kubectl create secret generic db --from-literal=password=hunter2
kubectl get secret db -o jsonpath='{.data.password}' | base64 -d`
    },
    "persistent-volumes": {
        overview:
            "A PersistentVolume (PV) is a piece of storage provisioned for the cluster — NFS, cloud disk, or local — with a lifecycle independent of any one Pod.",
        why:
            "Container filesystems are ephemeral. Databases and queues need disks that survive Pod restarts.",
        keyPoints: [
            "PVs have capacity, access modes, and reclaim policy.",
            "Access modes: RWO, ROX, RWX.",
            "Reclaim policy decides what happens after a claim is deleted.",
            "Static PVs are created by admins; dynamic ones come from StorageClasses."
        ],
        example: `kubectl get pv
kubectl describe pv`
    },
    "persistent-volume-claims": {
        overview:
            "A PersistentVolumeClaim (PVC) is a user's request for storage. The control plane binds it to a matching PV.",
        why:
            "App teams should ask for '10Gi ReadWriteOnce', not a specific disk UUID.",
        keyPoints: [
            "The Pod mounts the PVC, not the PV directly.",
            "Pending PVCs usually mean no matching PV or StorageClass.",
            "Deleting a PVC may delete the volume depending on reclaim policy.",
            "StatefulSets can auto-create per-replica PVCs."
        ],
        example: `kubectl get pvc
kubectl describe pvc`
    },
    "storage-classes": {
        overview:
            "A StorageClass names a provisioner and parameters so PVCs can dynamically create PVs (for example gp3 on AWS or SSD on GCE).",
        why:
            "Pre-creating disks does not scale. Dynamic provisioning matches cloud-native clusters.",
        keyPoints: [
            "storageClassName on a PVC selects the class.",
            "WaitForFirstConsumer delays binding until a Pod is scheduled.",
            "Volume expansion may be allowed by the class.",
            "Default StorageClass applies when a PVC omits a name."
        ],
        example: `kubectl get storageclass
kubectl describe storageclass`
    },
    "service-accounts": {
        overview:
            "A ServiceAccount is an identity for processes running in Pods. The kubelet mounts a token so the app can call the API server.",
        why:
            "Workloads should not share human user credentials. Each app gets a scoped identity.",
        keyPoints: [
            "Every namespace has a default ServiceAccount.",
            "automountServiceAccountToken can be disabled if unused.",
            "Bound tokens are audience-aware and rotatable.",
            "RBAC binds roles to ServiceAccounts, not to Pod names."
        ],
        example: `kubectl get sa
kubectl describe sa default`
    },
    "rbac": {
        overview:
            "Role-based access control answers who can do what on which resources. Roles/ClusterRoles list verbs; RoleBindings attach them to users or ServiceAccounts.",
        why:
            "The API server is powerful. Unrestricted get/list/watch on secrets or create on pods is a cluster takeover path.",
        keyPoints: [
            "Role is namespaced; ClusterRole is cluster-wide.",
            "Verbs: get, list, watch, create, update, patch, delete.",
            "aggregationRule can compose ClusterRoles.",
            "kubectl auth can-i is the fastest way to test."
        ],
        example: `kubectl get roles,rolebindings -A
kubectl auth can-i create deployments --as=system:serviceaccount:default:default`
    },
    "security-context": {
        overview:
            "SecurityContext sets user IDs, capabilities, privilege, seccomp, and filesystem rules for Pods and containers.",
        why:
            "Default containers often run as root with extra capabilities. Tight contexts shrink blast radius after a compromise.",
        keyPoints: [
            "runAsNonRoot and readOnlyRootFilesystem are high-value defaults.",
            "drop ALL capabilities, then add back only what is needed.",
            "Pod vs container securityContext merge with container winning on conflicts.",
            "PodSecurity admission can enforce these cluster-wide."
        ],
        example: `kubectl explain pod.spec.securityContext
kubectl explain pod.spec.containers.securityContext`
    },
    "resource-requests-limits": {
        overview:
            "Requests guarantee scheduling capacity; limits cap usage. CPU is compressible; memory limits often OOMKill the container.",
        why:
            "Without requests, nodes overpack and everyone starves. Without limits, one process can take a node down.",
        keyPoints: [
            "The scheduler uses requests, not current usage.",
            "LimitRange can default these in a namespace.",
            "QoS class (Guaranteed, Burstable, BestEffort) follows request/limit pairing.",
            "HPA needs requests to compute utilization percentages."
        ],
        example: `kubectl describe pod
kubectl top pods`
    },
    "taints-tolerations": {
        overview:
            "Taints mark nodes as uninhabitable unless a Pod tolerates them. Used for dedicated GPU nodes, control-plane nodes, and spot pools.",
        why:
            "Not every workload should land on every node. Taints are the hard exclusion mechanism.",
        keyPoints: [
            "Effects: NoSchedule, PreferNoSchedule, NoExecute.",
            "NoExecute can evict running Pods that do not tolerate the taint.",
            "Tolerations match key, value, effect, and optionally operator Exists.",
            "Control-plane nodes are usually tainted by default."
        ],
        example: `kubectl taint nodes node1 dedicated=gpu:NoSchedule
kubectl describe node | grep Taint`
    },
    "node-affinity": {
        overview:
            "Node affinity attracts Pods to nodes whose labels match required or preferred rules — the counterpart to taints.",
        why:
            "You may want SSD nodes or a region without making every other node untouchable.",
        keyPoints: [
            "requiredDuringSchedulingIgnoredDuringExecution is a hard rule.",
            "preferredDuringSchedulingIgnoredDuringExecution is a weighted hint.",
            "IgnoredDuringExecution means it will not evict if labels change.",
            "Combine with topology spread for zone balance."
        ],
        example: `kubectl get nodes --show-labels
kubectl explain pod.spec.affinity.nodeAffinity`
    },
    "hpa": {
        overview:
            "The Horizontal Pod Autoscaler adjusts replica counts from metrics — usually CPU, memory, or custom metrics from a metrics pipeline.",
        why:
            "Traffic is not constant. Autoscaling matches capacity to load without pager-driven scale-up.",
        keyPoints: [
            "HPA cannot scale if requests are missing for resource metrics.",
            "Stabilization windows prevent flapping.",
            "It scales the Deployment/StatefulSet replica field.",
            "Cluster capacity still needs to exist — HPA does not add nodes."
        ],
        example: `kubectl get hpa
kubectl autoscale deployment web --cpu-percent=70 --min=2 --max=10`
    },
    "cluster-autoscaler": {
        overview:
            "Cluster Autoscaler (or a cloud equivalent) adds or removes nodes when Pods are unschedulable or nodes are underused.",
        why:
            "HPA creating replicas that stay Pending wastes money and misses SLOs. Node pools must grow too.",
        keyPoints: [
            "Scale-up is triggered by unschedulable Pods.",
            "Scale-down respects PodDisruptionBudgets.",
            "System Pods and local storage can block drain.",
            "Cloud IAM and node group config are required."
        ],
        example: `kubectl get nodes
kubectl describe pod | grep -A5 Events`
    },
    "kubernetes-logs": {
        overview:
            "Container logs are stdout/stderr collected by the runtime. kubectl logs reads the current (and previous) stream; aggregators ship them off-node.",
        why:
            "CrashLoopBackOff and failed probes are diagnosed from logs first.",
        keyPoints: [
            "kubectl logs --previous shows the last crashed instance.",
            "Sidecars need -c to pick a container.",
            "Nodes have finite log rotation; do not rely on local disk forever.",
            "Structured logs make querying in Loki/ELK possible."
        ],
        example: `kubectl logs deploy/web
kubectl logs pod/web-abc -c sidecar --previous`
    },
    "kubernetes-events": {
        overview:
            "Events are time-limited messages from controllers: FailedScheduling, Pulled, Killing, and so on. They are the cluster's short-term audit trail.",
        why:
            "When a Pod is Pending, events usually say exactly why — taints, affinity, or insufficient CPU.",
        keyPoints: [
            "Events expire; they are not a long-term log.",
            "kubectl describe surfaces the recent events for an object.",
            "Warning vs Normal helps prioritize.",
            "A flood of events often points to a reconcile loop."
        ],
        example: `kubectl get events --sort-by=.lastTimestamp
kubectl describe pod`
    },
    "metrics": {
        overview:
            "Metrics-server (or Prometheus) exposes resource usage. kubectl top and HPA both depend on a metrics pipeline.",
        why:
            "You cannot scale or capacity-plan without seeing CPU, memory, and app-level SLIs.",
        keyPoints: [
            "metrics.k8s.io is the resource metrics API.",
            "custom.metrics.k8s.io and external.metrics.k8s.io power advanced HPA.",
            "Dashboards should include RED/USE methods, not only node CPU.",
            "Alert on symptoms (error rate, latency) plus causes (restarts, saturation)."
        ],
        example: `kubectl top nodes
kubectl top pods -A`
    },
    "pending-pods": {
        overview:
            "Pending means the scheduler has not bound the Pod to a node. Causes: resources, affinity, taints, PVC, or missing runtime.",
        why:
            "A Pending replica is downtime. The event stream plus node capacity is the standard debug path.",
        keyPoints: [
            "Read FailedScheduling messages first.",
            "Compare requests against node allocatable.",
            "Check PVCs stuck in Pending.",
            "Cordoned nodes and taints are frequent culprits."
        ],
        example: `kubectl describe pod
kubectl get nodes
kubectl get pvc`
    },
    "crashloopbackoff": {
        overview:
            "CrashLoopBackOff means the container starts, exits non-zero, and Kubernetes backs off restarts. The app, config, or probe is usually wrong.",
        why:
            "The workload is never ready. Logs of the previous container are the fastest signal.",
        keyPoints: [
            "kubectl logs --previous is the first command.",
            "Missing ConfigMaps, bad commands, and failed migrations are common.",
            "Liveness probes that are too aggressive create crash loops.",
            "exit code and OOMKilled appear in describe."
        ],
        example: `kubectl describe pod
kubectl logs --previous`
    },
    "imagepullbackoff": {
        overview:
            "ImagePullBackOff means the kubelet cannot fetch the image: wrong name/tag, private registry auth, or registry outage.",
        why:
            "The container never starts, so no application logs exist yet.",
        keyPoints: [
            "Check image spelling and tag.",
            "imagePullSecrets must exist in the same namespace.",
            "IfNotPresent will not save you from a never-pulled private image.",
            "Rate limits on public registries appear as pull errors."
        ],
        example: `kubectl describe pod | grep -A8 Events
kubectl get secret`
    },
    "network-troubleshooting": {
        overview:
            "Service issues are a path problem: DNS, endpoints, NetworkPolicy, kube-proxy, and the app listen address.",
        why:
            "A 200 on localhost inside the Pod can still fail through a Service if selectors or policies are wrong.",
        keyPoints: [
            "Confirm Endpoints/EndpointSlices are non-empty.",
            "Exec into a debug Pod and curl the ClusterIP and Pod IP.",
            "Check NetworkPolicies and host firewalls.",
            "CoreDNS logs explain name lookup failures."
        ],
        example: `kubectl get endpoints
kubectl run tmp --rm -it --image=nicolaka/netshoot -- bash`
    },
    "custom-resources": {
        overview:
            "CustomResourceDefinitions extend the Kubernetes API with new kinds. Controllers then reconcile those objects like built-in resources.",
        why:
            "Not every abstraction belongs in a ConfigMap. CRDs make domain objects first-class and inspectable with kubectl.",
        keyPoints: [
            "CRDs define schema, versions, and conversion.",
            "status is owned by controllers; spec by users.",
            "RBAC must allow the new API group.",
            "Invalid schemas break apply for everyone using that kind."
        ],
        example: `kubectl get crd
kubectl explain certificates.cert-manager.io`
    },
    "operators": {
        overview:
            "An Operator is a controller plus CRDs that encode operational knowledge: backups, failovers, upgrades for a specific application.",
        why:
            "Humans should not run the same runbook on every cluster. Operators encode it as software.",
        keyPoints: [
            "Level-triggered reconcile loops beat one-shot scripts.",
            "Operators still need RBAC, metrics, and leader election.",
            "A bad Operator can be more dangerous than no Operator.",
            "OLM and Helm are distribution methods, not the pattern itself."
        ],
        example: `kubectl get deploy,pods -n operators
kubectl get csv -A`
    },
    "cni": {
        overview:
            "The Container Network Interface plugin gives each Pod an IP and wires connectivity plus, often, NetworkPolicy. Calico, Cilium, Flannel are implementations.",
        why:
            "Without CNI, Pods have no cluster network. Plugin choice affects performance, policy, and eBPF features.",
        keyPoints: [
            "kubelet calls CNI at Pod start and stop.",
            "IPAM allocates Pod CIDRs.",
            "Overlay vs routed underlay changes operations.",
            "NetworkPolicy support is plugin-dependent."
        ],
        example: `kubectl get pods -n kube-system
kubectl -n kube-system logs ds/calico-node`
    },
    "csi": {
        overview:
            "The Container Storage Interface lets storage vendors attach, mount, and snapshot volumes without in-tree cloud code.",
        why:
            "Every cloud disk API used to live in Kubernetes core. CSI keeps storage out-of-tree and standard.",
        keyPoints: [
            "CSI driver DaemonSets run on nodes that mount volumes.",
            "Controller plugins handle attach and provision.",
            "StorageClass provisioner names point at CSI drivers.",
            "Snapshots and expansion are extra CSI capabilities."
        ],
        example: `kubectl get csidriver
kubectl get pods -n kube-system | grep csi`
    },
    "production-architecture": {
        overview:
            "Production clusters combine HA control planes, backup of etcd, network policy, observability, GitOps, and incident practice — not just 'it runs kubectl'.",
        why:
            "A laptop minikube is not an SLA. Production design is about failure domains, access, and recoverability.",
        keyPoints: [
            "Multi-AZ control plane and etcd quorum.",
            "Backup and restore tested, not theoretical.",
            "Least-privilege RBAC and admission policies.",
            "SLOs, alerts, and progressive delivery for apps."
        ],
        example: `kubectl get --raw /readyz?verbose
kubectl get nodes -o wide`
    }
};
