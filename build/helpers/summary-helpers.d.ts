export declare function createSummaryTemplate(promptCount: number): {
    totalPrompts: number;
    level3Accuracy: {
        Nuance: number;
        TivoGoogle: number;
        TivoNuance: number;
    };
    services: {
        Nuance: {
            1: {
                count: number;
                percent: number;
                errors: never[];
            };
            2: {
                count: number;
                percent: number;
                errors: never[];
            };
            3: {
                count: number;
                percent: number;
                errors: never[];
            };
            total: {
                count: number;
                percent: number;
            };
        };
        TivoGoogle: {
            1: {
                count: number;
                percent: number;
                errors: never[];
            };
            2: {
                count: number;
                percent: number;
                errors: never[];
            };
            3: {
                count: number;
                percent: number;
                errors: never[];
            };
            total: {
                count: number;
                percent: number;
            };
        };
        TivoNuance: {
            1: {
                count: number;
                percent: number;
                errors: never[];
            };
            2: {
                count: number;
                percent: number;
                errors: never[];
            };
            3: {
                count: number;
                percent: number;
                errors: never[];
            };
            total: {
                count: number;
                percent: number;
            };
        };
    };
};
export declare function createServiceTemplate(): {
    1: {
        count: number;
        percent: number;
        errors: never[];
    };
    2: {
        count: number;
        percent: number;
        errors: never[];
    };
    3: {
        count: number;
        percent: number;
        errors: never[];
    };
    total: {
        count: number;
        percent: number;
    };
};
export declare function roundToHundreth(val: number): number;
//# sourceMappingURL=summary-helpers.d.ts.map