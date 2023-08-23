import React, { memo, useCallback, useContext, useMemo } from 'react';

import { FormattedMessage } from 'react-intl';
import { createUseStyles } from 'react-jss';

import { ProfileCardTitle } from '../../../../commons/profile_card/profile_card_title/profile_card_title';

import { ProfileCardContent } from '../../../../commons/profile_card/profile_card_content/profile_card_content';
import { PublicationSection } from './publication_section/publication_section';

import { DEFAULT_PUBLICATION_IMAGE } from '../utils/images';
import { styles } from './publications_back_styles';
import { useCardVariant } from '../../../../hooks/profile_card_hooks/use_card_variant';
import { DeveloperProfileContext } from '../../../../../utils/context/contexts';
import { existsAndNotEmpty } from '../../../utils/exists_and_not_empty';
import { NoPublication } from './no_publication/no_publication';

const useStyles = createUseStyles(styles);

const PublicationsBackComponent = ({ data, handleAddButtonClick }) => {
    const [variant] = useCardVariant();
    const { onEdit } = useContext(DeveloperProfileContext);
    const classes = useStyles({ variant });

    const imageSrc = useMemo(() => data.publications?.[0]?.images?.url ?? DEFAULT_PUBLICATION_IMAGE, [
        data.publications?.[0]?.images
    ]);
    const alt = data.publications?.[0]?.title;

    const handlePublicationDeletion = useCallback(
        (index) => {
            const newPublications = [...data.publications];
            newPublications.splice(index, 1);
            onEdit({ publications: newPublications });
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
                <FormattedMessage id="Publications.back.title" defaultMessage="Publications" />
            </ProfileCardTitle>
            <ProfileCardContent>
                {data.publications?.map((publication) => (
                    <PublicationSection
                        publication={publication}
                        key={`publication_${publication.id}`}
                        onDelete={handlePublicationDeletion}
                    />
                ))}
                {!existsAndNotEmpty(data?.publications) && (
                    <NoPublication handleAddButtonClick={handleAddButtonClick} />
                )}
            </ProfileCardContent>
        </>
    );
};

export const PublicationsBack = memo(PublicationsBackComponent);
