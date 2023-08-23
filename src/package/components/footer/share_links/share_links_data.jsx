import React from 'react';
import { FormattedMessage } from 'react-intl';

import { CopyWrapper } from '../../commons/copy_wrapper/copy_wrapper';
import { ReactComponent as ShareIcon } from '../../../assets/icons/share.svg';

export const SHARE_LINKS_DATA = Object.freeze({
    copyShareUrl: {
        icon: (props) => (
            <CopyWrapper value={(typeof window === 'undefined' ? {} : window).location?.href}>
                <ShareIcon {...props} />
            </CopyWrapper>
        ),
        tooltipTranslation: <FormattedMessage id="Footer.shareLinks.copyUrl" defaultMessage="Copy profile's URL" />
    }
});
