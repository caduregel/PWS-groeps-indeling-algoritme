const allStudents = require('./students.json');
const { AllStudentsGrouped } = require('./test');

// Function that checks if a student has friends in a group
const checkFriendInGroup = (student, group) => {
    const friendsId = [...student.friends]
    for (let i = 0; i < group.length;) {
        if (friendsId.includes(group[i])) {
            return true
        }
        else {
            return false;
        }
    }
}

// Helper function which checks if two students are friends with eachother
const checkTwoFriends = (studentOne, studentTwo) => {
    const studentOneFriendsId = [...studentOne.friends]
    if (studentOneFriendsId.includes(studentTwo.id)) {
        return true
    } else {
        return false
    }
}

// V1, only sorts based on friendship preference, does not allow students to exclude friends
function sortStudents(students) {
    // Two groups
    let groupOne = []
    let groupTwo = []

    // For loop which iterates over all students and sorts them into the appropiate groups
    for (let i = 0; i < students.length; i++) {
        const student = students[i]

        // Case one: A friend is found in both groups
        if (checkFriendInGroup(student, groupOne) && checkFriendInGroup(student, groupTwo)) {
            if (groupOne.length > groupTwo.length) {
                groupTwo.push(student.id)
                continue;
            } else {
                groupOne.push(student.id)
                continue;
            }

            // Case two: A friend is only found in group one on group two
        } else if (checkFriendInGroup(student, groupOne)) {
            groupOne.push(student.id)
            continue;
        } else if (checkFriendInGroup(student, groupTwo)) {
            groupTwo.push(student.id)
            continue;
        }

        // Case Three: no friend is in either group:
        for (let j = i + 1; j < students.length; j++) {
            const studentTwo = students[j]
            if (checkTwoFriends(student, studentTwo)) {
                groupOne.length > groupTwo.length ? groupTwo.push(student.id, studentTwo.id) : groupOne.push(student.id, studentTwo.id)
                break;
            } else {
                continue;
            }
        }

    }

    console.log(groupOne, groupTwo)
    console.log(groupOne.length, groupTwo.length)
    console.log(AllStudentsGrouped(allStudents, groupOne, groupTwo))
    return ({ groupOne, groupTwo })
}


sortStudents(allStudents)