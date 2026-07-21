# WinnyVinny.com

Vincent's game portfolio site — featuring **Vinny Golf** (18-hole mini golf) and
**Alpine Rush** (3D skiing).

## Project structure

```
winnyvinny/
├── index.html                  # Homepage (static, no build needed)
├── games/
│   ├── alpine-rush/
│   │   └── index.html          # Static Three.js game, no build needed
│   ├── vinny-golf-src/         # React source code (edit game logic here)
│   │   ├── src/App.jsx
│   │   └── ...
│   └── vinny-golf/             # Built output of vinny-golf-src (generated, do not edit)
├── netlify.toml                 # Netlify build config
└── .github/workflows/
    └── deploy-aws.yml           # GitHub Actions -> AWS S3/CloudFront
```

**Important:** only edit game code inside `games/vinny-golf-src`. The
`games/vinny-golf/` folder is generated automatically by the build — anything
you put there by hand will get overwritten.

---

## 1. Local development

To test Vinny Golf locally before pushing:

```bash
cd games/vinny-golf-src
npm install
npm run dev
```

This opens a dev server (usually `http://localhost:5173`) with hot-reload.

To test the full built site locally:

```bash
cd games/vinny-golf-src
npm run build          # outputs to ../vinny-golf
cd ../..
npx serve .             # serves the whole winnyvinny/ folder
```

The homepage and Alpine Rush need no build step — just open
`index.html` or `games/alpine-rush/index.html` in a browser to preview.

---

## 2. Push to GitHub

```bash
cd winnyvinny
git init
git add .
git commit -m "Initial commit: WinnyVinny site with Vinny Golf and Alpine Rush"
```

Create a new repo on GitHub (e.g. `winnyvinny-site`), then:

```bash
git remote add origin https://github.com/<your-username>/winnyvinny-site.git
git branch -M main
git push -u origin main
```

---

## 3. Deploy on Netlify (the live site)

1. Go to [app.netlify.com](https://app.netlify.com) and sign up/log in
2. **Add new site → Import an existing project → GitHub** → select your repo
3. Netlify should auto-detect the build settings from `netlify.toml`:
   - Build command: `cd games/vinny-golf-src && npm install && npm run build`
   - Publish directory: `.`
4. Click **Deploy site** — Netlify will build Vinny Golf and publish everything
5. Every future `git push` to `main` triggers an automatic redeploy

### Connecting WinnyVinny.com to Netlify

1. Register the domain (Netlify, Namecheap, or Route 53 — any registrar works)
2. In Netlify: **Site settings → Domain management → Add custom domain** →
   enter `winnyvinny.com`
3. Update your domain's DNS:
   - If registered elsewhere, point nameservers to Netlify's, **or**
   - Add the A/CNAME records Netlify gives you
4. Netlify auto-provisions a free SSL certificate (HTTPS) once DNS resolves

---

## 4. AWS practice environment (S3 + CloudFront)

This is optional and separate from the live Netlify site — a good way to
practice AWS skills. GitHub Actions will deploy here on every push to `main`.

### One-time AWS console setup:

1. **S3 bucket**
   - Create a bucket (e.g. `winnyvinny-site-mirror`)
   - Keep "Block all public access" ON — CloudFront will access it privately
     via an Origin Access Control (OAC), which is the modern secure pattern

2. **CloudFront distribution**
   - Origin: your S3 bucket (select "Origin access control settings" → create
     new OAC)
   - Default root object: `index.html`
   - Viewer protocol policy: Redirect HTTP to HTTPS
   - After creating, S3 will prompt you to update the bucket policy to allow
     CloudFront — accept that

3. **ACM Certificate** (only needed if you want a custom subdomain like
   `dev.winnyvinny.com` on this AWS mirror)
   - Request a public certificate in **us-east-1** (CloudFront requires this
     region regardless of where your bucket lives)
   - Validate via DNS (add the CNAME record ACM gives you)
   - Attach the certificate to your CloudFront distribution + add the
     alternate domain name

4. **Route 53** (if using a subdomain for the mirror)
   - Add an A record (Alias) for `dev.winnyvinny.com` pointing to your
     CloudFront distribution

5. **IAM user for GitHub Actions**
   - Create an IAM user with programmatic access
   - Attach a policy scoped to just this bucket + CloudFront invalidations:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": ["s3:PutObject", "s3:GetObject", "s3:ListBucket", "s3:DeleteObject"],
         "Resource": [
           "arn:aws:s3:::winnyvinny-site-mirror",
           "arn:aws:s3:::winnyvinny-site-mirror/*"
         ]
       },
       {
         "Effect": "Allow",
         "Action": ["cloudfront:CreateInvalidation"],
         "Resource": "*"
       }
     ]
   }
   ```

   - Generate an access key for this user

6. **Add GitHub repo secrets** (Settings → Secrets and variables → Actions):
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION` (e.g. `us-east-1`)
   - `S3_BUCKET_NAME` (e.g. `winnyvinny-site-mirror`)
   - `CLOUDFRONT_DISTRIBUTION_ID`

Once these secrets are set, every push to `main` will trigger
`.github/workflows/deploy-aws.yml`, which builds Vinny Golf and syncs
everything to S3, then invalidates the CloudFront cache.

---

## Notes

- Vinny Golf uses Tailwind via CDN (`cdn.tailwindcss.com`) for simplicity —
  fine for a small project like this, but for a larger app you'd install
  Tailwind as a proper build dependency.
- Alpine Rush loads Three.js r128 from cdnjs — no npm dependency needed.
