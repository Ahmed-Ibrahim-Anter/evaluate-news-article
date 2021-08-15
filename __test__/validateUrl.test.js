import { validateUrl } from "../src/client/js/checkURL";

describe('Testing validation of  User URL', () => {
   it('The resault should no be undefinde ', () => {
        expect(validateUrl()).toBeDefined
    });
});