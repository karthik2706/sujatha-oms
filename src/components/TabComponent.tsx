import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

interface Props {
    tabTitles: string[];
    tabContents: JSX.Element[];
}

const TabComponent: React.FC<Props> = ({ tabTitles, tabContents }) => {
    const [activeTab, setActiveTab] = useState(0);
    return (
        <Tabs activeKey={activeTab} onSelect={(tab: any) => setActiveTab(tab)}>
            {tabTitles.map((title, index) => (
                <Tab eventKey={index} title={title}>
                    {tabContents[index]}
                </Tab>
            ))}
        </Tabs>
    );
};

export default TabComponent;
