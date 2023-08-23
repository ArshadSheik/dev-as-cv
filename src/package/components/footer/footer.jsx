import React, { memo } from 'react';

import cn from 'classnames';
import { createUseStyles, useTheme } from 'react-jss';
import { FormattedMessage } from 'react-intl';

import { Tooltip } from '@welovedevs/ui';
import { useMediaQuery } from '@material-ui/core';

import { ShareLinks } from './share_links/share_links';

import { ReactComponent as UpArrow } from '../../assets/icons/double-up-arrow.svg';
import { ReactComponent as GithubLogo } from '../../assets/icons/brands/github.svg';

import { styles } from './footer_styles';
import Button from '@material-ui/core/Button';

const useStyles = createUseStyles(styles);

const FooterComponent = () => {
    const classes = useStyles();
    const { screenSizes } = useTheme();

    const useSmallLayout = useMediaQuery(
        `(max-width: ${screenSizes.medium - (screenSizes.medium - screenSizes.small) / 2}px)`,
        { defaultMatches: true }
    );

    if (useSmallLayout) {
        return (
            <div className={cn(classes.container, useSmallLayout && classes.smallLayoutContainer)}>
                <div className={classes.wldLogoGithubLogoContainer}>
                    <Tooltip
                        title={<FormattedMessage id="Footer.github.tooltip" defaultMessage="Fork this Repository!" />}
                    >
                        <a
                            className={classes.githubLink}
                            href="https://github.com/ArshadSheik/dev-as-cv"
                            target="_bank"
                            rel="noreferer noopener"
                        >
                            <GithubLogo className={classes.githubLogo} />
                        </a>
                    </Tooltip>
                    <ShareLinks useSmallLayout />
                </div>
                <Tooltip title={<FormattedMessage id="Footer.upButton.tooltip" defaultMessage="Scroll to Top" />}>
                    <Button
                        className={classes.upButtonLink}
                        onClick={() => window.scroll({ top: 0, left: 0, behavior: 'smooth' })}
                    >
                        <UpArrow className={classes.upButton} />
                    </Button>
                </Tooltip>
            </div>
        );
    }

    return (
        <div className={classes.container}>
            <Tooltip title={<FormattedMessage id="Footer.github.tooltip" defaultMessage="Fork this Repository!" />}>
                <a
                    className={classes.githubLink}
                    href="https://github.com/ArshadSheik/dev-as-cv"
                    target="_bank"
                    rel="noreferer noopener"
                >
                    <GithubLogo className={classes.githubLogo} />
                </a>
            </Tooltip>
            <ShareLinks />
            <Tooltip title={<FormattedMessage id="Footer.upButton.tooltip" defaultMessage="Scroll to Top" />}>
                <a
                    className={classes.upButtonLink}
                    onClick={() => window.scroll({ top: 0, left: 0, behavior: 'smooth' })}
                >
                    <UpArrow className={classes.upButton} />
                </a>
            </Tooltip>
        </div>
    );
};

export const Footer = memo(FooterComponent);
