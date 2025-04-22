import { useState } from 'react'

export default function Accordion({items}) {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <div id="work-experience" className="accordion">
            {items.map((item) => {
                return (
                    <Panel
                        key={item.id}
                        title={item.employer}
                        isActive={activeIndex == item.id}
                        onShow={ () => setActiveIndex(item.id) }
                    >
                    {item.description} hello there 
                    </Panel>
                )
            })}
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
        <section className="panel">
            <h3>{title}</h3>
            { isActive ? (
                <p>{children}</p>
            ) : (
                <button onClick={onShow}>
                    Show
                </button>
            )}
        </section>
    )
}