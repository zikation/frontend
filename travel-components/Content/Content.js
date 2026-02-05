import ReactMarkdown from "react-markdown"

export function Para({ content, className }) {
    if (!content) return null
  
    const markdown = Array.isArray(content) ? content.join("\n\n") : content
  
    return (
      <ReactMarkdown components={{ p: ({ children }) => (<p className={className}>{children}</p>)}}>
            {markdown}
      </ReactMarkdown>
    )
}

export function ParaWithDiv ({content, divStyle, pStyle}) {
    if (!content) return null

    return (
        <div className={divStyle}>
            <Para style={pStyle} content={content} />
        </div>
    )
}

export function Bullet ({content, liStyle}) {
    if (!content || !Array.isArray(content)) return null

    return (
        <ul>
            {
                content.map((c, i) => {
                    return <li className={liStyle} key={i}><ReactMarkdown>{c}</ReactMarkdown></li>
                })
            }
        </ul>    
    )
}