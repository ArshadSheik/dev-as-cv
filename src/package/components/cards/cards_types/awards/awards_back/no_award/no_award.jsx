import React from 'react';

import { createUseStyles } from 'react-jss';
import { FormattedMessage } from 'react-intl';

import { Typography } from '@welovedevs/ui';

import { styles } from './no_award_styles';
import { NoDataButton } from '../../../../../commons/no_data_button/no_data_button';

const useStyles = createUseStyles(styles);

const NoAwardComponent = ({ handleAddButtonClick }) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Typography style={{ color: 'inherit' }} variant="h4" component="h4">
                <FormattedMessage
                    id="Awards.noAward.title"
                    defaultMessage="Describe a award that you've enjoyed as a developer. This award may have been realized during your studies, your personal time or while working at a company."
                />
            </Typography>
            <NoDataButton
                handleAddButtonClick={handleAddButtonClick}
                classes={{
                    container: classes.button
                }}
            >
                <FormattedMessage id="Awards.noAward.buttonLabel" defaultMessage="Ajouter un projet" />
            </NoDataButton>
        </div>
    );
};

export const NoAward = NoAwardComponent;
