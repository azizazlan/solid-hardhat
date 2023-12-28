# Solid-Hardhat

My personal notes to create Hardhat and SolidJS projects.

## Steps to create this project.

1. Create an empty directory, for example called `solid-hardhat`.
2. `npm init`
3. `npm install --save-dev hardhat`
4. `npx hardhat init`
5. Create SolidJS frontend app:

   `npm create vite@latest frontend -- --template solid-ts`

6. Add line `frontend/node_modules` in `.gitignore`.
7. Change into `frontend` and run the following command:
    
    `
    npm install --save-dev eslint eslint-plugin-solid @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier prettier
    `
8. `npm init @eslint/config`
    >To check syntax and find problems
    
    >JavaScript modules (import/export)
    
    >None of these
    
    >Does your project use TypeScript? › Yes
    
    >Browser
    
    >JavaScript

9. Add the following lines in the `hardhat.config.ts` file:

    ```
    paths: {
      artifacts: "./frontend/src/assets/artifacts",
    },
    ```