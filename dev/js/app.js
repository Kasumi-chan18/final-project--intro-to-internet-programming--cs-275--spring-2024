// Development track only
const generateMatrix = (size) => {
    const matrix = [];
    for (let i = 0; i < size; i++) {
        matrix[i] = [];
        for (let j = 0; j < size; j++) {
            matrix[i][j] = (i * size) + j + 1;
        }
    }
    return matrix;
};

const printMatrix = (matrix, containerId) => {
    const container = document.getElementById(containerId);
    container.innerHTML = ``; // Clear previous content
    matrix.forEach(row => {
        const rowElem = document.createElement(`div`);
        rowElem.textContent = row.join(` `);
        container.appendChild(rowElem);
    });
};

const reverseMatrix = (matrix) => {
    const reversed = [];
    for (let i = matrix.length - 1; i >= 0; i--) {
        reversed.push(matrix[i].slice().reverse());
    }
    return reversed;
};

const getMatrixSize = () => {
    return new Promise((resolve, reject) => {
        const size = parseInt(window.prompt(`Enter the size of the matrix:`));
        if (Number.isNaN(size) || size < 2) {
            // eslint-disable-next-line max-len
            reject(new Error(`Invalid input. Size must be an integer greater than 1.`));
        } else {
            resolve(size);
        }
    });
};

const main = async () => {
    try {
        const size = await getMatrixSize();
        const matrix = generateMatrix(size);
        printMatrix(matrix, `matrix-display`);
        const reversedMatrix = reverseMatrix(matrix);
        printMatrix(reversedMatrix, `reversed-matrix-display`);
    } catch (error) {
        console.error(error.message);
    }
};

document.getElementById(`generate-matrix`).addEventListener(`click`, main);
