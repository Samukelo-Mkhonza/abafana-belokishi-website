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
- The deployed site at https://abafanabelokishientertainment.co.za/

Out of scope:

- Third-party embeds (Spotify, YouTube, SoundCloud) and their infrastructure.
- Vulnerabilities in dependencies already tracked by Dependabot, unless
  exploitable in this project's specific configuration.

## Hardening in place

- **Content-Security-Policy** in a `<meta>` tag in `index.html` (GitHub Pages
  can't send custom headers). Scripts are limited to the site's own origin plus
  a hash of the inline theme snippet. Frames and remote images are limited to
  the providers the site actually uses. `src/csp.test.js` fails if the hash or
  the allowed origins stop matching the content.
- **Third-party players** load only after a visitor clicks, and YouTube uses
  `youtube-nocookie.com`.
- **CI**: GitHub Actions are pinned to commit SHAs (Dependabot keeps them
  current), checkouts don't keep the token, pull requests run
  `npm audit --audit-level=high` and a gitleaks scan of the full history, and
  CodeQL runs weekly and on every PR.

## Accepted risks

- **No clickjacking header.** `frame-ancestors` and `X-Frame-Options` only work
  as response headers, which GitHub Pages doesn't allow. The site has no
  logged-in state or state-changing actions, so framing it gains an attacker
  little. Revisit if the site moves behind CloudFront or another CDN that can
  set headers.
- **No HSTS preload control.** GitHub Pages sends its own HSTS header. Enable
  **Enforce HTTPS** under Settings → Pages.
- **Legacy `pipeline.yml`.** The CloudFormation stack takes a GitHub personal
  access token as a parameter and uses a CloudFront Origin Access Identity. The
  live site deploys through GitHub Pages instead. If the stack is still
  deployed, delete it or move it to a CodeStar connection and Origin Access
  Control, and revoke the token.
