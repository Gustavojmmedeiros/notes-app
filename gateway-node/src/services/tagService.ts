import { javaClient } from "./javaClient.js";

export interface Tag {
  id: number;
  label: string;
}

export const createTag = async (label: string): Promise<Tag | null> => {

  try {

    const response = await javaClient.post('/tags', { label });

    return response.data;

  } catch(error) {

    console.error(`Error creating tag ${label}: `, error);

    return null;
    
  }
}

export const getTagByLabel = async (label: string): Promise<Tag | null> => {

  console.log('*****');
  try {

    console.log('label: ', label);
    const response = await javaClient.get(`/tags?label=${label}`);
    console.log('response.status: ', response.status);
    console.log('response.data: ', response.data);
    const tags = response.data;

    if(tags.length > 0) return tags[0];

    return await createTag(label);    

  } catch(error) {

    console.error(`Error fetching tag "${label}": `, error);

    return null;
  }
}

export const getTagsByLabels = async (labels: string[]): Promise<number[]> => {

  const ids: number[] = [];

  for(let label of labels) {
    console.log('labels: ', labels);
    let tag = await getTagByLabel(label);

    console.log('tag: ', tag);

    if(tag) ids.push(tag.id);
  }

  console.log('ids: ', ids);

  return ids;
}