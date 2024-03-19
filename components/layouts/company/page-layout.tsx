import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Row, Col } from "react-bootstrap";
import SideBar from "../../../components/company-setting/sidebar";

export interface PageLayoutProps {
    title?: string;
    actions?: JSX.Element | JSX.Element[];
    readonly children?: JSX.Element | JSX.Element[];
}

export default function PageLayout(props: PageLayoutProps) {
    const { title, children, actions } = props;

    return (
        <>
            <ToastContainer />

            <div className='flex w-full'>
                <SideBar />
                <div className=" w-full">
                    <Row className='w-full m-0 container mt-5 px-4' >
                        {
                            Boolean(title) &&
                            <Col lg={6} className='p-0'>
                                <h1 className='text-2xl'> {title} </h1>
                            </Col>
                        }
                        {
                            Boolean(actions) &&
                            <Col lg={6} className='flex justify-end p-0 px-2'>
                                {actions}
                            </Col>
                        }
                    </Row>
                    <Row className='container '>
                        {children}
                    </Row>
                </div>
            </div>
        </>
    );
}