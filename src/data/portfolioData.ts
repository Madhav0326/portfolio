export interface ProjectScreenshot {
  caption: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Power BI' | 'SQL' | 'Tableau' | 'Business Analytics' | 'Full-Stack Development';
  projectType: 'analytics' | 'software';
  tags: string[];
  year: string;
  featured: boolean;
  image?: string;
  screenshots?: ProjectScreenshot[];
  githubUrl?: string;
  liveUrl?: string;
  isIllustrativeData?: boolean;
  dataNote?: string;
  shortDescription: string;
  problemStatement: string;
  approach: string[];
  keyOutcomes: string[];
  metrics: { label: string; value: string }[];
  isProfessionalExp?: boolean;
  daxOrSqlSnippets?: { title: string; language: string; code: string }[];
  visualHighlights?: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'On-site' | 'Remote';
  recordCount: string;
  summary: string;
  bulletPoints: string[];
  tools: string[];
  isCurrent?: boolean;
}

export interface SkillItem {
  name: string;
  isKeyHighlight?: boolean;
  description: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  skills: SkillItem[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  status: string;
  link?: string;
  badge: string;
}

export const PERSONAL_INFO = {
  name: "Nadukuru Madhav Mukesh",
  shortName: "Nadukuru Madhav Mukesh",
  initials: "NM",
  title: "Data Analyst | Business Analyst | BI & Product Analytics",
  headline: "I turn complex data into clear insights and smarter business decisions.",
  alternativeHeadline: "From raw data to business intelligence, insights, and measurable action.",
  subTitle: "Data Analyst and Business Intelligence professional specializing in SQL, Power BI, Python, Excel, and automated reporting. Practical experience reconciling 12,000+ operational records at Darwix AI and analyzing product conversion funnels at ToffeeTeens.",
  location: "Gurugram, Haryana, India",
  relocation: "Open to Relocation",
  email: "madhav16077@gmail.com",
  phone: "+91 9515245257",
  linkedIn: "https://www.linkedin.com/in/n-madhavmukesh/",
  gitHub: "https://github.com/Madhav0326",
  education: {
    institution: "National Institute of Technology Andhra Pradesh (NIT AP)",
    degree: "B.Tech in Electronics and Communication Engineering",
    period: "Nov 2022 - Apr 2026",
    cgpa: "7.49 / 10",
    schooling: [
      {
        level: "Class XII - Science (CBSE)",
        school: "Kendriya Vidyalaya No.1, S.V.N, Visakhapatnam",
        year: "Aug 2022",
        score: "77.3%"
      },
      {
        level: "Class X (CBSE)",
        school: "Kendriya Vidyalaya No.1, S.V.N, Visakhapatnam",
        year: "Aug 2020",
        score: "75.6%"
      }
    ]
  },
  bio: [
    "I am a final-year B.Tech student at NIT Andhra Pradesh with a strong foundation in analytical problem-solving, database engineering, and modern Business Intelligence platforms. I bridge the gap between technical data pipelines and executive decision-making.",
    "My hands-on experience includes analyzing over 12,000+ AI voice agent call logs at Darwix AI to monitor operational KPIs and segmenting user behavior across 5,000+ booking records at ToffeeTeens. I specialize in writing complex SQL queries, designing star-schema data models in Power BI, writing reusable DAX measures, and automating recurring reporting workflows using Google Apps Script."
  ],
  stats: [
    { value: "17,000+", label: "Operational Records Analyzed", detail: "Across Darwix AI and ToffeeTeens datasets" },
    { value: "4-Page", label: "Omni-Channel Analytics Architecture", detail: "MaDIq Labs executive Power BI suite" },
    { value: "100%", label: "Automated Reporting", detail: "Using Google Apps Script and Power Query" },
    { value: "7.49", label: "NIT AP B.Tech CGPA", detail: "Electronics and Communication Eng." }
  ]
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "darwix-ai",
    role: "Junior Data Analyst Intern",
    company: "Darwix AI",
    location: "Gurugram, Haryana (On-site)",
    period: "Apr 2026 - Present",
    type: "On-site",
    recordCount: "12,000+ Lead & Call Records",
    summary: "Leading operational performance analysis for voice AI agent workflows, data validation pipelines, and automated reporting systems.",
    bulletPoints: [
      "Collaborated on a Voice Agent Performance Dashboard analyzing call attempts, connection success rates, reachability ratios, retry patterns, conversation behavior, call outcomes, and operational KPIs.",
      "Cleaned, mapped, reconciled, and validated 12,000+ lead and AI call-log records across reporting workflows to guarantee metric consistency and strict data accuracy.",
      "Investigated reporting abnormalities by tracing downstream KPIs back to raw source datasets, coordinating directly with AI engineers to validate fixes and resolve data-quality issues.",
      "Prepared daily and monthly operational reports, automating recurring reporting workflows via Google Apps Script to streamline stakeholder decision-making."
    ],
    tools: ["SQL", "Google Apps Script", "Power BI", "Data Validation", "KPI Analytics", "Excel"],
    isCurrent: true
  },
  {
    id: "toffee-teens",
    role: "Data Analyst Intern",
    company: "ToffeeTeens",
    location: "Remote",
    period: "Jul 2025 - Sep 2025",
    type: "Remote",
    recordCount: "5,000+ User & Booking Records",
    summary: "Analyzed product usage, booking funnel conversion rates, and active user growth metrics to guide feature decisions.",
    bulletPoints: [
      "Analyzed 5,000+ records across bookings and user datasets to improve reporting accuracy and establish robust data reliability standards.",
      "Tracked core growth KPIs including Monthly Active Users (MAU), booking frequency, and conversion funnel drop-offs to support data-driven product decisions."
    ],
    tools: ["Python", "SQL", "Excel", "EDA", "Funnel Analytics", "Product Analytics"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "madiq-labs",
    title: "MaDIq Labs: Omni-Channel Analytics Dashboard",
    subtitle: "Enterprise 4-Page Power BI Suite for Executive, Voice, and Sales AI Products",
    category: "Power BI",
    projectType: "analytics",
    tags: ["Power BI", "Power Query", "DAX", "Star Schema", "Time Intelligence", "KPI Analytics"],
    year: "2026",
    featured: true,
    image: "/projects/madiq/01_Executive_Overview.jpg",
    screenshots: [
      { caption: "Page 1: Executive Overview - Platform revenue pipeline, conversion trends, and dynamic key insights", url: "/projects/madiq/01_Executive_Overview.jpg" },
      { caption: "Page 2: VoxIQ Voice Analytics - Connected calls, success rates, talk time, and day-hour heatmap", url: "/projects/madiq/02_VoxIQ_Analytics.jpg" },
      { caption: "Page 3: SalesIQ AI - Adoption rates, suggestion usage by case, objection handling, and customer sentiment", url: "/projects/madiq/03_SalesIQ_AI.jpg" },
      { caption: "Page 4: AI Performance - Model confidence, accuracy metrics, and regional interaction distributions", url: "/projects/madiq/04_AI_Performance.jpg" }
    ],
    githubUrl: "https://github.com/Madhav0326/madiq-labs-omnichannel-analytics",
    isIllustrativeData: true,
    dataNote: "Personal portfolio project built using synthetic datasets across fictional VoxIQ and SalesIQ products.",
    shortDescription: "A 4-page interactive Power BI analytics suite inspecting VoxIQ and SalesIQ AI products with shared dimension modeling, time intelligence, and Month-over-Month comparisons.",
    problemStatement: "Organizations scaling multi-channel AI voice and sales products lack a unified dashboard to compare executive health, voice call performance, lead conversion efficiency, and agent reliability under one cohesive data model.",
    approach: [
      "Constructed a clean star-schema data model with shared Date, Product, and Region dimensions connecting multiple fact tables.",
      "Engineered advanced reusable DAX measures for dynamic KPIs, Month-over-Month growth %, year-to-date accumulators, and dynamic titles.",
      "Implemented Power Query transformations for automated data cleansing, data type enforcement, and null handling.",
      "Integrated filter-aware slicers, drill-through paths, and dynamic Key Insights cards for deep-dive executive reviews."
    ],
    keyOutcomes: [
      "Unified metrics across 2 distinct product lines (VoxIQ and SalesIQ) into a single cohesive 4-page reporting engine.",
      "Accelerated period-over-period performance review times with automated MoM calculation measures.",
      "Delivered cross-filtering support across regions, campaign channels, and product SKUs."
    ],
    metrics: [
      { label: "Dashboard Pages", value: "4 Pages" },
      { label: "Products Covered", value: "VoxIQ & SalesIQ" },
      { label: "Dimensions", value: "Date, Region, Product" },
      { label: "Data Model", value: "Star Schema" }
    ],
    daxOrSqlSnippets: [
      {
        title: "DAX: Month-over-Month Call Connection Growth %",
        language: "DAX",
        code: `MoM Call Growth % = 
VAR CurrentMonthCalls = [Total Connected Calls]
VAR PreviousMonthCalls = 
    CALCULATE(
        [Total Connected Calls],
        DATEADD('Dim_Date'[Date], -1, MONTH)
    )
RETURN
    DIVIDE(
        CurrentMonthCalls - PreviousMonthCalls,
        PreviousMonthCalls,
        0
    )`
      },
      {
        title: "DAX: Dynamic Executive Insight Narrative",
        language: "DAX",
        code: `Executive Summary KPI = 
VAR ConversionRate = [Lead Conversion %]
VAR TargetRate = 0.28
RETURN
    IF(
        ConversionRate >= TargetRate,
        "PERFORMING ABOVE TARGET: Conversion rate at " & FORMAT(ConversionRate, "0.0%"),
        "ATTENTION REQUIRED: Conversion rate at " & FORMAT(ConversionRate, "0.0%") & " (Below 28% Target)"
    )`
      }
    ]
  },
  {
    id: "customer-churn",
    title: "Customer Churn & Retention Analysis",
    subtitle: "SQL & Power BI Analysis on 7,000+ Customer Service and Contract Records",
    category: "SQL",
    projectType: "analytics",
    tags: ["SQL", "MySQL", "Power BI", "Excel", "Customer Segmentation", "Cohort Analysis"],
    year: "2025",
    featured: true,
    shortDescription: "SQL-driven exploratory analysis segmenting customer subscription records across contract cohorts, tenure groups, and service add-ons to identify primary churn drivers.",
    problemStatement: "Subscription businesses face recurring revenue leakage when customer churn patterns are only discovered post-cancellation rather than detected early via behavioral indicators.",
    approach: [
      "Wrote structured SQL queries utilizing Window Functions, CTEs, and CASE statements to segment customer records by tenure, service usage, and payment method.",
      "Modeled churn rates across contract types (Month-to-Month vs 1-Year vs 2-Year) to isolate high-risk subscription cohorts.",
      "Identified critical correlations between customer onboarding service add-ons (tech support, device protection) and churn frequency."
    ],
    keyOutcomes: [
      "Identified Month-to-Month contract holders as representing over 65% of total churned customers.",
      "Demonstrated that accounts without technical support add-ons had significantly higher early churn probability.",
      "Delivered clean, modular SQL query scripts for reproducible customer cohort extraction."
    ],
    metrics: [
      { label: "Records Analyzed", value: "7,000+" },
      { label: "Primary Tools", value: "SQL & Power BI" },
      { label: "Key Segment Focus", value: "Contract & Tenure" },
      { label: "Churn Cohort", value: "65% Month-to-Month" }
    ],
    daxOrSqlSnippets: [
      {
        title: "SQL: Tenure Cohort Churn and Revenue Impact Analysis",
        language: "sql",
        code: `WITH CustomerCohorts AS (
    SELECT 
        customer_id,
        contract_type,
        monthly_charges,
        tenure_months,
        CASE 
            WHEN tenure_months <= 6 THEN '0-6 Months (New)'
            WHEN tenure_months <= 24 THEN '7-24 Months (Growing)'
            ELSE '24+ Months (Mature)'
        END AS tenure_cohort,
        churn_status
    FROM customer_data
)
SELECT 
    tenure_cohort,
    contract_type,
    COUNT(customer_id) AS total_customers,
    SUM(CASE WHEN churn_status = 'Yes' THEN 1 ELSE 0 END) AS churned_count,
    ROUND(AVG(CASE WHEN churn_status = 'Yes' THEN 1.0 ELSE 0 END) * 100, 2) AS churn_rate_pct,
    ROUND(SUM(CASE WHEN churn_status = 'Yes' THEN monthly_charges ELSE 0 END), 2) AS monthly_revenue_lost
FROM CustomerCohorts
GROUP BY tenure_cohort, contract_type
ORDER BY churn_rate_pct DESC;`
      }
    ]
  },
  {
    id: "darwix-voice-dashboard",
    title: "Darwix AI Voice Agent Performance Dashboard",
    subtitle: "Operational Telephony Analytics Reconciling 12,000+ Lead and AI Call Logs",
    category: "Business Analytics",
    projectType: "analytics",
    tags: ["Operational Analytics", "Data Validation", "Google Apps Script", "Power BI", "KPI Reporting"],
    year: "2026",
    featured: true,
    isProfessionalExp: true,
    shortDescription: "Operational telephony validation and reporting framework reconciling 12,000+ lead and AI call logs, tracking reachability KPIs, and automating recurring stakeholder reports via Google Apps Script.",
    problemStatement: "AI Voice Agents generate high-volume call records requiring rigorous reconciliation to catch failed retry connections, conversation breakdowns, and source data anomalies in real-time.",
    approach: [
      "Engineered automated data validation scripts to reconcile call-log records with downstream lead status data across 12,000+ entries.",
      "Formulated operational KPIs including Call Connection Rate, Reachability Score, Retry Success Ratio, and Average Handling Duration.",
      "Traced metric abnormalities back to raw API call logs, collaborating with AI engineers to rectify data pipeline disconnects.",
      "Built automated daily and monthly reporting scripts using Google Apps Script for automated email alerts and sheet synchronizations."
    ],
    keyOutcomes: [
      "Validated and reconciled 12,000+ operational records across production reporting workflows.",
      "Automated recurring daily stakeholder reporting workflows using Google Apps Script.",
      "Identified telephony retry timing patterns to improve voice agent connection efficiency."
    ],
    metrics: [
      { label: "Records Processed", value: "12,000+" },
      { label: "Automation", value: "Google Apps Script" },
      { label: "Domain", value: "AI Voice Telephony" },
      { label: "Scope", value: "Professional Exp." }
    ]
  },
  {
    id: "ut-mart-sales",
    title: "UT Mart Sales Analytics Dashboard",
    subtitle: "Interactive Tableau Visualizations for Retail Sales and Basket Performance",
    category: "Tableau",
    projectType: "analytics",
    tags: ["Tableau", "Retail Analytics", "Sales Performance", "KPI Tracking", "Basket Analysis"],
    year: "2025",
    featured: false,
    image: "/projects/ut-mart/UT Mart Sales PNG.PNG",
    screenshots: [
      { caption: "UT Mart Sales Dashboard: Regional revenue, profit margins, sales trend, and basket size bins", url: "/projects/ut-mart/UT Mart Sales PNG.PNG" }
    ],
    shortDescription: "Interactive Tableau dashboard visualizing regional retail performance, product category revenue contribution, and customer purchasing patterns for supermarket operations.",
    problemStatement: "UT Discount Mart required a centralized reporting dashboard to track store performance (Sales, Profit, Quantity Sold), examine regional performance variations, and test whether customers buy multiple products per basket.",
    approach: [
      "Designed dynamic Tableau dashboards utilizing calculated fields, parameters, and interactive quick filters.",
      "Built regional map visualizations and bar-in-bar charts for target vs actual revenue comparisons.",
      "Structured product hierarchical drill-downs from Category level down to SKU sub-items.",
      "Analyzed basket order distributions to evaluate customer multi-item purchasing habits."
    ],
    keyOutcomes: [
      "Delivered store-level visibility into regional sales distributions and profitable product lines.",
      "Highlighted underperforming product categories to support inventory reallocation.",
      "Confirmed basket order volume distributions for promotional cross-selling strategies."
    ],
    metrics: [
      { label: "Tool", value: "Tableau Desktop" },
      { label: "Domain", value: "Retail & E-commerce" },
      { label: "Focus", value: "Sales, Profit & Quantity" },
      { label: "Visual Features", value: "Parameters & Map Drills" }
    ]
  },
  {
    id: "restaurant-ratings",
    title: "Restaurant Ratings & Consumer Market Analysis",
    subtitle: "Exploratory Data Analysis and Power BI Visualizations on Dining Ecosystems",
    category: "Power BI",
    projectType: "analytics",
    tags: ["Power BI", "EDA", "Market Research", "Data Cleansing", "Geo Analytics"],
    year: "2025",
    featured: false,
    image: "/projects/restaurant/page_1_rendered.png",
    screenshots: [
      { caption: "Page 1: Overview - Consumer demographics, smoking rates, and parking availability across Mexican cities", url: "/projects/restaurant/page_1_rendered.png" },
      { caption: "Page 2: Dining Dynamics - Franchise vs. non-franchise ratings, price tiers, and preferred cuisines", url: "/projects/restaurant/page_2_rendered.png" },
      { caption: "Page 3: Hospitality & Policies - Alcohol service types and restaurant smoking policies", url: "/projects/restaurant/page_3_rendered.png" }
    ],
    shortDescription: "Exploratory analysis evaluating restaurant ratings, price tier distributions, cuisine popularity, and consumer demographics across multi-city dining datasets.",
    problemStatement: "Food and beverage stakeholders require data-backed insights on which restaurant formats, price tiers, and locations achieve the highest customer satisfaction scores among diverse consumer segments.",
    approach: [
      "Cleaned, normalized, and modeled multi-table consumer, restaurant, and ratings datasets.",
      "Evaluated correlations between consumer demographics (budget, age, transport) and average restaurant ratings.",
      "Constructed interactive Power BI visual cards showing top cuisines by city density and price range distributions."
    ],
    keyOutcomes: [
      "Mapped relationships between online ordering availability and higher user rating scores.",
      "Visualized geographical clusters of top-rated mid-tier restaurants to uncover market opportunities.",
      "Built intuitive slicers enabling filtering across consumer demographics and dining formats."
    ],
    metrics: [
      { label: "Tools", value: "Power BI & Excel" },
      { label: "Domain", value: "Consumer & F&B Analytics" },
      { label: "Geography", value: "Mexico Multi-City" },
      { label: "Key Dimensions", value: "Cuisine & Budget" }
    ]
  },
  {
    id: "civictrack",
    title: "CivicTrack: Civic Accountability Platform",
    subtitle: "Full-Stack Web Platform for Issue Tracking, Verification, and Regional Dashboards",
    category: "Full-Stack Development",
    projectType: "software",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Google OAuth"],
    year: "2026",
    featured: false,
    image: "/projects/civictrack/civictrack_hero.png",
    screenshots: [
      { caption: "CivicTrack Platform Interface: Citizen reporting, tracking ID generation, and lifecycle management", url: "/projects/civictrack/civictrack_hero.png" },
      { caption: "Global Platform Statistics: Real-time dashboard KPI metrics across reported issues and resolution rates", url: "/projects/civictrack/civictrack_stats.png" }
    ],
    githubUrl: "https://github.com/Madhav0326/civictrack",
    liveUrl: "https://civictrack-khaki.vercel.app",
    shortDescription: "CivicTrack is a civic accountability platform that enables citizens to report local issues, track their progress, and explore civic problems through interactive state-wise and district-wise dashboards.",
    problemStatement: "Citizens often face common challenges including lack of clarity on whether civic issues are reported, no visibility into resolution progress from authorities, and inability to show community impact for widespread local problems.",
    approach: [
      "Engineered structured PostgreSQL database schemas with Supabase, implementing Row Level Security (RLS) policies for data integrity and user authorization.",
      "Designed interactive state and district-level dashboards to aggregate issue resolution rates and community engagement metrics.",
      "Implemented Google OAuth and secure email authentication workflows with client-side and server-side validation rules.",
      "Created community participation features including 'I am affected too' impact voting and automated lifecycle status tracking."
    ],
    keyOutcomes: [
      "Constructed end-to-end full-stack platform supporting unique tracking IDs (CIV-AP-XXXXXX) and multi-stage lifecycle states.",
      "Implemented real-time platform statistics calculating resolution rates across urban infrastructure categories.",
      "Demonstrated database design, API integration, and user-centric software engineering versatility."
    ],
    metrics: [
      { label: "Stack", value: "Next.js & Supabase" },
      { label: "Database", value: "PostgreSQL & RLS" },
      { label: "Auth", value: "Google OAuth" },
      { label: "Deployment", value: "Live on Vercel" }
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Data Analysis",
    iconName: "BarChart3",
    description: "Core analytical methods, querying engines, and statistical validation tools.",
    skills: [
      { name: "SQL & MySQL", isKeyHighlight: true, description: "Complex joins, CTEs, Window Functions, aggregation, subqueries, and query optimization." },
      { name: "Python", isKeyHighlight: true, description: "Data manipulation with Pandas, NumPy, data cleaning, EDA, and basic automation." },
      { name: "Exploratory Data Analysis (EDA)", isKeyHighlight: false, description: "Pattern discovery, anomaly detection, distribution analysis, and trend extraction." },
      { name: "Data Cleaning & Validation", isKeyHighlight: false, description: "Reconciling source logs with downstream metrics, schema integrity, and handling nulls." },
      { name: "Statistical Analysis", isKeyHighlight: false, description: "Descriptive statistics, hypothesis formulation, correlation analysis, and cohort evaluation." }
    ]
  },
  {
    title: "Business Intelligence",
    iconName: "PieChart",
    description: "End-to-end dashboard architecture, data modeling, and reporting suites.",
    skills: [
      { name: "Power BI", isKeyHighlight: true, description: "Multi-page interactive dashboards, star-schema data modeling, custom visuals, and slicers." },
      { name: "DAX", isKeyHighlight: true, description: "Time intelligence, CALCULATE modifiers, dynamic measures, MoM growth %, and filter contexts." },
      { name: "Tableau", isKeyHighlight: true, description: "Calculated fields, parameter controls, dual-axis charts, map visualizations, and storyboards." },
      { name: "Power Query", isKeyHighlight: false, description: "M-code transformations, unpivoting, schema mapping, and automated data cleaning." },
      { name: "Dashboard Development", isKeyHighlight: false, description: "Executive summary suites, drill-through paths, and user-centric visual layout design." },
      { name: "KPI Tracking & Reporting", isKeyHighlight: true, description: "Defining and visualizing measurable business performance indicators aligned with goals." },
      { name: "Data Visualization", isKeyHighlight: false, description: "Designing intuitive visual hierarchies, chart selection, and business storytelling." }
    ]
  },
  {
    title: "Business & Product Analytics",
    iconName: "TrendingUp",
    description: "Translating telemetry and transactional records into business growth strategies.",
    skills: [
      { name: "Customer Segmentation", isKeyHighlight: false, description: "Clustering customers by contract type, tenure cohort, and engagement levels." },
      { name: "Funnel Analysis", isKeyHighlight: false, description: "Evaluating user progression through multi-stage conversion funnels to pinpoint drop-offs." },
      { name: "Retention & Churn Analysis", isKeyHighlight: false, description: "Identifying churn predictors, tenure survival curves, and subscription cohort health." },
      { name: "Product Metrics", isKeyHighlight: false, description: "Tracking Monthly Active Users (MAU), feature adoption, session duration, and user stickiness." },
      { name: "Operational Analytics", isKeyHighlight: false, description: "Monitoring call connection rates, telephony retry patterns, and service level metrics." },
      { name: "Business Performance Analysis", isKeyHighlight: false, description: "Connecting product operational telemetry to revenue impact and stakeholder goals." }
    ]
  },
  {
    title: "Data Management",
    iconName: "Database",
    description: "Relational database structures, data warehousing principles, and data pipelines.",
    skills: [
      { name: "Data Modelling", isKeyHighlight: false, description: "Star schema, snowflake schema, dimension and fact table design, relationship cardinality." },
      { name: "ETL Processes", isKeyHighlight: false, description: "Extracting from raw logs, transforming data types, and loading clean reporting tables." },
      { name: "Data Warehousing Principles", isKeyHighlight: false, description: "Structuring analytical data layers to support fast querying and BI reporting." },
      { name: "OLTP & OLAP", isKeyHighlight: false, description: "Understanding transactional database design versus analytical warehouse processing." },
      { name: "PostgreSQL", isKeyHighlight: false, description: "Relational table schemas, foreign key relationships, views, and Row Level Security." }
    ]
  },
  {
    title: "Automation & Reporting",
    iconName: "Zap",
    description: "Eliminating manual reporting cycles through scheduled pipelines and scripts.",
    skills: [
      { name: "Advanced Excel", isKeyHighlight: true, description: "XLOOKUP, INDEX/MATCH, Pivot Tables, Power Pivot, financial formulas, and modeling." },
      { name: "Google Apps Script", isKeyHighlight: true, description: "Automating recurring email alerts, spreadsheet synchronizations, and daily reports." },
      { name: "Reporting Automation", isKeyHighlight: true, description: "Eliminating manual report preparation through scheduled data pipelines and BI refreshes." },
      { name: "Stakeholder Communication", isKeyHighlight: false, description: "Translating quantitative data findings into concise executive summaries and recommendations." }
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: "Certified Data Analytics Intern",
    issuer: "micro1",
    date: "March 2026",
    status: "Verified",
    badge: "Analytics Certification"
  },
  {
    title: "Database Management Systems (DBMS)",
    issuer: "NPTEL",
    date: "2024",
    status: "Completed",
    badge: "Academic Certification"
  }
];

// Interactive Demo Datasets for the Analytics Lab Component
export const SAMPLE_LAB_DATA = {
  summary: {
    totalCalls: 12450,
    connectedCalls: 9840,
    connectionRate: "79.0%",
    avgDurationSec: 142,
    leadConversionRate: "24.6%",
    totalRevenue: "$342,800"
  },
  dailyPerformance: [
    { day: "Mon", calls: 1850, connected: 1480, conversions: 360, revenue: 50400 },
    { day: "Tue", calls: 2100, connected: 1720, conversions: 430, revenue: 60200 },
    { day: "Wed", calls: 2350, connected: 1890, conversions: 490, revenue: 68600 },
    { day: "Thu", calls: 2200, connected: 1760, conversions: 440, revenue: 61600 },
    { day: "Fri", calls: 2400, connected: 1910, conversions: 480, revenue: 67200 },
    { day: "Sat", calls: 950,  connected: 680,  conversions: 140, revenue: 19600 },
    { day: "Sun", calls: 600,  connected: 400,  conversions: 80,  revenue: 11200 },
  ],
  productComparison: [
    { product: "VoxIQ AI Agent", attempts: 7200, connected: 5832, reachability: "81.0%", avgTime: "2m 15s", satisfaction: 4.6 },
    { product: "SalesIQ Lead Bot", attempts: 5250, connected: 4008, reachability: "76.3%", avgTime: "1m 45s", satisfaction: 4.4 },
  ],
  retryDistribution: [
    { attempt: "1st Attempt", count: 7470, percentage: 60 },
    { attempt: "2nd Attempt", count: 3110, percentage: 25 },
    { attempt: "3rd Attempt", count: 1245, percentage: 10 },
    { attempt: "4th+ Attempt", count: 625,  percentage: 5 },
  ]
};
