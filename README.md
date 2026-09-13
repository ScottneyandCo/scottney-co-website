# Scottney & Co. Website

A responsive, single-page business website built with Next.js and designed for easy deployment to Vercel.

## Update before launch

- Copy `.env.example` to `.env.local` and replace the placeholder values.
- Replace the three portfolio placeholders with finished client work when available.
- Create a Resend account and API key, then add the same four environment variables in Vercel under **Project Settings → Environment Variables**.
- Verify your sending domain in Resend before changing `INQUIRY_FROM_EMAIL` from the Resend testing address to your branded address.

## Run locally

1. Install Node.js 22 or newer.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open the local address shown in the terminal.

## Push to GitHub

1. Create a new empty repository on GitHub.
2. From this project folder, run:

   ```bash
   git init
   git add .
   git commit -m "Build Scottney & Co. website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
   git push -u origin main
   ```

## Deploy to Vercel

1. Sign in at [vercel.com](https://vercel.com) and choose **Add New → Project**.
2. Import the GitHub repository.
3. Keep the detected **Next.js** framework settings.
4. Select **Deploy**.

Future pushes to `main` will automatically create new Vercel deployments.
