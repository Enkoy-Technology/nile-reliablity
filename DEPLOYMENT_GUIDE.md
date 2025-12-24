# Deployment Guide - Nile Reliability Website

## Option 1: Vercel (RECOMMENDED - Easiest! ⭐)

Vercel is made by the Next.js team and is the easiest way to deploy.

### Steps:

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/nile-reliability-website.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables:
     - `NEXT_PUBLIC_EMAILJS_SERVICE_ID` = your service ID
     - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` = your template ID
     - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` = your public key
   - Click "Deploy"

3. **Connect Custom Domain (Hostinger):**
   - In Vercel project settings, go to "Domains"
   - Add your Hostinger domain (e.g., `nilereliability.com`)
   - Follow instructions to update DNS records in Hostinger

**Benefits:** Free, automatic SSL, CDN, zero-config deployment!

---

## Option 2: Hostinger VPS (If you prefer Hostinger)

### Prerequisites:
- Hostinger VPS with Node.js installed
- Domain pointing to your VPS IP

### Steps:

1. **Build your Next.js app:**
   ```bash
   npm run build
   ```

2. **Upload to Hostinger via SSH:**
   ```bash
   # On your local machine, compress the project
   tar -czf nile-reliability.tar.gz --exclude node_modules --exclude .next .

   # Upload to Hostinger VPS (via FTP or SSH)
   scp nile-reliability.tar.gz user@your-vps-ip:/var/www/
   ```

3. **On Hostinger VPS:**
   ```bash
   # SSH into your VPS
   ssh user@your-vps-ip

   # Navigate to project directory
   cd /var/www
   tar -xzf nile-reliability.tar.gz
   cd nile-reliability-website

   # Install dependencies
   npm install

   # Build the project
   npm run build

   # Create .env file
   nano .env
   # Add your environment variables:
   # NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
   # NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
   # NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...

   # Install PM2 (process manager)
   npm install -g pm2

   # Start the app
   pm2 start npm --name "nile-reliability" -- start
   pm2 save
   pm2 startup
   ```

4. **Set up Nginx reverse proxy:**
   ```bash
   sudo nano /etc/nginx/sites-available/nilereliability
   ```

   Add this configuration:
   ```nginx
   server {
       listen 80;
       server_name nilereliability.com www.nilereliability.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   ```bash
   sudo ln -s /etc/nginx/sites-available/nilereliability /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

5. **Set up SSL (Let's Encrypt):**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d nilereliability.com -d www.nilereliability.com
   ```

---

## Option 3: Hostinger Shared Hosting (Static Export)

If you only have shared hosting, you'll need to export as static site:

1. **Update `next.config.js`:**
   ```javascript
   const nextConfig = {
     output: 'export',
     reactStrictMode: true,
     images: {
       unoptimized: true,
     },
   }
   ```

2. **Build static site:**
   ```bash
   npm run build
   ```

3. **Upload `out` folder** to Hostinger via FTP/cPanel File Manager

**Note:** Static export has limitations - no API routes, server-side features, or dynamic rendering.

---

## Recommended: Vercel + Hostinger Domain

This is the **easiest and best option**:

1. Deploy to Vercel (takes 2 minutes)
2. Point your Hostinger domain to Vercel
3. Update DNS in Hostinger:
   - Add A record: `@` → Vercel IP
   - Add CNAME: `www` → `cname.vercel-dns.com`

**Result:** Fast, secure, free hosting with your custom domain!

---

## Environment Variables Checklist

Make sure these are set in your hosting platform:

- ✅ `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- ✅ `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- ✅ `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

---

## Quick Deploy Commands (Vercel CLI)

If you prefer command line:

```bash
npm i -g vercel
vercel login
vercel
# Follow prompts
vercel --prod  # Deploy to production
```

That's it! Your site will be live! 🚀

