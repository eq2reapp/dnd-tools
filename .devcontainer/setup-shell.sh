#!/usr/bin/env bash
set -euo pipefail

cat "$PWD/.devcontainer/profile.custom.sh" > "$HOME/.profile"
echo 'source $HOME/.profile' >> "$HOME/.bashrc"
echo 'source $HOME/.profile' >> "$HOME/.zshrc"
