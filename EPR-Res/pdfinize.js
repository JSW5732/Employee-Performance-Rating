//EPR-Res/pdfinize.js
// This script is used to handle form submission and other functionalities for the EPR site

//import { PDFDocument, rgb } from 'pdf-lib';
//import { PDFDocument, rgb, StandardFonts } from 'https://cdn.skypack.dev/pdf-lib';
/* Use this to add grid lines to the PDF for debugging purposes

    const pages = await workPlan.getPages();
        for (let x = 0; x < 600; x += 50) { // Draw grid lines for debugging
        pages[0].drawText(`${x}`, { x, y: 10, size: 8 });
    }
    for (let y = 0; y < 800; y += 50) {
        pages[0].drawText(`${y}`, { x: 10, y, size: 8 });
    }
*/
//import fs from 'fs';
const loadBlanker = async () => {
    const response = await fetch('.\EPR-Res\Blanker  - Supervisory and Administrative 02-13 .pdf'); // Relative to the site root
    if (!response.ok) throw new Error('Failed to load PDF');
    return await response.arrayBuffer();
};
const loadWorkPlan = async () => {
    const response = await fetch('.\EPR-Res\Employee Work Plan form.pdf'); // Relative to the site root
    if (!response.ok) throw new Error('Failed to load PDF');
    return await response.arrayBuffer();
};
const loadOutsideEmployment = async () => {
    const response = await fetch('.\EPR-Res\Outside Employment.pdf'); // Relative to the site root
    if (!response.ok) throw new Error('Failed to load PDF');
    return await response.arrayBuffer();
};
//FORMATING: const selectedValue = document.getElementById('mySelect').value;
async function onSubmit() {
    // This function is called when the form is submitted
    // It can be thought of as the main function.
    alert("Form submitted successfully!"); //This just lets me refresh the page to cancel a download if I forgot to do something
    const blank = await loadPDF('./EPR-Res/Blanker  - Supervisory and Administrative 02-13 .pdf')
    await pdfinize_head(blank);
    await pdfinize_p(blank);
    await pdfinize_body(blank);
    await pdfinize_feet(blank);
    await pdf_print(blank, "Filled_Supervisory_Performance_Review"); 
// Now call all the pdfinize functions for the other two PDFs
    const workPlan = await loadPDF('./EPR-Res/Employee Work Plan form.pdf');
    await pdfinize_goals(workPlan);
    await pdf_print(workPlan, "Filled_Employee_Work_Plan"); // Export the work plan PDF
    const outsideEmployment = await loadPDF('./EPR-Res/Outside Employment.pdf');
    await pdfinize_oemp(outsideEmployment);

    

}

