# 🔑 How to Fix "Rate Limit Exceeded" Error

## The Problem (Simple Explanation)
Think of GitHub API like a store that limits customers:
- **Without membership (no token):** Only 60 visits per hour
- **With membership (with token):** 5000 visits per hour

Each search uses 1-3 visits, so you run out fast!

## The Solution: Get a Free Token (5 minutes)

### Step 1: Create Token
1. Open: https://github.com/settings/tokens
2. Click green "Generate new token" button → "Generate new token (classic)"
3. In "Note" field, type: `GitHub User Search App`
4. **IMPORTANT:** Don't check ANY boxes (we only need to read public data)
5. Scroll down and click "Generate token"
6. **COPY the token immediately** (starts with `ghp_`) - you won't see it again!

### Step 2: Add to Your App
1. In your project folder, create a file named `.env`
2. Open `.env` and paste this (replace with your actual token):
   ```
   VITE_GITHUB_TOKEN=ghp_YourActualTokenHere123456789
   ```
3. Save the file

### Step 3: Restart App
1. Stop the app (Ctrl+C in terminal)
2. Run: `npm run dev`
3. Done! You now have 5000 requests/hour instead of 60

## Security Note
- ✅ Safe: Token is only stored locally on your computer
- ✅ Safe: We don't select any scopes, so token can only read public data
- ❌ Never: Share your token or commit it to Git (already in .gitignore)

## Already Hit the Limit?
Wait 1 hour for the limit to reset, OR add the token now and restart the app.
