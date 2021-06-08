#!/bin/sh

API="http://taco-randomizer.herokuapp.com/"
URL_PATH="/random/"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
