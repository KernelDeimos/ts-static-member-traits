import { expect, test } from 'vitest';
import { as_trait, TraitType } from './traits';


// Trait definition
const HelloTrait = Symbol('HelloTrait');
interface IHello {
    hello (subject?: string): string
}
declare module './traits' {
    interface Traits {
        [HelloTrait]: IHello
    }
}

// Trait implementation
class ExampleClass {
    [HelloTrait]: TraitType<IHello, this> = {
        hello (subject?: string): string {
            subject = subject ?? 'World';
            return `Hello, ${subject}!`;
        }
    }
}

test('example', () => {
    const example = new ExampleClass();
    const hello = as_trait(example, HelloTrait);
    expect(hello?.hello()).to.equal('Hello, World!');
})