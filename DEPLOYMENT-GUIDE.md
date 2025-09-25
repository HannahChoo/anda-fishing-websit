<<<<<<< HEAD
# ANDA Fishing Website - Deployment Guide

This guide will help you deploy the ANDA Fishing website with fully functional features including email contact forms and social media sharing.

## Overview

The website is built with Next.js 15 and includes:
- ✅ **Fully functional contact form** with email sending
- ✅ **Social media sharing** for products (Facebook, Twitter, LinkedIn, Email)
- ✅ **Multilingual support** (English, Chinese, Japanese, Korean, Spanish, Turkish, Russian, Portuguese)
- ✅ **Responsive design** for all devices
- ✅ **Partner/certification displays**

## Prerequisites

Before deployment, ensure you have:
1. Node.js 18+ installed
2. An email service account (Gmail or custom SMTP)
3. A hosting provider (Vercel, Netlify, or custom server)
4. Domain name (optional but recommended)

## 1. Email Service Setup

The contact form requires email service configuration. Choose one option:

### Option A: Gmail (Recommended for small businesses)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings → Security
   - Select "2-Step Verification"
   - Select "App passwords"
   - Generate a password for "Mail"
   - Copy the 16-character password

3. **Set Environment Variables**:
   ```env
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-16-character-app-password
   COMPANY_EMAIL=sales@andalure.com,truman@andalure.com
   ```

### Option B: Custom SMTP Server

If you have a business email hosting service:

```env
SMTP_HOST=mail.your-domain.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@your-domain.com
SMTP_PASS=your-email-password
SMTP_FROM=info@your-domain.com
COMPANY_EMAIL=info@andafishing.com
```

## 2. Environment Variables

Create a `.env.local` file in your project root with these variables:

```env
# Email Configuration (choose Gmail OR SMTP)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password

# OR use custom SMTP
# SMTP_HOST=mail.your-domain.com
# SMTP_PORT=587
# SMTP_SECURE=false
# SMTP_USER=info@your-domain.com
# SMTP_PASS=your-email-password
# SMTP_FROM=info@your-domain.com

# Company Settings
COMPANY_EMAIL=info@andafishing.com

# Website URL (for social sharing)
NEXT_PUBLIC_SITE_URL=https://www.andafishing.com

# Social Media Links (optional)
NEXT_PUBLIC_FACEBOOK_URL=https://www.facebook.com/andafishing
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/andafishing
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/andafishing
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/company/andafishing
NEXT_PUBLIC_YOUTUBE_URL=https://www.youtube.com/andafishing
```

## 3. Installation & Testing

1. **Install Dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Test Locally**:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

3. **Test Contact Form**:
   - Navigate to `/contact`
   - Fill out and submit the form
   - Check that you receive emails at your configured address

4. **Test Social Sharing**:
   - Navigate to any product page (e.g., `/product/hard-lure-1`)
   - Click the "Share" button
   - Test Facebook, Twitter, LinkedIn sharing

## 4. Deployment Options

### Option A: Vercel (Recommended)

1. **Connect to Vercel**:
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **Add Environment Variables** in Vercel Dashboard:
   - Go to your project → Settings → Environment Variables
   - Add all environment variables from step 2

3. **Deploy**:
   ```bash
   vercel --prod
   ```

### Option B: Netlify

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `.next`
   - Add environment variables in Netlify dashboard

### Option C: Custom Server

