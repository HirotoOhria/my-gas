const sheet = SpreadsheetApp.getActiveSheet()

const thingsPerAgePeriodRange = `C4:C18`
const thingAndExperincePointRange = "B23:C70"

function calcTotalExperiencePoint() {
  const thingsWantToDo = getThingsWantToDo()
  const thingsPerAgePeriodArray = getThingsPerAgePeriodArray(thingsWantToDo)
  
  thingsPerAgePeriodArray.forEach((things) => things.writeTotalExperiencePointToNextCell(sheet))
}

function getThingsWantToDo() {
  const thingAndPointRange = sheet.getRange(thingAndExperincePointRange).getValues()
  const onlyExistRange = thingAndPointRange.filter((thingAndPointArray) => thingAndPointArray[0])

  return new thingsWantToDo(onlyExistRange)
}

function getThingsPerAgePeriodArray(thingsWantTodo) {
  const thingsRange =  sheet.getRange(thingsPerAgePeriodRange).getValues()

  return thingsRange.map((thingsRow, index) => {
    const cell = getThingsCellByIndex(index)
    const things = getThingsFromCellValue(thingsRow[0])

    return new thingsPerAgePeriod(cell, things, thingsWantTodo)
  })
}

function getThingsCellByIndex(index) {
  if (typeof index !== "number") {
    throw new Error(`index is not number. index = ${index}`)
  }
  
  const firstThingsPerAgePeriodRowNumber = thingsPerAgePeriodRange.match(/\d+/)[0]

  return `C${firstThingsPerAgePeriodRowNumber + index}`
}

function getThingsFromCellValue(value) {
  if (typeof value !== "string") {
    throw new Error(`value is not string. value = ${value}`)
  }

  return value.split("\n").filter((thing) => {
      return thing != ""
    })
}

