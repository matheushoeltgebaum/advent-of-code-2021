const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './second-puzzle.input'), 'utf-8').split('\r\n');

const getCoordinates = (values) => {
    return { x: parseInt(values[0]), y: parseInt(values[1]) };
}

const calculateOverlappingPoints = (input) => {
    const points = [];

    for (let i = 0; i < input.length; i++) {
        let line = input[i];
        let firstCoordinate = getCoordinates(line.split(' -> ')[0].split(','));
        let secondCoordinate = getCoordinates(line.split(' -> ')[1].split(','));

        if (firstCoordinate.x === secondCoordinate.x) {
            let startIndex = Math.min(firstCoordinate.y, secondCoordinate.y);
            let finalIndex = Math.max(firstCoordinate.y, secondCoordinate.y);
            let currentX = firstCoordinate.x;

            for (let j = startIndex; j <= finalIndex; j++) {
                let currentPoint = { x: currentX, y: j, count: 1 };
                let existingPoint = points.find(p => p.x === currentPoint.x && p.y === currentPoint.y);
                if (existingPoint) {
                    existingPoint.count++;
                } else {
                    points.push(currentPoint);
                }
            }
        } else if (firstCoordinate.y === secondCoordinate.y) {
            let startIndex = Math.min(firstCoordinate.x, secondCoordinate.x);
            let finalIndex = Math.max(firstCoordinate.x, secondCoordinate.x);
            let currentY = firstCoordinate.y;

            for (let j = startIndex; j <= finalIndex; j++) {
                let currentPoint = { x: j, y: currentY, count: 1 };
                let existingPoint = points.find(p => p.x === currentPoint.x && p.y === currentPoint.y);
                if (existingPoint) {
                    existingPoint.count++;
                } else {
                    points.push(currentPoint);
                }
            }
        } else {
            let startIndex = 0;
            let finalIndex = 0;
            let currentY = 0;
            let incrementY = false;

            if (firstCoordinate.x < secondCoordinate.x) {
                startIndex = firstCoordinate.x;
                finalIndex = secondCoordinate.x;
                currentY = firstCoordinate.y;
                incrementY = (firstCoordinate.y < secondCoordinate.y);
            } else {
                startIndex = secondCoordinate.x;
                finalIndex = firstCoordinate.x;
                currentY = secondCoordinate.y;
                incrementY = (secondCoordinate.y < firstCoordinate.y);
            }

            for (let j = startIndex; j <= finalIndex; j++) {
                let currentPoint = { x: j, y: currentY, count: 1 };
                let existingPoint = points.find(p => p.x === currentPoint.x && p.y === currentPoint.y);
                if (existingPoint) {
                    existingPoint.count++;
                } else {
                    points.push(currentPoint);
                }

                if (incrementY) {
                    currentY++;
                } else {
                    currentY--;
                }
            }
        }
    }

    return points.filter(p => p.count > 1).length;
};

const overlappingPoints = calculateOverlappingPoints(input);
console.log(overlappingPoints);