API="http://localhost:4741"
URL_PATH="/ratings"

curl "${API}${URL_PATH}${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "rating": {
      "name": "'"${NAME}"'",
      "category": "'"${CATEGORY}"'",
      "notes": "'"${NOTES}"'",
      "rating": "'"${RATING}"'"
    }
  }'

echo
# ID=60b8e557a383f9a60c084e27 NAME="super duper wine" CATEGORY="wine" NOTES="not too bad" RATING=3
