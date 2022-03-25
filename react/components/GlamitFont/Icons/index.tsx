import React, { useMemo } from 'react';
import icons from  './all.css';
import classnames from 'classnames';

interface IconsProps {
    base: string;
    icon: string;
    blockClass?: string;
    url?: string;
}

const Icons = ({base, icon, blockClass, url}: IconsProps) => useMemo(() => {
    const classes = classnames(icons[base], icons[icon], icons["glamit-icono"] + '--' + blockClass, 'vtex-'+icons["glamit-icono"] + '--' + blockClass);
    const classesLink = classnames(icons["glamit-iconos-link"] + '--' + blockClass, 'vtex-'+icons["glamit-iconos-link"] + '--' + blockClass);
    if (url) return <a className={classesLink} href={url} target="__blank"><i className={classes}></i></a>
    return <i className={classes}></i>
}, [base, icon]);

Icons.schema = {
    title: 'icono',
    type: 'object',
    properties: {
        base: {
            title: 'Inciales base del ícono',
            type: 'string',
        },
        icon: {
            title: 'ícono',
            type: 'string'
        },
        url: {
            title: 'Url',
            type: 'string'
        }
    }
}
Icons.defaultProps = {
    base: "",
    icon: "",
    url: "",
    blockClass: ""
}

export default Icons;
