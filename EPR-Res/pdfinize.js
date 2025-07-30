//EPR-Res/pdfinize.js
// This script is used to handle form submission and other functionalities for the EPR site

//import { PDFDocument, rgb } from 'pdf-lib';
//import { PDFDocument, rgb, StandardFonts } from 'https://cdn.skypack.dev/pdf-lib';
//import fs from 'fs';
const loadBlanker = async () => {
    const response = await fetch('.\EPR-Res\Blanker  - Supervisory and Administrative 02-13 .pdf'); // Relative to the site root
    if (!response.ok) throw new Error('Failed to load PDF');
    return await response.arrayBuffer();
};
//FORMATING: const selectedValue = document.getElementById('mySelect').value;
async function onSubmit() {
    // This function is called when the form is submitted
    // It can be thought of as the main function.
    alert("Form submitted successfully!");
    const blank = await loadPDF()
    await pdfinize_head(blank);
    await pdfinize_p(blank);
    await pdfinize_body(blank);
    await pdfinize_feet(blank);
    await pdf_print(blank);

}

async function loadPDF() {
    // This function is called to load the PDF document
    const response = await fetch('./EPR-Res/Blanker  - Supervisory and Administrative 02-13 .pdf');
    const pdfByte = await response.arrayBuffer();
    const { PDFDocument, rgb, StandardFonts } = PDFLib;
    const loadBlank = await PDFDocument.load(pdfByte); // Load the PDF document
    return loadBlank;
}
//This function is used by the pdfinize functions to draw on the pdf
async function editPDF(loadBlank,x, y, text, wrap){
    //const loadBlank = await PDFDocument.load(fs.readFileSync('.\Blanker  - Supervisory and Administrative 02-13 .pdf'));
    //const pages = loadBlank.getPages(); //theres only two pages and im only editing the first one
    const pages = loadBlank.getPages(); // Get the pages from the loaded PDF
    const font = await loadBlank.embedFont(StandardFonts.Helvetica); //Get the font from the family

    for (let dx = 0; dx < 600; dx += 50) { // Draw grid lines for debugging
        pages[0].drawText(`${dx}`, { dx, dy: 10, size: 8 });
    }
    for (let dy = 0; dy < 800; dy += 50) {
        pages[0].drawText(`${dy}`, { dx: 10, dy, size: 8 });
    }

    pages[0].drawText(text, {
        x: x,
        y: 600 - y,
        size: 12, // Adjust size as needed
        color: rgb(0, 0, 0), // Black color
        maxWidth: wrap ? 200 : undefined, // Wrap text if specified
        font: font, // Use the embedded font

    });
    //fs.writeFileSync('./Filled Supervisory.pdf', pdfFill); // Save the modified PDF TO THE DISC. FOR THE ACTUAL SITE WE WILL BE EXPORTING TO A BLOB
    return loadBlank; // Return the modified PDF document
}
//PDF GENERATION: These functions are placeholders for PDF generation functionality
//Might combine them all later, but for now they are separate for clarity
async function pdfinize_head(blank) {
    await editPDF(blank,30,68, document.getElementById('name').value, 200);// Add Name
    await editPDF(blank,30,68, document.getElementById('name').value, 200);
    await editPDF(blank,30,68, document.getElementById('name').value, 200);
    await editPDF(blank,30,68, document.getElementById('name').value, 200); 

    // This function is called to convert the head to PDF
    //IDS INCLUDE IN THIS ORDER Name, Position, ID, Department, EvaluationType.
    //alert("PDF generation is not implemented yet.");
}
async function pdfinize_p(blank) {
    // This function is called to convert the performance factors to PDF
    //IDS INCLUDE IN THIS ORDER p1-p5, Tardy, SickDays, p6-p9, OverallP
    //alert("PDF generation is not implemented yet.");
}
async function pdfinize_body(blank) {
    // This function is called to convert the comments and signatures to PDF
    //IDS INCLUDE IN THIS ORDER comments,e1-e4
    //alert("PDF generation is not implemented yet.");
}
async function pdfinize_feet(blank) {
    // This function is called to convert the salary increment to PDF
    //IDS INCLUDE IN THIS ORDER SalaryInc
    //alert("PDF generation is not implemented yet.");
}


//PDF EXPORT:
async function pdf_print(Full) {
    // This function is called export the pdf to the user
    const pdfFill = await Full.save();
    const blob = new Blob([pdfFill], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Filled_Supervisory_Performance_Review.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert("Export functionality is not implemented yet.");
}