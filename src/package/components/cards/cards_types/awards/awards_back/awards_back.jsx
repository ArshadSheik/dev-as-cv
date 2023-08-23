import React, { memo, useCallback, useContext, useMemo } from 'react';

import { FormattedMessage } from 'react-intl';
import { createUseStyles } from 'react-jss';

import { ProfileCardTitle } from '../../../../commons/profile_card/profile_card_title/profile_card_title';

import { ProfileCardContent } from '../../../../commons/profile_card/profile_card_content/profile_card_content';
import { AwardSection } from './award_section/award_section';

import { DEFAULT_AWARD_IMAGE } from '../utils/images';
import { styles } from './awards_back_styles';
import { useCardVariant } from '../../../../hooks/profile_card_hooks/use_card_variant';
import { DeveloperProfileContext } from '../../../../../utils/context/contexts';
import { existsAndNotEmpty } from '../../../utils/exists_and_not_empty';
import { NoAward } from './no_award/no_award';

const useStyles = createUseStyles(styles);

const AwardsBackComponent = ({ data, handleAddButtonClick }) => {
    const [variant] = useCardVariant();
    const { onEdit } = useContext(DeveloperProfileContext);
    const classes = useStyles({ variant });

    const imageSrc = useMemo(() => data.awards?.[0]?.images?.url ?? DEFAULT_AWARD_IMAGE, [data.awards?.[0]?.images]);
    const alt = data.awards?.[0]?.title;

    const handleAwardDeletion = useCallback(
        (index) => {
            const newAwards = [...data.awards];
            newAwards.splice(index, 1);
            onEdit({ awards: newAwards });
        },
        [data, onEdit]
    );

    return (
        <>
            <ProfileCardTitle
                classes={{
                    container: classes.title,
                    typography: classes.typography
                }}
                beforeTypography={
                    <div className={classes.background}>
                        {imageSrc && <img className={classes.backgroundImage} src={imageSrc} alt={alt} />}
                        {!imageSrc && <div className={classes.stubBackground} />}
                    </div>
                }
            >
                <FormattedMessage id="Awards.back.title" defaultMessage="Awards" />
            </ProfileCardTitle>
            <ProfileCardContent>
                {data.awards?.map((award) => (
                    <AwardSection award={award} key={`award_${award.id}`} onDelete={handleAwardDeletion} />
                ))}
                {!existsAndNotEmpty(data?.awards) && <NoAward handleAddButtonClick={handleAddButtonClick} />}
            </ProfileCardContent>
        </>
    );
};

export const AwardsBack = memo(AwardsBackComponent);
