import React, { createContext, useState, useContext } from "react";

type Course = {
  id: number;
  title: string;
  students: number;
  rating: number;
  revenue: string;
  status: "published" | "draft";
  image: string;
};

type CoursesContextType = {
  courses: Course[];
  addCourse: (course: Course) => void;
};

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

export const CoursesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: "React Fundamentals",
      students: 89,
      rating: 4.9,
      revenue: "$1,245",
      status: "published",
      image: "https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg",
    },
    {
      id: 2,
      title: "Advanced JavaScript Patterns",
      students: 124,
      rating: 4.7,
      revenue: "$1,890",
      status: "published",
      image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg",
    },
  ]);

  const addCourse = (course: Course) => {
    setCourses((prev) => [...prev, course]);
  };

  return (
    <CoursesContext.Provider value={{ courses, addCourse }}>
      {children}
    </CoursesContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CoursesContext);
  if (!context) throw new Error("useCourses must be used inside CoursesProvider");
  return context;
};
