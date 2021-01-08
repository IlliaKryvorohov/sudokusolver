class SudokuSolver {

  constructor() {
    this.resetSudoku()
  }

  resetSudoku = () => {
    this.Sudoku = []
    this.Solution = []

    for (let a = 0; a < 81; a++) {

      let x = a % 9
      let y = (a - x) / 9
      let group = y - y % 3 + (x - x % 3) / 3

      this.Sudoku[a] = {
        y: y,
        x: x,
        group: group,
        num: 0,
        pos: [1, 2, 3, 4, 5, 6, 7, 8, 9], 
      }
    }
  }

  load = (map) => {
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if (map[y][x] !== 0) {
          this.Sudoku[y * 9 + x].num = map[y][x]
          this.Sudoku[y * 9 + x].pos = []
        }
      }
    }
  }

  solve = () => {


    const refreshCellPosibility = (cell) => {
      this.Sudoku.filter(obj => (
        obj.x === cell.x ||
        obj.y === cell.y ||
        obj.group === cell.group) && 
        obj.num === 0).forEach(obj => {
          let i = obj.pos.indexOf(cell.num);
          if(i > -1) {
            obj.pos.splice(i,1)
          }
      })
    }

    const filter1 = () => {
      this.Sudoku.filter(obj => obj.num !== 0).forEach(obj => refreshCellPosibility(obj))
    }

    const filter2 = () => {
      const helper = (array, num) => {
        if (array.length === 1) {
          changed = true
          let cell = array[0]
          cell.num = num
          cell.pos = []
          this.Solution.push([array[0].y, array[0].x, array[0].num])
          refreshCellPosibility(cell)
        }
      }

      let changed = false
      for (let num = 1; num < 10; num++) {
        for (let a = 0; a < 9; a++) {
          let y = this.Sudoku.filter(obj => obj.y === a && obj.pos.includes(num))
          helper(y, num)
          let x = this.Sudoku.filter(obj => obj.x === a && obj.pos.includes(num))
          helper(x, num)
          let group = this.Sudoku.filter(obj => obj.group === a && obj.pos.includes(num))
          helper(group, num)
        }
      }

      return changed
    }

    // const filter3 = () => {

    //   const helper = (arr, num) => {
    //     if (arr.every((val, ind, arr) => arr[0].group === val.group) && arr.length > 0) {
    //       this.Sudoku.filter(obj => 
    //           obj.group === arr[0].group && 
    //           obj.num === 0 &&
    //           !arr.includes(obj)).forEach(obj => {
    //           let i = obj.pos.indexOf(num);
    //           if(i > -1) {
    //             obj.pos.splice(i,1)
    //             changed = true
    //           }
    //       })
    //     }
    //   } 

    //   let changed = false
    //   for (let num = 1; num < 10; num++) {
    //     for (let a = 0; a < 9; a++) {

    //       let y = this.Sudoku.filter(obj => obj.y === a && obj.pos.includes(num) && obj.num === 0)
    //       helper(y, num)
          
    //       let x = this.Sudoku.filter(obj => obj.x === a && obj.pos.includes(num) && obj.num === 0)
    //       helper(x, num)
    //     }
    //   }
    //   return changed
    // }

    const filter4 = () => {
      const helper = (array) => {
        let some = []
        let maxLength = 0
        for (let a = 1; a < 10; a++) {
          let res = array.filter(obj => obj.pos.includes(a))
          if (res.length > 1) {
            maxLength = res.length ? maxLength < res.length : maxLength
            some.push([a, res])
          }
        }

        let res2 = some.filter(obj => obj[1].length === 2)
        for (let b = 0; b < res2.length; b++) {
          for (let c = b + 1; c < res2.length; c++) {
            const isEqual = (obj1, obj2) => obj1.length === obj2.length && obj1.every(obj => obj2.includes(obj))
            if (isEqual(res2[b][1], res2[c][1])) {
              for (let obj of res2[b][1]) {
                if (obj.pos.length > 2) {
                  obj.pos =[res2[b][0], res2[c][0]]
                  changed = true
                }
              }
            }
          }
        }
      }

      let changed = false
      for (let a = 0; a < 9; a++) {
        let y = this.Sudoku.filter(obj => obj.y === a)
          helper(y)
          let x = this.Sudoku.filter(obj => obj.x === a)
          helper(x)
          let group = this.Sudoku.filter(obj => obj.group === a)
          helper(group)
      }

      return changed
    }
    

    filter1()

    while (filter2() || filter4()) {}

  }

  getSolution = () => {
    let Solution = []
    for (let y = 0; y < 9; y++) {
      let helper = []
      for (let x = 0; x < 9; x++) {
        helper.push(this.Sudoku[y * 9 + x].num)
      }
      Solution.push(helper)
    }
    return Solution
  }
}

export default SudokuSolver