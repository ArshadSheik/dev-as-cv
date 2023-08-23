import React from 'react';

import { createUseStyles } from 'react-jss';

import { SortButtonRounded } from '../sort_button_rounded/sort_button_rounded';
import { SortAwardsDialog } from '../sort_awards_dialog/sort_awards_dialog';

import { useCallbackOpen } from '../../../../hooks/use_callback_open';

import { styles } from './sort_awards_button_styles';

const useStyles = createUseStyles(styles);

export const SortAwardsButton = ({ title, awards }) => {
    const classes = useStyles(styles);

    const [openDialog, setDialogOpened, setDialogClosed] = useCallbackOpen();

    return (
        <>
            <SortAwardsDialog open={openDialog} onClose={setDialogClosed} awards={awards} />
            <SortButtonRounded title={title} classes={{ container: classes.container }} onClick={setDialogOpened} />
        </>
    );
};
