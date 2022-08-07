import thingsWantToDo from "./thingsWantToDo";
import thingsPerAgePeriod from "./thingsPerAgePeriod";

// Expect it to run in time bucket sheet.
const sheet = SpreadsheetApp.getActiveSheet()

const thingsPerAgePeriodRange = `C4:C18`
const thingAndExperiencePointRange = "B23:C70"

function calcTotalExperiencePoint() {
    const thingsWantToDo = getThingsWantToDo()
    const thingsPerAgePeriodArray = getThingsPerAgePeriodArray(thingsWantToDo)

    thingsPerAgePeriodArray.forEach((things) => things.writeTotalExperiencePointToNextCell(sheet))
}

function getThingsWantToDo(): thingsWantToDo {
    const thingAndPointRange = sheet.getRange(thingAndExperiencePointRange).getValues()
    const onlyExistRange = thingAndPointRange.filter((thingAndPointArray) => thingAndPointArray[0])

    return new thingsWantToDo(onlyExistRange)
}

function getThingsPerAgePeriodArray(thingsWantTodo: thingsWantToDo): thingsPerAgePeriod[] {
    const thingsRange = sheet.getRange(thingsPerAgePeriodRange).getValues()

    return thingsRange.map((thingsRow, index) => {
        const cell = getThingsCellByIndex(index)
        const things = getThingsFromCellValue(thingsRow[0])

        return new thingsPerAgePeriod(cell, things, thingsWantTodo)
    })
}

function getThingsCellByIndex(index: number): string {
    const firstThingsPerAgePeriodRowNumber = Number(thingsPerAgePeriodRange.match(/\d+/)[0])

    return `C${firstThingsPerAgePeriodRowNumber + index}`
}

function getThingsFromCellValue(value: string): string[] {
    return value.split("\n").filter((thing) => {
        return thing != ""
    })
}

