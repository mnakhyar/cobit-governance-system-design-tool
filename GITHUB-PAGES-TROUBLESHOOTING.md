# 🔧 GitHub Pages Troubleshooting Guide

## **White Screen Issues**

### **Problem: White/Blank Screen on GitHub Pages**

**Symptoms:**
- ✅ Application works locally (`npm run dev`)
- ❌ White screen on GitHub Pages
- ❌ No console errors visible
- ❌ Assets not loading

### **Root Causes & Solutions:**

#### **1. Base Path Configuration**

**Problem:** Incorrect base path in Vite config

**Solution:**
```typescript
// vite.config.ts
export default defineConfig({
  base: mode === 'production' ? '/cobit-governance-system-design-tool/' : '/',
  // ...
});
```

#### **2. Asset Loading Issues**

**Problem:** JavaScript/CSS files not loading

**Check:**
- Open browser dev tools (F12)
- Go to Network tab
- Look for failed requests (red)
- Check if assets have correct paths

**Solution:**
```bash
# Rebuild and deploy
npm run build
npm run deploy
```

#### **3. React Router Issues**

**Problem:** Routes not working on GitHub Pages

**Solution:**
- Add routing script to `index.html`
- Create `404.html` file
- Add `.nojekyll` file

#### **4. Environment Variables**

**Problem:** Missing environment variables

**Solution:**
```typescript
// vite.config.ts
define: {
  'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
}
```

### **Debugging Steps:**

#### **Step 1: Check Browser Console**
```bash
# Open browser dev tools
F12 → Console tab
# Look for errors
```

#### **Step 2: Check Network Tab**
```bash
# Open browser dev tools
F12 → Network tab
# Look for failed requests
```

#### **Step 3: Check Build Output**
```bash
# Build locally
npm run build

# Check dist/index.html
# Verify script paths are correct
```

#### **Step 4: Test Locally**
```bash
# Test production build locally
npm run build
npm run preview
# Should work at http://localhost:4173
```

### **Common Fixes:**

#### **Fix 1: Update Vite Config**
```typescript
// vite.config.ts
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: mode === 'production' ? '/cobit-governance-system-design-tool/' : '/',
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets'
    }
  };
});
```

#### **Fix 2: Add Error Boundary**
```tsx
// App.tsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">The application encountered an error.</p>
            <details className="text-sm text-gray-500">
              <summary>Error Details</summary>
              <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto">
                {this.state.error?.toString()}
              </pre>
            </details>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
```

#### **Fix 3: Add Console Logging**
```tsx
// App.tsx
function App() {
  console.log('App component rendering...');
  
  const [userInputs, setUserInputs] = useState(() => {
    console.log('Initializing user inputs...');
    // ... initialization code
    console.log('User inputs initialized:', initialInputs);
    return initialInputs;
  });

  console.log('App state:', { isSidebarVisible, currentDesign, loading });
  
  return (
    <ErrorBoundary>
      {/* Your app content */}
    </ErrorBoundary>
  );
}
```

### **Deployment Checklist:**

#### **✅ Pre-Deployment:**
- [ ] Application works locally (`npm run dev`)
- [ ] Build succeeds (`npm run build`)
- [ ] Preview works (`npm run preview`)
- [ ] No console errors
- [ ] All assets load correctly

#### **✅ Configuration:**
- [ ] `package.json` has correct `homepage`
- [ ] `vite.config.ts` has correct `base` path
- [ ] Environment variables are defined
- [ ] Error boundary is implemented
- [ ] Console logging is added

#### **✅ Files:**
- [ ] `.nojekyll` file exists in `public/`
- [ ] `404.html` file exists in `public/`
- [ ] Routing script in `index.html`
- [ ] All assets are in `dist/` folder

#### **✅ Deployment:**
- [ ] `git add .`
- [ ] `git commit -m "message"`
- [ ] `git push origin main`
- [ ] `npm run deploy`
- [ ] Check GitHub Pages settings

### **GitHub Pages Settings:**

#### **Repository Settings:**
1. Go to repository **Settings**
2. Navigate to **Pages**
3. Set **Source** to "Deploy from a branch"
4. Select **Branch**: `gh-pages`
5. Select **Folder**: `/ (root)`
6. Click **Save**

#### **Custom Domain (Optional):**
1. Add custom domain in **Pages** settings
2. Create `CNAME` file in `public/` folder
3. Add domain name to file
4. Configure DNS settings

### **Testing:**

#### **Local Testing:**
```bash
# Test development
npm run dev
# Should work at http://localhost:5173

# Test production build
npm run build
npm run preview
# Should work at http://localhost:4173
```

#### **GitHub Pages Testing:**
```bash
# Deploy
npm run deploy

# Wait 2-5 minutes for deployment
# Test at: https://mnakhyar.github.io/cobit-governance-system-design-tool/
```

### **Performance Optimization:**

#### **Bundle Size:**
```typescript
// vite.config.ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom'],
        router: ['react-router-dom'],
        charts: ['recharts']
      }
    }
  }
}
```

#### **Caching:**
```html
<!-- index.html -->
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
```

### **Common Errors:**

#### **Error: "Module not found"**
**Solution:** Check import paths and dependencies

#### **Error: "Cannot read property of undefined"**
**Solution:** Add null checks and error boundaries

#### **Error: "Failed to load resource"**
**Solution:** Check asset paths and base configuration

#### **Error: "Routing not working"**
**Solution:** Add GitHub Pages routing script

### **Support:**

#### **Getting Help:**
1. Check browser console for errors
2. Check network tab for failed requests
3. Test locally with production build
4. Check GitHub Pages deployment logs
5. Verify all configuration files

#### **Useful Commands:**
```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build
npm run deploy

# Check deployment status
git status
git log --oneline -5

# Force rebuild
npm run build -- --force
```

---

**Remember:** GitHub Pages deployment can take 2-5 minutes to become available after pushing changes. 