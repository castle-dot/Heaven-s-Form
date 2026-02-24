# ✨ Heaven's Form

> *144,000 spots. One eternity. Register your soul before the gates close forever.*

A full-stack web application built with Django REST Framework and React. Users can register their soul, confess their sins, and claim their spot in the Book of Heaven.

---

## 🌟 Features

- **Soul Registration** — Claim your eternal spot with your name
- **Book of Heaven** — A leaderboard of all registered souls with their spot numbers
- **Confession Booth** — Write, edit, and submit your personal sin confession
- **Soul Profiles** — Click on any soul to read their confession
- **Heaven Stats** — Live stats showing how full heaven is (out of 144,000 spots)
- **Jesus Quotes** — Rotating scripture quotes with smooth animations
- **Ambient Music** — Heavenly background hymn with mute/unmute toggle
- **Golden Confetti** — Celebration burst when your soul is registered
- **JWT Authentication** — Secure login with auto token refresh

---

## 🛠️ Tech Stack

**Backend**
- Python / Django
- Django REST Framework
- Simple JWT (authentication)
- drf-nested-routers (nested API endpoints)
- SQLite (development)

**Frontend**
- React (Vite)
- React Router DOM
- Axios (with JWT interceptors)
- Tailwind CSS
- Framer Motion (animations)
- Canvas Confetti

---

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/heavens-form.git
cd heavens-form

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Start server
python manage.py runserver
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the app.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register/` | Register a new account |
| POST | `/api/token/` | Login and receive JWT tokens |
| POST | `/api/token/refresh/` | Refresh access token |
| GET | `/api/souls/` | List all registered souls |
| POST | `/api/souls/` | Register your soul |
| GET | `/api/souls/me/` | Get current user's soul |
| GET | `/api/souls/stats/` | Get heaven statistics |
| GET | `/api/souls/:id/` | Get a specific soul |
| GET | `/api/souls/:id/confessions/` | List confessions for a soul |
| POST | `/api/souls/:id/confessions/` | Submit a confession |
| PUT | `/api/souls/:id/confessions/:id/` | Edit a confession |

---

## 📁 Project Structure

```
Heaven/
├── heavens_form/          # Django project settings
├── souls/                 # Django app
│   ├── models.py          # Soul and Confession models
│   ├── serializers.py     # DRF serializers
│   ├── views.py           # ViewSets and custom actions
│   ├── urls.py            # Nested router configuration
│   ├── permissions.py     # Custom IsOwnerOrReadOnly permission
│   └── admin.py           # Admin panel configuration
├── frontend/              # React application
│   └── src/
│       ├── api/           # Axios configuration
│       ├── assets/        # Audio and static files
│       ├── components/    # Reusable components
│       │   ├── HeavenLayout.jsx
│       │   ├── Navbar.jsx
│       │   ├── HeavenStats.jsx
│       │   └── JesusQuote.jsx
│       └── pages/         # Page components
│           ├── Home.jsx
│           ├── Register.jsx
│           ├── Login.jsx
│           ├── Leaderboard.jsx
│           ├── Confession.jsx
│           └── SoulProfile.jsx
├── requirements.txt
└── .gitignore
```

---

## 🔒 Authentication Flow

1. User registers an account (`/api/register/`)
2. Auto-login returns JWT access + refresh tokens
3. Tokens stored in `localStorage`
4. Access token sent with every API request via Axios interceptor
5. On 401 response, refresh token used to silently obtain new access token
6. On refresh failure, user is logged out automatically

---

## 🎨 Design

- **Fonts** — Cinzel (headings) + Crimson Text (body) from Google Fonts
- **Color Palette** — Deep midnight background with gold accents
- **Background** — Atmospheric sky photography from Unsplash
- **Animations** — Framer Motion page transitions, floating emoji, twinkling star canvas
- **Audio** — Ambient heavenly hymn with user-controlled toggle

---

## 📸 Screenshots

> *Coming soon*

---

## 🧠 What I Learned

- Building a REST API with Django REST Framework
- JWT authentication with Simple JWT
- Nested URL routing with drf-nested-routers
- Custom permissions in DRF
- React fundamentals — components, state, props, hooks
- Axios interceptors for token management
- Framer Motion animations
- Tailwind CSS utility-first styling
- Connecting a React frontend to a Django backend

---

## 📜 License

MIT License — feel free to use this project as inspiration for your own.

---

> *"I am the way, the truth, and the life."* — John 14:6
