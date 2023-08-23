import uuid from 'uuid/v4';
import moment from 'moment';

export const mapPublicationsFromJsonResume = (jsonResume) => ({
    publications: jsonResume?.publications
        ?.map((publication, index) => {
            const publicationIndex = Number(publication.index);
            return {
                ...publication,
                // generating uuid for manipulating data if not present
                id: publication.id || uuid(),
                date: publication.endDate && moment(publication.endDate, 'YYYY-MM-DD'),
                index: Number.isNaN(publicationIndex) ? index : publicationIndex
            };
        })
        .sort(({ index: a }, { index: b }) => a - b)
});

export const mapPublicationToJsonResume = (publication) => ({
    ...publication,
    id: publication.id || uuid(),
    endDate: publication.date && publication.date.format('YYYY-MM-DD')
});

export const updatePublicationsArray = (newPublication, jsonResume) => {
    if (!jsonResume.publications?.length) {
        return { publications: [newPublication] };
    }
    const newPublications = [...jsonResume.publications].sort(({ index: a }, { index: b }) => a - b);
    if (!Number.isNaN(Number(newPublication.index))) {
        newPublications[newPublication.index] = newPublication;
        return { publications: newPublications };
    }
    return { publications: newPublications.concat(newPublication) };
};
