# 🎨 Ticketstore App for concerts

[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-4.x-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

This project showcases a modern, responsive frontend built with Vue.js and styled with Tailwind CSS, offering a sleek user interface for a concert ticket booking application.

## 📋 Table of Contents

1. [Main Features](#-main-features)
2. [Technologies Used](#-technologies-used)
3. [Quick Start](#-quick-start)
4. [Project Structure](#-project-structure)
5. [Customization](#-customization)
6. [Testing](#-testing)
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
git clone https://github.com/yourusername/your-frontend-repo.git
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
├── components/
│   ├── AnimatedMenuIcon.vue
│   ├── CardOrder.vue
│   └── PaymentForm.vue
├── composables/
│   └── userAuth.js
├── layouts/
│   ├── DefaultLayout.vue
│   └── NoHeaderFooterLayout.vue
├── pages/
│   ├── Home.vue
│   ├── Login.vue
│   └── Orders.vue
├── router/
│   └── index.js
├── services/
│   ├── AuthService.js
│   └── OrderService.js
├── styles/
└── utils/
    └── api.js
```

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

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
