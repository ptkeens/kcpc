# KCPC

## Setup

### Prerequisites

-   [Bun](https://bun.sh/) - JavaScript runtime and package manager
-   [Homebrew](https://brew.sh/) - Package manager for macOS

### Installation

1. Install dependencies with Homebrew:

    ```bash
    brew bundle
    ```

    This will install PostgreSQL and other required tools.

2. Install project dependencies:

    ```bash
    bun install
    ```

3. Setup the database:

    ```bash
    bun db:migrate
    bun db:seed
    ```

4. Start the development server:
    ```bash
    bun dev
    ```
