import React, { useCallback, useMemo } from 'react';

import { FormattedMessage } from 'react-intl';
import { createUseStyles, useTheme } from 'react-jss';
import { Typography } from '@welovedevs/ui';

import { ProfileCardSectionTitle } from '../../../../../commons/profile_card/profile_card_section_title/profile_card_section_title';
import { ProfileCardSectionSubtitle } from '../../../../../commons/profile_card/profile_card_section_subtitle/profile_card_section_subtitle';
import { ProfileCardSectionText } from '../../../../../commons/profile_card/profile_card_section_text/profile_card_section_text';
import { ProfileCardSection } from '../../../../../commons/profile_card/profile_card_section/profile_card_section';
import { SeePublicationDetail } from '../../see_publication_detail/see_publication_detail';
import { AnimatedUnderlinedButton } from '../../../../../commons/animated_underlined_button/animated_underlined_button';
import { ConfirmDialog } from '../../../../../commons/confirm_dialog/confirm_dialog';

import { ReactComponent as LinkIcon } from '../../../../../../assets/icons/link.svg';
import { ReactComponent as RemoveIcon } from '../../../../../../assets/icons/remove_circle.svg';

import { useIsEditing } from '../../../../../hooks/use_is_editing';
import { useCallbackOpen } from '../../../../../hooks/use_callback_open';

import { styles } from './publication_section_styles';
import { useCardVariant } from '../../../../../hooks/profile_card_hooks/use_card_variant';
import { getColorsFromCardVariant } from '../../../../../../utils/styles/styles_utils';
import { HttpRegex } from '../../data/validator';

const useStyles = createUseStyles(styles);

const PublicationSectionContainer = ({ publication, cardVariant, onDelete, index }) => {
    const classes = useStyles();

    const descriptionChunks = useMemo(
        () =>
            publication.description
                ?.split('\n')
                .map((descriptionChunk, chunkIndex) => (
                    <p key={`publication_description_chunk_${publication.id}_${chunkIndex}`}>{descriptionChunk}</p>
                )),
        [publication.description]
    );

    const formattedDate = useMemo(() => publication.date?.year(), [publication.date]);
    return (
        <ProfileCardSection cardVariant={cardVariant}>
            <ProfileCardSectionTitle>{publication.name}</ProfileCardSectionTitle>
            <ProfileCardSectionSubtitle>{publication.publisher}</ProfileCardSectionSubtitle>
            <ProfileCardSectionText classes={{ container: classes.sectionText }}>
                {descriptionChunks}
            </ProfileCardSectionText>
            <Details classes={classes} publication={publication} onDelete={onDelete} index={index} />
        </ProfileCardSection>
    );
};

const Details = ({ publication, index, onDelete, classes }) => {
    const theme = useTheme();
    const [isEditing] = useIsEditing();
    const [variant] = useCardVariant();

    const color = getColorsFromCardVariant(theme, variant).backColor;

    const publicationLink = publication.link;

    const link = useMemo(() => {
        if (!new RegExp(HttpRegex).test(publicationLink)) {
            return `http://${publicationLink}`;
        }
        return publicationLink;
    }, [publicationLink]);

    return (
        <div className={classes.details}>
            {publication.link && (
                <div className={classes.detail}>
                    <AnimatedUnderlinedButton color={color}>
                        <a className={classes.link} href={link}>
                            <LinkIcon className={classes.detailIcon} />
                            <Typography classes={{ container: classes.detailTypography }} color="primary">
                                <FormattedMessage id="Publication.section.link" defaultMessage="Link" />
                            </Typography>
                        </a>
                    </AnimatedUnderlinedButton>
                </div>
            )}
            <div className={classes.detail}>
                <SeePublicationDetail color={color} publication={publication} />
            </div>
            {isEditing && <RemovePublicationDetail color={color} index={index} onDelete={onDelete} classes={classes} />}
        </div>
    );
};

const RemovePublicationDetail = ({ color, index, onDelete, classes }) => {
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

export const PublicationSection = PublicationSectionContainer;