async function loadPDF(name) {
    // This function is called to load the PDF document
    const response = await fetch(name);
    const pdfByte = await response.arrayBuffer();
    const { PDFDocument, rgb, StandardFonts } = PDFLib;
    const loadBlank = await PDFDocument.load(pdfByte); // Load the PDF document
    return loadBlank;
}
//This function is used by the pdfinize functions to draw on the pdf
async function editPDF(loadBlank,x, y, text, width,fs){
    //const loadBlank = await PDFDocument.load(fs.readFileSync('.\Blanker  - Supervisory and Administrative 02-13 .pdf'));
    //const pages = loadBlank.getPages(); //theres only two pages and im only editing the first one
    const pages = await loadBlank.getPages(); // Get the pages from the loaded PDF
    const font = await loadBlank.embedFont(PDFLib.StandardFonts.Helvetica);; //Get the font from the family



    pages[0].drawText(text, {
        x: x,
        y: 600 - y,
        size: fs, // Use a fixed size if fs is provided, otherwise use default
        color: PDFLib.rgb(0, 0, 0), // Black color
        maxWidth: width, // Wrap text if specified
        
        font: font, // Use the embedded font

    });
    //fs.writeFileSync('./Filled Supervisory.pdf', pdfFill); // Save the modified PDF TO THE DISC. FOR THE ACTUAL SITE WE WILL BE EXPORTING TO A BLOB
    return loadBlank; // Return the modified PDF document
}
//PDF GENERATION: These functions are placeholders for PDF generation functionality
//Might combine them all later, but for now they are separate for clarity
async function pdfinize_head(blank) {
    await editPDF(blank,30,68, document.getElementById('name').value, 200,12);// Add Name
    await editPDF(blank,260,68, document.getElementById('position').value, 200,12);// Add Position
    await editPDF(blank,400,68, document.getElementById('ID').value, 200,12);// Add ID
    await editPDF(blank,470,68, document.getElementById('department').value, 200,12); // Add Department
    await editPDF(blank,635,68, document.getElementById('evaluationType').value, 200,12); // Add Evaluation Type
    // This function is called to convert the head to PDF
    //IDS INCLUDE IN THIS ORDER Name, Position, ID, Department, EvaluationType.
    //alert("PDF generation is not implemented yet.");
}
async function pdfinize_p(blank) {
    await editPDF(blank,667,115-8, document.getElementById('p1').value, 200,8); // p1
    await editPDF(blank,667,126-7, document.getElementById('p2').value, 200,8);// p2
    await editPDF(blank,667,140-6, document.getElementById('p3').value, 200,8);// p3
    await editPDF(blank,667,158-8, document.getElementById('p4').value, 200,8);// p4
    await editPDF(blank,228,200-10, document.getElementById('tardy').value, 200,8);// tardy
    await editPDF(blank,485,200-10, document.getElementById('sickDays').value, 200,8);// sick days
    await editPDF(blank,667,187-8, document.getElementById('p5').value, 200,8);// p5
    await editPDF(blank,667,215-8, document.getElementById('p6').value, 200,8);// p6
    await editPDF(blank,667,228-8, document.getElementById('p7').value, 200,8);// p7
    await editPDF(blank,667,240-8, document.getElementById('p8').value, 200,8);// p8
    await editPDF(blank,667,255-5, document.getElementById('p9').value, 200,8);// p9
    await editPDF(blank,667,275-8, document.getElementById('overallP').value, 200,8);// overall performance
    // This function is called to convert the performance factors to PDF
    //IDS INCLUDE IN THIS ORDER p1-p5, Tardy, SickDays, p6-p9, OverallP
    //alert("PDF generation is not implemented yet.");
}
async function pdfinize_body(blank) {
    // This function is called to convert the comments and signatures to PDF
    //IDS INCLUDE IN THIS ORDER comments,e1-e4
    //alert("PDF generation is not implemented yet.");
    const pages = await blank.getPages();
    await editPDF(blank, 35, 305, document.getElementById('comments').value, 68*6,8); // Attached Comments
        //x: 474, e1 box coords
        //y: 432,
    if (document.getElementById('e2').checked) {
        pages[0].drawRectangle({
            x: 472,
            y: 608 - 443,
            width: 5,
            height: 5,
            color: PDFLib.rgb(0., 0., 0.) // RGB values from 0 to 1
        });    
    }
    if (document.getElementById('e3').checked) {
    pages[0].drawRectangle({
        x: 472,
        y: 608 - 453,
        width: 5,
        height: 5,
        color: PDFLib.rgb(0., 0., 0.) // RGB values from 0 to 1
    });
    }
    if (document.getElementById('e4').checked) {
    pages[0].drawRectangle({
        x: 472,
        y: 608- 474,
        width: 5,
        height: 5,
        color: PDFLib.rgb(0, 0, 0) // RGB values from 0 to 1
    });
    }
}
async function pdfinize_feet(blank) {
    // This function is called to convert the salary increment to PDF
    //IDS INCLUDE IN THIS ORDER SalaryInc
    //alert("PDF generation is not implemented yet.");
    const pages = await blank.getPages();
    if (document.getElementById('salaryInc').value === "A") {
    pages[0].drawRectangle({
        x: 315,
        y: 609 - 520,
        width: 5,
        height: 5,
        color: PDFLib.rgb(0., 0., 0.) // RGB values from 0 to 1
    });    
    }
    if (document.getElementById('salaryInc').value === "N") {
    pages[0].drawRectangle({
        x: 372,
        y: 609 - 520,
        width: 5,
        height: 5,
        color: PDFLib.rgb(0., 0., 0.) // RGB values from 0 to 1
    });
    }
    if (document.getElementById('salaryInc').value === "D") {
    pages[0].drawRectangle({
        x: 447,
        y: 609- 520,
        width: 5,
        height: 5,
        color: PDFLib.rgb(0, 0, 0) // RGB values from 0 to 1
    });
    }
}

