import { PlayerData } from '@/types/player';

export const playerData: PlayerData = {
  personalInfo: {
    name: "MADHUR DIXIT",
    position: "Lead AI/ML Infrastructure Engineer",
    nationality: "India",
    age: 23,
    photo: "/madhur-photo.jpg", // Replace with your actual photo
    kitNumber: 13
  },
  experiences: [
    {
      name: "Allyin.ai",
      logo: "🤖",
      position: "Lead AI/ML Infrastructure Engineer",
      duration: "July 2025 - Present",
      achievements: [
        "Leading AI/ML infrastructure initiatives",
        "Reduced contract review time by 70%",
        "Cut AWS cloud costs by 35%",
        "Architected centralized FusionAuth service",
        "Built scalable ML model deployment pipelines"
      ],
      isCurrent: true,
      url: "https://allyin.ai"
    },
    {
      name: "Heartland Community Network",
      logo: "❤️",
      position: "Senior Consultant (Volunteer)",
      duration: "June 2025 - Present",
      achievements: [
        "Led team transition from Google Docs to Jira",
        "Built context-aware LangChain agent",
        "Improved team productivity by 40%"
      ],
      isCurrent: true,
      url: "https://www.heartlandnet.com/"
    },
    {
      name: "Liquid Rocketry Lab",
      logo: "🚀",
      position: "Data Engineer",
      duration: "Sept 2024 - May 2025",
      achievements: [
        "Slashed sensor data retrieval time by 96%",
        "Reduced API response time by 40%",
        "Spearheaded database schema restructuring",
        "Implemented real-time data streaming pipelines"
      ],
      isCurrent: false,
      url: "https://liquidrocketry.com/"
    },
    {
      name: "Digiliyo",
      logo: "💻",
      position: "Software Engineer Intern",
      duration: "Sept 2021 - Nov 2021",
      achievements: [
        "Modernized web pages using React",
        "Created web dashboards",
        "Collaborated with API team",
        "Improved user interface responsiveness"
      ],
      isCurrent: false,
      url: "https://www.linkedin.com/company/digiliyo/posts/?feedView=all"
    },
    {
      name: "Perch Furnitures",
      logo: "🪑",
      position: "Software Engineer Intern",
      duration: "Feb 2021 - Aug 2021",
      achievements: [
        "Increased customer interaction by 10%",
        "Built and maintained unit tests",
        "Developed e-commerce features",
        "Optimized database queries"
      ],
      isCurrent: false,
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
      logo: "🎓"
    },
    {
      institution: "University of Mumbai",
      degree: "Bachelor of Engineering in Computer Engineering",
      duration: "Aug 2019 - May 2023",
      gpa: "3.7/4.00",
      location: "Mumbai, India",
      logo: "🏛️"
    }
  ],
  coursework: [
    // Core Computer Science
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
      description: "Complex algorithm design, optimization, and computational complexity analysis"
    },
    {
      course: "Computer Architecture",
      institution: "University of Mumbai",
      category: "Computer Science",
      description: "Computer system design, processor architecture, and hardware-software interface"
    },
    
    // Software Engineering & Development
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
    
    // Data Science & Analytics
    {
      course: "Data Analysis",
      institution: "NCSU",
      category: "Data Science",
      description: "Statistical analysis, data visualization, and exploratory data analysis techniques"
    },
    {
      course: "Database Management",
      institution: "NCSU & University of Mumbai",
      category: "Data Management",
      description: "Database design, optimization, SQL, and modern database technologies"
    },
    
    // AI/ML Specialization
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
      description: "Supervised/unsupervised learning, model evaluation, and ML algorithms implementation"
    },
    {
      course: "Neural Networks",
      institution: "NCSU",
      category: "AI/ML",
      description: "Deep learning architectures, backpropagation, and neural network optimization"
    },
    
    // Systems & Security
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
      description: "Accepted research paper analyzing 13 years of data comparing dual versus single submission homework approaches in educational settings",
      focus: "Educational Research",
      conferenceId: "ID 1571118602"
    }
  ],
  projects: [
    {
        name: "Reddit SentimentFlow",
        description: "End-to-end subreddit moderation system.",
        technologies: ["Python", "Apache Airflow", "Docker", "AWS"],
        year: 2025,
        type: "Personal Project",
        url: "https://github.com/MadhurDixit13/SentimentFlow"
    },
    {
        name: "CarePulse Analytics",
        description: "Modular healthcare analytics pipeline.",
        technologies: ["Python", "Databricks", "Spark", "Kafka"],
        year: 2025,
        type: "Personal Project",
        url: "https://github.com/MadhurDixit13/CarePulse"
    },
    {
        name: "Portfolio Website",
        description: "FIFA-style interactive portfolio",
        technologies: ["Next.js", "TypeScript", "Three.js"],
        year: 2025,
        type: "Portfolio Project",
        url: "https://github.com/MadhurDixit13/madhur-portfolio"
    },
    {
        name: "Game Engine",
        description: "Game Engine with features like physics, multi-threading, networking, scripting, and more. Built 2 games using the engine.",
        technologies: ["C++", "SFML", "ZeroMQ", "V8"],
        year: 2024,
        type: "Coursework",
        url: "https://github.com/MadhurDixit13/madhur-portfolio"
    },
    {
        name: "MiniSpark",
        description: "MiniSpark is a minimal, educational re-implementation of Apache Spark in pure Python. It uses the multiprocessing module to simulate a driver and worker cluster, supports lazy transformations and actions, stage/DAG planning, and simple DAG visualization.",
        technologies: ["Python", "Spark"],
        year: 2025,
        type: "Personal Project",
        url: "https://github.com/MadhurDixit13/MiniSpark"
    },
    {
        name: "Game AI",
        description: "Game AI with features like pathfinding, decision trees, and more.",
        technologies: ["Python", "SFML", "AI"],
        year: 2024,
        type: "Coursework",
        url: "https://github.com/MadhurDixit13/CSC-584-GameAI"
    },
    {
        name: "Soccer-Match-Outcome-Prediction ",
        description: "Machine learning model to predict the outcome of a soccer match.",
        technologies: ["Python", "Jupyter", "Pandas", "Scikit-learn", "Matplotlib", "Seaborn", "Keras"],
        year: 2025,
        type: "Group Project",
        url: "https://github.com/MadhurDixit13/Soccer-Match-Outcome-Prediction"
    },
    {
        name: "Kafka_Stock_Market_Data_Analysis",
        description: "stock market data analysis using Kafka streaming data in real-time from csv file.",
        technologies: ["Python", "Kafka"],
        year: 2024,
        type: "Group Project",
        url: "https://github.com/MadhurDixit13/Kafka_Stock_Market_Data_Analysis"
    },
    {
        name: "Sales Data Analysis",
        description: "Data analysis of sales data using Power BI.",
        technologies: ["Power BI", "Excel"],
        year: 2024,
        type: "Personal Project",
        url: "https://github.com/MadhurDixit13/Sales_DataAnalysis_PowerBi"
    },
  ],
  skills: [
    {
      category: "Programming Languages",
      icon: "💻",
      skills: [
        "Python", "JavaScript", "TypeScript", "Java", "SQL", "R", "C++", "Go"
      ]
    },
    {
      category: "AI/ML & Data Science",
      icon: "🤖",
      skills: [
        "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", 
        "Scikit-learn", "Pandas", "NumPy", "Apache Spark", "MLOps"
      ]
    },
    {
      category: "Cloud & Infrastructure",
      icon: "☁️",
      skills: [
        "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", 
        "Terraform", "Jenkins", "CI/CD", "Microservices"
      ]
    },
    {
      category: "Databases & Storage",
      icon: "🗄️",
      skills: [
        "PostgreSQL", "MongoDB", "Redis", "Elasticsearch", 
        "Apache Kafka", "S3", "DynamoDB", "BigQuery"
      ]
    },
    {
      category: "Web Technologies",
      icon: "🌐",
      skills: [
        "React", "Next.js", "Node.js", "Express", "REST APIs", 
        "GraphQL", "HTML/CSS", "Tailwind CSS"
      ]
    },
    {
      category: "Tools & Platforms",
      icon: "🛠️",
      skills: [
        "Git", "Jira", "Confluence", "Slack", "VS Code", 
        "IntelliJ", "Postman", "Figma", "Tableau"
      ]
    }
  ],
  blogs: [
    {
      title: "Athena vs Redshift: Choosing the Right Data Warehouse",
      description: "A comprehensive comparison of AWS Athena and Redshift, exploring performance, cost, and use cases for different data warehouse scenarios.",
      url: "https://medium.com/@madhurdixit37/athena-vs-redshift-a-real-world-data-lake-vs-warehouse-comparison-using-covid-19-data-1c0c2560bc89",
      platform: "Medium",
      date: "Dec 2024",
      readTime: "12 min read",
      tags: ["AWS", "Data Warehouse", "Analytics", "Cloud Computing"]
    },
    {
      title: "MiniSpark: Building a Lightweight Spark Alternative",
      description: "Exploring the development of a simplified distributed computing framework inspired by Apache Spark, focusing on core concepts and implementation.",
      url: "https://medium.com/@madhurdixit37/diving-under-the-hood-of-spark-with-minispark-a-pure-python-learning-playground-afe8fd21e90b",
      platform: "Medium",
      date: "Nov 2024",
      readTime: "15 min read",
      tags: ["Distributed Computing", "Apache Spark", "Big Data", "System Design"]
    },
  ],
  stats: {
    technical: 95,
    leadership: 88,
    innovation: 92,
    communication: 93,
    problemSolving: 94,
    overall: 92
  },
  contact: {
    email: "madhurdixit37@gmail.com",
    linkedin: "linkedin.com/in/madixit",
    github: "github.com/MadhurDixit13",
    phone: "925-460-7574",
    location: "Cincinnati, OH, USA"
  }
};
