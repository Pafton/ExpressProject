module.exports = function validateCrewFormat(req, res, next) {
    const { crew } = req.body;
    let error = null;

    if (!crew) {
        error = "Błąd: Pole 'Załoga' jest wymagane.";
    } else {
        const crewMembers = crew.split(',');
        const regex = /^[A-Za-z]+(\s"[A-Za-z\s]+")?\s[A-Za-z]+\s-\s[A-Za-z]+$/;

        for (const member of crewMembers) {
            if (!regex.test(member.trim())) {
                error = "Błąd: Format danych w polu 'Zaloga' jest nieprawidłowy. Użyj formatu 'Imię Nazwisko - Rola; Imię Nazwisko - Rola; ...'.";
                break;
            }
        }
    }

    if (error) {
        return res.render("setMission", { error });
    }

    next();
};
