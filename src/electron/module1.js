const docx = require("docx");
const getDoc = function (name, surname) {
    return new docx.Document({
        sections: [
            {
                properties: {},
                children: [
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun("Name: "),
                            new docx.TextRun({
                                text: name,
                                bold: true,
                            })
                        ],
                    }),
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun("Surname: "),
                            new docx.TextRun({
                                text: surname,
                                bold: true,
                            })
                        ],
                    })
                ],
            },
        ],
    });
};

module.exports = {getDoc}