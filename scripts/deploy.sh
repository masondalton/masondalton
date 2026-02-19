#!/bin/bash
# Deploy daltonforge.com: Build ML app (with API URL), build frontend, Terraform apply, CloudFront invalidation
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
ML_PIPELINE_PATH="${ML_PIPELINE_PATH:-/Users/twoscoops/Documents/BYU/Winter26/IS455/Dalton_Mason_ML_Pipeline_Deployment}"

echo "=== 1. Build ML Pipeline app (with API URL from SAM) ==="
if [ -d "$ML_PIPELINE_PATH" ]; then
  cd "$ML_PIPELINE_PATH"
  if [ -f "scripts/build-static.sh" ]; then
    bash scripts/build-static.sh
  else
    echo "Getting ApiBaseUrl from CloudFormation..."
    STACK_NAME=$(grep 'stack_name' samconfig.toml 2>/dev/null | cut -d'"' -f2 || echo "ml-pipeline")
    API_BASE=$(aws cloudformation describe-stacks --stack-name "$STACK_NAME" \
      --query "Stacks[0].Outputs[?OutputKey=='ApiBaseUrl'].OutputValue" --output text 2>/dev/null || true)
    if [ -z "$API_BASE" ]; then
      echo "WARNING: Could not get ApiBaseUrl. Building without it."
    fi
    cd app
    NEXT_PUBLIC_API_BASE_URL="$API_BASE" npm run build
  fi
  cd "$PROJECT_ROOT"
else
  echo "WARNING: ML Pipeline path not found at $ML_PIPELINE_PATH"
  echo "Ensure ML app is built and out/ exists, or set ML_PIPELINE_PATH"
fi

echo "=== 2. Build Personal Website frontend ==="
cd "$PROJECT_ROOT/frontend"
npm run build
cd "$PROJECT_ROOT"

echo "=== 3. Terraform apply ==="
cd infra
terraform init -input=false
terraform apply -auto-approve -input=false
cd "$PROJECT_ROOT"

echo "=== 4. CloudFront invalidation ==="
DIST_ID=$(cd infra && terraform output -raw cloudfront_distribution_id 2>/dev/null || true)
if [ -n "$DIST_ID" ]; then
  aws cloudfront create-invalidation --distribution-id "$DIST_ID" --paths "/*"
  echo "Invalidation created. Changes will propagate in 1-2 minutes."
else
  echo "Could not get CloudFront distribution ID for invalidation."
fi

echo "=== Done. Site: https://www.daltonforge.com ==="
echo "ML Pipeline: https://www.daltonforge.com/machinelearningpipeline"
