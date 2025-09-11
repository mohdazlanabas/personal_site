# Personal Portfolio Website for Azlan Abas

This repository contains the source code for the personal executive profile website of Azlan Abas. It is a modern, responsive, single-page static website designed to showcase his professional experience, core competencies, and project portfolio.

The site is built with pure HTML, CSS, and vanilla JavaScript, emphasizing performance, accessibility, and clean code.

## Table of Contents

- [Personal Portfolio Website for Azlan Abas](#personal-portfolio-website-for-azlan-abas)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [Getting Started (Local Development)](#getting-started-local-development)
  - [Deployment](#deployment)
    - [Deploying to Google Cloud Storage](#deploying-to-google-cloud-storage)
  - [Customization](#customization)
    - [Updating Personal Information](#updating-personal-information)
    - [Changing the GitHub Username](#changing-the-github-username)
    - [Styling](#styling)

## Features

*   **Single-Page Layout**: All content is accessible on a single, scrollable page with a sticky navigation header.
*   **Responsive Design**: The layout adapts seamlessly to various screen sizes, from mobile phones to desktop monitors, using modern CSS techniques like `clamp()` and media queries.
*   **Dynamic GitHub Portfolio**: Automatically fetches and displays the user's most relevant public GitHub repositories using the GitHub API. Repositories are sorted by star count and recent activity.
*   **SEO Optimized**: Includes `schema.org` structured data (`ld+json`) to improve search engine visibility and presentation.
*   **Performance Focused**: Uses preconnect hints for fonts and efficient, minimal vanilla JavaScript.
*   **Clean & Modern UI**: A dark-themed, professional design with clear typography and a structured layout.

## Tech Stack

*   **HTML5**: For the core structure and content.
*   **CSS3**: For styling, layout, and responsiveness. Uses CSS Custom Properties (variables) for easy theming.
*   **Vanilla JavaScript (ES6+)**: For dynamic functionality, including the mobile menu toggle and fetching GitHub repositories via the `fetch` API.
*   **Google Cloud Build & Google Cloud Storage**: For continuous deployment and hosting of the static website.

## Project Structure

```
personal_site/
├── assets/
│   ├── photo.jpeg
│   └── favicon.png
├── styles/
│   └── styles.css
├── src/
│   └── scripts.js
├── .gitignore
├── cloudbuild.yaml
├── index.html
└── README.md
```
*   `index.html`: The main entry point and content file.
*   `styles/styles.css`: Contains all the styling rules for the website.
*   `src/scripts.js`: Handles the mobile menu and fetches data from the GitHub API.
*   `assets/`: Contains static assets like images and the favicon.
*   `cloudbuild.yaml`: Configuration file for automated deployments using Google Cloud Build.

## Getting Started (Local Development)

Since this is a static website with no build dependencies, you can run it locally very easily.

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone <your-repository-url>
    cd personal_site
    ```

2.  **Serve the files locally:**
    The easiest way to run a local server is to use a tool like the **Live Server** extension in VS Code.
    *   Install the Live Server extension from the VS Code Marketplace.
    *   Right-click on the `index.html` file in the VS Code Explorer.
    *   Select "Open with Live Server".

    Alternatively, you can use a simple command-line server with Python:
    ```bash
    # If you have Python 3
    python3 -m http.server

    # If you have Python 2
    python -m SimpleHTTPServer
    ```
    Your site will be available at `http://localhost:8000`.

## Deployment

The project is configured for automated deployment to **Google Cloud Storage** for static website hosting, using **Google Cloud Build**.

### Deploying to Google Cloud Storage

The `cloudbuild.yaml` file automates the process of syncing your local files to a GCS bucket.

**Prerequisites:**
1.  A Google Cloud Platform (GCP) project.
2.  A GCS bucket configured for static website hosting (e.g., `gs://net1io.com`).
3.  The `gcloud` CLI installed and authenticated, or the repository connected to Cloud Build.

**Deployment Steps:**

The `cloudbuild.yaml` uses `gsutil rsync` to efficiently synchronize the contents of your project directory with the GCS bucket.

```yaml
steps:
- name: 'gcr.io/cloud-builders/gsutil'
  args: ['-m', 'rsync', '-r', '-c', '-d', '.', 'gs://net1io.com']
```
To trigger a build, you can either push your changes to a connected Git repository or run the build manually from your local machine:

```bash
# Run the build from your project's root directory
gcloud builds submit --config cloudbuild.yaml .
```

This command will upload your files to Cloud Build, which will then execute the gsutil rsync command to update your live website.

## Customization

### Updating Personal Information
Most of the personal data (name, job titles, experience, links) is hardcoded in index.html. To update it, simply find the relevant section (e.g., <section id="experience">) and edit the text.

### Changing the GitHub Username
The GitHub repositories are fetched based on a username defined in src/scripts.js.

1.  Open `src/scripts.js`.
2.  Find the line with the `fetch` call.
3.  Change `mohdazlanabas` to the desired GitHub username.

    ```javascript
    // Before
    const res = await fetch('https://api.github.com/users/mohdazlanabas/repos?per_page=100&sort=updated');

    // After
    const res = await fetch('https://api.github.com/users/your-new-username/repos?per_page=100&sort=updated');
    ```

### Styling
The visual theme (colors, fonts, spacing) is controlled by CSS custom properties at the top of styles/styles.css. You can easily change the site's look and feel by modifying these variables.

```css
:root {
    --bg: #0B1220;
    --card: #0E1726;
    --ink: #E6F0FF;
    --muted: #A9C1E3;
    --brand: #0D47A1;
    /* ... and so on */
}
```
