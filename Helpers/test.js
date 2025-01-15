function testFunction(leerlingen, groep1, groep2) {
    // Maak lookup object voor snelle toegang tot leerling data
    const leerlingDict = Object.fromEntries(
        leerlingen.map(leerling => [leerling.id, leerling])
    );

    function analyseerGroep(groepIds) {
        // Initialiseer statistieken voor de groep
        const stats = {
            groepsGrote: 0,
            jongens: 0,
            meisjes: 0,
            leerlingenZonderVrienden: [], // Veranderd naar array met IDs van leerlingen zonder vrienden
            gemiddeldCognitief: 0,
            gemiddeldGedrag: 0
        };

        // Tel jongens en meisjes
        groepIds.forEach(id => {
            if (leerlingDict[id].gender === 'boy') {
                stats.jongens++;
            } else {
                stats.meisjes++;
            }
        });

        // Check vrienden en bereken gemiddeldes
        let totaalCognitief = 0;
        let totaalGedrag = 0;

        groepIds.forEach(id => {
            const leerling = leerlingDict[id];
            
            // Check of de leerling vrienden heeft in de groep
            const heeftVriendenInGroep = leerling.friends.some(vriendId => 
                groepIds.includes(vriendId)
            );
            
            // Als de leerling geen vrienden heeft, voeg ID toe aan de lijst
            if (!heeftVriendenInGroep) {
                stats.leerlingenZonderVrienden.push(id);
            }
            
            // Tel op voor gemiddeldes
            totaalCognitief += leerling.cognitive_level;
            totaalGedrag += leerling.behavioral_difficulty;
        });

        // Bereken gemiddeldes
        stats.gemiddeldCognitief = totaalCognitief / groepIds.length;
        stats.gemiddeldGedrag = totaalGedrag / groepIds.length;
        stats.groepsGrote = groepIds.length

        return stats;
    }

    // Analyseer beide groepen
    return {
        groep1: analyseerGroep(groep1),
        groep2: analyseerGroep(groep2)
    };
}

module.exports = testFunction;