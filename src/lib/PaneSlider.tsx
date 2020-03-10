import React, { useState } from 'react';
import { ReactElement } from "react";
import classNames from "classnames";
import './PaneSlider.css';

interface Pane {
    component: ReactElement,
    label: string,
}

interface PaneSliderProps {
    panes: Pane[],
}

function PaneSlider (props: PaneSliderProps): ReactElement {
    const {panes} = props

    const [active, setActive] = useState(0);

    const rendered = panes.map((pane: any, index: number) => {
        const paneActive = active === index;

        const paneClasses = classNames({
            'PaneSlider__Pane': true,
            'PaneSlider__Pane--Active': paneActive,
        });

        const overlayClasses = classNames({
            'PaneSlider__Overlay': true,
            'PaneSlider__Overlay--Active': !paneActive,
        });

        return <div key={index} className={paneClasses} onClick={() => setActive(index)}>
            <h2>{pane.label}</h2>
            {pane.component}
            <div className={overlayClasses}>
                <h2 aria-hidden="true">{pane.label}</h2>
            </div>
        </div>;
    });

    return (
        <div className="PaneSlider">
            {rendered}
        </div>
    )
}

export default PaneSlider;