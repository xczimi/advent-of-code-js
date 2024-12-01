Here is a simple `README.md` file for your project:

```markdown
# Advent of Code JavaScript Solutions

This repository contains solutions for the Advent of Code challenges implemented in JavaScript.

## Project Structure

- `2023/` - Solutions for the year 2023
- `2024/` - Solutions for the year 2024
- `utils.js` - Utility functions to fetch the puzzle the input, and parse samples

## Getting Started

### Prerequisites

- Node.js (version specified in `.nvmrc`)
- Yarn package manager
- AOC session cookie in environment variable `AOC_SESSION`

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/xczimi/aoc-js.git
    cd aoc-js
    ```

2. Install dependencies:
    ```sh
    yarn install
    ```

### Running Tests

To run all tests:
```sh
yarn test
```

To run tests for a specific year (e.g., 2024):
```sh
yarn test:2024
```

## GitHub Actions

This project uses GitHub Actions for continuous integration. The workflow is defined in `.github/workflows/build.yml`.

## License

This project is licensed under the MIT License.
```

This `README.md` file provides an overview of the project, instructions for setting up the development environment, and information on running tests and continuous integration.
