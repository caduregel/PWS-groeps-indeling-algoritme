const shuffle = require('../Helpers/shuffle');
const { checkTwoFriends, checkFriendInGroup } = require('../Helpers/checks');


function sortStudents(astudents) {
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

module.exports = sortStudents