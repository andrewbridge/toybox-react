# toybox-react

A demonstration repo to build a React like vDOM framework from scratch with a class component first approach (a la React <16).

## Usage

The repository has been built with detailed commit messages describing what each commit changes and why.

Key commits have been tagged appropriately to make timeline navigation easier, but they can also be reached from the contents table below.

| Key commits |
|-------------|
| [0. Initial commit](https://github.com/andrewbridge/toybox-react/commit/1c0dbc83371f84ce13d7ad60a99a5f6cf96afa56) |
| [1. Development environment](https://github.com/andrewbridge/toybox-react/commit/3a5e7020c3ff1636456a3a17b935df9a75907e6c) |
| [2. Use javascript for rendering](https://github.com/andrewbridge/toybox-react/commit/5da9bd983a53c05129c60ebaa0a1e1128afe8858) |
| [3. Add a counter UI](https://github.com/andrewbridge/toybox-react/commit/dc1a89a2c1cbc59a506dc3c3d8db545e96bcb3b5) |
| [4. Refactor imperative code](https://github.com/andrewbridge/toybox-react/commit/00da51ad2702f5b7394171656bb75c7a1fae3a59) |
| [5. Add event listener support](https://github.com/andrewbridge/toybox-react/commit/a4d14b5cdd79ee98cd3db4029f62d28a42c26410) |
| [6. Add a Component class](https://github.com/andrewbridge/toybox-react/commit/34b385dc3e9ee6fe63811bec820033212ab92005) |
| [7. Demo: Two counters](https://github.com/andrewbridge/toybox-react/commit/a433c2f841b3935f90abce9f62e0723d8d0a1c2e) |
| [8. createElement with a Component](https://github.com/andrewbridge/toybox-react/commit/278f59672336c53a0fb97a84e4066b87a5ed74cf) |
| [9. Function components](https://github.com/andrewbridge/toybox-react/commit/ff697ba91f64c341f9e268362c967d8b647165a4) |
| [10. Nested elements](https://github.com/andrewbridge/toybox-react/commit/12d0c0552600759f163f3277c4118fba138b0edb) |
| [11. Reorganise code](https://github.com/andrewbridge/toybox-react/commit/d52bd0b4b859af57388e55ab43702c7d4f1ae5cb) |
| [12. Introduce JSX](https://github.com/andrewbridge/toybox-react/commit/07e2e5f37be3177b8dd00e4e5483cdd125fef630) |
| [13. Support primitive children](https://github.com/andrewbridge/toybox-react/commit/43bef20a37ee69be3b1beaf91eafc96555f68207) |
| [14. Add a toggle UI](https://github.com/andrewbridge/toybox-react/commit/3bc0518e0b8c8ea22f6396c9ae94899e2a967fbf) |
| [15. Introduce virtual DOM](https://github.com/andrewbridge/toybox-react/commit/659fe22a7aa60f4a1998fc7dd6e2a50638c91987) |
| [16. Support primitive vDOM node](https://github.com/andrewbridge/toybox-react/commit/d399aed101c7b8452b111bbee4c2e973acdf802a) |
| [17. Split library code](https://github.com/andrewbridge/toybox-react/commit/4c154592b46543967506c9fb4c2080dc96434113) |
| [18. Render a vDOM node](https://github.com/andrewbridge/toybox-react/commit/a41552d44b6be390c88a0eec6595ea2c60a64be8) |
| [19. Introduce reconciliation](https://github.com/andrewbridge/toybox-react/commit/e3dd7d2be93b08a14a3b237e7d33a8a3ad019001) |
| [20. Demo: Reconciliation](https://github.com/andrewbridge/toybox-react/commit/e7d8e53a9709f32be3022d0ae0036677a5cfa921) |
| [21. Support Component reconciliation](https://github.com/andrewbridge/toybox-react/commit/f9d43216a7e31d551ce78739ee36ba31bc30962e) |
| [22. Add setState](https://github.com/andrewbridge/toybox-react/commit/381b6c46dfdb6a65e0971c81634814a5c0d5ab72) |
| [23. Add lifecycle methods](https://github.com/andrewbridge/toybox-react/commit/6fe1146e4462e6aee1c5b53d1b000cc5851e26f5) |
| [24. Re-use DOM elements](https://github.com/andrewbridge/toybox-react/commit/cbd3d560cea357f0d13954ff7f26da277fdcc4ec) |
| [25. Children reconciliation](https://github.com/andrewbridge/toybox-react/commit/cbce2f797623a2927ae75a544d911fd067fb5804) |

### Running the codebase

You can follow along and play with each commit. For simplicity, the codebase uses [Parcel](https://parceljs.org/). Download the repository then run:

```bash
npm install
npm run start
```

The page will be served on http://localhost:1234/.

## Motivation

This kind of project has been done many times before, notably:

- [Rodrigo Pombo's class era blog series](https://engineering.hexacta.com/didact-learning-how-react-works-by-building-it-from-scratch-51007984e5c5)
- [Rodrigo Pombo's very slick hook era article](https://pomb.us/build-your-own-react/)
- [Ameer Jhan's "React in 90 lines" article](https://dev.to/ameerthehacker/build-your-own-react-in-90-lines-of-javascript-1je2)

This repository borrows _heavily_ from each of these articles and I'm incredibly grateful for their work. However, they each come from a starting point of understanding what the virtual DOM is and why you would want to use it in the first place.

I instead approached the problem as a web developer from circa 2010: content with their vanilla DOM API and jQuery calls and frustrated by the need for another library. The first two thirds of the commits above don't implement any virtual DOM concepts at all, and take a naïve approach at trying to fix the problem through refactoring and encapsulation. JSX is introduced as a completely separate construct, something which is often misleadingly lumped in as a "React thing".

In doing so, each change has a clear need, and nearly every commit renders something on the screen which dramatically improved my (and I hope your) understanding of how these DOM libraries work.

### Why class based components in 2023

Given that hooks are now a widely used pattern in React and many other DOM libraries, it could seem counter-intuitive to learn the inner workings of what some would consider an "archaic" concept in React.

However, hooks are an additional construct on top of all the others which React has introduced over the years. When they were first released into the library, many developers found them difficult to understand. Coming from the 2010 web developer perspective, it seemed far simpler to integrate a known entity like a class in my first iteration (which is probably _exactly_ why they were initially used by React).

Much of my work still also relies on class components, regardless of what the new wisdom says, understanding these directly benefits my day to day work.

That doesn't mean I won't continue to iterate and "upgrade" toybox-react with Hook support in the future.

## Todo

While the [Children reconciliation](https://github.com/andrewbridge/toybox-react/commit/cbce2f797623a2927ae75a544d911fd067fb5804) commit completes the library in theory, there are already known bugs:

- The `componentWillUnmount` lifecycle hook won't fire for class Components which are removed by their parents
- The `componentWillUnmount` lifecycle hook won't fire for nested class Components when an ancestor class Component is removed
- Data attributes aren't recognised
- A hideous amount of memory leaking practices here
    - No event listener removal
    - Copying and passing objects from previous render states around without considering performance impact
- As stated in the commit description, the property update method implemented in [24. Re-use DOM elements](https://github.com/andrewbridge/toybox-react/commit/cbd3d560cea357f0d13954ff7f26da277fdcc4ec) is entirely inefficient

Given the toy nature of this project, it's unlikely these will ever be fixed.

As discussed above, the lack of hooks, concurrency, fibers and more makes this project seem slightly outdated. That's on purpose, but it doesn't mean this won't change in the future. If I have the time and will, I will likely branch or fork off this repo and continue bringing toybox-react into the 2020s.
