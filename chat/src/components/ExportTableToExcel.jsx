import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

// Function to export an HTML table to an Excel file
const ExportTableToExcel = async () => {
    // Select the table element from the DOM
    const table = document.querySelector("table");
    if (!table) return; // Exit if no table is found

    // Create a new Excel workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Table Chat");

    // Define a common cell style for padding and alignment
    const cellPaddingStyle = {
        alignment: {
            vertical: "middle", // Vertically center the text
            horizontal: "center", // Horizontally center the text
            wrapText: true, // Enable text wrapping
            indent: 1 // Simulates internal padding
        },
        border: {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
        },
        font: { color: { argb: "FFFFFFFF" } }, // White font color
    };

    // Define a specific style for header cells
    const headerStyle = {
        ...cellPaddingStyle,
        font: { bold: true, color: { argb: "FFFFFFFF" } }, // Bold white font
        fill: {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FF1F2937" }, // Dark background color
        },
    };

    // Capture table headers
    const headerRow = [];
    table.querySelectorAll("thead tr th").forEach((th) => {
        headerRow.push(th.innerText.trim()); // Extract and trim header text
    });

    // Add headers to the Excel worksheet
    const excelHeader = worksheet.addRow(headerRow);
    excelHeader.eachCell((cell) => {
        cell.style = headerStyle; // Apply header style
    });

    // Capture table data rows
    table.querySelectorAll("tbody tr").forEach((tr, rowIndex) => {
        const row = [];
        tr.querySelectorAll("td").forEach((td) => {
            row.push(td.innerText.trim()); // Extract and trim cell text
        });

        // Add data row to the worksheet
        const dataRow = worksheet.addRow(row);

        // Alternate row background colors for better readability
        const isEven = rowIndex % 2 === 0;
        dataRow.eachCell((cell) => {
            cell.style = {
                ...cellPaddingStyle,
                fill: {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: isEven ? "FF2A2C30" : "FF313138" }, // Alternating colors
                },
            };
        });
    });

    // Adjust column widths for better visibility
    worksheet.columns.forEach((col) => {
        col.width = 25; // Set a fixed width for all columns
    });

    // Generate the Excel file as a buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Create a Blob from the buffer and save it as an Excel file
    const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "tars_table_response.xlsx"); // Save the file with a default name
};

export default ExportTableToExcel;
