# 🛍️ Modern E-Commerce React App

A modern, responsive, and theme-adaptive e-commerce web app built with **React + TypeScript + TailwindCSS**.  
Includes authentication, dark/light theme toggle, toast notifications, and private route protection.

---

## 🚀 Demo
🔗 **Live Deployment:** [View App Here](https://your-deployment-link.com)  
*(Replace with your actual deployed URL)*

---

## 🧩 Features

- 🔐 **Login System:** User authentication with name & profile photo fetched from a public API.  
- 🧭 **Protected Routes:** Product pages accessible only after login.  
- 🏠 **Home Page:** Displays suggested products, categories, and promotions.  
- 🛒 **Product Management:** Browse, search, and filter products by category.  
- 🌓 **Theme Toggle:** Light/Dark mode switch using global state and Tailwind class switching.  
- 🔔 **Toast Notifications:** Modern, animated feedback for user actions.  
- 💾 **Cart Context:** Centralized cart state using React Context API.

---

## ⚙️ Tech Stack

| Tech | Description |
|------|--------------|
| **React + Vite** | Fast modern frontend setup |
| **TypeScript** | Type safety across the app |
| **TailwindCSS** | Utility-first responsive styling |
| **React Router** | SPA routing & private routes |
| **Context API** | State management for cart and theme |
| **FakeStoreAPI** | Public API for products and categories |

---

## 📂 Project Structure

```
src/
 ├─ components/
 │   ├─ Navbar.tsx
 │   ├─ Toast.tsx
 │   ├─ ThemeToggle.tsx
 │   └─ ...
 ├─ contexts/
 │   ├─ CartContext.tsx
 │   └─ ThemeContext.tsx
 ├─ pages/
 │   ├─ Home.tsx
 │   ├─ Login.tsx
 │   ├─ ProductList.tsx
 │   └─ ProductDetail.tsx
 ├─ routes/
 │   └─ PrivateRoute.tsx
 ├─ App.tsx
 └─ main.tsx
```

---

## 🧠 How It Works

- The **theme toggle** uses a global context with `setTheme()` to dynamically apply Tailwind classes (`dark` or `light`) on the root element.
- **Protected routes** ensure data fetching and rendering occur *only* after authentication.
- **Toasts** are managed via a custom `useToast()` hook, with smooth transitions and auto-dismiss.

---

## 💻 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ecommerce-react-app.git
cd ecommerce-react-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Locally
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

---

## 🧾 API Reference

Data fetched from [Fake Store API](https://fakestoreapi.com/)

Endpoints used:
- `/products`
- `/products/categories`
- `/products/:id`

---

## 🧑‍💻 Author

Created by **[Your Name]**  
📧 Contact: your.email@example.com  
💼 GitHub: [@your-username](https://github.com/your-username)

---

> ⚠️ *Note: Replace placeholders (`your-username`, `your-deployment-link.com`, etc.) with your actual project details before publishing.*
