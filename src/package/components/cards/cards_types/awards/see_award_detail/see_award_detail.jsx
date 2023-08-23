import React, { useContext } from 'react';

import { FormattedMessage } from 'react-intl';
import { createUseStyles } from 'react-jss';

import { Typography } from '@welovedevs/ui';

import { AwardDialog } from '../award_dialog/award_dialog';
import { AnimatedUnderlinedButton } from '../../../../commons/animated_underlined_button/animated_underlined_button';

import { ReactComponent as EyeIcon } from '../../../../../assets/icons/eye.svg';
import { ReactComponent as EditIcon } from '../../../../../assets/icons/edit.svg';

import { useCallbackOpen } from '../../../../hooks/use_callback_open';

import { styles } from './see_award_detail_styles';
import { DeveloperProfileContext } from '../../../../../utils/context/contexts';

const useStyles = createUseStyles(styles);

const SeeAwardDetailComponent = ({ color, award }) => {
    const classes = useStyles();
    const { isEditing } = useContext(DeveloperProfileContext);

    const [openDialog, setDialogOpened, setDialogClosed] = useCallbackOpen();
    return (
        <>
            <AwardDialog
                isEditing={isEditing}
                data={award}
                open={openDialog}
                onClose={setDialogClosed}
                handleProfileCardHasDialogOpened
            />
            <AnimatedUnderlinedButton color={color} onClick={setDialogOpened}>
                {!isEditing && <EyeIcon className={classes.icon} />}
                {isEditing && <EditIcon className={classes.fillIcon} />}
                <Typography classes={{ container: classes.detailTypography }} color="primary">
                    {!isEditing && <FormattedMessage id="Awards.details.seemore" defaultMessage="See more" />}
                    {isEditing && <FormattedMessage id="Main.lang.edit" defaultMessage="Edit" />}
                </Typography>
            </AnimatedUnderlinedButton>
        </>
    );
};

export const SeeAwardDetail = SeeAwardDetailComponent;
