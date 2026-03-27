import { FooterContent } from "./FooterContent"
import FooterContentView from "./FooterContentView"

export const ShowPolicyPages = ({router, page}) => {
    const contentInfo = FooterContent.policies.find(p => p.name === page) || null
    return ( 
        <>
        {
            contentInfo && <FooterContentView content={contentInfo} onClose={() => router.push('/')} /> 
        }
        </>
    )
}

export default ShowPolicyPages