import React, { ChangeEvent, use, useEffect, useState } from 'react';
import Select from 'react-select';
import { ApplicationStatus, Colors } from '@/constants/constants';
import InputComponent from '../atoms/InputComponent';
import Loader from '../atoms/Loader';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { capitalizeWords } from '@/constants/functions';
import classNames from 'classnames';
import { getDocuments } from '@/server/Docunments';
import { toast } from 'react-toastify';
import { deleteDocument, getComment, getUploadedDocuments, uploadDocument, viewDocument } from '@/server/Application';
import { set } from 'animejs';
import { ViewDocumentDto, ViewDocumentResponse } from '@/dto/DocumentData.dto';


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
interface TravelPlanFormComponentProps {
  trackingId: string;
  setCurrentStep: any;
  countries: any;
  status: string;
  setEditCurrentStep?: any;
}

export default function DocumentFormComponent({
  trackingId,
  setCurrentStep,
  status,
  setEditCurrentStep
}: TravelPlanFormComponentProps) {
  const visaTypeStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderWidth: 1,
      fontSize: '14px',
      paddingTop: '5px',
      paddingBottom: '5px',
      borderColor: state.isFocused

        ? Colors.PRIMARYGREEN
        : Colors.PRIMARYBLUE,
      boxShadow: 'none',
      '&:hover': {
        borderColor: state.isFocused
          ? Colors.PRIMARYGREEN
          : Colors.PRIMARYBLUE,
      },
    }),
    input: (provided: any) => ({
      ...provided,
      color: Colors.PRIMARYBLUE,
      backgroundColor: 'transparent',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: Colors.PRIMARYBLUE,
      backgroundColor: 'transparent',
    }),
    dropdownIndicator: (provided: any, state: any) => ({
      ...provided,
      color: state.isFocused ? Colors.PRIMARYGREEN : Colors.PRIMARYBLUE,
      '&:hover': {
        color: state.isFocused ? Colors.PRIMARYGREEN : Colors.PRIMARYBLUE,
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: Colors.PRIMARYSLATE,
    }),
  };

  const [loading, setLoading] = useState<boolean>(true);
  const [editComment, setEditComment] = useState<string>('');
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [documentOptions, setDocumentOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [previewDocumentData, setPreviewDocumentData] = useState<ViewDocumentDto>();
  const [filterOptions, setFilterOptions] = useState<any>(null);
  const [uploadedDocument, setUploadedDocument] = useState<{
    applicantDocumentId: string;
    documentId: string;
    trackingId: string;
    documentName: string;
  }[]>([]);

  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);

  function handleDocumentSelect(selectedOption: any) {
    setSelectedDocument(selectedOption);
  }
  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Please select a valid PDF file');
        return;
      }

      const maxSizeInMB = 2;
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024; // 2MB in bytes

      if (file.size > maxSizeInBytes) {
        toast.error('The file size should be less than 2MB');
        return;
      }

      setPdfFile(file);
    }
  }

  function handleUpload(pdfFile: File | null, documentType: string) {
    if (pdfFile) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        setLoading(true);
        const response = await uploadDocument(trackingId, selectedDocument.value, base64String);
        if (response.error && response.error.length > 0) {
          response.error.forEach((err: any) => {
            toast.error(`Error ${err.code}: ${err.description}`);
          });
        } else {
          if (!response.data) {
            setLoading(false);
            return;
          }
          toast.success('Document uploaded successfully');
          setPdfFile(null);
          setSelectedDocument(null);
          setPageNumber(1);
          setUploadSuccess(true);

        }
        setLoading(false);
      };

      reader.readAsDataURL(pdfFile);
    }
  }
  const [pageNumber, setPageNumber] = useState<number>(1);
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }
  function goToPrevPage() {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
  }
  function goToNextPage() {
    setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages as number));
  }

  async function removeDocument(applicantDocumentId: string) {
    const response = await deleteDocument(trackingId, applicantDocumentId);
    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {
      if (!response.data) {
        setLoading(false);
        return;
      }
      toast.success('Document deleted successfully');
      setIsRemoving(true);

    }
  }

  async function viewDocumentData(applicantDocumentId: string) {
    const response = await viewDocument(trackingId, applicantDocumentId);
    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {
      if (!response.data) {
        setLoading(false);
        return;
      }
      setPreviewDocumentData(response.data.data as ViewDocumentDto);


    }
  }
  async function getDocumentsData() {
    const response = await getDocuments(trackingId);
    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {
      if (!response.data) {
        setLoading(false);
        return;
      }
      setDocumentOptions(response.data.data.map((document: any) => ({
        label: document.documentName,
        value: document.documentId,
      })));


    }
    setLoading(false);

  }
  async function getUploadedDocumentsData() {
    const response = await getUploadedDocuments(trackingId);
    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {
      if (!response.data) {
        setLoading(false);
        return;
      }

      const uploadedDocuments = response.data.data.map((document: any) => ({
        applicantDocumentId: document.applicantDocumentId,
        documentId: document.documentId,
        trackingId: document.trackingId,
        documentName: document.documentName,
      }));

      setUploadedDocument(uploadedDocuments);
      // Filter out documents that have already been uploaded
      setFilterOptions(response.data.data.map((document: any) => ({
        label: document.documentName,
        value: document.documentId,
      })))

    }
    setLoading(false);
    setUploadSuccess(false);
  }
  async function getCommentsData() {
    const response = await getComment(trackingId);
    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {
      if (!response.data) {
        setLoading(false);
        return;
      }

      setEditComment(response.data.data.comments);

    }
    setLoading(false);
  }
  useEffect(() => {
    if (trackingId) {
      getDocumentsData();
      getUploadedDocumentsData();

    }
  }, [, trackingId]);

  useEffect(() => {
    if (uploadSuccess)
      getUploadedDocumentsData();
  }, [uploadSuccess]);


  useEffect(() => {
    if (previewDocumentData) {
      setSelectedDocument({
        label: previewDocumentData.documentName,
        value: previewDocumentData.documentId,
      });
      setPdfFile(
        new File([previewDocumentData.documentData], previewDocumentData.documentName, {
          type: 'application/pdf',
        }),
      );
    }
  }, [previewDocumentData]);

  useEffect(() => {
    setDocumentOptions((documentOptions: any) => {
      if (!documentOptions) return null;
      return documentOptions.filter((doc: any) => {
        return !filterOptions.some((filter: any) => filter.value === doc.value)
      })
    });

  }, [filterOptions, editComment]);

  useEffect(() => {
    if (isRemoving) {

      getDocumentsData();
      getUploadedDocumentsData();
      setIsRemoving(false);
    }
  }, [isRemoving]);

  useEffect(() => {

    if (status === ApplicationStatus.EDITDOCUMENTS) {
      getCommentsData();
    }

    // add lebel = 'Passport' to the document options



  }, [status]);

  const [dimensions, setDimensions] = useState({ height: 300, width: 400 });

  // Adjust height and width based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // Set larger size for md screens and up
        setDimensions({ height: 300, width: 400 });
      } else {
        // Default size for small screens
        setDimensions({ height: 200, width: 300 });
      }
    };

    // Initial check
    handleResize();

    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className="h-full">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-full">
              <div className="mt-5 flex justify-center">
                <p className="font-serif text-lg md:text-2xl font-bold text-logoColorBlue lg:text-4xl">
                  Document Details
                </p>
              </div>
              {
                status === ApplicationStatus.EDITDOCUMENTS && (
                  <div className="absolute right-10">
                    <p className="font-serif text-base ps-1 mb-2 font-bold text-logoColorBlue  ">
                      * Additional Required Documents
                    </p>
                    <div className=' border-2 border-red-500 px-5 py-3 rounded-xl'>
                      <p className="font-serif text-sm font-bold text-red-500 w-56 ">
                        {capitalizeWords(editComment)}
                      </p>
                    </div>
                  </div>
                )
              }

              <div className="flex justify-center items-center w-full">
                <div className="w-full md:w-1/2 md:flex md:flex-row flex flex-col justify-center items-center">
                  <div className="w-full md:w-1/2 justify-center">
                    <div className="mt-2 flex w-full items-center justify-center">
                      <div className="flex my-7">
                        <p className="md:text-2xl font-bold text-logoColorBlue underline underline-offset-8">
                          {' '}
                          Required Documents
                        </p>
                      </div>
                    </div>
                    <div className=''>
                      <label className="text-sm font-semibold md:ml-0 ml-10 text-logoColorBlue">
                        Documents
                      </label>
                      <div className=' flex justify-center'>

                        <Select
                          options={documentOptions}
                          styles={visaTypeStyles}
                          onChange={handleDocumentSelect}
                          value={selectedDocument}
                          required
                          isDisabled={pdfFile !== null}
                          className='md:w-full w-4/5'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {selectedDocument && !pdfFile && (
                <div className="mt-4 w-full justify-center flex items-center">
                  <div className="flex md:w-1/4 items-center justify-between border-b-2 flex-col lg:flex-row">
                    <InputComponent
                      label={selectedDocument.label}
                      type={'file'}
                      placeholder={'Upload your document'}
                      name={selectedDocument.label}
                      value={''}
                      onChange={handleFileChange}
                      className="border-0"
                      error={''}
                      required
                    />
                  </div>
                </div>
              )}
              <>
                {pdfFile && (
                  <>
                    <div className="flex w-full justify-center pt-10">
                      <div className='w-1/4 px-2 py-10 md:bg-slate-400 rounded-xl'>
                        <div className="flex justify-center">
                          <Document file={previewDocumentData ? previewDocumentData.documentData : pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                            <Page pageNumber={pageNumber} height={dimensions.height} width={dimensions.width} />
                          </Document>
                        </div>

                        <div className="flex justify-center mt-4 space-x-4">
                          {
                            numPages && numPages > 1 && (

                              <button
                                type="button"
                                className="text-sm font-bold text-logoColorBlue "
                                onClick={goToPrevPage}
                                disabled={pageNumber <= 1}
                              >
                                {'<-'}
                              </button>
                            )
                          }
                          <p className="text-sm font-bold text-logoColorBlue ">
                            Page {pageNumber} of {numPages}
                          </p>
                          {
                            numPages && numPages > 1 && (
                              <button
                                type="button"
                                className="text-sm font-bold text-logoColorBlue"
                                onClick={goToNextPage}
                                disabled={pageNumber >= (numPages as number)}
                              >
                                {'->'}
                              </button>
                            )
                          }
                        </div>
                      </div>
                    </div>

                    <div className=" w-full flex justify-center pb-20 mt-10 gap-x-4 md:gap-x-8">
                      <button
                        type="button"
                        onClick={() => {
                          setPdfFile(null);
                          setSelectedDocument(null);
                          setPageNumber(1);
                          setPreviewDocumentData(undefined);

                        }}
                        className="w-40 md:w-52 rounded-xl bg-gradient-to-r from-logoColorGreen to-logoColorBlue py-3 text-sm text-white "
                      >
                        Back
                      </button>
                      {!previewDocumentData && <button
                        type="button"
                        onClick={() => {

                          handleUpload(
                            pdfFile,
                            selectedDocument.label,
                          );

                        }}
                        className="w-40 md:w-52 rounded-xl bg-gradient-to-r from-logoColorGreen to-logoColorBlue py-3 text-sm text-white "
                      >
                        Upload
                      </button>}
                    </div>
                  </>
                )}
              </>
            </div>

            <div className="w-full pb-20">
              <div className="flex justify-center">
                <div className='h-[0.5px] w-2/3  mb-7 mt-12 bg-logoColorBlue'></div>
              </div>
              <div className=" flex justify-center gap-x-44">
                <div className="mr-2 mt-8 w-full text-center ">
                  <p className="text-logoColorBlue underline underline-offset-8 font-serif md:text-xl font-bold text-center">
                    Uploaded Documents
                  </p>
                  {
                    uploadedDocument.length === 0 ? (
                      <p className="text-logoColorBlue font-serif text-xl font-bold text-center mt-10">
                        No document is uploaded yet
                      </p>
                    ) : (
                      <div className="flex w-full items-center justify-center gap-x-44  lg:flex-row flex-col ">

                        <table className="md:w-2/3 mt-8 ms-5 ">
                          <thead>
                            <tr className=" text-logoColorBlue font-serif text-xs md:text-sm font-bold text-center ">
                              <th className="px-5 py-2">S/N</th>
                              <th className="">Document Name</th>
                              <th className="">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              uploadedDocument.map((documents, index) => (
                                <tr key={index}
                                  className="bg-gradient-to-r from-logoColorGreen to-logoColorBlue text-white font-sans font-semibold text-sm md:text-base text-center border-2 rounded-2xl border-white items-center"

                                >
                                  <td className="py-4  border-logoColorBlue rounded-s-xl">{index + 1}</td>
                                  <td className=" py-2">{capitalizeWords(documents.documentName)}</td>
                                  <td className="py-2   rounded-e-xl ">
                                    <button
                                      type="button"
                                      className={classNames("rounded-md mt-1 bg-red-600 px-3 md:px-5 py-1 md:py-2 text-xs text-white hover:bg-black")}
                                      onClick={() => {
                                        removeDocument(documents.applicantDocumentId)
                                      }}
                                    >
                                      Remove
                                    </button>
                                    <button
                                      type="button"
                                      className={classNames("rounded-md mt-1 mx-3 bg-red-600 px-3 md:px-5 py-1 md:py-2 text-xs text-white hover:bg-black")}
                                      onClick={() => {
                                        viewDocumentData(documents.applicantDocumentId)
                                      }}
                                    >
                                      View Document
                                    </button>

                                  </td>

                                </tr>
                              ))
                            }
                          </tbody>
                        </table>
                      </div>
                    )
                  }
                </div>

              </div>
              <div className="my-20 flex justify-center">
                <button
                  type='button'
                  onClick={() => {
                    if (uploadedDocument.length > 0 && uploadedDocument.map((document) => document.documentName).includes('passport')) {
                      if (status === ApplicationStatus.EDITDOCUMENTS) {
                        setEditCurrentStep(1);
                      }
                      else
                        setCurrentStep(2);
                    }
                    else {
                      toast.error('Please upload your passport');
                      return;
                    }
                  }}
                  className="w-3/4 md:w-1/4 rounded-xl bg-gradient-to-r from-logoColorGreen to-logoColorBlue py-4 text-sm md:text-base text-white"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div >
      )
      }
    </>
  );
}
