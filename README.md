# Traits in Typescript using Static Members

In all of it's glory... or not.

### Define a Trait

```ts
const HelloTrait = Symbol('HelloTrait');
interface IHello {
    hello (subject?: string): string
}
declare module 'ts-static-member-traits' {
    interface Traits {
        [HelloTrait]: IHello
    }
}
```

### Use a Trait

```ts
class ExampleClass {
    [HelloTrait]: TraitType<IHello, this> = {
        hello (subject?: string): string {
            subject = subject ?? 'World';
            return `Hello, ${subject}!`;
        }
    }
}

const example = new ExampleClass();
const hello = as_trait(example, HelloTrait);
expect(hello?.hello()).to.equal('Hello, World!');
```