export interface AudioToTextResponse {
    text: string;
    language: string;
    duration: number;
    task: string;
    segments: Segment[];
}

export interface Segment {
    id: number;
    seek: number;
    start: number;
    end: number;
    text: string;
    tokens: number[];
    temperature: number;
    avg_logprob: number;
    compression_ratio: number;
    no_speech_prob: number;
}
