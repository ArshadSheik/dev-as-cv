import React, { useContext, useMemo } from 'react';

import { createUseStyles } from 'react-jss';
import { FormattedMessage } from 'react-intl';

import { ProfileCard } from '../../../commons/profile_card/profile_card';
import { PublicationsFront } from './publications_front/publications_front';
import { PublicationsBack } from './publications_back/publications_back';
import { AddButton } from './add_button_rounded/add_button_rounded';
import { PublicationDialog } from './publication_dialog/publication_dialog';

import { mapPublicationsFromJsonResume } from './data/mapping';
import { DeveloperProfileContext } from '../../../../utils/context/contexts';
import { validatePublicationsComplete } from './data/validator';
import { SIDES } from '../../../commons/profile_card/profile_card_side/side';
import { useMode } from '../../../hooks/use_mode';
import { SortPublicationsButton } from './sort_publications_button/sort_publications_button';

import { styles } from './publications_card_styles';

const useStyles = createUseStyles(styles);

const PublicationsCardComponent = ({ variant, side }) => {
    const classes = useStyles();
    const [mode] = useMode();
    const { data, isEditing } = useContext(DeveloperProfileContext);
    const mappedData = useMemo(() => mapPublicationsFromJsonResume(data), [data]);

    const isComplete = useMemo(() => validatePublicationsComplete(mappedData), [mappedData]);

    const currentSide = useMemo(() => {
        if (!isComplete && !isEditing) {
            return SIDES.FRONT;
        }
        return side;
    }, [side, isComplete, isEditing]);

    if (!isComplete && mode !== 'edit') {
        return null;
    }
    return (
        <ProfileCard
            kind="publications"
            data={mappedData}
            isComplete={isComplete}
            isEditingProfile={isEditing}
            sides={{
                front: (props) => <PublicationsFront {...props} />,
                back: (props) => <PublicationsBack {...props} />
            }}
            variant={variant}
            side={currentSide}
            customEditAction={(props) => (
                <div className={classes.actions}>
                    {data.publications?.length > 1 && (
                        <SortPublicationsButton
                            publications={data?.publications}
                            title={
                                <FormattedMessage id="Publications.Actions.Sort" defaultMessage="Sort publications" />
                            }
                        />
                    )}
                    <AddButton
                        title={<FormattedMessage id="Publications.Actions.Add" defaultMessage="Add a publication" />}
                        {...props}
                    />
                </div>
            )}
            editDialog={{
                component: PublicationDialog,
                data: {}
            }}
        />
    );
};

export const PublicationsCard = PublicationsCardComponent;
