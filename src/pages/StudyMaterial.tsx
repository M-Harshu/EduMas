import React from "react";
import { Download } from "lucide-react";

const StudyMaterial: React.FC = () => {
  // You can replace these URLs later with your actual PDFs
  const resources = [
    { title: "Web Development Bootcamp", url: "https://www.hyperiondev.com/media/syllabi/web-dev-uoe.pdf" },
    { title: "UI/UX Design Guide", url: "https://elmhurstpubliclibrary.org/lib/wp-content/uploads/UIUXBasics_Handout_021918jj.pdf" },
    { title: "JavaScript Advanced", url: "https://www.tutorialspoint.com/javascript/javascript_tutorial.pdf" },
    { title: "React Basics", url: "https://www.lcg.ufrj.br/nodejs/books/react-beginners-handbook.pdf" },
    { title: "Data Science with Python", url: "https://mathstat.dal.ca/~brown/sound/python/P1-Data_Science_and_Analytics_with_Python_2b29.pdf" },
    { title: "Cloud Computing Overview", url: "https://www.kth.se/social/files/554fa451f276544829be2e5e/9-cloud-computing.pdf" },
    { title: "Machine Learning Intro", url: "https://mrcet.com/downloads/digital_notes/CSE/IV%20Year/MACHINE%20LEARNING(R17A0534).pdf" },  
    { title: "Cybersecurity Fundamentals", url: "https://www.ftc.gov/system/files/attachments/cybersecurity-small-business/cybersecuirty_sb_factsheets_all.pdf" },
    { title: "Agile Methodologies", url: "https://mrcet.com/downloads/digital_notes/CSE/III%20Year/CS/AGILE%20METHODOLOGIES(1).pdf" },
    // { title: "Project Management Basics", url: "https://www.pmi.org/-/media/pmi/documents/public/pdf/learning/thought-leadership/pulse/pulse-of-the-profession-2018.pdf" },
    { title: "Digital Marketing 101", url: "https://tell.colvee.org/pluginfile.php/3134/mod_resource/content/3/DM-Unit%201-Introduction%20to%20Digital%20Marketing%20-%20RJ%20-%20P1.pdf" },
    { title: "Blockchain Essentials", url: "https://www.upnxtblog.com/wp-content/uploads/2018/04/Blockchain-Essentials-Guide.pdf" },
    // { title: "DevOps Practices", url: "https://azure.microsoft.com/en-us/resources/devops/" },
    { title: "Big Data Concepts", url: "https://bmsce.ac.in/Content/IS/Big_Data_Analytics_-_Unit_1.pdf" },
    { title: "Internet of Things (IoT)", url: "https://core.ac.uk/download/pdf/132530214.pdf" },
    { title: "Software Testing Basics", url: "https://southcampus.uok.edu.in/Files/Link/DownloadLink/Unit%203,%20Part%201-%20Software%20Testing.pdf" },
    { title: "Ethical Hacking Intro", url: "https://static.packt-cdn.com/downloads/9781801818933_ColorImages.pdf" },
    { title: "Mobile App Development", url: "https://mrcet.com/downloads/digital_notes/IT/MOBILE%20APPLICATION%20DEVELOPMENT%20DIGITAL%20NOTES(R18A1207).pdf" },
    // { title: "UI/UX Design Fundamentals", url: "https://www.interaction-design.org/literature/topics/ui-design" },
    { title: "Data Structures & Algorithms", url: "https://mta.ca/~rrosebru/oldcourse/263114/Dsa.pdf" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Study Materials</h1>
        <div className="space-y-4">
          {resources.map((res, index) => (
            <a
              key={index}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-xl transition"
              download
            >
              <span className="text-gray-900 dark:text-white font-medium">{res.title}</span>
              <Download className="h-5 w-5 text-blue-600" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudyMaterial;
