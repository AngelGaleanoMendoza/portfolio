# Angel Galeano — Portfolio

English portfolio covering web development, APIs, business software and project delivery.

## Website source

The deployable website is in `site/`. It uses HTML, CSS and browser JavaScript. No package installation, build command or secret is required.

## Publish to GitHub Pages

1. Create a public GitHub repository named `angel-galeano-portfolio`.
2. Upload this folder's contents to its `main` branch, including `.github/workflows/pages.yml` and `site/`.
3. In the repository, open **Settings → Pages → Build and deployment → Source**, and select **GitHub Actions**.
4. Open **Actions → Deploy portfolio to GitHub Pages → Run workflow**, and choose `main`.
5. Open the deployment URL shown in the successful workflow run.

The public URL will have this format: `https://YOUR-USERNAME.github.io/angel-galeano-portfolio/`.

Future changes pushed to `main` automatically deploy the website again.

## Local preview

Serve `site/` with a local static HTTP server. Image and script paths are relative so they also work under a GitHub Pages repository path.

## Edit content

- `site/index.html`: introduction, experience and contact.
- `site/projects.js`: project descriptions, examples and client-facing role.
- `site/project-data.js`: project names and live URLs.
- `site/projects.css`: project layouts, animation and syntax palette.
- `site/portfolio.css`: global dark theme.
- `site/modal.css`: enlarged image viewer.
- `site/assets/`: actual project captures.

The project screenshots are presented with a cropped viewport. Original screenshot files may still contain the Windows activation overlay outside the displayed area.
