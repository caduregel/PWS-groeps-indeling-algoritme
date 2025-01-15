const shuffle = require('../Helpers/shuffle');
const { checkTwoFriends, checkFriendInGroup } = require('../Helpers/checks');
const testFunction = require('../Helpers/test');

function stepOne(astudents) {
    let groupOne = [];
    let groupTwo = [];

    let students = astudents
    shuffle(students)

    const isStudentInGroup = (studentId, group) => group.includes(studentId);

    for (let i = 0; i < students.length; i++) {
        const student = students[i];

        if (isStudentInGroup(student.id, groupOne) || isStudentInGroup(student.id, groupTwo)) {
            continue;
        }

        // Case One: A friend is found in both groups
        if (checkFriendInGroup(student, groupOne) && checkFriendInGroup(student, groupTwo)) {
            groupOne.length > groupTwo.length ? groupTwo.push(student.id) : groupOne.push(student.id);
            continue;
        }

        // Case Two: A friend is found in one group
        if (checkFriendInGroup(student, groupOne)) {
            groupOne.push(student.id);
            continue;
        } else if (checkFriendInGroup(student, groupTwo)) {
            groupTwo.push(student.id);
            continue;
        }

        // Case Three: No friends in either group
        let added = false;
        for (let j = i + 1; j < students.length; j++) {
            const studentTwo = students[j];
            if (checkTwoFriends(student, studentTwo)) {
                groupOne.length > groupTwo.length
                    ? groupTwo.push(student.id, studentTwo.id)
                    : groupOne.push(student.id, studentTwo.id);
                added = true;
                break;
            }
        }

        // Fallback: Add student to the smaller group if no match is found
        if (!added) {
            groupOne.length <= groupTwo.length ? groupOne.push(student.id) : groupTwo.push(student.id);
        }
    }

    return [groupOne, groupTwo];
}

const sortStudents = (allStudents) => {
    let allFriends = false;
    let acceptableSizes = false
    let acceptableGenderDif = false

    let iterations = 0
    maxIterations = 100

    while (allFriends == false || acceptableSizes == false || acceptableGenderDif == false) {
        if (iterations > maxIterations) {
            console.log("to many iterations")
        }
        iterations++
        [groupOne, groupTwo] = stepOne(allStudents)
        const results = testFunction(allStudents, groupOne, groupTwo)

        // find out if all students have friends
        if (results.groep1.leerlingenZonderVrienden.length == 0 && results.groep2.leerlingenZonderVrienden.length == 0) {
            allFriends = true
        }

        // find out if the group sizes dont differ by more than 10% of a 50/50split
        const sizeDif = Math.abs(results.groep1.groepsGrote - results.groep2.groepsGrote)
        const fiftySplit = allStudents.length / 20
        if (sizeDif < fiftySplit) {
            acceptableSizes = true
        }

        // verschil in jongen/meisje verdeling
        const groupOneBoyToGirl = results.groep1.jongens / results.groep1.meisjes
        const groupTwoBoyToGirl = results.groep2.jongens / results.groep2.meisjes
        const totalBoys = results.groep1.jongens + results.groep2.jongens
        const totalGirls = results.groep1.meisjes + results.groep2.meisjes
        const maxBGRatio = totalBoys / totalGirls
        const acceptableBGRation = maxBGRatio + (maxBGRatio / 5)
        console.log(acceptableBGRation)
        if (groupOneBoyToGirl <= acceptableBGRation && groupTwoBoyToGirl <= acceptableBGRation) {
            acceptableGenderDif = true
        }
    }
    const groups = [groupOne, groupTwo]
    return { groups, iterations }
}

module.exports = sortStudents