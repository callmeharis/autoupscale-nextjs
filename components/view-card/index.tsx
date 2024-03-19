import { Card } from "react-bootstrap";

export interface ViewCardProps {
    title?: string;
    titleAs?: React.ElementType;
    variant?: "primary" | "secondary";
    readonly children?: any;
    actions?: JSX.Element | JSX.Element[];
}

export default function ViewCard(props: ViewCardProps) {


    let { title, actions, children, variant, titleAs: TitleAsCmp } = props;

    function renderTitleCmp() {
        if (TitleAsCmp) return <TitleAsCmp>{title}</TitleAsCmp>;

        return <h1 style={{ fontSize: '32px' }}>{title}</h1>;
    }

    return (
        <Card className="shadow bg-white mb-[30px] rounded-md w-11/12 mx-auto border-0">
         <div className="">
            {children && <Card.Body className="">{children}</Card.Body>}
            </div>   

        </Card>
    );
}
