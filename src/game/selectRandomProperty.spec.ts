import selectRandomProperty from "./selectRandomProperty";

describe("selectRandomProperty", () => {
    it('should return the string "age"', () => {
        const originalRandom = global.Math.random;
        global.Math.random = jest.fn().mockReturnValue(0.41);

        const result = selectRandomProperty();

        expect(result).toBe("age");

        expect(global.Math.random).toHaveBeenCalled();
        global.Math.random = originalRandom;
    });
});