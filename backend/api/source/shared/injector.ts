import {BasicEntity} from "@entity/basic-entity";

export function createFrom<T extends BasicEntity>(
    type: new () => T,
    source: any
): T {
    const data: T = injectFrom(new type(), source);
    return data;
}

export function injectFrom<T extends BasicEntity>(
    target: T,
    source: any
): T {
    Object.keys(source).forEach(key => {
        if (source[key] !== undefined) {
            target[key] = source[key];
        }
    });
    return target;
}
