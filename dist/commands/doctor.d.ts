export type DoctorReport = {
    ok: boolean;
    messages: string[];
};
export declare function runDoctor(cwd: string): DoctorReport;
