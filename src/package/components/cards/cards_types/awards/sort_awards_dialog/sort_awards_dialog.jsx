import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { createUseStyles, useTheme } from 'react-jss';
import { FormattedMessage } from 'react-intl';
import { arrayMove, SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

import { Button, List, ListItem, Typography } from '@welovedevs/ui';

import { Dialog, DialogContent, DialogActions, useMediaQuery } from '@material-ui/core';

import { isEqual } from 'lodash';
import { DialogTitle } from '../../../../commons/dialog/dialog_title/dialog_title';

import { ReactComponent as MoveIcon } from '../../../../../assets/icons/move_list.svg';

import { styles } from './sort_awards_dialog_styles';
import { DeveloperProfileContext } from '../../../../../utils/context/contexts';

const useStyles = createUseStyles(styles);

export const SortAwardsDialog = ({ open, onClose, awards }) => {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.screenSizes.small}px)`);
    const { onEdit } = useContext(DeveloperProfileContext);

    const [sortedAwards, setSortedAwards] = useState(awards);

    const saveDisabled = useMemo(() => isEqual(sortedAwards, awards), [awards, sortedAwards]);

    useEffect(() => {
        setSortedAwards(awards);
    }, [awards]);

    const handleSortEnd = useCallback(
        ({ oldIndex, newIndex }) => {
            const newAwards = arrayMove(sortedAwards, oldIndex, newIndex).map((data, index) => ({
                ...data,
                index
            }));
            setSortedAwards(newAwards);
        },
        [sortedAwards]
    );

    const handleSave = useCallback(async () => {
        if (saveDisabled) {
            return;
        }
        await onEdit({
            awards: sortedAwards
        });
        onClose();
    }, [saveDisabled, onEdit, sortedAwards]);

    return (
        <Dialog open={open} onClose={onClose} fullScreen={isMobile}>
            <DialogTitle>
                <FormattedMessage id="Awards.SortDialog.Title" defaultMessage="Sort awards" />
            </DialogTitle>
            <DialogContent>
                <SortableAwards
                    lockToContainerEdges
                    helperClass={classes.sortableHelper}
                    onSortEnd={handleSortEnd}
                    distance={15}
                    useDragHandle
                    lockAxis="y"
                    items={sortedAwards}
                    classes={classes}
                />
            </DialogContent>
            <DialogActions>
                <Button size="small" onClick={onClose}>
                    <FormattedMessage id="Main.Lang.Close" defaultMessage="Close" />
                </Button>
                <Button size="small" color="primary" onClick={handleSave} disabled={saveDisabled}>
                    <FormattedMessage id="Main.Lang.Save" defaultMessage="Save" />
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const SortableAwards = SortableContainer(({ items = [], classes }) => (
    <List>
        {items
            .filter(Boolean)
            .sort(({ index: a }, { index: b }) => a - b)
            .map((award, index) => (
                <AwardItem
                    index={index}
                    key={`award_${award.id}_${index}`}
                    id={award?.id}
                    award={award}
                    classes={classes}
                    awardIndex={index}
                />
            ))}
    </List>
));

const AwardItem = SortableElement(({ award, classes }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.screenSizes.small}px)`);
    return (
        <div className={classes.awardRow}>
            <DragHandle classes={classes} />
            {!isMobile && <div className={classes.divider} />}
            <ListItem className={classes.listItem}>
                <Typography className={classes.name} color="dark">
                    {award?.name}
                </Typography>
            </ListItem>
        </div>
    );
});

const DragHandle = SortableHandle(({ classes }) => (
    <button className={classes.dragHandleButton} type="button">
        <MoveIcon className={classes.dragHandle} />
    </button>
));
