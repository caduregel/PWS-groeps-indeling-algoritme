// Function that checks if a student has friends in a group
const checkFriendInGroup = (student, group) => {
    const friendsId = student.friends; // No need for spreading
    for (let i = 0; i < group.length; i++) {
        if (friendsId.includes(group[i])) {
            return true;
        }
    }
    return false; // Only return false after checking all group members
};
// Helper function which checks if two students are friends with eachother
const checkTwoFriends = (studentOne, studentTwo) => {
    return (
        studentOne.friends.includes(studentTwo.id)// Match IDs, not names
        // studentTwo.friends.includes(studentOne.id)
    );
};

module.exports = { checkFriendInGroup, checkTwoFriends }