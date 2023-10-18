var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import rgb from "barecolor";
export default function baretest(headline) {
    const suite = [], beforeEach = [], beforeAll = [], afterEach = [], afterAll = [], only = [];
    function self(name, fn) {
        suite.push({ name: name, fn: fn });
    }
    self.only = function (name, fn) {
        only.push({ name: name, fn: fn });
    };
    self.beforeEach = function (fn) {
        beforeEach.push(fn);
    };
    self.beforeAll = function (fn) {
        beforeAll.push(fn);
    };
    self.afterEach = function (fn) {
        afterEach.push(fn);
    };
    self.afterAll = function (fn) {
        afterAll.push(fn);
    };
    self.skip = function (fn) {
        console.log("Skipping: " + fn.name);
    };
    self.run = function () {
        return __awaiter(this, void 0, void 0, function* () {
            const tests = only[0] ? only : suite;
            rgb.cyan(headline + " ");
            try {
                for (const fn of beforeAll)
                    yield fn();
            }
            catch (e) {
                for (const fn of afterAll)
                    yield fn();
                prettyError(e);
                return false;
            }
            for (const test of tests) {
                try {
                    for (const fn of beforeEach)
                        yield fn();
                    yield test.fn();
                    rgb.gray("• ");
                }
                catch (e) {
                    for (const fn of afterAll)
                        yield fn();
                    rgb.red(`\n\n! ${test.name} \n\n`);
                    prettyError(e);
                    return false;
                }
                finally {
                    for (const fn of afterEach) {
                        try {
                            yield fn();
                        }
                        catch (e) {
                            prettyError(e);
                        }
                    }
                }
            }
            for (const fn of afterAll) {
                try {
                    yield fn();
                }
                catch (e) {
                    prettyError(e);
                }
            }
            rgb.greenln(`✓ ${tests.length}`);
            console.info("\n");
            return true;
        });
    };
    return self;
}
function prettyError(e) {
    const msg = e instanceof Error ? e.stack : null;
    if (!msg)
        return rgb.yellow(e);
    const i = msg.indexOf("\n");
    rgb.yellowln(msg.slice(0, i));
    rgb.gray(msg.slice(i));
}
//# sourceMappingURL=baretest.js.map