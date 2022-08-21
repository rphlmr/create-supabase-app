# Create Supabase App - Remix Basic Template

Learn more about [Remix](https://remix.run/).


## What's in this template

- Production-ready [Supabase Database](https://supabase.com/)
- Email/Password Authentication with [cookie-based sessions](https://remix.run/docs/en/v1/api/remix#createcookiesessionstorage)
- Forms Schema (client and server sides !) validation with [Remix Params Helper](https://github.com/kiliman/remix-params-helper)
- Styling with [Tailwind](https://tailwindcss.com/)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)


## Development

- Start dev server:

  ```sh
  npm run dev
  ```

This starts your app in development mode, rebuilding assets on file changes.


### Relevant code:

This is a blank app with Supabase and Remix. The main functionality is creating users, logging in and out (handling access and refresh tokens + refresh on expire).

- auth / session [./app/modules/auth](./app/modules/auth)
