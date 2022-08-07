const totalExperieceColumnAphabet = "D"

class thingsPerAgePeriod {
  constructor(cell, things, thingsWantToDo) {
    if (typeof cell !== "string") {
      throw new Error(`cell is not string. cell = ${cell}`)
    }
    if (typeof things !== "object") {
      throw new Error(`things is not array. things = ${things}`)
    }
    if (typeof thingsWantToDo !== "object") {
      throw new Error(`thingsWantToDo is not thingsWantToDo class. thingsWantToDo = ${thingsWantToDo}`)
    }

    this.cell = cell
    this.things = things
    this.thingsWantToDo = thingsWantToDo
  }

  getTotalExperinecePoint(point) {
    return this.things.reduce((pre, cur) => {
      return pre + this.thingsWantToDo.getExperiencePointByThing(cur)
    }, 0)
  }

  writeTotalExperiencePointToNextCell(sheet) {
    const nextCell = this.cell.replace("C", totalExperieceColumnAphabet)

    sheet.getRange(nextCell).setValue(this.getTotalExperinecePoint())
  }
}