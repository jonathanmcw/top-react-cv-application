import { useState } from 'react'

export default function Accordion({items, getTitle, getDescription}) {
    const [activeIndex, setActiveIndex] = useState(null);
    return (
        <div className="accordion">
            {items.map((item) => (
                <Panel
                    key={item.id}
                    title={getTitle(item)}
                    isActive={activeIndex === item.id}
                    onShow={() => setActiveIndex(item.id)}
                >
                    {getDescription(item)}
                </Panel>
            ))}
        </div>
    )
}

function Panel({
    title,
    isActive,
    children,
    onShow
}) {
    return (
        <div className="panel">
            <h3>{title}</h3>
            { isActive ? (
                <>{children}</>
            ) : (
                <button onClick={onShow}>Show</button>
            )}
        </div>
    )
}