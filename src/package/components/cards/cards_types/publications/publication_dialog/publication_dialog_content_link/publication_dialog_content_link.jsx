import React from 'react';

import { FormattedMessage } from 'react-intl';
import { createUseStyles } from 'react-jss';

import { TextField, Typography } from '@welovedevs/ui';
import { useFormikContext } from 'formik';

import { styles } from './publication_dialog_content_link_styles';

const useStyles = createUseStyles(styles);

const PublicationDialogContentLinkComponent = ({ link, isEditing }) => {
    const classes = useStyles({ isEditing });
    return (
        <div className={classes.container}>
            <Content title={link} isEditing={isEditing} classes={classes} />
        </div>
    );
};

const Content = ({ link, isEditing, classes }) => {
    if (isEditing) {
        return <EditingContent title={link} classes={classes} />;
    }
    return <DefaultContent title={link} classes={classes} />;
};

const DefaultContent = ({ link, classes }) => (
    <Typography variant="h2" component="h3" classes={{ container: classes.typography }}>
        {link}
    </Typography>
);

const EditingContent = ({ classes }) => {
    const { handleChange, values, errors } = useFormikContext();

    return (
        <>
            <Typography variant="label" component="div">
                <FormattedMessage id="Publication.dialog.link.title" defaultMessage="Publication's list" />
            </Typography>
            <TextField
                fullWidth
                variant="flat"
                onChange={handleChange}
                name="link"
                value={values.link}
                classes={{
                    container: classes.textField
                }}
            />
            {errors?.link && (
                <Typography color="danger" variant="helper" component="p">
                    {errors.link}
                </Typography>
            )}
        </>
    );
};

export const PublicationDialogContentLink = PublicationDialogContentLinkComponent;
