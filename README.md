<div align="center">
    <img 
        alt="Martial artist doing a flying kick in the air" 
        src="logo.png" 
        width="160px"
    />
</div>

<h1 align="center">
    Gitkundo
</h1>

An all-in-one, full-stack TypeScript development environment: 

✅ One language.<br/>
✅ One integrated terminal.<br/>
✅ One integrated browser.<br/>
✅ One repo... 

All in one window! ✨

## Screenshot

<div align="center">
<img
    alt="an all-in-one, full-stack TypeScript development environment"
    src="./docs/screenshot.png"
    />
</div>

[Learn more about this workspace setup and its capabilities](https://nx.dev/nx-api/js?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Getting Started

### 1. Clone repo
```sh
git clone git@github.com:pjnalls/gitkundo.git
```

### 2. Install dependencies
```sh
npm install
```

### 3. Add a `.env` file and variables at `./`
```
API_PORT=3333
DATABASE_PORT=5432
DATABASE_NAME=gitkundo_db
DATABASE_USERNAME=janedoe
DATABASE_PASSWORD=passwordexample123
BROWSER=none
```

### 4. `CREATE DATABASE gitkundo_db` in PostgreSQL

### 5. Create tables inside of `gitkundo_db`

```sh
psql -U <username> -d gitkundo_db -f /create_gitkundo_db.sql
```

### 6. Run app, API, and database all in the same terminal instance

```sh
npm run serve:all
```

### 7. Open a simple browser if you're using VSCode

**a.** Open the Command Palette by pressing `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS).

**b.** Type "Simple Browser" and select "Simple Browser: Show" from the options.

**c.** Enter the URL you wish to open (e.g., http://localhost:8081) and press Enter. The web page will then render within a new tab in your VS Code editor area. 

## Generate a library

```sh
npx nx g @nx/js:lib packages/pkg1 --publishable --importPath=@my-org/pkg1
```

## Run tasks

To build the library use:

```sh
npx nx build pkg1
```

To run any task with Nx use:

```sh
npx nx <target> <project-name>
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Versioning and releasing

To version and release the library use

```
npx nx release
```

Pass `--dry-run` to see what would happen without actually releasing the library.

[Learn more about Nx release &raquo;](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Keep TypeScript project references up to date

Nx automatically updates TypeScript [project references](https://www.typescriptlang.org/docs/handbook/project-references.html) in `tsconfig.json` files to ensure they remain accurate based on your project dependencies (`import` or `require` statements). This sync is automatically done when running tasks such as `build` or `typecheck`, which require updated references to function correctly.

To manually trigger the process to sync the project graph dependencies information to the TypeScript project references, run the following command:

```sh
npx nx sync
```

You can enforce that the TypeScript project references are always in the correct state when running in CI by adding a step to your CI job configuration that runs the following command:

```sh
npx nx sync:check
```

[Learn more about nx sync](https://nx.dev/reference/nx-commands#sync)

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/nx-api/js?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:

- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
