# 🎤 Ticketstore App for concerts

<p>
  <a href="https://vuejs.org/" target="_blank">
    <img src="https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vue.js" alt="Vue.js" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08); margin-right: 10px;">
  </a>
  <a href="https://tailwindcss.com/" target="_blank">
    <img src="https://img.shields.io/badge/Tailwind%20CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08); margin-right: 10px;">
  </a>
  <a href="https://vitejs.dev/" target="_blank">
    <img src="https://img.shields.io/badge/Vite-4.x-646CFF?style=for-the-badge&logo=vite" alt="Vite" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08); margin-right: 10px;">
  </a>
  <a href="/LICENSE" target="_blank">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);">
  </a>
</p>

This project showcases a modern, responsive frontend built with Vue.js and styled with Tailwind CSS, offering a sleek user interface for a concert ticket booking application. It is designed to work seamlessly with a pre-existing Spring Boot backend.

## 🔗 Backend Repository

This frontend application is built to interact with a dedicated backend. You can find the backend repository here:

[SpringBoot3.3.1-HibernateDB_Concerts-TicketStore-App](https://github.com/saraobialero/SpringBoot3.3.1-HibernateDB_Concerts-TicketStore-App)

Make sure to set up and run the backend alongside this frontend for full functionality.

## 📋 Table of Contents

1. [Main Features](#-main-features)
2. [Technologies Used](#-technologies-used)
3. [Quick Start](#-quick-start)
4. [Project Structure](#-project-structure)
5. [Backend integration](#-backend-integration)
6. [Customization](#-customization)
7. [Contributing](#-contributing)
8. [License](#-license)

## 🚀 Main Features

- 🔐 User registration and login system
- 🎫 Concert and ticket exploration
- 🛒 Multi-step ticket booking process
- 📊 Order management and viewing
- 🔄 Access and refresh token authentication
- 🔒 Secure API calls with Axios interceptors
- 📱 Responsive design for all devices
- 🍔 Animated menu for improved user experience
- 🖨️ PDF export of order receipts using html2canvas
- 🗂️ Customizable UI components

### Detailed Functionality

- **User Authentication:**

  - Secure login and registration process
  - JWT-based authentication with access and refresh tokens
  - Automatic token refresh for seamless user experience

- **Concert Exploration:**

  - Browse available concerts and ticket details
  - Advanced search and filtering options
  - Detailed view of concert information

- **Ticket Booking:**

  - Intuitive multi-step booking process
  - Real-time availability checking
  - Multiple payment method options

- **Order Management:**

  - View and manage personal orders
  - PDF export of order receipts for easy record-keeping

- **Responsive Design:**

  - Tailwind CSS for consistent, responsive UI across devices
  - Custom animated menu for improved mobile navigation

- **API Integration:**
  - Centralized API services for efficient data management
  - Axios interceptors for automatic request/response handling and token management

## 🛠 Technologies Used

<table>
  <tr>
    <th>Category</th>
    <th>Technologies</th>
  </tr>
  <tr>
    <td>Core</td>
    <td>
      <img src="https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=flat-square&logo=vue.js" alt="Vue.js 3">
      <img src="https://img.shields.io/badge/Tailwind%20CSS-3.x-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind CSS">
    </td>
  </tr>
  <tr>
    <td>Build Tools</td>
    <td>
      <img src="https://img.shields.io/badge/Vite-4.x-646CFF?style=flat-square&logo=vite" alt="Vite">
      <img src="https://img.shields.io/badge/npm-8.x-CB3837?style=flat-square&logo=npm" alt="npm">
    </td>
  </tr>
  <tr>
    <td>Routing</td>
    <td>
      <img src="https://img.shields.io/badge/Vue%20Router-4.x-4FC08D?style=flat-square&logo=vue.js" alt="Vue Router">
    </td>
  </tr>
  <tr>
    <td>HTTP Client</td>
    <td>
      <img src="https://img.shields.io/badge/Axios-1.x-5A29E4?style=flat-square&logo=axios" alt="Axios">
    </td>
  </tr>
  <tr>
    <td>UI Components</td>
    <td>
      <img src="https://img.shields.io/badge/Custom%20Components-1.0-FF6B6B?style=flat-square" alt="Custom Components">
    </td>
  </tr>
  <tr>
    <td>PDF Generation</td>
    <td>
      <img src="https://img.shields.io/badge/html2canvas-1.x-E34F26?style=flat-square" alt="html2canvas">
    </td>
  </tr>
</table>

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/saraobialero/Vue3-TailwindCSS_Concerts-TicketStore-App.git
cd your-frontend-repo

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── assets/
├── main.css
├── components/
│   ├── AnimatedMenuIcon.vue
│   ├── CardOrder.vue
│   ├── Footer.vue
│   ├── Header.vue
│   ├── PaymentForm.vue
│   └── PersonalDataTable.vue
├── composables/
│   └── userAuth.js
├── layouts/
│   ├── DefaultLayout.vue
│   └── NoHeaderFooterLayout.vue
├── router/
│   └── index.js
├── services/
│   ├── AuthService.js
│   ├── OrderService.js
│   ├── ReplyService.js
│   └── UserService.js
├── views/
│   ├── Forbidden.vue
│   ├── Home.vue
│   ├── Login.vue
│   ├── Orders.vue
│   ├── Page404.vue
│   ├── ReplyDetail.vue
│   └── Signup.vue
└── api.js
└── App.vue
└── main.js
```

## 🔌 Backend Integration

This frontend is designed to work with the Spring Boot backend available at [SpringBoot3.3.1-HibernateDB_Concerts-TicketStore-App](https://github.com/saraobialero/SpringBoot3.3.1-HibernateDB_Concerts-TicketStore-App). To integrate with the backend:

1. Ensure the backend server is running.
2. Configure the backend URL in your frontend environment variables or configuration file.
3. The `api.js` file handles API calls and authentication with the backend.

```javascript
// Example of API configuration in api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:8080/api',
  // ... other configurations
});

// ... rest of the API setup
```

Make sure to update the `baseURL` to match your backend's URL.

## 🔐 Authentication and API Calls

This project uses JWT for authentication. The access token is stored in localStorage and automatically included in API calls using an Axios interceptor. The `api.js` utility handles token refresh and API error management.

```javascript
// Example of Axios interceptor in api.js
instance.interceptors.request.use(
  async (config) => {
    const token = await AuthService.ensureValidToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
```

## 🎨 Customization

Tailwind CSS can be customized in the `tailwind.config.js` file. Add your own color palette, fonts, and other design tokens here.

## 🤝 Contributing

Contributions are welcome! Please ensure that your contributions are compatible with the existing backend structure.

## 📄 License

This project is licensed under the [MIT License](/LICENSE).
