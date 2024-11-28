function testFunction(students, groupOne, groupTwo) {
    // Helper to count gender split
    const countGender = (group, studentList) => {
        let boys = 0;
        let girls = 0;

        group.forEach((id) => {
            const student = studentList.find((s) => s.id === id);
            if (student.gender === "boy") boys++;
            if (student.gender === "girl") girls++;
        });

        return { boys, girls };
    };

    // Helper to check if every student has at least one friend in their group
    const checkFriendInGroup = (group, studentList) => {
        return group.every((id) => {
            const student = studentList.find((s) => s.id === id);
            if (!student) return false;

            return student.friends.some((friendId) => group.includes(friendId));
        });
    };

    // Group sizes
    const groupOneSize = groupOne.length;
    const groupTwoSize = groupTwo.length;

    // Gender split
    const groupOneGenderSplit = countGender(groupOne, students);
    const groupTwoGenderSplit = countGender(groupTwo, students);

    // Friend check
    const groupOneHasFriends = checkFriendInGroup(groupOne, students);
    const groupTwoHasFriends = checkFriendInGroup(groupTwo, students);
    const allStudentsHaveFriends = groupOneHasFriends && groupTwoHasFriends;

    // Results
    return {
        groupOneSize,
        groupTwoSize,
        groupOneGenderSplit,
        groupTwoGenderSplit,
        allStudentsHaveFriends,
    };
}

module.exports = testFunction;