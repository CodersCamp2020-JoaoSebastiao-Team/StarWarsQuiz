const {randomOption, selectQuestion} = require('../src/app/Questions')

test('Select correct question from API data', () => {
    // Check if function select whole questions from example data in category "people"
    let questions = ["Luke Skywalker", "C-3PO", "R2-D2", "Darth Vader", "Leia Organa", "Owen Lars", "Beru Whitesun lars", "R5-D4", "Biggs Darklighter", "Obi-Wan Kenobi", "Anakin Skywalker", "Wilhuff Tarkin", "Chewbacca", "Han Solo", "Greedo", "Jabba Desilijic Tiure", "Wedge Antilles", "Jek Tono Porkins", "Yoda", "Palpatine", "Boba Fett", "IG-88", "Bossk", "Lando Calrissian", "Lobot", "Ackbar", "Mon Mothma", "Arvel Crynyd", "Wicket Systri Warrick", "Nien Nunb", "Qui-Gon Jinn", "Nute Gunray", "Finis Valorum", "Padmé Amidala", "Jar Jar Binks", "Roos Tarpals", "Rugor Nass", "Ric Olié", "Watto", "Sebulba", "Quarsh Panaka", "Shmi Skywalker", "Darth Maul", "Bib Fortuna", "Ayla Secura", "Ratts Tyerel", "Dud Bolt", "Gasgano", "Ben Quadinaros", "Mace Windu", "Ki-Adi-Mundi", "Kit Fisto", "Eeth Koth", "Adi Gallia", "Saesee Tiin", "Yarael Poof", "Plo Koon", "Mas Amedda", "Gregar Typho", "Cordé", "Cliegg Lars", "Poggle the Lesser", "Luminara Unduli", "Barriss Offee", "Dormé", "Dooku", "Bail Prestor Organa", "Jango Fett", "Zam Wesell", "Dexter Jettster", "Lama Su", "Taun We", "Jocasta Nu", "R4-P17", "Wat Tambor", "San Hill", "Shaak Ti", "Grievous", "Tarfful", "Raymus Antilles", "Sly Moore", "Tion Medon"];
    for (let i = 0; i < questions.length; i++){
        var {selected} = selectQuestion(questions,selected);
    }
    expect(selected.length).toBe(questions.length)
    // check if selected answers are unique
    const uniqueArray = [...new Set(selected)];
    expect(uniqueArray.length).toBe(selected.length)
    // check if selected is array
    expect(Array.isArray(selected)).toBe(true)
})

test('Properly generate answer values from fixed range 0-3', () => {
    for (let i = 0; i < 100; i++){
        let {good, bad} = randomOption();
    //good answer should be in range between 0 and 3
        expect(good).toBeGreaterThanOrEqual(0)
        expect(good).toBeLessThanOrEqual(3)
    //bad answers should be and array of 3 element
        expect(bad.length).toBe(3)
        expect(Array.isArray(bad)).toBe(true)
    //good answer should be unique, bad answer can't be the same
        expect(bad).not.toContain(good)
        expect(bad[0]).not.toBe(good)
        expect(bad[1]).not.toBe(good)
        expect(bad[2]).not.toBe(good)
    }
})