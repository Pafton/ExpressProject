module.exports = function validateCrewFormat(req, res, next) {
    const { crew } = req.body;
    let error = null;

    if (!crew) {
        error = "Błąd: Pole 'Załoga' jest wymagane.";
    } else {
        const crewMembers = crew.split(',');
        const regex = /^[A-Za-zĄ-Żą-ż\s]+(?:\s"[A-Za-zĄ-Żą-ż\s]+")?\s[A-Za-zĄ-Żą-ż\s]+ - [A-Za-zĄ-Żą-ż\s]+$/;

        for (const member of crewMembers) {
            if (!regex.test(member.trim())) {
                error = "Błąd: Format danych w polu 'Załoga' jest nieprawidłowy. Użyj formatu 'Imię Nazwisko - Rola' lub 'Fraza - Opis'.";
                break;
            }
        }
    }

    if (error) {
        return res.render("setMission", { error });
    }

    next();
};
