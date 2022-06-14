import { Resolver } from '@stoplight/json-ref-resolver'
import generalMedicalPerspective from '../data/generalMedicalPerspective.json'

export async function fetchData() {
  //const generalMedicalPerspective = fetch('https://localhost:7150/api/model/9/json')
  
  const resolver = new Resolver();
  const data = await resolver.resolve(generalMedicalPerspective);
  console.log(data);
  return data.result;
}