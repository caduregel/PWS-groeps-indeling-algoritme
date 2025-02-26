const testFunction = require('./Helpers/test');
const generateRandomStudentsV2 = require('./data/genRandDataV2');
// const sortStudents = require('./sorting/sortStudents');
const sortStudentsV2 = require('./sorting/sortStudentsV2');

// sorting a single group

const allStudents = generateRandomStudentsV2(50);
const results = sortStudentsV2(allStudents)

// console.log(results)
const group1 = results[0]
const group2 = results[1]
const result = testFunction(allStudents, group1, group2)
console.log(result)

console.log('iterations: ', results.iterations)
console.log('group 1 boy/girl ratio: ', result.groep1.jongens / result.groep1.meisjes)
console.log('group 2 boy/girl ratio: ', result.groep2.jongens / result.groep2.meisjes)


// sorting over many groups
// let Totaliterations = 0
// let TotalCogDif = 0
// let totalBehDif = 0
// let totalSizeDif = 0
// let totalBG = 0

// const RepeatFunc = 1000
// for (let i = 0; i < RepeatFunc; i++) {
//     const allStudents = createRandomGroups(140)
//     const resultGroups = sortStudents(allStudents)
//     const groupOne = resultGroups.groups[0]
//     const groupTwo = resultGroups.groups[1]

//     const result = testFunction(allStudents, groupOne, groupTwo)

//     Totaliterations = resultGroups.iterations + Totaliterations
//     const cognitiveDifference = Math.abs(result.groep1.gemiddeldCognitief - result.groep2.gemiddeldCognitief)
//     TotalCogDif = TotalCogDif + cognitiveDifference

//     const groupsizeDif = Math.abs(result.groep1.groepsGrote - result.groep2.groepsGrote)
//     totalSizeDif = totalSizeDif + groupsizeDif

//     const behavDif = Math.abs(result.groep1.gemiddeldGedrag - result.groep2.gemiddeldGedrag)
//     totalBehDif = totalBehDif + behavDif

//     const groupOneBoyToGirl = result.groep1.jongens / result.groep1.meisjes
//     const groupTwoBoyToGirl = result.groep2.jongens / result.groep2.meisjes
//     const averageBGRatio = (groupOneBoyToGirl + groupTwoBoyToGirl) / 2
//     totalBG = totalBG + averageBGRatio
// }

// const averageIterations = Totaliterations / RepeatFunc
// const averageCogDif = TotalCogDif / RepeatFunc
// const averageSizeDif = totalSizeDif / RepeatFunc
// const averageBehavDif = totalBehDif / RepeatFunc
// const averageBoyGirlRatio = totalBG / RepeatFunc

// console.log("average iterations: " + averageIterations)
// console.log("avg size difference: " + averageSizeDif)
// console.log("avg cognitive difference: " + averageCogDif)
// console.log("avg behavioral difference difference: " + averageBehavDif)
// console.log("avg boy girl ratio difference: " + averageBoyGirlRatio)