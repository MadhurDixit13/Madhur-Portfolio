# FIFA Player Card Portfolio

A modern, interactive portfolio website designed in the style of FIFA Ultimate Team (FUT) player cards. Built with Next.js, TypeScript, Three.js, and Tailwind CSS.

## Features

- **FIFA Card Design**: Authentic FIFA Ultimate Team card styling with gradients, borders, and animations
- **3D Player Model**: Interactive 3D character model using React Three Fiber and Three.js
- **Responsive Layout**: Works seamlessly on desktop and mobile devices
- **Interactive Elements**: Hover animations, smooth transitions, and floating elements
- **Skills Rating System**: FIFA-style skill ratings with color-coded progress bars
- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and FIFA card animations
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/
│   ├── CardInfo.tsx         # Personal information display component
│   ├── Navbar.tsx           # Navigation component
│   ├── PlayerModel.tsx      # 3D character model component
│   └── PortfolioCard.tsx    # Main FIFA card container
├── data/
│   └── portfolioData.ts     # Portfolio data and dummy content
└── types/
    └── portfolio.ts         # TypeScript type definitions
```

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Customization

### Updating Personal Information

Edit `src/data/portfolioData.ts` to update your personal details:

```typescript
export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "YOUR NAME",
    position: "YOUR POSITION",
    nationality: "YOUR COUNTRY",
    age: 25,
  },
  skills: [
    { name: "Skill Name", rating: 95, category: "Technical" },
    // Add more skills...
  ],
  // ... other sections
};
```

### Adding Skills

Skills are rated on a scale of 1-100 and categorized as:
- **Technical**: Programming languages, frameworks, tools
- **Soft Skills**: Communication, leadership, problem-solving
- **Tools**: Software, platforms, services
- **Languages**: Programming or spoken languages

### Customizing the 3D Model

The 3D model is defined in `src/components/PlayerModel.tsx`. You can:
- Replace the simple geometric character with a more detailed model
- Add animations and interactions
- Customize colors and materials
- Add accessories or clothing

### Styling

The FIFA card styling is defined in `src/app/globals.css`. Key classes include:
- `.fifa-portfolio-card`: Main card container
- `.skill-bar`: Skill rating progress bars
- `.model-container`: 3D model wrapper
- `.floating-badge`: Animated rating badges

## Features Breakdown

### FIFA Card Design
- Authentic gradient backgrounds
- Animated borders and glows
- Hover effects and transitions
- Responsive design for all screen sizes

### 3D Model
- Interactive rotation with mouse controls
- Floating animation
- Hover effects
- Customizable character appearance

### Skills System
- Color-coded ratings (green: 90+, blue: 80+, orange: 70+, red: <70)
- Animated progress bars
- Category-based organization
- Hover tooltips

### Contact Information
- Clickable contact links
- Social media integration
- Location and contact details
- Smooth hover animations

## Performance Optimizations

- **Code Splitting**: Components are lazy-loaded where appropriate
- **Image Optimization**: Next.js automatic image optimization
- **3D Model Optimization**: Efficient Three.js rendering
- **CSS Animations**: Hardware-accelerated animations
- **Responsive Images**: Optimized for different screen sizes

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Deployment

The project can be deployed to any platform that supports Next.js:

- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- **Railway**

## License

MIT License - feel free to use this project for your own portfolio!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Built with ❤️ using Next.js, TypeScript, and Three.js**