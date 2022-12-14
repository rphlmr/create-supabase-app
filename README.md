# Welcome to Create Supabase App 👁⚡️👁

![create-supabase-app](https://user-images.githubusercontent.com/20722140/186226036-c1a91274-1e2d-4a40-9164-f41d430942ee.png)

[Supabase](https://supabase.com/) is an open-source Firebase alternative.

This terminal application aims to help new developers quickly create ready-to-play applications, powered by Supabase.

> It doesn't replace [Supabase CLI](https://supabase.com/docs/guides/cli)

## Pick a starter project & start playing with Supabase!

> 🚨 This is still an **alpha** and could be **unstable**

```sh
npx create-supabase-app@latest
```

## Future

Known issues:

- [x] UI glitches on macOS & Linux (solved by changing title font and removing gradients 🥲)
- [ ] Fix color theme (solarized dark doesn't work well)
- [ ] Windows with WSL 2, glitches with some Terminal, glitches when screen rerender (Ink know issue)
- [ ] Not responsive 😂 (and probably never)

I plan to add more features and improve the experience (order is subjective) :

- [ ] Add Next.js templates
- [ ] Add more examples with Supabase (edge functions, realtime, ...)
- [ ] Add a no UI mode and support args
- [ ] Add an option to create a local project with Supabase CLI (a more advanced use case)
- [ ] Add tooling to generate base templates (like replicating Auth module without copy/paste)
- [ ] Add support to run an init script located in `supabase.init`
- [ ] Add a way to test a template locally (to help people create new templates)
- [ ] Add documentation on how to create a template
- [ ] Why not Expo examples?

## Make your own CLI app!

To make what I wanted to do, I created a naive implementation of React Router / React Navigation.
You can reuse it and improve it to quickly create your own CLI app.

## Credits

The workflow comes from retro engineering of [Supabase CLI](https://github.com/supabase/cli)

The template system/idea comes from [Remix](https://github.com/remix-run/remix) `create-remix` (credits in the source code)

The whole project relies on [Ink](https://github.com/vadimdemedes/ink) and :

- [ink-big-text](https://github.com/sindresorhus/ink-big-text)
- [ink-gradient](https://github.com/sindresorhus/ink-gradient)
- [ink-select-input](https://github.com/vadimdemedes/ink-select-input)
- [ink-spinner](https://github.com/vadimdemedes/ink-spinner)
- [ink-text-input](https://github.com/vadimdemedes/ink-text-input)

Thanks to [@vadimdemedes](https://github.com/vadimdemedes) and [@sindresorhus](https://github.com/sindresorhus) for the great work!

[React Router](https://reactrouter.com/) for the routing system that inspired me.

[React Navigation](https://reactnavigation.org/) for the navigation system that I try to mimic.
