// Require the lib, get a working terminal
var term = require( 'terminal-kit' ).terminal ;

term.clear()
term.setCursorColor(term.color)
var rows = term.height
var cols = term.width

var delay = 750
var randomspawn = 0.0

// initialize the world
var world = initializeWorld();

setInterval( () => {
   
    world = updateWorld(world)
    drawWorld(world)

}, delay)

function createWorld()
{
    let world = new Array(rows)
    for(i = 0; i < rows; i++) {
        world[i] = new Array(cols)
    }
    return world
}


function initializeWorld(world) {
    var world = createWorld()
    for(row = 0; row < rows; row = row+1) {
        for(col = 0; col < cols; col++) {
            
            if(Math.random() < 0.5) {
                world[row][col] = '*'
            }
            else {
                world[row][col] = ' '
            }
        }
    }
    return world
}

function drawWorld(world) {
    for(row = 0; row < rows; row = row+1) {
        for(col = 0; col < cols; col++) {
            term.moveTo(col,row, world[row][col])
        }
    }
}

function updateWorld(world) {
    var newWorld = createWorld()
    for(row = 0; row < rows; row = row+1) {
        for(col = 0; col < cols; col++) {
            count = countNeighbors(world,row,col)
            if(world[row][col] == '*') {
                if(count < 2)
                {
                    // less than 2 neighbors, cell dies of lonliness
                    newWorld[row][col] = ' '
                } else if(count == 2 || count == 3) {
                    // exactly 2 or 3 neighbors, cell lives
                    newWorld[row][col] = '*'
                }
                else {
                    // 3+ neighbords dies of overpopulation
                    newWorld[row][col] = ' '
                }
            } else {
                // dead cell
                if(count == 3) {
                    // with 3 neighbors, the cell comes to life, they breed!
                    newWorld[row][col] = '*'
                } else if(Math.random() < randomspawn) {
                    // spontaneous life!
                    newWorld[row][col] = '*'
                } else {                    
                    // leave it dead
                    newWorld[row][col] = ' '
                }
            }

        }
    }
    return newWorld
}

function countNeighbors(world, row, col) {
    count = 0
    for(r = -1; r <= 1; r++) {
        for(c = -1; c <=1; c++) {
            if(row + r < 0 || row + r >= rows || col + c < 0 || col + c >= cols) {
                continue
            } else {
                if(world[row + r][col + c] != ' ') {
                    count++
                }
            }
        }
    }
    return count
}
