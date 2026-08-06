#!/usr/bin/env bash

set -eu

base_url="${1:-http://127.0.0.1:3100}"
evidence_dir="$(cd "$(dirname "$0")/.." && pwd)/docs/evidencias"
firefox_profile="$(mktemp -d)"

capture() {
    file="$1"
    width="$2"
    height="$3"
    path="$4"

    curl --silent --show-error --location --output /dev/null "$base_url$path"

    firefox \
        --headless \
        --profile "$firefox_profile" \
        --screenshot "$firefox_profile/warm.png" \
        --window-size "$width,$height" \
        "$base_url$path"

    firefox \
        --headless \
        --profile "$firefox_profile" \
        --screenshot "$evidence_dir/$file" \
        --window-size "$width,$height" \
        "$base_url$path"
}

capture "AV-01-home-desktop.png" 1440 1000 "/"
capture "AV-02-home-mobile.png" 390 844 "/"
capture "AV-03-rota-protegida-next.png" 1440 1000 "/login?next=/student"
capture "AV-04-cadastro.png" 1440 1000 "/register"
capture "AV-05-api-indisponivel.png" 1440 1000 "/certificate?code=CODIGO-INVALIDO"
capture "AV-06-pagina-404.png" 1440 1000 "/pagina-inexistente"
capture "AV-07-style-guide.png" 1440 3000 "/style-guide"

printf 'Evidências salvas em %s\n' "$evidence_dir"
