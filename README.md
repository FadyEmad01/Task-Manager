# Project Management App (Demo)

A demo **Next.js + TypeScript + Tailwind CSS + shadcn/ui** project that shows a clean, scalable folder structure for a project & task management application.

---

## Git Basics for Team Collaboration

This project is developed by a team using **Git branches**. Below is a comprehensive beginner-friendly guide with example branch names like `fady`.

### 1. Clone the Repository

```bash
git clone <repository-url>
```

* **What it does:** Downloads the project from GitHub to your local machine.

### 2. Check Current Branch

```bash
git branch
```

* **What it does:** Lists all local branches and shows the current branch.

### 3. Create a New Branch (e.g., fady)

```bash
git checkout -b fady
```

* **What it does:** Creates a new branch named `fady` and switches to it.

### 4. Switch Between Branches

```bash
git checkout main     # Switch to main branch
git checkout fady     # Switch back to fady branch
```

### 5. Pull the Latest Changes from Remote

```bash
git pull origin main
```

* **What it does:** Updates your current branch with the latest code from the `main` branch.

### 6. Stage and Commit Changes

```bash
git add .
git commit -m "Added new feature in fady branch"
```

* **What it does:** Stages all changed files and saves them with a commit message.

### 7. Push Changes to Remote Branch

```bash
git push origin fady
```

* **What it does:** Uploads your local `fady` branch and its commits to the remote repository.

### 8. Merge Your Branch into Main

There are two ways:

* **Via GitHub Pull Request:** Open a PR from `fady` into `main` and let the team review and merge.
* **Via Command Line:**

```bash
git checkout main
git pull origin main     # Ensure main is up-to-date
git merge fady           # Merge fady into main
git push origin main     # Push the merged code to remote main
```

### 9. Delete a Branch (if no longer needed)

```bash
git branch -d fady       # Delete local branch
```

```bash
git push origin --delete fady   # Delete remote branch
```

### 10. View All Branches and Logs

```bash
git branch -a      # List all branches (local & remote)
git log --oneline  # View commit history
```

---

## Project Structure

Below is the project structure with descriptions.

```text
src/
 ├── app/
 │    ├── layout.tsx          // ...
 │    ├── page.tsx            // Landing or dashboard page ...
 │    ├── auth/
 │    │    ├── login/page.tsx // ...
 │    │    ├── register/page.tsx // ...
 │    ├── projects/
 │    │    ├── page.tsx       // Project list ...
 │    │    ├── [id]/page.tsx  // Single project details ...
 │    └── dashboard/
 │         └── page.tsx       // User dashboard ...
 │         ...
 │
 ├── components/
 │    ├── ui/                 // Shadcn components ...
 │    ├── layout/             // Navbar, Sidebar ...
 │    ├── auth/               // Login & Register components ...
 │    ├── project/            // Project cards, Task cards ...
 │    ...
 │
 ├── constants/
 │    ├── users.ts            // Static users ...
 │    ├── projects.ts         // Static projects ...
 │    ├── tasks.ts            // Static tasks ...
 │    ...
 │
 ├── lib/
 │    ├── api/                // API logic ...
 │    └── utils.ts            // Helper functions ...
 │    ...
 │
 ├── types/
 │    ├── user.ts             // User interface ...
 │    ├── project.ts          // Project interface ...
 │    ├── task.ts             // Task interface ...
 │    ...
 │
 ├── styles/
 │    └── globals.css         // ...
 │    ...
 └── ...
```

---

## Next Steps

* Use the Git commands above for daily development.
* Always pull the latest changes before starting new work.
* Create a new branch (e.g., `fady`) for each feature or bug fix.
* Follow the structure to add features in the correct folders.
