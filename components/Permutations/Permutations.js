export let findPermutations = (string) => {
    if (!string || typeof string !== "string") {
        return "Please enter a string"
    } else if (string.length < 2) {
        return string
    }

    let permutationsSet = new Set();

    for (let i = 0; i < string.length; i++) {
        let char = string[i]

        let remainingChars = string.slice(0, i) + string.slice(i + 1, string.length)

        for (let permutation of findPermutations(remainingChars)) {
            permutationsSet.add(char + permutation)
        }
    }
    return permutationsSet
}

export function permute(nums) {
    let result = [];
    if (nums.length === 0) return [];
    if (nums.length === 1) return [nums];
    for (let i = 0; i < nums.length; i++) {
        const currentNum = nums[i];
        const remainingNums = nums.slice(0, i).concat(nums.slice(i + 1));
        const remainingNumsPermuted = permute(remainingNums);
        for (let j = 0; j < remainingNumsPermuted.length; j++) {
            const permutedArray = [currentNum].concat(remainingNumsPermuted[j]);
            result.push(permutedArray);
        }
    }
    return result;
}