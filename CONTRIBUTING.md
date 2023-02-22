# Contributing to the Makaira-App-Boilerplate-Next.js
To contribute to this repository please follow the following rules.

## Workflow recommendations

- Create a feature or fix branch for your changes that follows the naming scheme: `<feature|fix|chore>/<ticket-id>-<lower-case-short-topic-description>`
  - Examples: Add new dropdown component with ticket id MAKAIRA-1337 `feature/makaira-1337-add-dropdown-component`
- Use [semantic release commit messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716) in every commit that is part of the PR. If you need to add any WIP commits squash or rebase your branch.
- Create a PRs always with a meaningful title (and a short description that explains your changes briefly)

## Code Guidelines

- Components should be uncontrolled if possible
- Use SCSS and CSS-Modules
- Use TypeScript and don't use any as type
- Every component should get an own folder inside the `./src/components` folder
  - The SCSS-file must have the following naming scheme `<ComponentName>.module.scss`
  - The TSX-file must have the following naming scheme `<ComponentName>.tsx`
- Never import files relative and instead use the `@/components`, `@/pages`, etc. path mappings