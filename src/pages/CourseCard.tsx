import React from "react";
import { useNavigate } from "react-router-dom";

// Define the shape of a course
interface Course {
  id: number;
  title: string;
  amountUSD?: number; // amount in USD (optional)
  amountINR?: number; // optional pre-calculated INR
}

// Define the props for CourseCard
interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    // Pass the entire course object so PaymentMethodPage can handle amount conversion
    navigate(`/payment/${course.id}/upi`, { state: { course } });
  };

  return (
    <div className="course-card">
      <h3>{course.title}</h3>
<p>
  Price: ₹
  {course.amountINR
    ?? (course.amountUSD ? Math.round(course.amountUSD * 83) : 499)}
</p>
      <button onClick={handleBuyNow} className="btn-primary">
        Buy Now
      </button>
    </div>
  );
};

export default CourseCard;
