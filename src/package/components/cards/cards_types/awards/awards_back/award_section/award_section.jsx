import React, { useCallback, useMemo } from 'react';

import { FormattedMessage } from 'react-intl';
import { createUseStyles, useTheme } from 'react-jss';
import { Typography } from '@welovedevs/ui';

import { ProfileCardSectionTitle } from '../../../../../commons/profile_card/profile_card_section_title/profile_card_section_title';
import { ProfileCardSectionSubtitle } from '../../../../../commons/profile_card/profile_card_section_subtitle/profile_card_section_subtitle';
import { ProfileCardSectionText } from '../../../../../commons/profile_card/profile_card_section_text/profile_card_section_text';
import { ProfileCardSection } from '../../../../../commons/profile_card/profile_card_section/profile_card_section';
import { SeeAwardDetail } from '../../see_award_detail/see_award_detail';
import { AnimatedUnderlinedButton } from '../../../../../commons/animated_underlined_button/animated_underlined_button';
import { ConfirmDialog } from '../../../../../commons/confirm_dialog/confirm_dialog';

import { ReactComponent as LinkIcon } from '../../../../../../assets/icons/link.svg';
import { ReactComponent as RemoveIcon } from '../../../../../../assets/icons/remove_circle.svg';

import { useIsEditing } from '../../../../../hooks/use_is_editing';
import { useCallbackOpen } from '../../../../../hooks/use_callback_open';

import { styles } from './award_section_styles';
import { useCardVariant } from '../../../../../hooks/profile_card_hooks/use_card_variant';
import { getColorsFromCardVariant } from '../../../../../../utils/styles/styles_utils';
import { HttpRegex } from '../../data/validator';

const useStyles = createUseStyles(styles);

const AwardSectionComponent = ({ award, cardVariant, onDelete, index }) => {
    const classes = useStyles();

    const descriptionChunks = useMemo(
        () =>
            award.description
                ?.split('\n')
                .map((descriptionChunk, chunkIndex) => (
                    <p key={`award_description_chunk_${award.id}_${chunkIndex}`}>{descriptionChunk}</p>
                )),
        [award.description]
    );

    const formattedDate = useMemo(() => award.date?.year(), [award.date]);
    return (
        <ProfileCardSection cardVariant={cardVariant}>
            <ProfileCardSectionTitle>{award.title}</ProfileCardSectionTitle>
            <ProfileCardSectionSubtitle>{award.awarder}</ProfileCardSectionSubtitle>
            {/*<ProfileCardSectionSubtitle>{formattedDate}</ProfileCardSectionSubtitle>*/}
            <ProfileCardSectionText classes={{ container: classes.sectionText }}>
                {descriptionChunks}
            </ProfileCardSectionText>
            <Details classes={classes} award={award} onDelete={onDelete} index={index} />
        </ProfileCardSection>
    );
};

const Details = ({ award, index, onDelete, classes }) => {
    const theme = useTheme();
    const [isEditing] = useIsEditing();
    const [variant] = useCardVariant();

    const color = getColorsFromCardVariant(theme, variant).backColor;

    const awardLink = award.link;

    const link = useMemo(() => {
        if (!new RegExp(HttpRegex).test(awardLink)) {
            return `http://${awardLink}`;
        }
        return awardLink;
    }, [awardLink]);

    return (
        <div className={classes.details}>
            {award.link && (
                <div className={classes.detail}>
                    <AnimatedUnderlinedButton color={color}>
                        <a className={classes.link} href={link}>
                            <LinkIcon className={classes.detailIcon} />
                            <Typography classes={{ container: classes.detailTypography }} color="primary">
                                <FormattedMessage id="Award.section.link" defaultMessage="Link" />
                            </Typography>
                        </a>
                    </AnimatedUnderlinedButton>
                </div>
            )}
            <div className={classes.detail}>
                <SeeAwardDetail color={color} award={award} />
            </div>
            {isEditing && <RemoveAwardDetail color={color} index={index} onDelete={onDelete} classes={classes} />}
        </div>
    );
};

const RemoveAwardDetail = ({ color, index, onDelete, classes }) => {
    const [openDialog, setDialogOpened, setDialogClosed] = useCallbackOpen();

    const handleConfirm = useCallback(() => {
        onDelete(index);
        setDialogClosed();
    }, [onDelete, index]);

    return (
        <>
            <ConfirmDialog open={openDialog} onClose={setDialogClosed} onConfirm={handleConfirm} />
            <div className={classes.detail}>
                <AnimatedUnderlinedButton color={color} onClick={setDialogOpened}>
                    <RemoveIcon className={classes.detailDeleteIcon} />
                    <Typography classes={{ container: classes.detailTypography }} color="primary">
                        <FormattedMessage id="Main.lang.delete" defaultMessage="Delete" />
                    </Typography>
                </AnimatedUnderlinedButton>
            </div>
        </>
    );
};

export const AwardSection = AwardSectionComponent;
