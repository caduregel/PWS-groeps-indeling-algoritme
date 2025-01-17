// Cognitive level mapping
const cognitiveMapping = {
    'HB': 5,
    'uitdagend': 4,
    'basis-uitdagend': 3,
    'Basis': 2,
    'Intensief': 1
};

// CSV data (line breaks toegevoegd voor leesbaarheid)
const csvData = `Naam,J/M,Cognitief,Gedrag,vriendje 1,vriendje 2,vriendje 3
Maxim,Jongen,Basis,1,Liam,Kyano,Miles
Fiene Geel,Meisje,basis-uitdagend,1,Eva-Lynn,Bente,Philou
Noah,Jongen,Basis,1,Miles,Maxim,Darius-Wolf
Darius-Wolf,Jongen,Intensief,1,Liam,Miles,Maxim
Liam,Jongen,basis-uitdagend,1,Kyano,Thomas,Darius-Wolf
Eva-Lynn,Meisje,basis-uitdagend,1,Fiene Geel,Philou,Floor Geel
Sofie Geel,Meisje,Basis,1,Fiene Geel,Joya,Sophie Blauw
Philou,Meisje,uitdagend,1,Fiene Geel,Bente,Floor Geel
Miles,Jongen,basis-uitdagend,3,Liam,Amir,Bo
Kyano,Jongen,Intensief,1,Liam,Maxim,Philou
Floor Geel,Meisje,uitdagend,1,Fiene Geel,Eva-Lynn,Philou
Wilder,Jongen,Basis,4,Thomas,Xavi,Maas
Livia,Meisje,Basis,1,Heleen,Joya,Nina
Silas,Jongen,uitdagend,5,Thomas,Heleen,Fender
Heleen,Meisje,uitdagend,1,Nina,Joya,Sophie Blauw
Joya,Meisje,Basis,1,Nina,Sophie Blauw,Heleen
Thomas,Jongen,Basis,2,Wilder,Xavi,Liam
Yozhua,Jongen,Basis,5,Thomas,Xavi,Wilder
Xavi,Jongen,Basis,4,Haroen,Bo,Wilder
Nina,Meisje,Basis,1,Livia,Heleen,Joya
Sophie Blauw,Meisje,basis-uitdagend,1,Joya,Sofie Geel,Amir
Bo,Jongen,Basis,4,Haroen,Xavi,Yozhua
Haroen,Jongen,Basis,3,Bo,Xavi,Noah
Amir,Jongen,uitdagend,1,Miles,Sophie Blauw,Heleen
Fender,Jongen,Intensief,2,Heleen,Sacha,Eva-Lynn
Finnley,Jongen,basis-uitdagend,5,Floris,Kai,Otis
Finn,Jongen,basis-uitdagend,1,Mathieu,Otis,Fiene Rood
Fedde,Jongen,Basis,5,Mae,Otis,Kai
Elena,Meisje,basis-uitdagend,3,Annelore,Mette,Fiene Rood
Tuana,Meisje,Basis,1,Annelore,Fiene Rood,Mae
Kai,Jongen,Basis,1,Floris,Finnley,Mathieu
Mette,Meisje,uitdagend,1,Fiene Rood,Annelore,Mae
Otis,Jongen,basis-uitdagend,3,Finn,Mathieu,Fender
Mathieu,Jongen,basis-uitdagend,2,Otis,Finn,Floris
Lina,Meisje,Intensief,2,Fender,Kai,Floris
Floris,Jongen,Intensief,2,Kai,Finnley,Annelore
Mae,Meisje,basis-uitdagend,1,Tuana,Fiene Rood,Floris
Jacky,Jongen,Basis,3,Finnley,Fender,Lina
Fiene Rood,Meisje,basis-uitdagend,1,Mae,Mette,Annelore
Annelore,Meisje,basis-uitdagend,1,Fiene Rood,Tuana,Fiene Geel
Pippa,Meisje,basis-uitdagend,2,Bente,Philou,Jasmijn
Lasse,Jongen,basis-uitdagend,3,Noah,Darius-Wolf,Sophie Blauw
Floor Wit,Meisje,Basis,1,Pippa,Jasmijn,Bente
Maas,Jongen,Basis,3,Kick,Tommy,Sijmen
Lucie,Meisje,uitdagend,4,Bente,Fiene Geel,Sijmen
Sepp,Jongen,Basis,2,Tommy,Imrane,Maas
Tommy,Jongen,basis-uitdagend,1,Maas,Lucie,Bente
Kick,Jongen,Basis,2,Tommy,Maas,Benyamin
Jasmijn,Meisje,basis-uitdagend,3,Sacha,Pippa,Bente
Sacha,Meisje,basis-uitdagend,2,Floor Wit,Lucie,Bente
Sijmen,Jongen,uitdagend,1,Kick,Bente,Lucie
Bente,Meisje,uitdagend,1,Fiene Geel,Lucie,Jasmijn
Imrane,Meisje,Basis,4,Sepp,Benyamin,Tommy
Benyamin,Jongen,Basis,1,Sijmen,Tommy,Pippa`;

// Parse CSV en converteer naar objecten
const lines = csvData.split('\n');
const headers = lines[0].split(',');

// Maak lijst van alle leerlingen met hun IDs
const naamNaarId = {};
lines.slice(1).forEach((line, index) => {
    const values = line.split(',');
    naamNaarId[values[0]] = index + 1;
});

// Converteer naar gewenst JSON formaat
const leerlingen = lines.slice(1).map((line, index) => {
    const values = line.split(',');
    return {
        id: index + 1,
        gender: values[1] === 'Jongen' ? 'boy' : 'girl',
        cognitive_level: cognitiveMapping[values[2]] || 2, // Default naar 'Basis' als niet gevonden
        behavioral_difficulty: parseInt(values[3]),
        friends: [values[4], values[5], values[6]].map(naam => naamNaarId[naam])
    };
});

module.exports = leerlingen