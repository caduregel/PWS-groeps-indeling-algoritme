const AllStudentsGrouped = (students, groupOne, GroupTwo) => {
    // Iterate over all students
    let studentsNotIncluded = []
    for(let i = 0; i < students.length; i++){
        // Check if groupone doesnt have student i
        if(groupOne.includes(students[i].id)){
            return {result: "all students have been grouped"}
        // Check if grouptwo doesnt have student i
        } else if(groupTwo.includes(students[i].id)) {
            return {result: "all students have been grouped"}
        } else {
            studentsNotIncluded.push(students[i].id)
        }
    }
    return {result: "Not all students have been grouped", studentId: studentsNotIncluded}
}


module.exports = {AllStudentsGrouped}