1. **Build for production**:
   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm start
   ```

## 5. Domain & SSL Setup

1. **Configure Domain**:
   - Point your domain to your hosting provider
   - Update `NEXT_PUBLIC_SITE_URL` to your domain

2. **SSL Certificate**:
   - Most hosting providers (Vercel, Netlify) provide automatic SSL
   - For custom servers, use Let's Encrypt

## 6. Testing Production Features

After deployment, test these critical features:

### ✅ Contact Form Email Sending
1. Go to `yourdomain.com/contact`
2. Fill out the contact form
3. Submit the form
4. Verify you receive:
   - Company notification email at `COMPANY_EMAIL`
   - Customer auto-reply email

### ✅ Social Media Sharing
1. Go to any product page
2. Click "Share" button
3. Test each platform:
   - **Facebook**: Should open Facebook share dialog
   - **Twitter**: Should open Twitter compose dialog
   - **LinkedIn**: Should open LinkedIn share dialog
   - **Email**: Should open default email client

### ✅ Partner Logos Display
1. Go to `/about`
2. Navigate to "Partners" tab
3. Verify all partner logos display correctly

## 7. Monitoring & Maintenance

### Email Delivery Monitoring
- Monitor email delivery rates
- Check spam folders initially
- Consider using email delivery services (SendGrid, AWS SES) for high volume

### Performance Monitoring
- Use hosting provider analytics
- Monitor Core Web Vitals
- Set up error tracking (Sentry, LogRocket)

### Content Updates
- Partner logos: Upload to `/public/partners/`
- Product images: Upload to `/public/`
- Contact information: Update in `/components/Footer.tsx`

## 8. Troubleshooting

### Email Not Sending
1. **Check environment variables** are correctly set
2. **Verify Gmail App Password** (not regular password)
3. **Check server logs** for email errors
4. **Test SMTP credentials** with email client

### Social Sharing Not Working
1. **Verify NEXT_PUBLIC_SITE_URL** is set correctly
2. **Check browser pop-up blockers**
3. **Test different social platforms** individually

### Images Not Loading
1. **Check file paths** in code match actual file locations
2. **Verify image files** are in `/public/` directory
3. **Check file permissions** on server

## 9. Security Considerations

- **Never commit** `.env.local` or environment variables to Git
- **Use App Passwords** for Gmail, not regular passwords
- **Enable HTTPS** on your domain
- **Regular updates** of dependencies

## 10. Support

For technical support:
- Check error logs in hosting provider dashboard
- Verify all environment variables are set
- Test email configuration separately
- Contact hosting provider support if needed

---

**✅ When properly configured, your website will have:**
- Functional contact form sending emails to your business email
- Working social media sharing for all products
- Professional partner/certification displays
- Full multilingual support
- Mobile-responsive design

=======
# ANDA Fishing Website - Deployment Guide

This guide will help you deploy the ANDA Fishing website with fully functional features including email contact forms and social media sharing.

## Overview

The website is built with Next.js 15 and includes:
- ✅ **Fully functional contact form** with email sending
- ✅ **Social media sharing** for products (Facebook, Twitter, LinkedIn, Email)
- ✅ **Multilingual support** (English, Chinese, Japanese, Korean, Spanish, Turkish, Russian, Portuguese)
- ✅ **Responsive design** for all devices
- ✅ **Partner/certification displays**

## Prerequisites

Before deployment, ensure you have:
1. Node.js 18+ installed
2. An email service account (Gmail or custom SMTP)
3. A hosting provider (Vercel, Netlify, or custom server)
4. Domain name (optional but recommended)

## 1. Email Service Setup

The contact form requires email service configuration. Choose one option:

### Option A: Gmail (Recommended for small businesses)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings → Security
   - Select "2-Step Verification"
   - Select "App passwords"
   - Generate a password for "Mail"
   - Copy the 16-character password

3. **Set Environment Variables**:
   ```env
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-16-character-app-password
   COMPANY_EMAIL=sales@andalure.com,truman@andalure.com
   ```

### Option B: Custom SMTP Server

If you have a business email hosting service:

```env
SMTP_HOST=mail.your-domain.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@your-domain.com
SMTP_PASS=your-email-password
SMTP_FROM=info@your-domain.com
COMPANY_EMAIL=info@andafishing.com
```

## 2. Environment Variables

Create a `.env.local` file in your project root with these variables:

```env
# Email Configuration (choose Gmail OR SMTP)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password

# OR use custom SMTP
# SMTP_HOST=mail.your-domain.com
# SMTP_PORT=587
# SMTP_SECURE=false
# SMTP_USER=info@your-domain.com
# SMTP_PASS=your-email-password
# SMTP_FROM=info@your-domain.com

# Company Settings
COMPANY_EMAIL=info@andafishing.com

