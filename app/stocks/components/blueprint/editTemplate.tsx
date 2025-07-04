import { useState } from "react"
import { Button } from "@/components/ui/button";

export const EditTemplate = ({edit ,setEdit}: {edit: boolean; setEdit: (edit: boolean) => void}) => {

    // const [edit, setEdit] = useState<boolean>(false);

    const handleEditButton = () => {
        console.log(edit)
        setEdit(!edit);
    }

    return (
        <Button onClick={() => handleEditButton()} className="bg-red-400">Edit</Button>
    )

}