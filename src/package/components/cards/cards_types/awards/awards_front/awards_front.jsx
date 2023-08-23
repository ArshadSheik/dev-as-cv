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
import { DEFAULT_AWARD_IMAGE } from '../utils/images';
import { styles } from './awards_front_styles';
import { existsAndNotEmpty } from '../../../utils/exists_and_not_empty';
import { NoDataButton } from '../../../../commons/no_data_button/no_data_button';

const useStyles = createUseStyles(styles);

const AwardsFrontComponent = ({ data, handleAddButtonClick }) => {
    const [side, setSide] = useCardSide();

    const handleButtonClick = useCallback(() => setSide(side === SIDES.FRONT ? SIDES.BACK : SIDES.FRONT), [
        side,
        setSide
    ]);

    const [variant] = useCardVariant();
    const imageSrc = useMemo(() => data.awards?.[0]?.images?.url ?? DEFAULT_AWARD_IMAGE, [data.awards?.[0]?.images]);
    const alt = data.awards?.[0]?.title;

    const awardTitle = useMemo(() => {
        if (!data.awards?.[0]) {
            return '';
        }
        if (data.awards?.[0].title) {
            return data.awards?.[0].title;
        }
        return data.awards?.[0].description?.slice(0, 20) ?? '';
    }, [data.awards?.[0]]);

    const classes = useStyles({ variant, hasImage: !!imageSrc });

    const hasAward = useMemo(() => existsAndNotEmpty(data?.awards), [data]);

    return (
        <>
            <div className={classes.background}>
                {imageSrc && <img className={classes.backgroundImage} src={imageSrc} alt={alt} />}
            </div>
            <div className={classes.content}>
                <Content
                    hasAward={hasAward}
                    awardTitle={awardTitle}
                    handleAddButtonClick={handleAddButtonClick}
                    classes={classes}
                />
            </div>
            {hasAward && (
                <ProfileCardActions>
                    <ProfileCardButton onClick={handleButtonClick}>
                        <FormattedMessage
                            id="Awards.front.action"
                            defaultMessage="See {count} certifications{count, plural, one {} other {s}}"
                            values={{
                                count: data.awards?.length
                            }}
                        />
                    </ProfileCardButton>
                </ProfileCardActions>
            )}
        </>
    );
};

const Content = ({ hasAward, awardTitle, handleAddButtonClick, classes }) => {
    if (hasAward) {
        return (
            <Typography variant="h2" component="h2" classes={{ container: classes.text }}>
                <FormattedMessage id="Awards.front.title" defaultMessage="Certifications : " values={{}} />
                {awardTitle}
            </Typography>
        );
    }
    return (
        <div className={classes.noAward}>
            <Typography variant="h3" component="h3" classes={{ container: classes.noAwardTypography }}>
                <FormattedMessage id="Awards.front.noAward" defaultMessage="You didn't add any certifications." />
                {awardTitle}
            </Typography>
            <NoDataButton
                classes={{
                    container: classes.addButton
                }}
                handleAddButtonClick={handleAddButtonClick}
            >
                <FormattedMessage id="Awards.noAward.buttonLabel" defaultMessage="Ajouter un projet" />
            </NoDataButton>
        </div>
    );
};

export const AwardsFront = memo(AwardsFrontComponent);
