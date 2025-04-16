# 📝 MyNotes Organizer

**MyNotes Organizer** is a web-based note-taking application that allows users to create, update, and manage their personal notes securely. Built with the MERN stack, it features user authentication, CRUD operations, and a clean responsive UI.

## 🚀 Features

- 🗒️ Create, read, update, and delete notes
- 🔐 User authentication using JWT
- 📦 Notes stored securely in MongoDB
- 🌐 Responsive UI with React and Bootstrap
- 💾 JWT stored in localStorage for session management

## 🛠️ Tech Stack

- **Frontend:** ReactJS, HTML/CSS, JavaScript, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)

## 📁 Project Structure

```
mynotes-organizer/
│
├── client/               # Frontend React app
│   ├── public/
│   └── src/
│       ├── components/   # Note components, form components, etc.
│       ├── pages/        # Register, Login, Dashboard, etc.
│       └── App.js
│
├── server/               # Backend server
│   ├── models/           # User and Note schemas
│   ├── routes/           # API routes
│   ├── middleware/       # Auth middleware
│   └── index.js
│
├── package.json
├── README.md
└── ...
```

## 🧑‍💻 How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/hardik-47/MyNotes.git
cd mynotes-organizer
```

### 2. Start the Backend Server

```bash
cd server
npm install
node index.js
```

### 3. Start the Frontend Client

Open a new terminal:

```bash
cd client
npm install
npm start
```

Visit `http://localhost:3000` to access the app.


## 🔒 Security Notes

- Passwords are hashed before storing
- Routes are protected using JWT middleware

## 🙌 Future Enhancements

- Note categories and tagging
- Rich text editor for notes
- Search and filter functionality
- Cloud sync or backup support

## 💡 Inspiration

Built to help users manage their personal thoughts, tasks, and reminders in one secure place, MyNotes Organizer aims to be a reliable personal assistant tool.
