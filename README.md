# 🚀 PWCode

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📝 Introduction

PWCode is a modern educational coding platform that provides an interactive environment for learning and teaching HTML, CSS, and JavaScript. Designed for both students and educators, it features classroom management, assignment workflows, and AI-powered code analysis.

🔗 **[Live Demo](https://pwcode.vercel.app/)**

## ✨ Key Features

### 💻 Development Environment
- Interactive code editor with real-time preview for HTML, CSS, and JavaScript
- Project management system with versioning and sharing capabilities
- Monaco Editor and Sandpack integration for professional development experience

### 🏫 Educational Tools
- Comprehensive classroom management for teachers and students
- Assignment creation, distribution, and grading workflow
- Progress tracking and performance analytics

### 🤖 AI-Powered Features
- Intelligent code analysis and comparison using Mistral AI
- Automated feedback on student submissions
- Code explanation and tutoring through AI chat interface

### 🔐 Security & Integration
- Robust authentication with NextAuth/Auth.js and Google OAuth
- Role-based access control for administrators, teachers, and students
- Secure data storage with SQL and Drizzle ORM

## 🖼️ Interface Demo

<details>
<summary>View Screenshots</summary>

### Homepage and Code Editor
![Homepage](screenshots/homepage.jpeg)
*PWCode homepage with featured projects and navigation*

![Code Editor](screenshots/code-editor.jpeg)
*Interactive code editor with live preview*

### Classroom Management
![Classes with Teacher Role](screenshots/classes-with-teacher-role.jpeg)
*Managing classes as a teacher*

![Classes with Student Role](screenshots/classes-with-student-role.jpeg)
*Viewing classes as a student*

![View Assignment in a Class](screenshots/view-assignment-in-a-class.jpeg)
*Viewing assignments in a class*

![Student View of Joined Class](screenshots/student-view-a-class-joined.jpeg)
*Student's view of a class they've joined*

### Assignments and Submissions
![Teacher Edit Assignment](screenshots/teacher-edit-a-assignment.jpeg)
*Teacher editing an assignment*

![Student Do Assignment](screenshots/student-do-a-assignment.jpeg)
*Student working on an assignment*

![Manage Submitted Code](screenshots/user-manage-submitted-code.jpeg)
*Managing submitted code*

### AI Features
![Teacher View Student Code](screenshots/teacher-view-student-code.jpeg)
*Teacher reviewing student's code*

![AI Code Comparison](screenshots/teacher-use-gen-ai-compare-code.jpeg)
*Using GenAI to compare code*

![AI Chat with Code](screenshots/user-use-gen-ai-chat-with-code.jpeg)
*Using GenAI to chat about code*
</details>

## 🛠️ Technology Stack

- **Frontend**: Next.js, React 18, TailwindCSS, Shadcn UI
- **Backend**: Next.js API Routes, Server Actions
- **Database**: SQL with Drizzle ORM
- **Authentication**: NextAuth/Auth.js with Google OAuth
- **Code Editing**: Monaco Editor, Sandpack
- **Content**: TipTap Editor for rich text
- **AI**: Mistral AI with Vercel AI SDK

## 📂 Project Architecture

```
📁 app/                  # Next.js App Router with feature modules
📁 components/           # React components organized by feature
📁 context/              # React Context Providers
📁 db/                   # Database configuration and schema
📁 lib/                  # Utility functions, types, and business logic
📁 constants/            # Application constants and defaults
📁 hooks/                # Custom React hooks
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and pnpm
- SQL database (compatible with Neon.tech)
- API keys for authentication and AI services

### Installation

1. Clone the repository
```bash
git clone https://github.com/hieuvnkudo/pwcode.git
cd pwcode
```

2. Install dependencies
```bash
pnpm install
```

3. Configure environment variables
```bash
cp .env.example .env.local
# Edit .env.local with your API keys and configuration
```

4. Set up the database
```bash
pnpm run push
```

5. (Optional) Generate sample data
```bash
pnpm run seed
```

6. Start the development server
```bash
pnpm run dev
```

## 🔮 Future Development

- Responsive mobile interface
- Enhanced analytics dashboard
- Real-time collaboration features
- Support for additional programming languages
- Advanced assessment capabilities

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

[MIT](LICENSE)