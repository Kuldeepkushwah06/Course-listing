# Course Platform

A modern course listing platform built with React, featuring real-time course likes, student dashboard, and comprehensive course management.

## Features Implemented

### 1. Course Listing Page
- Grid layout displaying all courses
- Search functionality for courses and instructors
- Real-time like counter for each course
- Course status indicators (Open, In Progress, Closed)
- Interactive course cards with hover effects

### 2. Course Details Screen
- Detailed course information display
- Course name and instructor details
- Comprehensive description
- Dynamic enrollment status
- Course duration and schedule
- Location information
- Prerequisites list
- Expandable syllabus sections

### 3. Student Dashboard
- Overview of enrolled courses
- Progress tracking with visual indicators
- Course completion functionality
- Last accessed timestamps
- Due date tracking
- Course statistics

### 4. Real-time Features
- Live course likes updates
- User-specific like status
- Instant UI updates

## Tech Stack

- React 18.2.0
- Redux Toolkit
- Firebase Realtime Database
- Tailwind CSS
- React Router DOM

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git
- Firebase account

## Installation and Setup

1. **Clone the Repository**
git clone https://github.com/Kuldeepkushwah06/Course-listing.git
cd Course-listing

2. **Install Dependencies**
npm install


3. **Firebase Setup**
- Create a project in [Firebase Console](https://console.firebase.google.com/)
- Enable Realtime Database
- Set database rules:
{
"rules": {
".read": true,
".write": true
}
}

4. **Configure Firebase** (Firebase config file and keys are provided in the config.js file with repository for testing purposes, if you want to use your own firebase project, you can do so by creating a config.js file in the src/firebase folder and pasting your own firebase config)

Create `src/firebase/config.js`:
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
const firebaseConfig = {
apiKey: "your-api-key",
authDomain: "your-project.firebaseapp.com",
databaseURL: "https://your-project-default-rtdb.firebaseio.com",
projectId: "your-project",
storageBucket: "your-project.appspot.com",
messagingSenderId: "your-sender-id",
appId: "your-app-id"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const realtimeDb = getDatabase(app);

5. **Run the Development Server**
npm start

## Project Structure

src/
├── components/ # React components
│ ├── CourseList.js # Course listing component
│ ├── CourseDetails.js # Course details component
│ ├── Dashboard.js # Student dashboard
│ └── Navbar.js # Navigation component
├── redux/ # Redux state management
│ ├── store.js # Redux store configuration
│ └── coursesSlice.js # Courses reducer and actions
├── services/ # API services
│ └── likesService.js # Likes functionality
├── firebase/ # Firebase configuration
│ └── config.js # Firebase setup
├── data/ # Mock data
│ └── mockCourses.js # Sample course data
└── App.js # Main application component


