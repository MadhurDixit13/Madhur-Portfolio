import { PlayerData } from '@/types/player';

export const playerData: PlayerData = {
  personalInfo: {
    name: "MADHUR DIXIT",
    position: "Software Developer",
    nationality: "Indian",
    age: 24,
    photo: "/madhur-photo.jpg",
    kitNumber: 13
  },

  experiences: [
    {
      name: "Runara.ai",
      logo: "⚡",
      logoImage: "/runara.jpg",
      position: "Product Software Developer",
      duration: "Jan 2026 - Present",
      achievements: [
        "Developing automated Docker-based deployment pipelines for reproducible LLM model serving and A/B performance testing",
        "Identified underutilised Tensor Cores (7%) on H100/L40S; optimised batch size, KV cache & parallelism to boost SM occupancy by 4x",
        "Improved throughput across diverse LLM workloads; researching further model-specific tuning"
      ],
      isCurrent: true,
      url: "https://runara.ai"
    },
    {
      name: "AllyIn.ai",
      logo: "🤖",
      logoImage: "/allyin.jpg",
      position: "Model Research Intern",
      duration: "July 2025 - Dec 2025",
      achievements: [
        "Built an end-to-end GPU telemetry platform using DCGM, Prometheus, TimescaleDB, FastAPI, and React to monitor GPU utilisation, throughput, and cost/performance in real time",
        "Architected a high-throughput time-series analytics layer on TimescaleDB (hypertables, retention policies, bulk ingest) handling 100M+ GPU metrics samples with fast, interactive dashboards",
        "Designed optimisation tooling that recommends GPU clock/power limits, batch sizes, precision, and instance types, helping teams cut inference TCO by 15%"
      ],
      isCurrent: false,
      url: "https://www.linkedin.com/company/allyin-ai/posts/?feedView=all"
    },
    {
      name: "Heartland Community Network",
      logo: "❤️",
      logoImage: "/heartland.jpg",
      position: "Senior Consultant (Volunteer)",
      duration: "June 2025 - Jan 2026",
      achievements: [
        "Developed story feature with 6 REST endpoints and DynamoDB GSI, achieving 100ms like-count retrieval across thousands of stories",
        "Built a context-aware LangChain agent with hybrid search (SQL/Vector/Graph), improving response accuracy by 25%"
      ],
      isCurrent: false,
      url: "https://www.heartlandnet.com/"
    },
    {
      name: "Liquid Rocketry Lab",
      logo: "🚀",
      logoImage: "/liquidrocketrylab.jpg",
      position: "Data Engineer",
      duration: "Sept 2024 - May 2025",
      achievements: [
        "Slashed sensor data retrieval time by 96% (from 50s to 2s) by migrating InfluxDB queries from legacy InfluxQL to Flux",
        "Reduced API response time by 40% by migrating backend from Flask to FastAPI, leveraging async performance and Pydantic validation",
        "Spearheaded restructuring of a robust database schema to eliminate session conflicts and enhance data integrity"
      ],
      isCurrent: false,
      url: "https://liquidrocketry.com/"
    },
    {
      name: "Digiliyo",
      logo: "💻",
      logoImage: "/digiliyo.jpg",
      position: "Software Engineer Intern",
      duration: "Sept 2021 - Nov 2021",
      achievements: [
        "Modernised web pages using React and created interactive dashboards",
        "Collaborated with API team to improve UI responsiveness"
      ],
      isCurrent: false,
      legacy: true,
      url: "https://www.linkedin.com/company/digiliyo/posts/?feedView=all"
    },
    {
      name: "Perch Furnitures",
      logo: "🪑",
      position: "Software Engineer Intern",
      duration: "Feb 2021 - Aug 2021",
      achievements: [
        "Increased customer interaction by 10% through new e-commerce features",
        "Built and maintained unit tests; optimised database queries"
      ],
      isCurrent: false,
      legacy: true,
      url: "https://perchfurnitures.com"
    }
  ],

  education: [
    {
      institution: "North Carolina State University",
      degree: "Master of Computer Science",
      duration: "Aug 2023 - May 2025",
      gpa: "3.86/4.00",
      location: "Raleigh, NC",
      logo: "🎓",
      logoImage: "/ncsu.jpg",
      initials: "NC STATE"
    },
    {
      institution: "University of Mumbai",
      degree: "Bachelor of Engineering in Computer Engineering",
      duration: "Aug 2019 - May 2023",
      gpa: "3.7/4.00",
      location: "Mumbai, India",
      logo: "🏛️",
      logoImage: "/mumbai.jpg",
      initials: "MU"
    }
  ],

  coursework: [
    {
      course: "Data Structures",
      institution: "NCSU & University of Mumbai",
      category: "Computer Science",
      description: "Fundamental data structures, algorithm analysis, and problem-solving techniques"
    },
    {
      course: "Algorithms Analysis",
      institution: "NCSU",
      category: "Computer Science",
      description: "Complex algorithm design, optimisation, and computational complexity analysis"
    },
    {
      course: "Computer Architecture",
      institution: "University of Mumbai",
      category: "Computer Science",
      description: "Computer system design, processor architecture, and hardware-software interface"
    },
    {
      course: "Software Engineering",
      institution: "NCSU & University of Mumbai",
      category: "Software Engineering",
      description: "Software development lifecycle, design patterns, and engineering practices"
    },
    {
      course: "Web Development",
      institution: "University of Mumbai",
      category: "Web Technologies",
      description: "Modern web development frameworks, frontend/backend technologies, and web applications"
    },
    {
      course: "Game Development",
      institution: "University of Mumbai",
      category: "Game Development",
      description: "Game design principles, graphics programming, and interactive software development"
    },
    {
      course: "Data Analysis",
      institution: "NCSU",
      category: "Data Science",
      description: "Statistical analysis, data visualisation, and exploratory data analysis techniques"
    },
    {
      course: "Database Management",
      institution: "NCSU & University of Mumbai",
      category: "Data Management",
      description: "Database design, optimisation, SQL, and modern database technologies"
    },
    {
      course: "Artificial Intelligence",
      institution: "University of Mumbai",
      category: "AI/ML",
      description: "AI fundamentals, search algorithms, knowledge representation, and expert systems"
    },
    {
      course: "Machine Learning",
      institution: "NCSU & University of Mumbai",
      category: "AI/ML",
      description: "Supervised/unsupervised learning, model evaluation, and ML algorithm implementation"
    },
    {
      course: "Neural Networks",
      institution: "NCSU",
      category: "AI/ML",
      description: "Deep learning architectures, backpropagation, and neural network optimisation"
    },
    {
      course: "Computer Networks",
      institution: "University of Mumbai",
      category: "Networking",
      description: "Network protocols, architecture, routing, and communication systems"
    },
    {
      course: "Operating Systems",
      institution: "University of Mumbai",
      category: "Systems",
      description: "OS design, process management, memory management, and system programming"
    },
    {
      course: "Cryptography & Blockchain",
      institution: "University of Mumbai",
      category: "Security",
      description: "Cryptographic algorithms, blockchain technology, and cybersecurity fundamentals"
    }
  ],

  research: [
    {
      title: "In the Age of LLMs, Is Dual-Submission Homework Dead?",
      institution: "ASEE Annual Conference & Exposition 2025",
      description: "Accepted paper examining the impact of Large Language Models on traditional dual-submission homework practices in engineering education",
      focus: "Education Technology",
      conferenceId: "ID 47819"
    },
    {
      title: "Reflective Homework as a Learning Tool: Evidence from Comparing 13 Years of Dual vs. Single Submission",
      institution: "FIE 2025: Frontiers in Education Conference",
      description: "Accepted research paper analysing 13 years of data comparing dual versus single submission homework approaches in educational settings",
      focus: "Educational Research",
      conferenceId: "ID 1571118602"
    }
  ],

  projects: [
    {
      name: "Game Engine",
      description: "Cross-platform C++ game engine with a ZeroMQ client-server architecture, load-tested to support 100+ concurrent clients with real-time sync. Integrated V8 JavaScript runtime for hot-reloading and scripting; developed 2 games with under 8% code difference using OOP, multithreading, and scalable design.",
      technologies: ["C++", "SFML", "ZeroMQ", "V8", "Linux"],
      year: 2024,
      type: "Coursework",
      url: "https://github.com/MadhurDixit13/Game-Engine"
    },
    {
      name: "CarePulse Analytics",
      description: "Modular healthcare analytics pipeline using Apache Spark and Delta Lake, processing 10,000+ patient records via AWS Kinesis across a medallion architecture (Bronze → Gold) on Databricks. SCD Type 2 dimensions, CDC logic, and gold-layer KPIs identifying 150+ high-risk patients.",
      technologies: ["Python", "Databricks", "Spark", "AWS Kinesis", "Kafka", "Delta Lake"],
      year: 2025,
      type: "Personal Project",
      url: "https://github.com/MadhurDixit13/CarePulse"
    },
    {
      name: "Reddit SentimentFlow",
      description: "End-to-end subreddit moderation system with automated sentiment analysis pipeline using Apache Airflow orchestration and Docker containerisation.",
      technologies: ["Python", "Apache Airflow", "Docker", "AWS"],
      year: 2025,
      type: "Personal Project",
      url: "https://github.com/MadhurDixit13/SentimentFlow"
    },
    {
      name: "MiniSpark",
      description: "Minimal educational re-implementation of Apache Spark in pure Python using multiprocessing to simulate a driver/worker cluster. Supports lazy transformations, actions, stage/DAG planning, and simple DAG visualisation.",
      technologies: ["Python", "Multiprocessing"],
      year: 2025,
      type: "Personal Project",
      url: "https://github.com/MadhurDixit13/MiniSpark"
    },
    {
      name: "Soccer Match Outcome Prediction",
      description: "Machine learning model to predict soccer match outcomes using historical data with feature engineering and ensemble methods.",
      technologies: ["Python", "Scikit-learn", "Pandas", "Keras", "Matplotlib"],
      year: 2025,
      type: "Group Project",
      url: "https://github.com/MadhurDixit13/Soccer-Match-Outcome-Prediction"
    },
    {
      name: "Game AI",
      description: "Game AI featuring pathfinding (A*, Dijkstra), decision trees, and behaviour trees implemented in Python.",
      technologies: ["Python", "SFML", "AI"],
      year: 2024,
      type: "Coursework",
      url: "https://github.com/MadhurDixit13/CSC-584-GameAI"
    },
    {
      name: "Kafka Stock Market Analysis",
      description: "Real-time stock market data streaming and analysis pipeline using Apache Kafka consuming from CSV feed.",
      technologies: ["Python", "Kafka"],
      year: 2024,
      type: "Group Project",
      url: "https://github.com/MadhurDixit13/Kafka_Stock_Market_Data_Analysis"
    },
    {
      name: "Portfolio Website",
      description: "This FIFA-style interactive portfolio built with Next.js, Three.js, and Framer Motion.",
      technologies: ["Next.js", "TypeScript", "Three.js", "Framer Motion"],
      year: 2025,
      type: "Portfolio Project",
      url: "https://github.com/MadhurDixit13/Madhur_Portfolio"
    },
    {
      name: "Sales Data Analysis",
      description: "Data analysis of sales data using Power BI with interactive dashboards and KPI tracking.",
      technologies: ["Power BI", "Excel"],
      year: 2024,
      type: "Personal Project",
      url: "https://github.com/MadhurDixit13/Sales_DataAnalysis_PowerBi"
    }
  ],

  skills: [
    {
      category: "Languages & OS",
      icon: "💻",
      skills: ["Python", "C++", "JavaScript", "TypeScript", "SQL", "HTML/CSS", "Linux"]
    },
    {
      category: "AI/ML & Data",
      icon: "🤖",
      skills: ["Machine Learning", "Deep Learning", "TensorFlow", "LangChain", "Pandas", "NumPy", "Apache Spark", "MLOps"]
    },
    {
      category: "Cloud & Data Platforms",
      icon: "☁️",
      skills: ["AWS (S3, EC2, Kinesis, Redshift)", "GCP", "ClickHouse", "Databricks", "PostgreSQL", "MongoDB", "TimescaleDB", "InfluxDB"]
    },
    {
      category: "Frameworks & Libraries",
      icon: "⚡",
      skills: ["FastAPI", "React.js", "Node.js", "Express", "Airflow", "Kafka", "Prometheus", "Grafana", "Celery"]
    },
    {
      category: "DevOps & Infra",
      icon: "🛠️",
      skills: ["Docker", "Kubernetes (K8s)", "Terraform", "Git", "GitHub Actions (CI/CD)", "Redis", "DCGM"]
    },
    {
      category: "Concepts",
      icon: "🧠",
      skills: ["LLM Inference Optimisation", "GPU Telemetry", "Distributed Systems", "Stream Processing", "Medallion Architecture", "System Design"]
    }
  ],

  blogs: [
    {
      title: "Athena vs Redshift: Choosing the Right Data Warehouse",
      description: "A comprehensive comparison of AWS Athena and Redshift, exploring performance, cost, and use cases for different data warehouse scenarios.",
      url: "https://medium.com/@madhurdixit37/athena-vs-redshift-a-real-world-data-lake-vs-warehouse-comparison-using-covid-19-data-1c0c2560bc89",
      platform: "Medium",
      date: "Mar 24, 2025",
      readTime: "3 min read",
      tags: ["AWS", "Data Warehouse", "Analytics", "Cloud"]
    },
    {
      title: "MiniSpark: Building a Lightweight Spark Alternative",
      description: "Exploring the development of a simplified distributed computing framework inspired by Apache Spark, focusing on core concepts and implementation.",
      url: "https://medium.com/@madhurdixit37/diving-under-the-hood-of-spark-with-minispark-a-pure-python-learning-playground-afe8fd21e90b",
      platform: "Medium",
      date: "May 17, 2025",
      readTime: "3 min read",
      tags: ["Distributed Computing", "Apache Spark", "Big Data", "System Design"]
    }
  ],

  stats: {
    technical: 95,
    leadership: 88,
    innovation: 93,
    communication: 91,
    problemSolving: 94,
    overall: 93
  },

  contact: {
    email: "madhurdixit37@gmail.com",
    linkedin: "linkedin.com/in/madixit",
    github: "github.com/MadhurDixit13",
    phone: "925-460-7574",
    location: "San Jose, CA"
  }
};
