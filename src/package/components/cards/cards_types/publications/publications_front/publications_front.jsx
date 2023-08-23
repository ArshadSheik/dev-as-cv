import React, { memo, useCallback, useMemo } from 'react';

import { Twemoji } from 'react-emoji-render';
import { FormattedMessage } from 'react-intl';
import { createUseStyles } from 'react-jss';

import { Typography } from '@welovedevs/ui';

import { ProfileCardActions } from '../../../../commons/profile_card/profile_card_actions/profile_card_actions';
import { ProfileCardButton } from '../../../../commons/profile_card/profile_card_button/profile_card_button';

import { useCardSide } from '../../../../hooks/profile_card_hooks/use_card_side';
import { useCardVariant } from '../../../../hooks/profile_card_hooks/use_card_variant';

import { SIDES } from '../../../../commons/profile_card/profile_card_side/side';
import { DEFAULT_PUBLICATION_IMAGE } from '../utils/images';
import { styles } from './publications_front_styles';
import { existsAndNotEmpty } from '../../../utils/exists_and_not_empty';
import { NoDataButton } from '../../../../commons/no_data_button/no_data_button';

const useStyles = createUseStyles(styles);

const PublicationsFrontComponent = ({ data, handleAddButtonClick }) => {
    const [side, setSide] = useCardSide();

    const handleButtonClick = useCallback(() => setSide(side === SIDES.FRONT ? SIDES.BACK : SIDES.FRONT), [
        side,
        setSide
    ]);

    const [variant] = useCardVariant();
    const imageSrc = useMemo(() => data.publications?.[0]?.images?.url ?? DEFAULT_PUBLICATION_IMAGE, [
        data.publications?.[0]?.images
    ]);
    const alt = data.publications?.[0]?.title;

    const publicationTitle = useMemo(() => {
        if (!data.publications?.[0]) {
            return '';
        }
        if (data.publications?.[0].name) {
            return data.publications?.[0].name;
        }
        return data.publications?.[0].description?.slice(0, 20) ?? '';
    }, [data.publications?.[0]]);

    const classes = useStyles({ variant, hasImage: !!imageSrc });

    const hasPublication = useMemo(() => existsAndNotEmpty(data?.publications), [data]);

    return (
        <>
            <div className={classes.background}>
                {imageSrc && <img className={classes.backgroundImage} src={imageSrc} alt={alt} />}
            </div>
            <div className={classes.content}>
                <Content
                    hasPublication={hasPublication}
                    publicationTitle={publicationTitle}
                    handleAddButtonClick={handleAddButtonClick}
                    classes={classes}
                />
            </div>
            {hasPublication && (
                <ProfileCardActions>
                    <ProfileCardButton onClick={handleButtonClick}>
                        <FormattedMessage
                            id="Publications.front.action"
                            defaultMessage="See {count} publication{count, plural, one {} other {s}}"
                            values={{
                                count: data.publications?.length
                            }}
                        />
                    </ProfileCardButton>
                </ProfileCardActions>
            )}
        </>
    );
};

const Content = ({ hasPublication, publicationTitle, handleAddButtonClick, classes }) => {
    if (hasPublication) {
        return (
            <Typography variant="h2" component="h2" classes={{ container: classes.text }}>
                <FormattedMessage id="Publications.front.title" defaultMessage="Publications : " values={{}} />
                {publicationTitle}
            </Typography>
        );
    }
    return (
        <div className={classes.noPublication}>
            <Typography variant="h3" component="h3" classes={{ container: classes.noPublicationTypography }}>
                <FormattedMessage
                    id="Publications.front.noPublication"
                    defaultMessage="You didn't add any publications."
                />
                {publicationTitle}
            </Typography>
            <NoDataButton
                classes={{
                    container: classes.addButton
                }}
                handleAddButtonClick={handleAddButtonClick}
            >
                <FormattedMessage id="Publications.noPublication.buttonLabel" defaultMessage="Ajouter un projet" />
            </NoDataButton>
        </div>
    );
};

export const PublicationsFront = memo(PublicationsFrontComponent);
