import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { createUseStyles, useTheme } from 'react-jss';
import { FormattedMessage } from 'react-intl';
import { arrayMove, SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

import { Button, List, ListItem, Typography } from '@welovedevs/ui';

import { Dialog, DialogContent, DialogActions, useMediaQuery } from '@material-ui/core';

import { isEqual } from 'lodash';
import { DialogTitle } from '../../../../commons/dialog/dialog_title/dialog_title';

import { ReactComponent as MoveIcon } from '../../../../../assets/icons/move_list.svg';

import { styles } from './sort_publications_dialog_styles';
import { DeveloperProfileContext } from '../../../../../utils/context/contexts';

const useStyles = createUseStyles(styles);

export const SortPublicationsDialog = ({ open, onClose, publications }) => {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.screenSizes.small}px)`);
    const { onEdit } = useContext(DeveloperProfileContext);

    const [sortedPublications, setSortedPublications] = useState(publications);

    const saveDisabled = useMemo(() => isEqual(sortedPublications, publications), [publications, sortedPublications]);

    useEffect(() => {
        setSortedPublications(publications);
    }, [publications]);

    const handleSortEnd = useCallback(
        ({ oldIndex, newIndex }) => {
            const newPublications = arrayMove(sortedPublications, oldIndex, newIndex).map((data, index) => ({
                ...data,
                index
            }));
            setSortedPublications(newPublications);
        },
        [sortedPublications]
    );

    const handleSave = useCallback(async () => {
        if (saveDisabled) {
            return;
        }
        await onEdit({
            publications: sortedPublications
        });
        onClose();
    }, [saveDisabled, onEdit, sortedPublications]);

    return (
        <Dialog open={open} onClose={onClose} fullScreen={isMobile}>
            <DialogTitle>
                <FormattedMessage id="Publications.SortDialog.Title" defaultMessage="Sort publications" />
            </DialogTitle>
            <DialogContent>
                <SortablePublications
                    lockToContainerEdges
                    helperClass={classes.sortableHelper}
                    onSortEnd={handleSortEnd}
                    distance={15}
                    useDragHandle
                    lockAxis="y"
                    items={sortedPublications}
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

const SortablePublications = SortableContainer(({ items = [], classes }) => (
    <List>
        {items
            .filter(Boolean)
            .sort(({ index: a }, { index: b }) => a - b)
            .map((publication, index) => (
                <PublicationItem
                    index={index}
                    key={`publication_${publication.id}_${index}`}
                    id={publication?.id}
                    publication={publication}
                    classes={classes}
                    publicationIndex={index}
                />
            ))}
    </List>
));

const PublicationItem = SortableElement(({ publication, classes }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.screenSizes.small}px)`);
    return (
        <div className={classes.publicationRow}>
            <DragHandle classes={classes} />
            {!isMobile && <div className={classes.divider} />}
            <ListItem className={classes.listItem}>
                <Typography className={classes.name} color="dark">
                    {publication?.name}
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
