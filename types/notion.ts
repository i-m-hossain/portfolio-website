export interface Blog {
    title: string
    publishedAt: string
    url: string
}
export interface Recommendation {
    "firstName": string,
    "lastName": string,
    "jobTitle": string,
    "company": string,
    "status": string,
    "creationDate": string
}

export interface Certification {
    "certificationName": string,
    "certificationLink": string,
    "issued": string,
    "credentialId": string,
    "issuedBy": string
}