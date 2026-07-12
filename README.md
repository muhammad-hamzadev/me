# 🚀 Muhammad Hamza's Portfolio Website

A modern, responsive portfolio website built with React, Tailwind CSS, and Framer Motion.

## ✨ Features

- 🎨 **Modern Design** - Clean, professional UI with glassmorphism effects
- 📱 **Fully Responsive** - Works perfectly on all devices
- ⚡ **Fast & Optimized** - Built with Vite for lightning-fast performance
- 🌓 **Dark/Light Mode** - Theme toggle with smooth transitions
- 📧 **Contact Form** - Integrated with EmailJS for direct email communication
- 🎭 **Smooth Animations** - Powered by Framer Motion
- 🎯 **SEO Optimized** - Proper meta tags and semantic HTML

## 🛠️ Technologies Used

- **React** - UI library
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **EmailJS** - Email service for contact form
- **React Icons** - Icon library

## 📂 Project Structure

```
portfolio/
├── public/           # Static assets (sitemap.xml, robots.txt, favicons)
├── src/
│   ├── assets/      # Images and media
│   ├── components/  # React components
│   ├── contexts/    # Context providers (ThemeContext)
│   ├── hooks/       # Custom hooks (useSEO)
│   ├── utils/       # Utility functions and animations
│   ├── App.jsx      # Main app component
│   ├── index.css    # Global styles
│   └── main.jsx     # Entry point
├── index.html       # HTML template with SEO meta + JSON-LD
├── package.json     # Dependencies
└── vite.config.js   # Vite configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/muhammad-hamzadev/portfolio.git
cd portfolio
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

## 📧 EmailJS Setup

To enable the contact form:

1. Create account at [EmailJS](https://www.emailjs.com/)
2. Create email service and template
3. Update credentials in `src/components/Contact.jsx`:
   - Service ID
   - Template ID
   - Public Key

## 🌐 Deployment

### GitHub Pages

1. Update `vite.config.js` with your repository name
2. Build the project: `npm run build`
3. Deploy: `npm run deploy`

### Vercel/Netlify

Simply connect your GitHub repository and deploy!

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Muhammad Hamza**
- GitHub: [@muhammad-hamzadev](https://github.com/muhammad-hamzadev)
- LinkedIn: [Muhammad Hamza](https://www.linkedin.com/in/muhammad-hamza-deve)
- Email: contact@hamzax.me

## 🙏 Acknowledgments

- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
- Design inspiration from modern portfolio trends

---

⭐ Star this repo if you like it!
