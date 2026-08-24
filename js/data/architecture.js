export const architecture = [
    {
        id: "kubernetes-architecture",
        title: "Kubernetes Architecture",
        difficulty: "Beginner",

        overview:
            "A Kubernetes cluster consists primarily of a control plane and worker nodes.",

        why:
            "Separating cluster management responsibilities from workload execution allows Kubernetes to manage applications consistently.",

        keyPoints: [
            "API Server provides the Kubernetes API.",
            "etcd stores cluster state.",
            "Scheduler decides where Pods should run.",
            "Controllers continuously reconcile desired and actual state.",
            "Kubelet manages workloads on nodes."
        ],

        example: `kubectl get componentstatuses`,

        prerequisites: [
            "what-is-kubernetes"
        ]
    }
];