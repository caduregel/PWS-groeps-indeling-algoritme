const generateRandomStudentsV2 = (ammount) => {
    const getRandomFriends = (max, exclude) => {
        const numbers = new Set();

        while (numbers.size < 3) {
            const rand = Math.floor(Math.random() * (max));
            if (rand !== exclude) {
                numbers.add(rand);
            }
        }

        return Array.from(numbers);
    }


    const randStudents = []
    const maxStudents = ammount
    for (let i = 0; i < maxStudents; i++) {
        const randCog = Math.floor(Math.random() * 5) + 1
        const randSocial = Math.floor(Math.random() * 5) + 1
        const randGender = Math.random() < 0.5 ? "boy" : "girl"

        const randFriends = getRandomFriends(ammount, i)

        const newRandStuden = {
            id: i,
            cognitive: randCog,
            social: randSocial,
            gender: randGender,
            friends: randFriends,
        }
        randStudents.push(newRandStuden)
    }
    return randStudents
}

module.exports = generateRandomStudentsV2