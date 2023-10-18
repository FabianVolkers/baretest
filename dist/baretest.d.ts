export default function baretest(headline: string): {
    (name: string, fn: () => void): void;
    only(name: string, fn: () => void): void;
    beforeEach(fn: () => void): void;
    beforeAll(fn: () => void): void;
    afterEach(fn: () => void): void;
    afterAll(fn: () => void): void;
    skip(fn: () => void): void;
    run(): Promise<boolean>;
};
//# sourceMappingURL=baretest.d.ts.map