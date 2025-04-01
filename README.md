# PathRepo

A **GitHub Repository File Explorer** that allows users to explore the file structure of any public GitHub repository by entering its URL.

## 🚀 Features
- Fetches and displays the file structure of a public GitHub repository.
- Uses GitHub's REST API to retrieve repository contents.
- No authentication required—works for all public repositories.
- Built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

## 📸 Screenshot
![App Screenshot](https://via.placeholder.com/800x400?text=PathRepo+File+Explorer)

## 🛠️ Technologies Used
- **Next.js** (React framework for SSR & static generation)
- **React 19** (Latest version of React for modern development)
- **TypeScript** (Static typing for better maintainability)
- **Tailwind CSS** (Utility-first CSS framework)
- **GitHub API** (Fetching repository files)

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Moqaddasi/PathRepo.git
cd PathRepo
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Run the Development Server
```bash
npm run dev
```
Visit `http://localhost:3000` to see the app in action.

## 📡 Deployment
This project can be deployed on **GitHub Pages**, **Vercel**, or **Netlify**.

### Deploy to GitHub Pages:
1. Build and export static files:
   ```bash
   npm run build && npm run export
   ```
2. Copy contents of the `out` folder to the `gh-pages` branch.
3. Enable GitHub Pages in repository settings.

### Deploy to Vercel:
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Run the deploy command:
   ```bash
   vercel
   ```

## 📦 Package Configuration
- **Next.js 15.2.4** for the latest features
- **React 19** (Experimental, consider React 18 for stability)
- **Tailwind CSS 4** for styling
- **ESLint** for code quality

## 🛑 Limitations
- Only works with **public repositories** (GitHub API restricts private repos without authentication).
- Large repositories with deep folder structures might take longer to load.

## 🤝 Contributing
Feel free to fork this project and submit pull requests!

## 📜 License
This project is licensed under the MIT License.

---
### ⭐ Show Your Support
If you like this project, please consider **starring** ⭐ the repository on GitHub!

