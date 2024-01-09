import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { Button } from '../Components/UIKit';


interface ExportToExcelProps {
    apiData: any[];
    fileName: string;
}

const ExportToExcel: React.FC<ExportToExcelProps> = ({ apiData, fileName }) => {
    const fileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (apiData: any[], fileName: string) => {
        const ws = XLSX.utils.json_to_sheet(apiData);
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };

    return (
        <Button type="link"
            onClick={() => exportToCSV(apiData, fileName)}>
            Export to Excel
        </Button>
    );
};

export default ExportToExcel;