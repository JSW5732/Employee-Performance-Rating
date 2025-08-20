//EPR-Res/pdfinize.js
// This script is used to handle form submission and other functionalities for the EPR site

const loadBlanker = async () => {
    const response = await fetch('.\EPR-Res\Blanker  - Supervisory and Administrative 02-13 .pdf'); // Relative to the site root
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
async function onSubmit() {
    const form = document.getElementById('performanceRatingForm'); // Check to make sure the form is filled out correctly
    if (!form.checkValidity()) { 
        alert("Please fill out all required fields before submitting.");
        return; 
    }

    alert("Form submitted successfully!"); 
    let blank = await loadPDF('./EPR-Res/Blanker  - Supervisory and Administrative 02-13 .pdf')
    await pdfinize_head(blank);
    await pdfinize_p(blank);
    await pdfinize_body(blank);
    await pdfinize_feet(blank);
    blank = await handleAttachedPDFs(blank, 'commentsFile'); 
    await pdf_print(blank, "Filled_Supervisory_Performance_Review"); 

    let workPlan = await loadPDF('./EPR-Res/Employee Work Plan form.pdf');
    await pdfinize_goals(workPlan);
    workPlan = await handleAttachedPDFs(workPlan, 'performanceGoalsFile');
    workPlan = await handleAttachedPDFs(workPlan, 'trainingFile');
    workPlan = await handleAttachedPDFs(workPlan, 'supervisorsCommentsFile');
    workPlan = await handleAttachedPDFs(workPlan, 'employeesCommentsFile');
    await pdf_print(workPlan, "Filled_Employee_Work_Plan"); 

    let outsideEmployment = await loadPDF('./EPR-Res/Outside Employment.pdf');
    await pdfinize_oemp(outsideEmployment);
    outsideEmployment = await handleAttachedPDFs(outsideEmployment, 'jobDescriptionFile');
    await pdf_print(outsideEmployment, "Filled_Outside_Employment_Disclosure_Form"); 
}

async function loadPDF(name) {
    const response = await fetch(name);
    const pdfByte = await response.arrayBuffer();
    const { PDFDocument, rgb, StandardFonts } = PDFLib;
    const loadBlank = await PDFDocument.load(pdfByte); 
    return loadBlank;
}
async function editPDF(loadBlank,x, y, text, width,fs){
    const pages = await loadBlank.getPages(); 
    const font = await loadBlank.embedFont(PDFLib.StandardFonts.Helvetica); 

    pages[0].drawText(text, {
        x: x,
        y: 600 - y,
        size: fs,
        lineHeight: 1.7 * fs, 
        color: PDFLib.rgb(0, 0, 0),
        maxWidth: width, 
        font: font, 
    });
    return loadBlank;
}
async function pdfinize_head(blank) {
    await editPDF(blank,30,68, document.getElementById('name').value, 200,12);
    await editPDF(blank,260,68, document.getElementById('position').value, 200,12);
    await editPDF(blank,400,68, document.getElementById('ID').value, 200,12);
    await editPDF(blank,470,68, document.getElementById('department').value, 200,12);
    await editPDF(blank,635,68, document.getElementById('evaluationType').value, 200,12);
}
async function pdfinize_p(blank) {
    await editPDF(blank,667,115-8, document.getElementById('p1').value, 200,8);
    await editPDF(blank,667,126-7, document.getElementById('p2').value, 200,8);
    await editPDF(blank,667,140-6, document.getElementById('p3').value, 200,8);
    await editPDF(blank,667,158-8, document.getElementById('p4').value, 200,8);
    await editPDF(blank,228,200-10, document.getElementById('tardy').value, 200,8);
    await editPDF(blank,485,200-10, document.getElementById('sickDays').value, 200,8);
    await editPDF(blank,667,187-8, document.getElementById('p5').value, 200,8);
    await editPDF(blank,667,215-8, document.getElementById('p6').value, 200,8);
    await editPDF(blank,667,228-8, document.getElementById('p7').value, 200,8);
    await editPDF(blank,667,240-8, document.getElementById('p8').value, 200,8);
    await editPDF(blank,667,255-5, document.getElementById('p9').value, 200,8);
    await editPDF(blank,667,275-8, document.getElementById('overallP').value, 200,8);
}
async function pdfinize_body(blank) {
    const pages = await blank.getPages();
    await editPDF(blank, 35, 305, document.getElementById('comments').value, 68*6,8); 
    if (document.getElementById('e0').checked) {
        pages[0].drawRectangle({
            x: 471,
            y: 608 - 432,
            width: 7,
            height: 7,
            color: PDFLib.rgb(0., 0., 0.)
        });    
    }
    if (document.getElementById('e2').checked) {
        pages[0].drawRectangle({
            x: 471,
            y: 608 - 443,
            width: 7,
            height: 7,
            color: PDFLib.rgb(0., 0., 0.)
        });    
    }
    if (document.getElementById('e3').checked) {
    pages[0].drawRectangle({
        x: 471,
        y: 608 - 453,
        width: 7,
        height: 7,
        color: PDFLib.rgb(0., 0., 0.)
    });
    }
    if (document.getElementById('e4').checked) {
    pages[0].drawRectangle({
        x: 471,
        y: 608- 474,
        width: 7,
        height: 7,
        color: PDFLib.rgb(0, 0, 0) 
    });
    }
}
async function pdfinize_feet(blank) {
    const pages = await blank.getPages();
    if (document.getElementById('salaryInc').value === "A") {
    pages[0].drawRectangle({
        x: 315,
        y: 609 - 520,
        width: 5,
        height: 5,
        color: PDFLib.rgb(0., 0., 0.)
    });    
    }
    if (document.getElementById('salaryInc').value === "N") {
    pages[0].drawRectangle({
        x: 372,
        y: 609 - 520,
        width: 5,
        height: 5,
        color: PDFLib.rgb(0., 0., 0.)
    });
    }
    if (document.getElementById('salaryInc').value === "D") {
    pages[0].drawRectangle({
        x: 447,
        y: 609- 520,
        width: 5,
        height: 5,
        color: PDFLib.rgb(0, 0, 0)
    });
    }
}

async function pdfinize_goals(workPlan) {
    const pages = await workPlan.getPages();
    await editPDF(workPlan, 150, 108-190, document.getElementById('name').value, 520,12); 
    await editPDF(workPlan, 128, 163-190, document.getElementById('department').value, 520,12); 
    await editPDF(workPlan, 45, 230-190, document.getElementById('performance-goals-textarea').value, 520,10); 
    await editPDF(workPlan, 473, 108-190, document.getElementById('pNum').value, 520,12); 
    await editPDF(workPlan, 45, 390-190, document.getElementById('training-assistance-textarea').value, 520,10); 
    await editPDF(workPlan, 45, 460-190, document.getElementById('supervisors-comments-textarea').value, 520,8); 
    await editPDF(workPlan, 45, 515-190, document.getElementById('employees-comments-textarea').value, 520,8); 
    await editPDF(workPlan, 198, 136-190, document.getElementById('SuperV').value, 520,12); 
}
async function pdfinize_oemp(outsideEmployment) {
    const pages = await outsideEmployment.getPages();
    await editPDF(outsideEmployment, 160, 252-190, document.getElementById('name').value, 520,10); 
    await editPDF(outsideEmployment, 127, 267-190, document.getElementById("pNum").value, 520,10); 
    await editPDF(outsideEmployment, 257, 267-190, document.getElementById('department').value, 520,10); 
    await editPDF(outsideEmployment, 474, 267-190, document.getElementById('position').value, 520,10); 
    await editPDF(outsideEmployment, 237, 280-190, document.getElementById('SuperV').value, 520,10); 
    if (document.getElementById('cSup').checked) {
        pages[0].drawRectangle({
            x: 100,
            y: 790 - 296,
            width: 6,
            height: 6,
            color: PDFLib.rgb(0., 0., 0.)
    });
    }
    if (document.getElementById('outside').value === "Yes") {
        await editPDF(outsideEmployment, 98, 345-190, "X", 520,10); 
    } else {
        await editPDF(outsideEmployment, 95, 328-190, "X", 520,10);
    }
    await editPDF(outsideEmployment, 260, 362-190, document.getElementById('oEmp').value, 520,10); 
    await editPDF(outsideEmployment, 268, 380-190, document.getElementById('oAdd').value, 520,10); 
    await editPDF(outsideEmployment, 70, 465-190, document.getElementById('job-description-textarea').value, 520,10);
    await editPDF(outsideEmployment, 142, 415-190, document.getElementById('m').value, 520,10);
    await editPDF(outsideEmployment, 275, 415-190, document.getElementById('tu').value, 520,10); 
    await editPDF(outsideEmployment, 400, 415-190, document.getElementById('w').value, 520,10);
    await editPDF(outsideEmployment, 507, 415-190, document.getElementById('th').value, 520,10);
    await editPDF(outsideEmployment, 142, 432-190, document.getElementById('f').value, 520,10);
    await editPDF(outsideEmployment, 277, 432-190, document.getElementById('sa').value, 520,10);
    await editPDF(outsideEmployment, 382, 432-190, document.getElementById('su').value, 520,10);
}
async function handleAttachedPDFs(mainPDF, fileInputId) {
    const fileInput = document.getElementById(fileInputId);
    if (fileInput && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        // The file type check is now handled by script.js, so we can proceed directly.
        try {
            const fileBytes = await file.arrayBuffer();
            const attachedPDF = await PDFLib.PDFDocument.load(fileBytes);
            
            const pages = await mainPDF.copyPages(attachedPDF, attachedPDF.getPageIndices());
            pages.forEach(page => {
                mainPDF.addPage(page);
            });
            console.log(`Successfully attached PDF from ${fileInput.id}.`);
        } catch (error) {
            console.error(`Error attaching PDF from ${fileInput.id}:`, error);
        }
    }
    return mainPDF;
}
async function pdf_print(Full, filename) {
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
function bindTextBoxes(box1, box2, box3) {
    const box1Element = document.getElementById(box1);
    const box2Element = document.getElementById(box2);
    const box3Element = document.getElementById(box3);
    box1Element.addEventListener('input', () => {
        box2Element.value = box1Element.value;
    });
    box2Element.addEventListener('input', () => {
        box1Element.value = box2Element.value;
    });
    box3Element.addEventListener('input', () => {
        box3Element.value = box2Element.value;
    });
    box1Element.addEventListener('input', () => {
        box3Element.value = box1Element.value;
    });
}