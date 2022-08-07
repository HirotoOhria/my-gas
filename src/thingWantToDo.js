class thingsWantToDo {
  constructor(thingAndExperiencePointRange) {
    this.things = thingAndExperiencePointRange.map((thingAndExperiencePointRow) => {
      return new thingWantToDo(thingAndExperiencePointRow[0], Number(thingAndExperiencePointRow[1]))
    })
  }

  getExperiencePointByThing(thing) {
    if (typeof thing !== "string") {
      throw new Error(`thing is not string. thing = ${thing}`)
    }

    const match = this.things.filter((thingWantToDo) => thingWantToDo.thing === thing)
    if (match.length === 0) {
      throw new Error(`not found thing. thing = ${thing}. things = ${this.things}`)
    }

    return match[0].experiencePoint
  }
}

class thingWantToDo {
  constructor(thing, experiencePoint) {
    if (typeof thing !== "string") {
      throw new Error(`thing is not string. thing = ${thing}`)
    }
    if (typeof experiencePoint !== "number") {
      throw new Error(`experiencePoing is not number. experiencePoing = ${experiencePoing}`)
    }

    this.thing = thing
    this.experiencePoint = experiencePoint
  }
}