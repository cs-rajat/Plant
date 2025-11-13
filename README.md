# ✨ PlateShare - Food Sharing Community Platform

PlateShare is a full-stack MERN application designed to help people share surplus food with their community. It promotes sustainability, reduces waste, and builds stronger social connections.

**Live:** https://plate-share24.netlify.app/

---

## 🚀 Key Features

### 🔐 Authentication

- Firebase Email/Password Login
- Google Authentication
- Automatic redirect after login
- Password validation (uppercase, lowercase, 6+ characters)
- Toast notifications for user feedback

### 🍱 Food Management System

- **Add Food** - Share surplus food with details
- **Manage My Foods** - View, update, and delete your listings
- **Food Requests** - Handle incoming requests from community
- **Update & Delete** - Full CRUD operations
- **Image Upload** - ImgBB integration for food photos

### ⭐ User Experience

- Fully responsive UI
- Clean and consistent design
- No page breaks on reload
- Protected private routes
- Dynamic featured foods carousel
- Real-time status updates

---

## 🏠 Home Page Structure

### 1️⃣ Hero Banner

- Attractive headline & subtitle
- Community mission statement
- Call-to-action button

### 2️⃣ Featured Foods (Dynamic)

- Top 6 items sorted by quantity
- Food images with details
- "View Details" button

### 3️⃣ How It Works

| Step | Action                                                 |
| ---- | ------------------------------------------------------ |
| 1    | **Post Food** - Share details and image                |
| 2    | **Find Food** - Browse available meals and request     |
| 3    | **Collect** - Donor accepts, collect from pickup point |

### 4️⃣ Our Mission & Community Stats

- Food waste reduction statistics
- Active donors count
- Communities helped

---

## 🧭 Navigation Structure

### 👤 Not Logged In

- Home
- Available Foods
- Login

### 🔐 Logged In

- Home
- Available Foods
- Add Food
- Manage My Foods
- My Food Requests
- Profile Dropdown
- Logout

---

## 🔧 Food Management (CRUD Operations)

### ➕ Add Food

- Food name
- Image upload (ImgBB)
- Quantity/serving size
- Pickup location
- Expiration date
- Additional notes
- Auto-filled donator info (from Firebase)

### 📝 Manage My Foods

- View all your shared foods
- **Update** - Modify food details
- **Delete** - Remove with SweetAlert confirmation

### 📦 Food Details Page

- Full item information
- Donator profile & contact
- Request submission form
- Real-time quantity display

### 📨 My Food Requests

- View requests from community members
- Status tracking: Pending → Accepted → Delivered
- Accept/Reject requests
- Requester information & location

---

## ✨ Additional Features

✔️ Custom loading spinners  
✔️ 404 Error page  
✔️ No lorem ipsum text  
✔️ Fully responsive design  
✔️ Toast & alert notifications  
✔️ Firebase domain whitelisting  
✔️ CORS enabled for cross-origin requests  
✔️ Real-time data synchronization

---

## 🛠️ Tech Stack

### 🎨 Frontend

- **React 19** - UI library
- **React Router v7** - Client-side routing
- **TailwindCSS + DaisyUI** - Styling
- **Firebase Auth** - Authentication
- **React Hook Form** - Form management
- **SweetAlert2** - Beautiful alerts
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **React Icons** - Icon library
- **React Query** - Data fetching & caching
- **React Toastify** - Notifications

### ⚙️ Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB + Mongoose** - Database
- **Firebase Admin SDK** - Auth verification
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

### ☁️ Hosting

- **Frontend** - Netlify
- **Backend** - Vercel
- **Database** - MongoDB Atlas
- **Storage** - ImgBB (Images)
- **Authentication** - Firebase

---

## 📋 Installation & Setup

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Git


## 📂 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── PrivateRoute.jsx
│   ├── Loader.jsx
│   ├── RequestModal.jsx
│   └── ...
├── pages/
│   ├── Home.jsx
│   ├── AvailableFoods.jsx
│   ├── FoodDetails.jsx
│   ├── AddFood.jsx
│   ├── ManageMyFoods.jsx
│   ├── UpdateFood.jsx
│   ├── MyRequests.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── NotFound.jsx
├── contexts/
│   └── AuthContext.jsx
├── hooks/
│   └── useFeaturedFoods.js
├── App.jsx
├── main.jsx
└── index.css
```

---


## 🌟 How to Use

### For Donors (Food Sharers)

1. Register/Login with email or Google
2. Click "Add Food" in navigation
3. Fill in food details with image
4. Set expiration date and pickup location
5. Submit to share with community
6. Manage requests from "My Food Requests"
7. Accept/Reject food collection requests

### For Requesters (Food Seekers)

1. Browse "Available Foods"
2. Click "View Details" on desired food
3. Fill request form with location & reason
4. Submit request
5. Wait for donor approval
6. Collect food from specified location

---

## 🔐 Security Features

- Firebase authentication with email verification
- Protected routes for logged-in users
- Bearer token verification on backend
- CORS whitelisted domains
- Password strength validation
- Secure image upload via ImgBB

---

## 🚀 Deployment

### Deploy Frontend (Netlify)

```bash
npm run build
# Deploy the dist/ folder to Netlify
```

### Deploy Backend (Vercel)

```bash
# Follow plant-share-server repository guide
```

---

## 📞 Support & Contact

- **GitHub:** [cs-rajat](https://github.com/cs-rajat)
- **Live App:** https://plate-share24.netlify.app/
- **Server:** https://plant-share-server.vercel.app/

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🙏 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest features
- Submit pull requests

---

**Together we can reduce food waste and build a sustainable community! 🌍🍽️**
