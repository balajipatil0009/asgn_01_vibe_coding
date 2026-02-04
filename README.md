# Lead Management Application

A full-stack Next.js application designed to manage leads efficiently. It fetches users from a mock API, allows users to attach persistent notes, and generates AI-powered summaries for those notes.

## 🚀 Features

-   **Fetch Leads**: Targeted retrieval of user data (Name, Email, Phone) from [JSONPlaceholder](https://jsonplaceholder.typicode.com/).
-   **Notes System**: Add and edit notes for each specific lead.
-   **Data Persistence**: Custom lightweight JSON-based storage system (`data/notes.json`).
-   **AI Summaries**:  Integrated with Google's **Gemini 2.5 Flash Lite** model to generate concise summaries of user notes.
-   **Responsive Design**: Modern UI built with Tailwind CSS.

## 🛠 Tech Stack

-   **Framework**: Next.js 15 (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **Testing**: Jest + React Testing Library

## ⚙️ Key Optimizations & Best Practices

During development, we focused on performance and reliability:
1.  **Asynchronous I/O**: The database layer (`lib/db.ts`) uses `fs/promises` to ensure non-blocking file operations, adhering to Node.js best practices.
2.  **Architecture**: Clean separation of concerns with a dedicated service layer for data consistency.
3.  **Testing**:
    -   **Unit Tests**: Verified database logic constraints.
    -   **Component Tests**: Ensured UI elements (Modals, Tables) render and interact correctly.

## 📥 Installation Guide

### Prerequisites
Ensure you have the following installed on your machine:
-   **Node.js**: v18.17.0 or higher (required for Next.js 15)
-   **npm**: v9.0.0 or higher (usually comes with Node.js)

### Setup Steps

1.  **Clone the Repository**
    ```bash
    git clone <repository_url>
    cd assgn_01
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```
    *This will install Next.js, React, Tailwind CSS, Jest, and other necessary packages.*

4.  **Configure Environment Variables**
    Create a `.env.local` file in the root directory and add your Gemini API Key:
    ```env
    GEMINI_API_KEY=your_api_key_here
    ```
    *Note: The project is configured to use the `gemini-2.5-flash-lite` model.*

## 🏃‍♂️ How to Run

1.  **Start the Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

2.  **Run Tests**
    To verify that everything is working correctly and best practices are met:
    ```bash
    npm test
    ```

## 📁 Project Structure

```bash
├── app/                  # Next.js App Router pages and API routes
├── components/           # Reusable UI components (LeadsTable, NoteModal)
├── data/                 # JSON persistence layer (notes.json automatically created here)
├── lib/                  # Shared utilities and database logic
├── __tests__/           # Unit and Component tests
└── public/               # Static assets
```