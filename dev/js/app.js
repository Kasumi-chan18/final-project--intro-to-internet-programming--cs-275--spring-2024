// Function to prompt user for matrix size
const promptMatrixSize = () => {
    return new Promise((resolve, reject) => {
      let size = parseInt(window.prompt('Enter the size of the matrix (greater than 1):'));

      if (isNaN(size) || size <= 1) {
        reject('Invalid input! Please enter an integer greater than 1.');
      } else {
        resolve(size);
      }
    });
  };

  // Function to create and print matrix
  const createAndPrintMatrix = (size) => {
    let matrix = [];
    let counter = 1;

    // Create the matrix
    for (let i = 0; i < size; i++) {
      matrix[i] = [];
      for (let j = 0; j < size; j++) {
        matrix[i][j] = counter++;
      }
    }

    // Print the matrix
    console.log('Original Matrix:');
    console.table(matrix);

    return matrix;
  };

  // Function to print matrix in reverse
  const printMatrixInReverse = (matrix) => {
    let reversedMatrix = [];

    // Reverse the matrix along the diagonal
    for (let i = 0; i < matrix.length; i++) {
      reversedMatrix[i] = [];
      for (let j = 0; j < matrix[i].length; j++) {
        reversedMatrix[i][j] = matrix[j][i];
      }
    }

    // Print the reversed matrix
    console.log('Reversed Matrix:');
    console.table(reversedMatrix);
  };

  // Main function
  const main = () => {
    promptMatrixSize()
      .then((size) => {
        let matrix = createAndPrintMatrix(size);
        printMatrixInReverse(matrix);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Run the main function
  main();
