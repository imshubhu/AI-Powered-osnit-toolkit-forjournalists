// types/document.ts
export interface Entity {
    value: string;
    type: 'PER' | 'ORG' | 'LOC';
    confidence: number;
    start: number;
    end: number;
}

export interface AIMetadata {
    ai_models: {
        summarization: string;
        ner: string;
    };
    confidence: number;
    pii_redacted: boolean;
    journalist_id: string;
    processing_time: string;
}

export interface DocumentAnalysis {
    summary: string;
    entities: Entity[];
    citations: string[];
    _meta: AIMetadata;
}