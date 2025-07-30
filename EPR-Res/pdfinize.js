//EPR-Res/pdfinize.js
// This script is used to handle form submission and other functionalities for the EPR site

import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs';
//FORMATING: const selectedValue = document.getElementById('mySelect').value;
function onSubmit() {
    // This function is called when the form is submitted
    // It can be thought of as the main function.
    alert("Form submitted successfully!");
    pdfinize_head();
    pdfinize_p();
    pdfinize_body();
    pdfinize_feet();
    pdf_print();
}


//This function is used by the pdfinize functions to draw on the pdf
async function editPDF(x, y, text, wrap){
    const loadBlank = await PDFDocument.load(fs.readFileSync('.\Blanker  - Supervisory and Administrative 02-13 .pdf'));
    const pages = loadBlank.getPages(); //theres only two pages and im only editing the first one
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica); //Get the font from the family
    pages[0].drawText(text, {
        x: x,
        y: y,
        size: 12, // Adjust size as needed
        color: rgb(0, 0, 0), // Black color
        maxWidth: wrap ? 200 : undefined, // Wrap text if specified
        font: font, // Use the embedded font
    });
    const pdfFill = await loadBlank.save();
    fs.writeFileSync('./Filled Supervisory.pdf', pdfFill); // Save the modified PDF TO THE DISC. FOR THE ACTUAL SITE WE WILL BE EXPORTING TO A BLOB
}
//PDF GENERATION: These functions are placeholders for PDF generation functionality
//Might combine them all later, but for now they are separate for clarity
function pdfinize_head() {
    editPDF(30,68, document.getElementById('name').value, 200); // Add Name
    // This function is called to convert the head to PDF
    //IDS INCLUDE IN THIS ORDER Name, Position, ID, Department, EvaluationType.
    alert("PDF generation is not implemented yet.");
}
function pdfinize_p() {
    // This function is called to convert the performance factors to PDF
    //IDS INCLUDE IN THIS ORDER p1-p5, Tardy, SickDays, p6-p9, OverallP
    alert("PDF generation is not implemented yet.");
}
function pdfinize_body() {
    // This function is called to convert the comments and signatures to PDF
    //IDS INCLUDE IN THIS ORDER comments,e1-e4
    alert("PDF generation is not implemented yet.");
}
function pdfinize_feet() {
    // This function is called to convert the salary increment to PDF
    //IDS INCLUDE IN THIS ORDER SalaryInc
    alert("PDF generation is not implemented yet.");
}


//PDF EXPORT:
function pdf_print() {
    // This function is called export the pdf to the user
    alert("Export functionality is not implemented yet.");
}