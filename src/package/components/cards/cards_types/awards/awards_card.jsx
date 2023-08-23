import React, { useContext, useMemo } from 'react';

import { createUseStyles } from 'react-jss';
import { FormattedMessage } from 'react-intl';

import { ProfileCard } from '../../../commons/profile_card/profile_card';
import { AwardsFront } from './awards_front/awards_front';
import { AwardsBack } from './awards_back/awards_back';
import { AddButton } from './add_button_rounded/add_button_rounded';
import { AwardDialog } from './award_dialog/award_dialog';

import { mapAwardsFromJsonResume } from './data/mapping';
import { DeveloperProfileContext } from '../../../../utils/context/contexts';
import { validateAwardsComplete } from './data/validator';
import { SIDES } from '../../../commons/profile_card/profile_card_side/side';
import { useMode } from '../../../hooks/use_mode';
import { SortAwardsButton } from './sort_awards_button/sort_awards_button';

import { styles } from './awards_card_styles';

const useStyles = createUseStyles(styles);

const AwardsCardComponent = ({ variant, side }) => {
    const classes = useStyles();
    const [mode] = useMode();
    const { data, isEditing } = useContext(DeveloperProfileContext);
    const mappedData = useMemo(() => mapAwardsFromJsonResume(data), [data]);

    const isComplete = useMemo(() => validateAwardsComplete(mappedData), [mappedData]);

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
            kind="awards"
            data={mappedData}
            isComplete={isComplete}
            isEditingProfile={isEditing}
            sides={{
                front: (props) => <AwardsFront {...props} />,
                back: (props) => <AwardsBack {...props} />
            }}
            variant={variant}
            side={currentSide}
            customEditAction={(props) => (
                <div className={classes.actions}>
                    {data.awards?.length > 1 && (
                        <SortAwardsButton
                            awards={data?.awards}
                            title={<FormattedMessage id="Awards.Actions.Sort" defaultMessage="Sort awards" />}
                        />
                    )}
                    <AddButton
                        title={<FormattedMessage id="Awards.Actions.Add" defaultMessage="Add a award" />}
                        {...props}
                    />
                </div>
            )}
            editDialog={{
                component: AwardDialog,
                data: {}
            }}
        />
    );
};

export const AwardsCard = AwardsCardComponent;
