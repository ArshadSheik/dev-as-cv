import React, { useCallback, useContext, useMemo } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

import { useFormikContext } from 'formik';

import { AwardDialogContentTitle } from './award_dialog_content_title/award_dialog_content_title';
import { AwardDialogContentImages } from './award_dialog_content_images/award_dialog_content_images';
import { AwardDialogContentDescription } from './award_dialog_content_description/award_dialog_content_description';
import { AwardDialogContentDate } from './award_dialog_content_date/award_dialog_content_date';

import { styles } from './award_dialog_styles';
import { EditDialog } from '../../../../commons/edit_dialog/edit_dialog';
import { AwardValidator } from '../data/validator';
import { mapAwardToJsonResume, updateAwardsArray } from '../data/mapping';
import { AwardDialogContentLink } from './award_dialog_content_link/award_dialog_content_link';
import { DeveloperProfileContext } from '../../../../../utils/context/contexts';

const useStyles = createUseStyles(styles);

const DEFAULT_OBJECT = {};
const AwardDialogComponent = ({ open, onClose, data: award, isEditing }) => {
    const classes = useStyles();

    const { formatMessage } = useIntl();
    const { onEdit, data: resume } = useContext(DeveloperProfileContext);

    const onDialogEdited = useCallback(
        (editedData) => {
            const newAward = mapAwardToJsonResume(editedData);
            const newAwardArray = updateAwardsArray(newAward, resume);
            onEdit(newAwardArray);
            onClose();
        },
        [onEdit, resume]
    );

    const validator = useMemo(() => AwardValidator(formatMessage), []);

    return (
        <EditDialog
            classes={{ content: classes.container, paper: classes.paper }}
            open={open}
            onClose={onClose}
            data={award || DEFAULT_OBJECT}
            onEdit={onDialogEdited}
            validationSchema={validator}
            isEditing={isEditing}
            title={<FormattedMessage id="Award.editDialog.title" defaultMessage="Award's details" />}
        >
            {() => <AwardDialogContent isEditing={isEditing} />}
        </EditDialog>
    );
};

const AwardDialogContent = ({ isEditing }) => {
    const classes = useStyles();

    const { values: award } = useFormikContext();
    return (
        <>
            <div className={classes.headrow}>
                <AwardDialogContentTitle isEditing={isEditing} title={award.title} />
                <AwardDialogContentDate isEditing={isEditing} date={award.data} />
            </div>
            <AwardDialogContentDescription isEditing={isEditing} description={award.summary} />
            <AwardDialogContentLink isEditing={isEditing} link={award.link} />
            <AwardDialogContentImages isEditing={isEditing} images={award.images} />
        </>
    );
};

export const AwardDialog = AwardDialogComponent;
