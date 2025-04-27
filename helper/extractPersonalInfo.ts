import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const extractPersonalInfo=(results: array)=>{
    results
        .filter((row): row is PageObjectResponse => 'properties' in row)
        .map((row) => {
          const phone = (row.properties.phone as { type: 'phone_number'; phone_number: string }).phone_number
          const email = (row.properties.email as { type: 'email'; email: string }).email
          const title = (row.properties.title as { type: 'rich_text'; rich_text: { plain_text: string }[] }).rich_text[0].plain_text // Assuming rich_text contains at least one element
          const linkedin = (row.properties.linkedin as { type: 'url'; url: string | null }).url || ''
          const github = (row.properties.github as { type: 'url'; url: string | null }).url || ''
          const name = (row.properties.name as { type: 'title'; title: { plain_text: string }[] }).title[0].plain_text 
          
          return { name, title, phone, email, linkedin, github }
        })
}