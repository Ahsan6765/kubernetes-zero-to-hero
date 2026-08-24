export const roadmap = [
    {
        id: "prerequisites",
        number: 0,
        title: "Prerequisites",
        description:
            "Build the foundational knowledge required to understand Kubernetes properly.",
        difficulty: "Beginner",

        topics: [
            {
                id: "linux-fundamentals",
                title: "Linux Fundamentals",
                description:
                    "Processes, filesystems, permissions, networking and basic administration.",
                difficulty: "Beginner",
                prerequisites: []
            },
            {
                id: "networking-fundamentals",
                title: "Networking Fundamentals",
                description:
                    "IP addressing, ports, DNS, routing and basic networking concepts.",
                difficulty: "Beginner",
                prerequisites: []
            },
            {
                id: "container-fundamentals",
                title: "Container Fundamentals",
                description:
                    "Understand containers and why containerization matters.",
                difficulty: "Beginner",
                prerequisites: []
            },
            {
                id: "yaml-fundamentals",
                title: "YAML Fundamentals",
                description:
                    "Learn the configuration format heavily used by Kubernetes.",
                difficulty: "Beginner",
                prerequisites: []
            }
        ]
    },

    {
        id: "fundamentals",
        number: 1,
        title: "Kubernetes Fundamentals",
        description:
            "Understand what Kubernetes is, why it exists and the problems it solves.",
        difficulty: "Beginner",

        topics: [
            {
                id: "what-is-kubernetes",
                title: "What is Kubernetes?",
                description:
                    "Understand Kubernetes and the problems it solves.",
                difficulty: "Beginner",
                prerequisites: [
                    "container-fundamentals"
                ]
            },
            {
                id: "why-kubernetes",
                title: "Why Kubernetes?",
                description:
                    "Understand orchestration, scaling, self-healing and automation.",
                difficulty: "Beginner",
                prerequisites: [
                    "what-is-kubernetes"
                ]
            },
            {
                id: "kubernetes-architecture",
                title: "Kubernetes Architecture",
                description:
                    "Understand the control plane, worker nodes and cluster architecture.",
                difficulty: "Beginner",
                prerequisites: [
                    "what-is-kubernetes"
                ]
            }
        ]
    },

    {
        id: "core-objects",
        number: 2,
        title: "Kubernetes Core Objects",
        description:
            "Learn the fundamental Kubernetes resources used to build applications.",
        difficulty: "Beginner",

        topics: [
            {
                id: "cluster-and-nodes",
                title: "Clusters and Nodes",
                description:
                    "Understand the physical and logical structure of a Kubernetes cluster.",
                difficulty: "Beginner",
                prerequisites: [
                    "kubernetes-architecture"
                ]
            },
            {
                id: "pods",
                title: "Pods",
                description:
                    "Learn the smallest deployable unit in Kubernetes.",
                difficulty: "Beginner",
                prerequisites: [
                    "cluster-and-nodes"
                ]
            },
            {
                id: "namespaces",
                title: "Namespaces",
                description:
                    "Understand logical isolation inside Kubernetes.",
                difficulty: "Beginner",
                prerequisites: [
                    "pods"
                ]
            },
            {
                id: "labels-selectors",
                title: "Labels and Selectors",
                description:
                    "Understand how Kubernetes resources identify and select objects.",
                difficulty: "Beginner",
                prerequisites: [
                    "pods"
                ]
            }
        ]
    },

    {
        id: "workloads",
        number: 3,
        title: "Workloads",
        description:
            "Learn how Kubernetes manages application workloads.",
        difficulty: "Intermediate",

        topics: [
            {
                id: "replicasets",
                title: "ReplicaSets",
                description:
                    "Maintain a desired number of Pod replicas.",
                difficulty: "Intermediate",
                prerequisites: [
                    "pods",
                    "labels-selectors"
                ]
            },
            {
                id: "deployments",
                title: "Deployments",
                description:
                    "Manage stateless applications and controlled rollouts.",
                difficulty: "Intermediate",
                prerequisites: [
                    "replicasets"
                ]
            },
            {
                id: "statefulsets",
                title: "StatefulSets",
                description:
                    "Manage stateful workloads requiring stable identity.",
                difficulty: "Intermediate",
                prerequisites: [
                    "deployments"
                ]
            },
            {
                id: "daemonsets",
                title: "DaemonSets",
                description:
                    "Run workloads across selected nodes.",
                difficulty: "Intermediate",
                prerequisites: [
                    "pods"
                ]
            },
            {
                id: "jobs-cronjobs",
                title: "Jobs and CronJobs",
                description:
                    "Run finite and scheduled workloads.",
                difficulty: "Intermediate",
                prerequisites: [
                    "pods"
                ]
            }
        ]
    },

    {
        id: "networking",
        number: 4,
        title: "Kubernetes Networking",
        description:
            "Understand how Pods and external users communicate.",
        difficulty: "Intermediate",

        topics: [
            {
                id: "services",
                title: "Services",
                description:
                    "Provide stable networking access to dynamic Pods.",
                difficulty: "Intermediate",
                prerequisites: [
                    "pods",
                    "labels-selectors"
                ]
            },
            {
                id: "service-types",
                title: "Service Types",
                description:
                    "Understand ClusterIP, NodePort and LoadBalancer.",
                difficulty: "Intermediate",
                prerequisites: [
                    "services"
                ]
            },
            {
                id: "cluster-dns",
                title: "Kubernetes DNS",
                description:
                    "Understand service discovery inside the cluster.",
                difficulty: "Intermediate",
                prerequisites: [
                    "services"
                ]
            },
            {
                id: "ingress",
                title: "Ingress",
                description:
                    "Route external HTTP/HTTPS traffic into applications.",
                difficulty: "Intermediate",
                prerequisites: [
                    "services",
                    "cluster-dns"
                ]
            },
            {
                id: "network-policies",
                title: "Network Policies",
                description:
                    "Control communication between workloads.",
                difficulty: "Advanced",
                prerequisites: [
                    "services"
                ]
            }
        ]
    },

    {
        id: "configuration-storage",
        number: 5,
        title: "Configuration and Storage",
        description:
            "Manage application configuration, secrets and persistent data.",
        difficulty: "Intermediate",

        topics: [
            {
                id: "configmaps",
                title: "ConfigMaps",
                description:
                    "Store non-sensitive configuration.",
                difficulty: "Intermediate",
                prerequisites: [
                    "pods"
                ]
            },
            {
                id: "secrets",
                title: "Secrets",
                description:
                    "Store sensitive configuration data.",
                difficulty: "Intermediate",
                prerequisites: [
                    "configmaps"
                ]
            },
            {
                id: "persistent-volumes",
                title: "Persistent Volumes",
                description:
                    "Understand persistent storage resources.",
                difficulty: "Intermediate",
                prerequisites: [
                    "pods"
                ]
            },
            {
                id: "persistent-volume-claims",
                title: "PersistentVolumeClaims",
                description:
                    "Request persistent storage for applications.",
                difficulty: "Intermediate",
                prerequisites: [
                    "persistent-volumes"
                ]
            },
            {
                id: "storage-classes",
                title: "StorageClasses",
                description:
                    "Understand dynamic storage provisioning.",
                difficulty: "Advanced",
                prerequisites: [
                    "persistent-volume-claims"
                ]
            }
        ]
    },

    {
        id: "security",
        number: 6,
        title: "Kubernetes Security",
        description:
            "Secure workloads, identities and access to the Kubernetes API.",
        difficulty: "Advanced",

        topics: [
            {
                id: "service-accounts",
                title: "ServiceAccounts",
                description:
                    "Provide workload identities inside Kubernetes.",
                difficulty: "Intermediate",
                prerequisites: [
                    "pods"
                ]
            },
            {
                id: "rbac",
                title: "RBAC",
                description:
                    "Control who can perform which actions.",
                difficulty: "Advanced",
                prerequisites: [
                    "service-accounts"
                ]
            },
            {
                id: "security-context",
                title: "Security Context",
                description:
                    "Control runtime security settings for Pods and containers.",
                difficulty: "Advanced",
                prerequisites: [
                    "pods"
                ]
            }
        ]
    },

    {
        id: "scheduling",
        number: 7,
        title: "Scheduling and Resources",
        description:
            "Understand how Kubernetes decides where workloads should run.",
        difficulty: "Advanced",

        topics: [
            {
                id: "resource-requests-limits",
                title: "Requests and Limits",
                description:
                    "Control CPU and memory resource allocation.",
                difficulty: "Intermediate",
                prerequisites: [
                    "pods"
                ]
            },
            {
                id: "taints-tolerations",
                title: "Taints and Tolerations",
                description:
                    "Control which workloads can run on nodes.",
                difficulty: "Advanced",
                prerequisites: [
                    "resource-requests-limits"
                ]
            },
            {
                id: "node-affinity",
                title: "Node Affinity",
                description:
                    "Influence workload placement based on node attributes.",
                difficulty: "Advanced",
                prerequisites: [
                    "resource-requests-limits"
                ]
            }
        ]
    },

    {
        id: "scaling",
        number: 8,
        title: "Scaling",
        description:
            "Scale applications and infrastructure according to demand.",
        difficulty: "Advanced",

        topics: [
            {
                id: "hpa",
                title: "Horizontal Pod Autoscaler",
                description:
                    "Automatically scale workloads based on resource or custom metrics.",
                difficulty: "Advanced",
                prerequisites: [
                    "deployments",
                    "resource-requests-limits"
                ]
            },
            {
                id: "cluster-autoscaler",
                title: "Cluster Autoscaler",
                description:
                    "Automatically adjust the number of cluster nodes.",
                difficulty: "Advanced",
                prerequisites: [
                    "hpa"
                ]
            }
        ]
    },

    {
        id: "observability",
        number: 9,
        title: "Observability",
        description:
            "Understand logs, metrics, events and monitoring.",
        difficulty: "Advanced",

        topics: [
            {
                id: "kubernetes-logs",
                title: "Logs",
                description:
                    "Understand application and container logs.",
                difficulty: "Intermediate",
                prerequisites: [
                    "pods"
                ]
            },
            {
                id: "kubernetes-events",
                title: "Events",
                description:
                    "Use Kubernetes events to understand cluster behavior.",
                difficulty: "Intermediate",
                prerequisites: [
                    "pods"
                ]
            },
            {
                id: "metrics",
                title: "Metrics and Monitoring",
                description:
                    "Understand resource and application metrics.",
                difficulty: "Advanced",
                prerequisites: [
                    "resource-requests-limits"
                ]
            }
        ]
    },

    {
        id: "troubleshooting",
        number: 10,
        title: "Troubleshooting",
        description:
            "Diagnose common Kubernetes failures systematically.",
        difficulty: "Advanced",

        topics: [
            {
                id: "pending-pods",
                title: "Pending Pods",
                description:
                    "Diagnose Pods that cannot be scheduled.",
                difficulty: "Advanced",
                prerequisites: [
                    "scheduling"
                ]
            },
            {
                id: "crashloopbackoff",
                title: "CrashLoopBackOff",
                description:
                    "Investigate containers that repeatedly crash.",
                difficulty: "Advanced",
                prerequisites: [
                    "pods",
                    "kubernetes-logs"
                ]
            },
            {
                id: "imagepullbackoff",
                title: "ImagePullBackOff",
                description:
                    "Diagnose container image retrieval problems.",
                difficulty: "Advanced",
                prerequisites: [
                    "pods"
                ]
            },
            {
                id: "network-troubleshooting",
                title: "Networking Troubleshooting",
                description:
                    "Diagnose service and connectivity problems.",
                difficulty: "Advanced",
                prerequisites: [
                    "services",
                    "ingress"
                ]
            }
        ]
    },

    {
        id: "advanced",
        number: 11,
        title: "Advanced and Production Kubernetes",
        description:
            "Move from application usage to production-grade Kubernetes engineering.",
        difficulty: "Advanced",

        topics: [
            {
                id: "custom-resources",
                title: "Custom Resources",
                description:
                    "Extend Kubernetes using custom resource definitions.",
                difficulty: "Advanced",
                prerequisites: [
                    "rbac"
                ]
            },
            {
                id: "operators",
                title: "Operators",
                description:
                    "Automate application lifecycle management using Kubernetes APIs.",
                difficulty: "Advanced",
                prerequisites: [
                    "custom-resources"
                ]
            },
            {
                id: "cni",
                title: "CNI",
                description:
                    "Understand Kubernetes container networking implementations.",
                difficulty: "Advanced",
                prerequisites: [
                    "network-policies"
                ]
            },
            {
                id: "csi",
                title: "CSI",
                description:
                    "Understand container storage interfaces.",
                difficulty: "Advanced",
                prerequisites: [
                    "storage-classes"
                ]
            },
            {
                id: "production-architecture",
                title: "Production Kubernetes Architecture",
                description:
                    "Design resilient, secure and observable production clusters.",
                difficulty: "Advanced",
                prerequisites: [
                    "observability",
                    "troubleshooting",
                    "security"
                ]
            }
        ]
    }
];