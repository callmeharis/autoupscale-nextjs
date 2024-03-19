import { FormSection } from "@/components/customer";
import { UserEntity } from "@/models/user/user.entity";
import React, { useState } from "react";

export default function Create({ id }) {
    const [success, setSuccess] = useState<boolean>(false)
    const onSaveComplete = (data: UserEntity) => {
        Boolean(data) && setSuccess(true)
    }
    return (
        <>
            {Boolean(success) ? (
                <div className="w-full ">
                    <h1 className="text-3xl text-green-700 text-center">CONGRATULATION!!</h1>
                    <h1 className="text-center">Please check your email to get login credentials</h1>

                </div>
            ) : (
                <FormSection onSave={onSaveComplete} isPublic companyId={id} />
            )}
        </>
    );
}
export async function getServerSideProps(context) {
    try {
        const id = context.params?.id;
        if (!!!id)
            return { notFound: true }

        return {
            props: { id }
        }
    } catch (error) {
        console.error("Exception is here:", error);
        return { props: { id: 0 } }
    }
}