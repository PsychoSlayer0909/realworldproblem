# realworldproblem
A modern, minimalist web app for splitting uploaded Excel or CSV files by specified columns or rows. Users can securely register and log in, then upload a spreadsheet, choose which columns or rows to extract, and download separate files—powered by Cloudflare Pages & Workers.

Upload & Split: Accepts .csv, .xls, .xlsx files and splits them by selected columns or row numbers.

Secure Auth: Sign Up, Sign In, and Sign Out flows backed by Cloudflare Workers and KV.

Password Hashing: Passwords hashed with bcryptjs before storage.
Serverless Deployment: Frontend on Cloudflare Pages; backend as Functions (Workers)

Access it here: https://realworldproblem.pages.dev/
