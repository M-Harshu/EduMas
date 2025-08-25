export interface Course {
  id: number;
  title: string;
  instructor: string;
  totalLessons: number;
  image: string;
  nextLesson: string;
}

export const allCourses: Course[] = [
  { id: 1, title: "Web Development Bootcamp", instructor: "John Doe", totalLessons: 15, image: "", nextLesson: "HTML Basics" },
  { id: 2, title: "Data Science with Python", instructor: "Jane Smith", totalLessons: 12, image: "", nextLesson: "Python Basics" },
  { id: 3, title: "AI & Machine Learning", instructor: "Alice Brown", totalLessons: 14, image: "", nextLesson: "Intro to ML" },
  { id: 4, title: "Cloud Computing Fundamentals", instructor: "Bob Martin", totalLessons: 10, image: "", nextLesson: "Cloud Basics" },
  { id: 5, title: "UI/UX Design", instructor: "Carol White", totalLessons: 8, image: "", nextLesson: "Design Principles" },
  { id: 6, title: "Cybersecurity Basics", instructor: "Dave Black", totalLessons: 9, image: "", nextLesson: "Security Fundamentals" },
  { id: 7, title: "Mobile App Development", instructor: "Eve Green", totalLessons: 11, image: "", nextLesson: "Intro to Apps" },
  { id: 8, title: "Blockchain Essentials", instructor: "Frank Gray", totalLessons: 7, image: "", nextLesson: "Blockchain Basics" },
  { id: 9, title: "Digital Marketing Mastery", instructor: "Grace Blue", totalLessons: 13, image: "", nextLesson: "Marketing Fundamentals" },
  { id: 10, title: "DevOps & CI/CD", instructor: "Hank Silver", totalLessons: 10, image: "", nextLesson: "CI/CD Pipelines" },
  { id: 11, title: "Game Development with Unity", instructor: "Ivy Gold", totalLessons: 15, image: "", nextLesson: "Unity Basics" },
  { id: 12, title: "Big Data Analytics", instructor: "Jack Purple", totalLessons: 12, image: "", nextLesson: "Data Processing" },
  { id: 13, title: "Internet of Things (IoT)", instructor: "Karen Orange", totalLessons: 9, image: "", nextLesson: "IoT Overview" },
  { id: 14, title: "Ethical Hacking & Pen Testing", instructor: "Leo Cyan", totalLessons: 11, image: "", nextLesson: "Intro to Hacking" },
  { id: 15, title: "AR/VR Development", instructor: "Mona Pink", totalLessons: 10, image: "", nextLesson: "AR Basics" },
  { id: 16, title: "SQL & Database Management", instructor: "Nina Lime", totalLessons: 8, image: "", nextLesson: "SQL Queries" },
  { id: 17, title: "Business Analytics with Excel", instructor: "Oscar Indigo", totalLessons: 7, image: "", nextLesson: "Excel Basics" },
  { id: 18, title: "Advanced Python Programming", instructor: "Paul Violet", totalLessons: 12, image: "", nextLesson: "Advanced Functions" },
];
