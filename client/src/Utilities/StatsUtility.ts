export default class StatsUtilityUtility {

    public static mean(nums: number[]): number {
        return (nums.reduce((a,b) =>  a + b) / nums.length);
    }

    public static median(nums: number[]): number {
        const mid = Math.floor(nums.length / 2);
        const numbers = nums.sort((a, b) => a - b);

        return (numbers.length % 2 !== 0 ? numbers[mid] : (numbers[mid - 1] + numbers[mid]) / 2);
    }

    public static mode(numbers: number[]): number {
        let modes: number[] = [];
        let count: number[] = [];
        let i, number, maxIndex = 0;

        for (i = 0; i < numbers.length; i += 1) {
            number = numbers[i];
            count[number] = (count[number] || 0) + 1;
            if (count[number] > maxIndex) {
                maxIndex = count[number];
            }
        }

        for (i in count)
            if (count.hasOwnProperty(i)) {
                if (count[i] === maxIndex) {
                    modes.push(Number(i));
                }
            }
        return modes.reduce((a,b) => a + b);
    }

    public static standardDeviation(numbers: number[]): number {
        let mean = this.mean(numbers);

        return Math.sqrt(numbers.reduce( (sq, n) => {
            return sq + Math.pow(n - mean, 2);
        }, 0) / (numbers.length - 1));

    }
}