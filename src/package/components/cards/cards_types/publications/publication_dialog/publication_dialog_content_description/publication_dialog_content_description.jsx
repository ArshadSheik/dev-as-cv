import React from 'react';

import { FormattedMessage } from 'react-intl';
import { createUseStyles } from 'react-jss';

import { TextField, Typography } from '@welovedevs/ui';
import { useFormikContext } from 'formik';

import { styles } from './publication_dialog_content_description_styles';

const useStyles = createUseStyles(styles);

const PublicationDialogContentDescriptionComponent = ({ description, isEditing }) => {
    const classes = useStyles({ isEditing });
    return (
        <div className={classes.container}>
            <Content description={description} isEditing={isEditing} classes={classes} />
        </div>
    );
};

const Content = ({ description, isEditing, classes }) => {
    if (isEditing) {
        return <EditingContent description={description} classes={classes} />;
    }
    return <DefaultContent description={description} classes={classes} />;
};

const DefaultContent = ({ description, classes }) => (
    <Typography classes={{ container: classes.typography }}>{description}</Typography>
);

const EditingContent = ({ classes }) => {
    const { handleChange, values, errors } = useFormikContext();

    return (
        <>
            <Typography variant="label" component="div">
                <FormattedMessage id="Publication.details.dialog.title" defaultMessage="Publication details" />
            </Typography>
            <TextField
                fullWidth
                multiline
                rows={8}
                variant="flat"
                onChange={handleChange}
                name="description"
                value={values.description}
                classes={{
                    container: classes.textField
                }}
            />
            {errors?.description && (
                <Typography color="danger" variant="helper" component="p">
                    {errors.description}
                </Typography>
            )}
        </>
    );
};

export const PublicationDialogContentDescription = PublicationDialogContentDescriptionComponent;
