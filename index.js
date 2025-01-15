// const allStudents = require('./students.json');
const testFunction = require('./Helpers/test');
const createRandomGroups = require('./data/generateRandData')
const sortStudents = require('./sorting/sortStudents')

const allStudents = createRandomGroups(100)

const repeatgroups = () => {
    let acceptableGroup = false;

    let iterations = 0
    maxIterations = 1000
    while (acceptableGroup == false) {
        if (iterations > maxIterations) {
            console.log('max iterations')
            break;
        }
        iterations++
        [groupOne, groupTwo] = sortStudents(allStudents)
        // console.log(acceptableGroup)
        const results = testFunction(allStudents, groupOne, groupTwo)

        if (results.groep1.leerlingenZonderVrienden.length == 0 && results.groep2.leerlingenZonderVrienden.length == 0) {
            acceptableGroup = true
        }
    }
    const groups = [groupOne, groupTwo]
    return { groups, iterations }
}

// const result = repeatgroups()
// const group1 = result.groups[0]
// const group2 = result.groups[1]
// console.log(result.groups)
// console.log(testFunction(allStudents, group1, group2))


let Totaliterations = 0;
let TotalCogDif = 0
let totalBehDif = 0
let totalSizeDif = 0

const RepeatFunc = 100000
for (let i = 0; i < RepeatFunc; i++) {
    const resultGroups = repeatgroups()
    const groupOne = resultGroups.groups[0]
    const groupTwo = resultGroups.groups[1]

    const result = testFunction(allStudents, groupOne, groupTwo)

    Totaliterations = resultGroups.iterations + Totaliterations
    const cognitiveDifference = Math.abs(result.groep1.gemiddeldCognitief - result.groep2.gemiddeldCognitief)
    TotalCogDif = TotalCogDif + cognitiveDifference
}

let averageIterations = Totaliterations / RepeatFunc
let averageCogDif = TotalCogDif / RepeatFunc

console.log("iterations: " + averageIterations)
console.log("avg cognitive difference: " + averageCogDif)