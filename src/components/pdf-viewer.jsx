import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Document, Page, pdfjs} from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFWrapper = styled('div')`
    display: flex;
    justify-content: center;
`;

const PdfViewer = () => {
    const wrapper = useRef(null);
    const [pdfWidth, setPdfWidth] = useState(null);

    const determinePdfWidth = () => {
        if (wrapper.current) {
            const width = wrapper.current.offsetWidth;
            setPdfWidth(width);
        }
    };
    
    useEffect(() => {
        determinePdfWidth();
        window.addEventListener('resize', determinePdfWidth);
        return () => {
            window.removeEventListener('resize', determinePdfWidth);
        };
    }, []);

    return (
        <PDFWrapper ref={wrapper}>
            <Document file="/docs/Resume2021B.pdf">
                <Page pageNumber={1} width={pdfWidth} />
            </Document>
        </PDFWrapper>
    );
};

export default PdfViewer;