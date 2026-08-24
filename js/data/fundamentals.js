export const fundamentals = [
    {
        id: "what-is-kubernetes",
        title: "What is Kubernetes?",
        difficulty: "Beginner",

        overview:
            "Kubernetes is a platform for managing containerized workloads and services through declarative configuration and automation.",

        why:
            "Running a few containers manually is manageable. Managing hundreds of containers across multiple machines introduces problems around scheduling, availability, scaling, networking and updates.",

        keyPoints: [
            "Kubernetes orchestrates containerized workloads.",
            "It uses a desired-state model.",
            "It continuously works to maintain the desired state.",
            "It provides scheduling, networking, scaling and self-healing capabilities."
        ],

        example: `kubectl get nodes`,

        prerequisites: [
            "container-fundamentals"
        ]
    },

    {
        id: "why-kubernetes",
        title: "Why Kubernetes?",
        difficulty: "Beginner",

        overview:
            "Kubernetes exists to automate the operational challenges associated with running containerized applications at scale.",

        why:
            "Without orchestration, operators must manually handle deployment, scheduling, service discovery, scaling and recovery.",

        keyPoints: [
            "Automated scheduling",
            "Self-healing",
            "Scaling",
            "Service discovery",
            "Rolling deployments"
        ],

        example: `kubectl scale deployment web --replicas=5`,

        prerequisites: [
            "what-is-kubernetes"
        ]
    }
];