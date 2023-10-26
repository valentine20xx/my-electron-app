const docx = require("docx");
const getDoc = function () {
    return new docx.Document({
        sections: [
            {
                properties: {},
                children: [
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun("Hello World"),
                            new docx.TextRun({
                                text: "Foo Bar",
                                bold: true,
                            }),
                            new docx.TextRun({
                                text: "\tGithub is the best",
                                bold: true,
                            }),
                        ],
                    }),
                ],
            },
        ],
    });
};

module.exports = {getDoc}