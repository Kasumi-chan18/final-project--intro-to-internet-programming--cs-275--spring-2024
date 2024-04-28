/* eslint-disable max-len */
window.onload = () => {
    // Prompt user for the matrix size

    // Ensure input is a valid integer than 1
    const isValidInput = input => {
        const num = parseInt(input);
        return !isNaN(num) && num > 1;
    };

    // Recursive function to generate matrix
    const generateMatrix = (n, matrix = [], count = 1) => {
        if (n === 0) return matrix;

        const row = new Array(n).fill(0).map((_, i) => (i === n - count ? count++ : 0));
        matrix.push(row);

        return generateMatrix(n, matrix, count);
    };

    // Print matrix
    const printMatrix = matrix => {
        matrix.forEach(row => {
            console.log(row.join(` `));
        });
    };

    // Flipped matrix
    const flippedMatrix = matrix => {
        return matrix.map((row, rowIndex) => {
            return row.map((_, colIndex) => matrix[colIndex][rowIndex]).reverse();
        });
    };

    // Main logic
    const main = async () => {
        let userInput = prompt(`Enter the size of the matrix (greater than 1): `);

        // Ensure valid input
        while (!isValidInput(userInput)){
            userInput = prompt(`Invalid input! Please enter an integer greater than 1`);
        }

        const size = parseInt(userInput);
        const matrix = generateMatrix(size);

        console.log(`Original Matrix:`);
        printMatrix(matrix);

        console.log(`Flipped Matrix:`);
        printMatrix(flippedMatrix(matrix));
    };

    main();
};
