name: Deploy to AWS (S3 + CloudFront)

# This is your "practice" deployment pipeline separate from Netlify.
# It builds the site and pushes it to an S3 bucket, then invalidates
# CloudFront's cache so visitors see the new version immediately.
#
# One-time setup required (see README.md "AWS Setup" section):
#   1. Create an S3 bucket + CloudFront distribution
#   2. Add these secrets in GitHub: Settings > Secrets and variables > Actions
#        AWS_ACCESS_KEY_ID
#        AWS_SECRET_ACCESS_KEY
#        AWS_REGION            (e.g. us-east-1)
#        S3_BUCKET_NAME
#        CLOUDFRONT_DISTRIBUTION_ID

on:
  push:
    branches: [main]
  workflow_dispatch: {}   # lets you trigger it manually from the Actions tab

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v4

      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install & build Vinny Golf
        working-directory: games/vinny-golf-src
        run: |
          npm install
          npm run build

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}

      - name: Sync site to S3
        run: |
          aws s3 sync . s3://${{ secrets.S3_BUCKET_NAME }} \
            --delete \
            --exclude "games/vinny-golf-src/*" \
            --exclude ".git/*" \
            --exclude ".github/*"

      - name: Invalidate CloudFront cache
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"
