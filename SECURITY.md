# Security Policy

## Supported Versions

This is a continuously deployed website; only the latest version published
from the `main` branch is supported. There are no long-lived release branches.

## Reporting a Vulnerability

Please **do not** open a public issue for security problems.

Report vulnerabilities privately via one of:

1. **GitHub Private Vulnerability Reporting** — go to the repository's
   **Security** tab → **Report a vulnerability**. (Preferred.)
2. **Email** — abafanabelokishipodcasters@gmail.com with the subject line
   `SECURITY: <short description>`.

Please include:

- A description of the issue and its potential impact.
- Steps to reproduce (proof of concept if possible).
- Any suggested remediation.

We aim to acknowledge reports within **5 business days** and to provide a
resolution timeline after triage. Please give us a reasonable window to
address the issue before any public disclosure.

## Scope

In scope:

- This repository's source code and GitHub Actions workflows.
- The deployed site at https://samukelo-mkhonza.github.io/abafana-belokishi-website/

Out of scope:

- Third-party embeds (Spotify, YouTube, SoundCloud) and their infrastructure.
- Vulnerabilities in dependencies already tracked by Dependabot, unless
  exploitable in this project's specific configuration.
