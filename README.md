# PathRepo

A **GitHub Repository File Explorer** that allows users to explore the file structure of any public GitHub repository by entering its URL.

## 🚀 Features

- Fetches and displays the file structure of any public GitHub repository
- Copy all file paths to clipboard with a single click
- Uses GitHub's REST API to retrieve repository contents
- No authentication required—works for all public repositories
- Built with **Next.js**, **TypeScript**, and **Tailwind CSS**

## 📸 Screenshot

![App Screenshot](https://via.placeholder.com/800x400?text=PathRepo+File+Explorer)

## 🛠️ Technologies Used

- **Next.js 15.2.4** (React framework for SSR & static generation)
- **React 19** (Latest version of React)
- **TypeScript** (Static typing for better maintainability)
- **Tailwind CSS 4** (Utility-first CSS framework)
- **GitHub API** (Fetching repository files)
- **Geist Font** (Custom font from Vercel)

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Moqaddasi/PathRepo.git
cd PathRepo
```

### 2️⃣ Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3️⃣ Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app in action.

You can start editing the page by modifying files in the `app` directory. The page auto-updates as you edit files.

## 📡 Deployment Options

### Deploy on Vercel (Recommended)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js:

1. Push your code to GitHub
2. Import your repository on Vercel
3. Vercel will detect Next.js and deploy with the optimal settings

### Deploy to GitHub Pages:

1. Build and export static files:
   ```bash
   npm run build && npm run export
   ```
2. Copy contents of the `out` folder to the `gh-pages` branch
3. Enable GitHub Pages in repository settings

### Manual Vercel Deployment:

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Run the deploy command:
   ```bash
   vercel
   ```

## 📚 Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - features and API
- [Learn Next.js](https://nextjs.org/learn) - interactive tutorial
- [Tailwind CSS](https://tailwindcss.com/docs) - utility-first CSS framework
- [GitHub API](https://docs.github.com/en/rest) - REST API documentation

## 🛑 Limitations

- Only works with **public repositories** (GitHub API restricts private repos without authentication)
- Large repositories with deep folder structures might take longer to load
- API rate limits may apply when using the GitHub API extensively

## 🤝 Contributing

Contributions are welcome! Feel free to fork this project and submit pull requests.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 👨‍💻 Author

**Amir Moq** - [GitHub](https://github.com/Moqaddasi) | [LinkedIn](https://www.linkedin.com/in/amirhoseinmoqaddasi/) | [Email](mailto:ah.moqaddasi@gmail.com)

## 📜 License

This project is licensed under the MIT License.

---

### ⭐ Show Your Support

If you find this project useful, please consider **starring** ⭐ the repository on GitHub!
