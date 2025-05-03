# realworldproblem
A modern, minimalist web app for splitting uploaded Excel or CSV files by specified columns or rows. Users can securely register and log in, then upload a spreadsheet, choose which columns or rows to extract, and download separate files—powered by Cloudflare Pages & Workers.

Upload & Split: Accepts .csv, .xls, .xlsx files and splits them by selected columns or row numbers.

Secure Auth: Sign Up and Sign In flows backed by Cloudflare Workers and KV.

Serverless Deployment: Frontend on Cloudflare Pages; backend as Functions (Workers)


The core serverless logic for authentication and API routing lives in an index.js file:

Repository: A copy of our CloudFlare Worker entrypoint is present as index.js (or your configured entry) on our main repository so that your Worker code is version-controlled alongside your frontend.


Access it here: https://realworldproblem.pages.dev/
