<<<<<<< HEAD
# How to Update Business Email Addresses

This guide explains how to update your business email addresses throughout the ANDA website when you need to change them in the future.

## Current Email Setup

**Current Business Emails:**
- Primary: `truman@andalure.com`
- Sales: `sales@andalure.com`

These emails are used for:
- Contact form submissions (both emails receive notifications)
- Product page "Contact Supplier" buttons
- Footer contact information
- Auto-reply templates

## Files to Update

When changing business emails, you need to update **4 main files**:

### 1. Environment Variables (.env.local)

**File:** `.env.local` (or your hosting provider's environment settings)

```env
# Update this line with your new email(s)
# For multiple emails, separate with commas
COMPANY_EMAIL=new-email@yourdomain.com,second-email@yourdomain.com
```

**What this affects:**
- Where contact form submissions are sent
- Primary business email for notifications

---

### 2. Footer Component

**File:** `components/Footer.tsx`

**Find and replace in ALL language sections:**

```typescript
// OLD
email: "sales@andalure.com",

// NEW
email: "your-new-email@yourdomain.com",
```

**Languages to update:** English, Chinese, Japanese, Korean, Spanish, Turkish, Russian, Portuguese

**What this affects:**
- Footer contact information displayed on all pages
- Visible to all website visitors

---

### 3. Product Pages

**File:** `app/product/[id]/page.tsx`

**Find and replace:**

```typescript
// OLD
<Link href="mailto:sales@andalure.com" passHref>

// NEW
<Link href="mailto:your-new-email@yourdomain.com" passHref>
```

**What this affects:**
- "Contact Supplier" button on all product pages
- Direct email links from product pages

---

### 4. Contact Page Translations

**File:** `app/contact/page.tsx`

**Find and replace in ALL language sections:**

```typescript
// OLD
emailAddress: "sales@andalure.com",

// NEW  
emailAddress: "your-new-email@yourdomain.com",
```

**Languages to update:** English, Chinese, Japanese, Korean, Spanish, Turkish, Russian, Portuguese

**What this affects:**
- Contact information displayed on the contact page
- Email address shown to visitors

---

### 5. Email Templates (Optional)

**File:** `app/api/contact/route.ts`

**Update the auto-reply email footer:**

```typescript
// Find this section and update emails
<p>📧 Sales: your-new-sales@yourdomain.com</p>
<p>📧 General: your-new-general@yourdomain.com</p>
<p>🌐 Website: www.yourdomain.com</p>
```

**What this affects:**
- Email signatures in auto-reply messages
- Contact information in email templates

---

## Step-by-Step Process

### Method 1: Search and Replace (Recommended)

1. **Use your code editor's "Find and Replace" feature**
2. **Search for:** `sales@andalure.com`
3. **Replace with:** `your-new-email@yourdomain.com`
4. **Replace all occurrences** across the entire project
5. **Repeat for:** `truman@andalure.com`

### Method 2: Manual Updates

1. **Open each file listed above**
2. **Update email addresses** one by one
3. **Double-check all language translations**
4. **Test thoroughly after changes**

### Method 3: Using Command Line (Advanced)

```bash
# Replace sales email
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/sales@andalure.com/your-new-email@yourdomain.com/g'

# Replace general email  
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/truman@andalure.com/your-new-email@yourdomain.com/g'
```

---

## After Making Changes

### 1. Update Environment Variables

**For Vercel:**
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Update `COMPANY_EMAIL` with new email(s)
- Redeploy your application

**For Netlify:**
- Go to Netlify Dashboard → Your Site → Site Settings → Environment Variables
- Update `COMPANY_EMAIL`
- Trigger a new deploy

**For other hosting:**
- Update environment variables in your hosting provider's dashboard
- Restart/redeploy your application

### 2. Test Everything

After updating emails, test these features:

**✅ Contact Form:**
1. Go to `/contact`
2. Submit a test message
3. Verify new email addresses receive the notification
4. Check auto-reply goes to customer

**✅ Product Page Contact:**
1. Go to any product page
2. Click "Contact Supplier" button  
3. Verify it opens email client with new address

**✅ Footer Display:**
1. Check footer on any page
2. Verify new email is displayed correctly

**✅ Contact Page Display:**
1. Go to `/contact` page
2. Verify contact information shows new email

### 3. Deploy Changes

```bash
# Build and test locally first
npm run build
npm run dev

# Deploy to production
npm run deploy
# or follow your hosting provider's deployment process
```

---

## Multiple Email Addresses

You can configure multiple business emails to receive contact form submissions:

**Environment Variable:**
```env
COMPANY_EMAIL=sales@yourdomain.com,support@yourdomain.com,manager@yourdomain.com
```

**This will:**
- Send contact form notifications to ALL listed emails
- Separate multiple emails with commas
- No spaces around commas

---

## Common Mistakes to Avoid

❌ **Don't forget language translations** - Update ALL language sections  
❌ **Don't forget environment variables** - Update hosting provider settings  
❌ **Don't skip testing** - Always test after making changes  
❌ **Don't update only one file** - All 4-5 files need updates  
❌ **Don't use spaces in environment variables** - Use commas only for multiple emails  

---

## Quick Checklist

When changing business emails:

- [ ] Update `.env.local` / hosting environment variables
- [ ] Update `components/Footer.tsx` (all languages)
- [ ] Update `app/product/[id]/page.tsx`
- [ ] Update `app/contact/page.tsx` (all languages)
- [ ] Update `app/api/contact/route.ts` (optional)
- [ ] Deploy changes to hosting provider
- [ ] Test contact form functionality
- [ ] Test product page contact buttons
- [ ] Verify footer and contact page display

---

=======
# How to Update Business Email Addresses

This guide explains how to update your business email addresses throughout the ANDA website when you need to change them in the future.

## Current Email Setup

**Current Business Emails:**
- Primary: `truman@andalure.com`
- Sales: `sales@andalure.com`

These emails are used for:
- Contact form submissions (both emails receive notifications)
- Product page "Contact Supplier" buttons
- Footer contact information
- Auto-reply templates

## Files to Update

When changing business emails, you need to update **4 main files**:

### 1. Environment Variables (.env.local)

**File:** `.env.local` (or your hosting provider's environment settings)

```env
# Update this line with your new email(s)
# For multiple emails, separate with commas
COMPANY_EMAIL=new-email@yourdomain.com,second-email@yourdomain.com
```

**What this affects:**
- Where contact form submissions are sent
- Primary business email for notifications

---

### 2. Footer Component

**File:** `components/Footer.tsx`

**Find and replace in ALL language sections:**

```typescript
// OLD
email: "sales@andalure.com",

// NEW
email: "your-new-email@yourdomain.com",
```

**Languages to update:** English, Chinese, Japanese, Korean, Spanish, Turkish, Russian, Portuguese

**What this affects:**
- Footer contact information displayed on all pages
- Visible to all website visitors

---

### 3. Product Pages

**File:** `app/product/[id]/page.tsx`

**Find and replace:**

```typescript
// OLD
<Link href="mailto:sales@andalure.com" passHref>

// NEW
<Link href="mailto:your-new-email@yourdomain.com" passHref>
```

**What this affects:**
- "Contact Supplier" button on all product pages
- Direct email links from product pages

---

### 4. Contact Page Translations

**File:** `app/contact/page.tsx`

**Find and replace in ALL language sections:**

```typescript
// OLD
emailAddress: "sales@andalure.com",

// NEW  
emailAddress: "your-new-email@yourdomain.com",
```

**Languages to update:** English, Chinese, Japanese, Korean, Spanish, Turkish, Russian, Portuguese

**What this affects:**
- Contact information displayed on the contact page
- Email address shown to visitors

---

### 5. Email Templates (Optional)

**File:** `app/api/contact/route.ts`

**Update the auto-reply email footer:**

```typescript
// Find this section and update emails
<p>📧 Sales: your-new-sales@yourdomain.com</p>
<p>📧 General: your-new-general@yourdomain.com</p>
<p>🌐 Website: www.yourdomain.com</p>
```

**What this affects:**
- Email signatures in auto-reply messages
- Contact information in email templates

---

## Step-by-Step Process

### Method 1: Search and Replace (Recommended)

1. **Use your code editor's "Find and Replace" feature**
2. **Search for:** `sales@andalure.com`
3. **Replace with:** `your-new-email@yourdomain.com`
4. **Replace all occurrences** across the entire project
5. **Repeat for:** `truman@andalure.com`

### Method 2: Manual Updates

1. **Open each file listed above**
2. **Update email addresses** one by one
3. **Double-check all language translations**
4. **Test thoroughly after changes**

### Method 3: Using Command Line (Advanced)

```bash
# Replace sales email
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/sales@andalure.com/your-new-email@yourdomain.com/g'

# Replace general email  
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/truman@andalure.com/your-new-email@yourdomain.com/g'
```

---

## After Making Changes

### 1. Update Environment Variables

**For Vercel:**
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Update `COMPANY_EMAIL` with new email(s)
- Redeploy your application

**For Netlify:**
- Go to Netlify Dashboard → Your Site → Site Settings → Environment Variables
- Update `COMPANY_EMAIL`
- Trigger a new deploy

**For other hosting:**
- Update environment variables in your hosting provider's dashboard
- Restart/redeploy your application

### 2. Test Everything

After updating emails, test these features:

**✅ Contact Form:**
1. Go to `/contact`
2. Submit a test message
3. Verify new email addresses receive the notification
4. Check auto-reply goes to customer

**✅ Product Page Contact:**
1. Go to any product page
2. Click "Contact Supplier" button  
3. Verify it opens email client with new address

**✅ Footer Display:**
1. Check footer on any page
2. Verify new email is displayed correctly

**✅ Contact Page Display:**
1. Go to `/contact` page
2. Verify contact information shows new email

### 3. Deploy Changes

```bash
# Build and test locally first
npm run build
npm run dev

# Deploy to production
npm run deploy
# or follow your hosting provider's deployment process
```

---

## Multiple Email Addresses

You can configure multiple business emails to receive contact form submissions:

**Environment Variable:**
```env
COMPANY_EMAIL=sales@yourdomain.com,support@yourdomain.com,manager@yourdomain.com
```

**This will:**
- Send contact form notifications to ALL listed emails
- Separate multiple emails with commas
- No spaces around commas

---

## Common Mistakes to Avoid

❌ **Don't forget language translations** - Update ALL language sections  
❌ **Don't forget environment variables** - Update hosting provider settings  
❌ **Don't skip testing** - Always test after making changes  
❌ **Don't update only one file** - All 4-5 files need updates  
❌ **Don't use spaces in environment variables** - Use commas only for multiple emails  

---

## Quick Checklist

When changing business emails:

- [ ] Update `.env.local` / hosting environment variables
- [ ] Update `components/Footer.tsx` (all languages)
- [ ] Update `app/product/[id]/page.tsx`
- [ ] Update `app/contact/page.tsx` (all languages)
- [ ] Update `app/api/contact/route.ts` (optional)
- [ ] Deploy changes to hosting provider
- [ ] Test contact form functionality
- [ ] Test product page contact buttons
- [ ] Verify footer and contact page display

---

>>>>>>> ebb0ee8f85b8f17ba5173b22bbe06a58849013cf
**✅ After following this guide, all email addresses throughout your website will be updated and fully functional.**