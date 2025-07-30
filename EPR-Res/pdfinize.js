//EPR-Res/pdfinize.js
// This script is used to handle form submission and other functionalities for the EPR site

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


//PDF GENERATION: These functions are placeholders for PDF generation functionality
//Might combine them all later, but for now they are separate for clarity
function pdfinize_head() {
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