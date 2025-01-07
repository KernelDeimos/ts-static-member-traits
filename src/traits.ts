export interface Traits {}

type Spread<A, B> = {
    [K in Exclude<keyof A, keyof B>]: A[K]
} & B;

// export type TraitType<T, U> = T & ThisType<U>;
export type TraitType<T, U> = Spread<T, ThisType<U>>;

export const as_trait = <T extends keyof Traits>(o_: object, symbol: T): Traits[T] | undefined => {
    if ( ! o_.hasOwnProperty(symbol) ) {
        return undefined;
    }

    const o = o_ as { [key: symbol]: object };
    const impl = Object.create(o);
    Object.assign(impl, o[symbol]);
    const descriptors = Object.getOwnPropertyDescriptors(o[symbol]);
    for ( const descriptor of Object.values(descriptors) ) {
        if ( typeof descriptor.get === 'function' ) {
            descriptor.get = descriptor.get.bind(o);
        }
        if ( typeof descriptor.set === 'function' ) {
            descriptor.set = descriptor.set.bind(o);
        }
        if ( typeof descriptor.value === 'function' ) {
            descriptor.value = descriptor.value.bind(o);
        }
    }
    Object.defineProperties(impl, descriptors);
    return impl;
};

export type HasTrait<T extends keyof Traits> = {
    [key in T]: TraitType<Traits[key], any>
}
