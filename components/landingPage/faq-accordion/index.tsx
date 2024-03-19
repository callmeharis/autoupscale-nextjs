import React from "react";
import { Collapse } from "react-collapse";
import { AiOutlineDown, AiOutlineLeft } from "react-icons/ai";

const FaqAccordion = ({ open, toggle, question, answer }) => {
    return (
        <div>
            <div className="accordion-header bg-white w-1/2 my-2 mx-auto flex justify-start items-center cursor-pointer font-semibold py-3 px-4 shadow-sm" onClick={toggle}>
                <div className="toggle-icon mr-2 mb-1">
                    {open ? <AiOutlineDown /> : <AiOutlineLeft />}
                </div>
                <div>{question}</div>
            </div>
            <Collapse className="accordion-body bg-white" isOpened={open}>
                <div
                    className="answers"
                    style={{
                        width: "50%",
                        margin: "auto",
                        padding: "15px 20px",
                    }}
                >
                    {answer}
                </div>
            </Collapse>
        </div>
    );
};

export { FaqAccordion };
