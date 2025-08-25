import { useParams, Link } from "react-router-dom";
import { allCourses } from "./Courses";

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const course = allCourses.find((c) => c.id === Number(id));

  if (!course) {
    return <h1 className="text-center text-red-500 text-2xl">Course not found</h1>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{course.title}</h1>
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
        {course.description}
      </p>
      <Link to="/courses">
        <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg">
          Back to Courses
        </button>
      </Link>
    </div>
  );
};

export default CourseDetail;
