export const mockCourses = [
  {
    id: 1,
    name: "Introduction to React Native",
    instructor: "John Doe",
    description: "Learn the basics of React Native development and build your first mobile app. This comprehensive course covers everything from setup to deployment.",
    enrollmentStatus: "Open",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    duration: "8 weeks",
    schedule: "Tuesdays and Thursdays, 6:00 PM-8:00 PM",
    location: "Online",
    prerequisites: ["Basic JavaScript knowledge", "Familiarity with React"],
    syllabus: [
      {
        week: 1,
        topic: "Introduction to React Native",
        content: "Overview of React Native, setting up your development environment."
      },
      {
        week: 2,
        topic: "Building Your First App",
        content: "Creating a simple mobile app using React Native components."
      },
      {
        week: 3,
        topic: "Navigation and Routing",
        content: "Implementing navigation between screens and handling user flow."
      }
    ],
    students: [
      {
        id: 101,
        name: "Alice Johnson",
        email: "alice@example.com",
      },
      {
        id: 102,
        name: "Bob Smith",
        email: "bob@example.com",
      }
    ]
  },
  {
    id: 2,
    name: "Advanced Web Development",
    instructor: "Sarah Wilson",
    description: "Master modern web development techniques including responsive design, progressive web apps, and modern JavaScript frameworks.",
    enrollmentStatus: "In Progress",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800",
    duration: "10 weeks",
    schedule: "Mondays and Wednesdays, 7:00 PM-9:00 PM",
    location: "Online",
    prerequisites: ["HTML/CSS", "JavaScript Fundamentals", "Basic React"],
    syllabus: [
      {
        week: 1,
        topic: "Modern JavaScript",
        content: "ES6+, async programming, and modern JavaScript patterns."
      },
      {
        week: 2,
        topic: "Advanced React",
        content: "Hooks, Context API, and Performance Optimization."
      }
    ],
    students: [
      {
        id: 101,
        name: "Alice Johnson",
        email: "alice@example.com",
      }
    ]
  },
  {
    id: 3,
    name: "UI/UX Design Fundamentals",
    instructor: "Michael Chen",
    description: "Learn the principles of user interface and user experience design. Create beautiful, functional, and user-friendly designs.",
    enrollmentStatus: "Open",
    thumbnail: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800",
    duration: "6 weeks",
    schedule: "Fridays, 5:00 PM-8:00 PM",
    location: "Online",
    prerequisites: ["None"],
    syllabus: [
      {
        week: 1,
        topic: "Design Principles",
        content: "Basic principles of design, color theory, and typography."
      },
      {
        week: 2,
        topic: "User Research",
        content: "Understanding user needs, creating personas, and user journey mapping."
      }
    ],
    students: []
  }
]; 