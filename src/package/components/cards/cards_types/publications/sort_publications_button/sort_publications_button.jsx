import React from 'react';

import { createUseStyles } from 'react-jss';

import { SortButtonRounded } from '../sort_button_rounded/sort_button_rounded';
import { SortPublicationsDialog } from '../sort_publications_dialog/sort_publications_dialog';

import { useCallbackOpen } from '../../../../hooks/use_callback_open';

import { styles } from './sort_publications_button_styles';

const useStyles = createUseStyles(styles);

export const SortPublicationsButton = ({ title, publications }) => {
    const classes = useStyles(styles);

    const [openDialog, setDialogOpened, setDialogClosed] = useCallbackOpen();

    return (
        <>
            <SortPublicationsDialog open={openDialog} onClose={setDialogClosed} publications={publications} />
            <SortButtonRounded title={title} classes={{ container: classes.container }} onClick={setDialogOpened} />
        </>
    );
};
