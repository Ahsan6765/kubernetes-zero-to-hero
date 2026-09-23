const legacyLabs = [
    {
        id: "first-pod",
        icon: "☸",
        title: "Create Your First Pod",
        description:
            "Learn how Kubernetes creates and manages a basic Pod.",
        difficulty: "Beginner",
        duration: "10 min",
        steps: [
            {
                title: "Check that the cluster is reachable",
                detail: "Before creating anything, confirm kubectl can talk to the API server.",
                command: "kubectl get nodes",
                output: "NAME       STATUS   ROLES           AGE   VERSION\nminikube   Ready    control-plane   12d   v1.31.0"
            },
            {
                title: "Create a Pod",
                detail: "Ask the API to run an nginx container. Kubernetes schedules it onto a Ready node.",
                command: "kubectl run nginx --image=nginx",
                output: "pod/nginx created"
            },
            {
                title: "Watch the Pod become Running",
                detail: "STATUS moves through Pending and ContainerCreating before Running.",
                command: "kubectl get pods",
                output: "NAME    READY   STATUS    RESTARTS   AGE\nnginx   1/1     Running   0          12s"
            },
            {
                title: "Inspect events and IP",
                detail: "describe is the first troubleshooting tool — it shows the node, IP, and recent events.",
                command: "kubectl describe pod nginx",
                output: "Status:       Running\nIP:           10.244.0.18\nEvents:\n  SuccessfulCreate   Created pod: nginx"
            }
        ]
    },
    {
        id: "deployment",
        icon: "🚀",
        title: "Deploy an Application",
        description:
            "Create a Deployment and understand replicas.",
        difficulty: "Beginner",
        duration: "15 min",
        steps: [
            {
                title: "Create a Deployment",
                detail: "A Deployment owns ReplicaSets, which own Pods. You manage the desired replica count.",
                command: "kubectl create deployment web --image=nginx --replicas=3",
                output: "deployment.apps/web created"
            },
            {
                title: "Confirm three Pods",
                detail: "All three should be Running. If one dies, the ReplicaSet replaces it.",
                command: "kubectl get deploy,rs,pods",
                output: "NAME      READY   UP-TO-DATE   AVAILABLE\nweb       3/3     3            3\n\nNAME                DESIRED   CURRENT   READY\nweb-6b8d           3         3         3"
            },
            {
                title: "Scale up",
                detail: "Changing spec.replicas is how you scale a stateless app.",
                command: "kubectl scale deployment web --replicas=5",
                output: "deployment.apps/web scaled"
            },
            {
                title: "Watch a rollout",
                detail: "Updating the image creates a new ReplicaSet and shifts traffic gradually.",
                command: "kubectl set image deployment/web nginx=nginx:1.25 && kubectl rollout status deployment/web",
                output: "Waiting for deployment \"web\" rollout to finish: 2 out of 5 new replicas have been updated...\ndeployment \"web\" successfully rolled out"
            }
        ]
    },
    {
        id: "service",
        icon: "🌐",
        title: "Expose an Application",
        description:
            "Understand how Services provide stable networking.",
        difficulty: "Intermediate",
        duration: "20 min",
        steps: [
            {
                title: "List current Services",
                detail: "kubernetes ClusterIP is the API server. Your apps will get similar virtual IPs.",
                command: "kubectl get svc",
                output: "NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)\nkubernetes   ClusterIP   10.96.0.1    <none>        443/TCP"
            },
            {
                title: "Expose the Deployment",
                detail: "The Service selector matches Pod labels from the Deployment template.",
                command: "kubectl expose deployment web --port=80 --target-port=80",
                output: "service/web exposed"
            },
            {
                title: "Check endpoints",
                detail: "Empty endpoints mean the selector does not match any ready Pods.",
                command: "kubectl get endpoints web",
                output: "NAME   ENDPOINTS                               AGE\nweb    10.244.0.18:80,10.244.0.19:80,10.244.0.20:80   8s"
            },
            {
                title: "Resolve cluster DNS",
                detail: "From another Pod, web.default.svc.cluster.local should hit those endpoints.",
                command: "kubectl run tmp --rm -it --image=busybox -- nslookup web",
                output: "Name:      web.default.svc.cluster.local\nAddress 1: 10.96.12.40"
            }
        ]
    }
];

export { labs } from "./labs-expanded.js";
