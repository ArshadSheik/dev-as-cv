import uuid from 'uuid/v4';
import moment from 'moment';

export const mapAwardsFromJsonResume = (jsonResume) => ({
    awards: jsonResume?.awards
        ?.map((award, index) => {
            const awardIndex = Number(award.index);
            return {
                ...award,
                // generating uuid for manipulating data if not present
                id: award.id || uuid(),
                date: award.endDate && moment(award.endDate, 'YYYY-MM-DD'),
                index: Number.isNaN(awardIndex) ? index : awardIndex
            };
        })
        .sort(({ index: a }, { index: b }) => a - b)
});

export const mapAwardToJsonResume = (award) => ({
    ...award,
    id: award.id || uuid(),
    endDate: award.date && award.date.format('YYYY-MM-DD')
});

export const updateAwardsArray = (newAward, jsonResume) => {
    if (!jsonResume.awards?.length) {
        return { awards: [newAward] };
    }
    const newAwards = [...jsonResume.awards].sort(({ index: a }, { index: b }) => a - b);
    if (!Number.isNaN(Number(newAward.index))) {
        newAwards[newAward.index] = newAward;
        return { awards: newAwards };
    }
    return { awards: newAwards.concat(newAward) };
};
