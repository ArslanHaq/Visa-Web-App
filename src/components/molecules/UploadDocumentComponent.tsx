import React, { useState } from 'react';

interface DocumentUploadProps {
    onFilesChange: (files: File[]) => void;
}

const DocumentUpload = ({ onFilesChange }: DocumentUploadProps) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);

    // Handle file selection for multiple files
    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const selected = Array.from(files);
            const validFiles = selected.filter((file) => file.type === 'application/pdf');
            if (validFiles.length !== selected.length) {
                alert('Please select only PDF files.');
                return;
            }
            setSelectedFiles(validFiles);
            onFilesChange(validFiles); // Pass selected files to the parent component
        }
    };

    return (
        <div>
            <form>
                <input
                    type="file"
                    accept="application/pdf"
                    multiple
                    onChange={onFileChange}
                />
                {uploadStatus && <p>{uploadStatus}</p>}
            </form>
            {selectedFiles.length > 0 && (
                <ul>
                    {selectedFiles.map((file, index) => (
                        <li key={index}>{file.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DocumentUpload;
