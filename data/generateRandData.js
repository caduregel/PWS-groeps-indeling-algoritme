// Functie om willekeurige vrienden te selecteren
function selectRandomFriends(studentId, totalStudents, numberOfFriends) {
    const possibleFriends = Array.from(
        { length: totalStudents },
        (_, i) => i + 1
    ).filter(id => id !== studentId);

    const friends = [];
    while (friends.length < numberOfFriends && possibleFriends.length > 0) {
        const randomIndex = Math.floor(Math.random() * possibleFriends.length);
        friends.push(possibleFriends.splice(randomIndex, 1)[0]);
    }
    return friends.sort((a, b) => a - b);
}

const createRandomGroups = (hoeveelheid) => {
    // Genereer de leerlingen data
    const aantalLeerlingen = hoeveelheid;
    const leerlingen = Array.from({ length: aantalLeerlingen }, (_, index) => ({
        id: index + 1,
        gender: Math.random() < 0.5 ? "boy" : "girl",
        cognitive_level: Math.floor(Math.random() * 5) + 1,  // 1-5 schaal
        behavioral_difficulty: Math.floor(Math.random() * 5) + 1,  // 1-5 schaal
        friends: [] // wordt later ingevuld
    }));

    // Vul de vrienden in voor elke leerling
    leerlingen.forEach(leerling => {
        leerling.friends = selectRandomFriends(leerling.id, aantalLeerlingen, 3);
    });

    return leerlingen
}

module.exports = createRandomGroups