import React, { useCallback, useContext, useMemo } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

import { useFormikContext } from 'formik';

import { PublicationDialogContentTitle } from './publication_dialog_content_title/publication_dialog_content_title';
import { PublicationDialogContentImages } from './publication_dialog_content_images/publication_dialog_content_images';
import { PublicationDialogContentDescription } from './publication_dialog_content_description/publication_dialog_content_description';
import { PublicationDialogContentDate } from './publication_dialog_content_date/publication_dialog_content_date';

import { styles } from './publication_dialog_styles';
import { EditDialog } from '../../../../commons/edit_dialog/edit_dialog';
import { PublicationValidator } from '../data/validator';
import { mapPublicationToJsonResume, updatePublicationsArray } from '../data/mapping';
import { PublicationDialogContentLink } from './publication_dialog_content_link/publication_dialog_content_link';
import { DeveloperProfileContext } from '../../../../../utils/context/contexts';

const useStyles = createUseStyles(styles);

const DEFAULT_OBJECT = {};
const PublicationDialogComponent = ({ open, onClose, data: publication, isEditing }) => {
    const classes = useStyles();

    const { formatMessage } = useIntl();
    const { onEdit, data: resume } = useContext(DeveloperProfileContext);

    const onDialogEdited = useCallback(
        (editedData) => {
            const newPublication = mapPublicationToJsonResume(editedData);
            const newPublicationArray = updatePublicationsArray(newPublication, resume);
            onEdit(newPublicationArray);
            onClose();
        },
        [onEdit, resume]
    );

    const validator = useMemo(() => PublicationValidator(formatMessage), []);

    return (
        <EditDialog
            classes={{ content: classes.container, paper: classes.paper }}
            open={open}
            onClose={onClose}
            data={publication || DEFAULT_OBJECT}
            onEdit={onDialogEdited}
            validationSchema={validator}
            isEditing={isEditing}
            title={<FormattedMessage id="Publication.editDialog.title" defaultMessage="Publication's details" />}
        >
            {() => <PublicationDialogContent isEditing={isEditing} />}
        </EditDialog>
    );
};

const PublicationDialogContent = ({ isEditing }) => {
    const classes = useStyles();

    const { values: publication } = useFormikContext();
    return (
        <>
            <div className={classes.headrow}>
                <PublicationDialogContentTitle isEditing={isEditing} title={publication.name} />
                <PublicationDialogContentDate isEditing={isEditing} date={publication.date} />
            </div>
            <PublicationDialogContentDescription isEditing={isEditing} description={publication.description} />
            <PublicationDialogContentLink isEditing={isEditing} link={publication.link} />
            <PublicationDialogContentImages isEditing={isEditing} images={publication.images} />
        </>
    );
};

export const PublicationDialog = PublicationDialogComponent;
