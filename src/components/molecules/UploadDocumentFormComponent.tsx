import { Colors } from '@/constants/constants';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '../atoms/Loader';
import DocumentUpload from './UploadDocumentComponent';
import { getFinancialDetails } from '@/server/Application';

interface FinancialDetailsFormProps {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  trackingId: string;
}

export default function UploadDocumentFormComponent({
  trackingId,
  setCurrentStep,
}: FinancialDetailsFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [documents, setDocuments] = useState<File[]>([]); // To store multiple documents

  const documentData = [
    {
      documentType: 'passport',
      document: 'passport',
    },
    {
      documentType: 'visa',
      document: 'visa',
    },
  ];

  async function getDocumentsDataList() {
    const response = await getFinancialDetails(trackingId);

    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {
      if (!response.data?.data) {
        setLoading(false);
        return;
      }
    }
    setLoading(false);
  }

  // Handle form submission to upload all documents
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (documents.length === 0) {
      alert('No documents selected!');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    documents.forEach((file) => {
      formData.append('documents', file);
    });

    try {
      // Simulate API call to upload documents
      // const response = await uploadDocuments(formData);
      setTimeout(() => {
        toast.success('All documents uploaded successfully!');
        setLoading(false);
        setCurrentStep((prevStep) => prevStep + 1);
      }, 2000);
    } catch (error) {
      toast.error('Upload failed. Please try again.');
      setLoading(false);
    }
  };

  // Update selected documents state
  const handleDocumentsChange = (files: File[]) => {
    setDocuments(files);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      ) : (
        <div className="h-full">
          <form onSubmit={handleFormSubmit} className="flex h-full">
            <div className="mt-16 w-full">
              <div className="flex justify-center mb-32">
                <p className="font-serif text-2xl font-bold text-logoColorBlue lg:text-4xl">
                  Upload Documents
                </p>
              </div>

              {documentData.map((document, index) => (
                <div key={index} className="mr-2 mt-5 flex justify-center">
                  <div className="flex items-center justify-center gap-x-44 lg:flex-row flex-col w-1/2 ">
                    <label className="text-xl font-semibold text-logoColorBlue">
                      {document.documentType}
                    </label>
                    <DocumentUpload onFilesChange={handleDocumentsChange} />
                  </div>
                </div>
              ))}

              <div className="my-20 flex justify-center">
                <button
                  type="submit"
                  className="w-1/2 lg:w-1/4 rounded-xl bg-gradient-to-r from-logoColorGreen to-logoColorBlue py-4 text-base text-white"
                  disabled={loading}
                >
                  Continue
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
