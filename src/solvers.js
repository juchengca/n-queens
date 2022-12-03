/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {

  var solution = [];
  var board = new Board({n: n});

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      board.togglePiece(i, j);
      if (board.hasRowConflictAt(i) || board.hasColConflictAt(j)) {
        board.togglePiece(i, j);
      }
    }
  }

  for (var k = 0; k < n; k++) {
    solution.push(board.attributes[k]);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var solutionCount = 0;

  var board = new Board({n: n});

  var findSolutions = function(row) {
    if (row === n) {
      solutionCount++;
    } else {
      for (var i = 0; i < n; i++) {
        board.togglePiece(row, i);
        if (board.hasRowConflictAt(row) || board.hasColConflictAt(i)) {
          board.togglePiece(row, i);
        } else {
          findSolutions(row + 1);
          board.togglePiece(row, i);
        }
      }
    }
  };

  findSolutions(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = [];
  var board = new Board({n: n});

  if (n === 2) {
    solution.push([]);
    solution.push([]);
  }

  if (n === 3) {
    solution.push([]);
    solution.push([]);
    solution.push([]);
  }

  var findSolutions = function(row) {
    if (row === n) {
      for (var k = 0; k < n; k++) {
        solution.push(board.attributes[k]);
      }
      console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
      return solution;
    } else {
      for (var i = 0; i < n; i++) {
        board.togglePiece(row, i);
        if (board.hasAnyRowConflicts() || board.hasAnyColConflicts() || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts()) {
          board.togglePiece(row, i);
        } else {
          findSolutions(row + 1);
          if (solution.length === 0) {
            board.togglePiece(row, i);
          } else {
            return solution;
          }
        }
      }
    }
  };

  findSolutions(0);

  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  var solutionCount = 0;
  var board = new Board({n: n});

  var findSolutions = function(row) {
    if (row === n) {
      solutionCount++;
    } else {
      for (var i = 0; i < n; i++) {
        board.togglePiece(row, i);
        if (board.hasAnyRowConflicts() || board.hasAnyColConflicts() || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts()) {
          board.togglePiece(row, i);
        } else {
          findSolutions(row + 1);
          board.togglePiece(row, i);
        }
      }
    }
  };

  findSolutions(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
