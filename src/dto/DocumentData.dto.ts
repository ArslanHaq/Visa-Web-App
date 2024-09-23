interface Document {
  documentId: number;
  documentName: string;
}

interface DocumentDataResponse {
  data: {
    data: Document[];
    error: any[] | null;
  };
  error: any | null;
}

export interface ViewDocumentResponse {
  data: {
    data: ViewDocumentDto | null;
    error: any[] | null;
  };
  error: any | null;
}

export interface ViewDocumentDto {
  applicantDocumentId: number;
  documentId: number;
  documentData: string;
  trackingId: string;
  documentName: string;
}