# Website URL (for social sharing)
NEXT_PUBLIC_SITE_URL=https://www.andafishing.com

# Social Media Links (optional)
NEXT_PUBLIC_FACEBOOK_URL=https://www.facebook.com/andafishing
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/andafishing
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/andafishing
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/company/andafishing
NEXT_PUBLIC_YOUTUBE_URL=https://www.youtube.com/andafishing
```

## 3. Installation & Testing

1. **Install Dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Test Locally**:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

3. **Test Contact Form**:
   - Navigate to `/contact`
   - Fill out and submit the form
   - Check that you receive emails at your configured address

4. **Test Social Sharing**:
   - Navigate to any product page (e.g., `/product/hard-lure-1`)
   - Click the "Share" button
   - Test Facebook, Twitter, LinkedIn sharing

## 4. Deployment Options

### Option A: Vercel (Recommended)

1. **Connect to Vercel**:
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **Add Environment Variables** in Vercel Dashboard:
   - Go to your project → Settings → Environment Variables
   - Add all environment variables from step 2

3. **Deploy**:
   ```bash
   vercel --prod
   ```

### Option B: Netlify

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `.next`
   - Add environment variables in Netlify dashboard

### Option C: Custom Server

1. **Build for production**:
   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm start
   ```

## 5. Domain & SSL Setup

1. **Configure Domain**:
   - Point your domain to your hosting provider
   - Update `NEXT_PUBLIC_SITE_URL` to your domain

2. **SSL Certificate**:
   - Most hosting providers (Vercel, Netlify) provide automatic SSL
   - For custom servers, use Let's Encrypt

## 6. Testing Production Features

After deployment, test these critical features:

### ✅ Contact Form Email Sending
1. Go to `yourdomain.com/contact`
2. Fill out the contact form
3. Submit the form
4. Verify you receive:
   - Company notification email at `COMPANY_EMAIL`
   - Customer auto-reply email

### ✅ Social Media Sharing
1. Go to any product page
2. Click "Share" button
3. Test each platform:
   - **Facebook**: Should open Facebook share dialog
   - **Twitter**: Should open Twitter compose dialog
   - **LinkedIn**: Should open LinkedIn share dialog
   - **Email**: Should open default email client

### ✅ Partner Logos Display
1. Go to `/about`
2. Navigate to "Partners" tab
3. Verify all partner logos display correctly

## 7. Monitoring & Maintenance

### Email Delivery Monitoring
- Monitor email delivery rates
- Check spam folders initially
- Consider using email delivery services (SendGrid, AWS SES) for high volume

### Performance Monitoring
- Use hosting provider analytics
- Monitor Core Web Vitals
- Set up error tracking (Sentry, LogRocket)

### Content Updates
- Partner logos: Upload to `/public/partners/`
- Product images: Upload to `/public/`
- Contact information: Update in `/components/Footer.tsx`

## 8. Troubleshooting

### Email Not Sending
1. **Check environment variables** are correctly set
2. **Verify Gmail App Password** (not regular password)
3. **Check server logs** for email errors
4. **Test SMTP credentials** with email client

### Social Sharing Not Working
1. **Verify NEXT_PUBLIC_SITE_URL** is set correctly
2. **Check browser pop-up blockers**
3. **Test different social platforms** individually

### Images Not Loading
1. **Check file paths** in code match actual file locations
2. **Verify image files** are in `/public/` directory
3. **Check file permissions** on server

## 9. Security Considerations

- **Never commit** `.env.local` or environment variables to Git
- **Use App Passwords** for Gmail, not regular passwords
- **Enable HTTPS** on your domain
- **Regular updates** of dependencies

## 10. Support

For technical support:
- Check error logs in hosting provider dashboard
- Verify all environment variables are set
- Test email configuration separately
- Contact hosting provider support if needed

---

**✅ When properly configured, your website will have:**
- Functional contact form sending emails to your business email
- Working social media sharing for all products
- Professional partner/certification displays
- Full multilingual support
- Mobile-responsive design

>>>>>>> ebb0ee8f85b8f17ba5173b22bbe06a58849013cf
The website is ready for production use with all requested functionality.