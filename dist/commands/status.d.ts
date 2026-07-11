export type StatusReport = {
    installed: boolean;
    packVersion?: string;
    currentPackVersion: string;
    hosts?: string[];
    drift: string[];
    missing: string[];
};
export declare function runStatus(cwd: string): StatusReport;
