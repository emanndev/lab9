# Invoice Management App

A responsive Angular application for managing invoices, supporting invoice creation, editing, deletion, status updates, filtering, theme toggling, and local storage persistence.

## This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.14

## 🚀 Project Description

This project provides a modern UI for managing invoices. Users can view a list of invoices, filter by status, add new invoices, edit existing ones, and switch between light and dark themes. It is built using Angular with SCSS for styling and uses local storage for data persistence.

---

## ⚙️ Setup & Run Instructions

### Prerequisites

- Node.js >= 16
- Angular CLI installed globally: `npm install -g @angular/cli`

## Clone the repository

git clone [repository-url]
cd invoice-app

## Install dependencies

npm install

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## ✨ Application Features

- Invoice creation, editing, deletion
- Dark/Light theme toggle
- Fully responsive UI (mobile, tablet, desktop)
- Editable and dynamic item list form section
- Route-based navigation
- Scrollable edit modal with blur overlay
- Form validations
- LocalStorage-based persistence
- Filtering by status (Paid, Pending, Draft)

---

## 🧩 Component Structure

- `AppComponent` – Main layout including the sidebar, theme toggle, and routing
- `InvoiceListComponent` – Displays invoices list with filtering and navigation
- `InvoiceDetailsComponent` – Detailed view of a specific invoice
- `EditInvoiceFormComponent` – For editing invoices
- `NewInvoiceComponent` – For adding new invoices

## 🧭 Routing Overview

| Route                | Component                 | Description                       |
| -------------------- | ------------------------- | --------------------------------- |
| `/`                  | Redirect                  | Redirects to `/invoices`          |
| `/invoices`          | `InvoiceListComponent`    | Displays all invoices             |
| `/invoices/new`      | `NewInvoiceComponent`     | Form to create a new invoice      |
| `/invoices/:id`      | `InvoiceDetailsComponent` | Detailed view of selected invoice |
| `/invoices/:id/edit` | `EditInvoiceComponent`    | Edit form shown as modal          |

---

## 🧾 Form Implementation

- Reactive Forms are used throughout.
- `FormArray` for dynamic `items` list.
- Scrollable edit form panel.
- Field validation.

---

## 🔁 Git Workflow

1. **Feature Branching**:

````bash
git checkout -b feature/your-feature


2. **Commit Often**:

```bash
git add .
git commit -m "feat: add invoice filter dropdown"
````

1. **Push and PR**:

   ```bash
   git push origin feature/your-feature
   # Open a pull request from GitHub
   ```

1. **Merge to Production**:

   - Always test on `development` branch first.
   - After approval, merge `development` into `production`.

## 📦 Extras

- `localStorage` for persisting invoice changes
- Responsive scrollable modals using pure CSS
- SCSS theming with variables for light/dark modes

---

## License

No License
