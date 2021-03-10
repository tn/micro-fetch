declare type MFRewriteFetchOptions = Omit<RequestInit, 'method' | 'body'>;
interface MFOptions {
    baseUrl: string;
    fetchOptions?: MFRewriteFetchOptions;
}
declare const microFetch: ({ baseUrl, fetchOptions }: MFOptions) => {
    get: (path: string, rewriteOptions?: MFRewriteFetchOptions) => Promise<Response>;
    patch: (path: string, body: BodyInit, rewriteOptions?: MFRewriteFetchOptions) => Promise<Response>;
    post: (path: string, body: BodyInit, rewriteOptions?: MFRewriteFetchOptions) => Promise<Response>;
    put: (path: string, body: BodyInit, rewriteOptions?: MFRewriteFetchOptions) => Promise<Response>;
    remove: (path: string, rewriteOptions?: MFRewriteFetchOptions) => Promise<Response>;
};

export { MFOptions, MFRewriteFetchOptions, microFetch };
