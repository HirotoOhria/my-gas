import thingsWantToDo from "./thingsWantToDo";
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

const totalExperienceColumnAlphabet = "D"

export default class thingsPerAgePeriod {
    cell: string
    things: string[]
    thingsWantToDo: thingsWantToDo

    constructor(cell: string, things: string[], thingsWantToDo: thingsWantToDo) {
        this.cell = cell
        this.things = things
        this.thingsWantToDo = thingsWantToDo
    }

    getTotalExperiencePoint(): number {
        return this.things.reduce((pre, cur) => {
            return pre + this.thingsWantToDo.getExperiencePointByThing(cur)
        }, 0)
    }

    writeTotalExperiencePointToNextCell(sheet: Sheet) {
        const nextCell = this.cell.replace("C", totalExperienceColumnAlphabet)

        sheet.getRange(nextCell).setValue(this.getTotalExperiencePoint())
    }
}