async function pdfinize_signatures(blank) {
    // This function is called to convert the signatures to PDF
}

async function pdfinize_goals(workPlan) {
    // This function is called to convert the performance goals to PDF
    //ids include in this order Pnum, SuperV performance-goals-textarea, training-assistance-textarea, supervisors-comments-textarea, employees-comments-textarea
    const pages = await workPlan.getPages();
    await editPDF(workPlan, 150, 108-190, document.getElementById('name').value, 68*6,12); // Name
    await editPDF(workPlan, 128, 163-190, document.getElementById('department').value, 68*6,12); // Department
    await editPDF(workPlan, 45, 230-190, document.getElementById('performance-goals-textarea').value, 68*6,10); // Performance Goals
    await editPDF(workPlan, 473, 108-190, document.getElementById('pNum').value, 68*6,12); // Pnum
    await editPDF(workPlan, 45, 390-190, document.getElementById('training-assistance-textarea').value, 68*6,10); // Training Assistance
    await editPDF(workPlan, 45, 460-190, document.getElementById('supervisors-comments-textarea').value, 68*6,8); // Supervisor's Comments
    await editPDF(workPlan, 45, 515-190, document.getElementById('employees-comments-textarea').value, 68*6,8); // Employee's Comments
    await editPDF(workPlan, 198, 136-190, document.getElementById('SuperV').value, 68*6,12); // Supervisor
}
async function pdfinize_oemp(outsideEmployment) {
    // This function is called to convert the outside employment to PDF
    const pages = await outsideEmployment.getPages();
    await editPDF(outsideEmployment, 35, 100, document.getElementById('oEmp').value, 68*6,10); // Outside Employment Name
    await editPDF(outsideEmployment, 35, 150, document.getElementById("pNum").value, 68*6,10); // Pnum
    await editPDF(outsideEmployment, 35, 200, document.getElementById('department').value, 68*6,10); // Department
    await editPDF(outsideEmployment, 35, 250, document.getElementById('position').value, 68*6,10); // Position
    await editPDF(outsideEmployment, 35, 300, document.getElementById('SuperV').value, 68*6,10); // Supervisor
    //checkbox
    await editPDF(outsideEmployment, 35, 350, document.getElementById('outside').value, 68*6,10); // Outside Employment Status
    await editPDF(outsideEmployment, 35, 400, document.getElementById('oEmp').value, 68*6,10); // Outside Employment Name
    await editPDF(outsideEmployment, 35, 450, document.getElementById('oAdd').value, 68*6,10); // Outside Employment Address
    await editPDF(outsideEmployment, 35, 500, document.getElementById('job-description-textarea').value, 68*6,10); // Job Description
    await editPDF(outsideEmployment, 35, 550, document.getElementById('m').value, 68*6,10);
    await editPDF(outsideEmployment, 35, 550, document.getElementById('tu').value, 68*6,10); 
    await editPDF(outsideEmployment, 35, 550, document.getElementById('w').value, 68*6,10);
    await editPDF(outsideEmployment, 35, 550, document.getElementById('th').value, 68*6,10);
    await editPDF(outsideEmployment, 35, 550, document.getElementById('f').value, 68*6,10);
    await editPDF(outsideEmployment, 35, 550, document.getElementById('sa').value, 68*6,10);
    await editPDF(outsideEmployment, 35, 550, document.getElementById('su').value, 68*6,10);

}

//PDF EXPORT:
async function pdf_print(Full, filename) {
    // This function is called export the pdf to the user
    const pdfFill = await Full.save();
    const blob = new Blob([pdfFill], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename + '.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert("Export successful! Check your downloads folder.");
}