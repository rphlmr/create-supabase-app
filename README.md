# Welcome to Create Supabase App 👁⚡️👁

[Supabase](https://supabase.com/) is an open source Firebase alternative.

This terminal application aims to help new developers to quickly create ready to play applications, powered by Supabase.

> It do not replace [Supabase CLI](https://supabase.com/docs/guides/cli)

## Pick a starter project & start playing with Supabase!

> 🚨 This is still an **alpha** and could be **unstable**
> 21/08/2022 : not tested on Windows & Linux. Planned to be tested asap.

```sh
npx create-supabase-app@latest # Not yet available 🙃
```

## Future

Known issues:

- [ ] Fix color theme (solarized dark don't work well)
- [ ] UI glitches (maybe it's not solvable)
- [ ] Not responsive 😂 (and probably never)

I plan to add more features and improve the experience (order is subjective) :

- [ ] Add Next.js templates
- [ ] Add more examples with Supabase (edge functions, realtime, magic link auth)
- [ ] Add a no ui mode and support args
- [ ] Add an option to create a local project with Supabase CLI (more advanced use case)
- [ ] Add tooling to generate base templates (like replicating Auth module without copy/paste)
- [ ] Add support to run an init script located in `supabase.init`
- [ ] Add a way to test a template locally (to help people create new templates)
- [ ] Add documentation to how create a template
- [ ] Why not Expo examples ?

## Make your own CLI app!

To make what I wanted to do, I created a naive implementation of React Router / React Navigation.
You can reuse it and improve it to quickly create your own CLI app.

## Credits

The template system / idea comes from [Remix](https://github.com/remix-run/remix) `create-remix` (credits in the source code)

The whole project relies on [Ink](https://github.com/vadimdemedes/ink) and :

- [ink-big-text](https://github.com/sindresorhus/ink-big-text)
- [ink-gradient](https://github.com/sindresorhus/ink-gradient)
- [ink-select-input](https://github.com/vadimdemedes/ink-select-input)
- [ink-spinner](https://github.com/vadimdemedes/ink-spinner)
- [ink-text-input](https://github.com/vadimdemedes/ink-text-input)

Thnaks to [@vadimdemedes](https://github.com/vadimdemedes) and [@sindresorhus](https://github.com/sindresorhus) for the great work!

[React Router](https://reactrouter.com/) for the routing system that inspired me.

[React Navigation](https://reactnavigation.org/) for the navigation system that I try to mimic.
